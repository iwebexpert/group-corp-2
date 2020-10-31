import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import Backdrop from "@material-ui/core/Backdrop";
import {fromEvent, merge, Observable, of, Subject} from 'rxjs';
import {
    map,
    pairwise,
    switchMap,
    takeUntil,
    withLatestFrom,
    startWith,
    skipUntil,
    repeat,
} from 'rxjs/operators';
import {CirclePicker, ColorResult} from 'react-color';
import "react-number-picker/dist/style.css";
import Slider from "@material-ui/core/Slider";
import classNames from 'classnames';
import {CloseWindow} from "../../common/CloseWindow";

interface IDefaultConfig {
    color: string;
    width: number;
}

interface IConfig {
    color: Partial<ColorResult>,
    width: number,
    clearInstrument: boolean;
}

interface Coords {
    x: number;
    y: number;
}

interface IBaseStreamData {
    strokeStyle: string;
    x: number;
    y: number;
    lineWidth: number;
}

const defaultConfig: IDefaultConfig = {color: '#2196f3', width: 15};
const lineWidth$: Subject<number> = new Subject();
const strokeStyle$: Subject<string> = new Subject();
type propTypes = {
    handText: boolean,
    setHandText: React.Dispatch<React.SetStateAction<boolean>>,
    setAttachedImage: React.Dispatch<React.SetStateAction<string[] | null>>
};
export const HandTextPanel: React.FC<propTypes> = ({handText, setHandText, setAttachedImage}) => {
    const [drawConfig, setDrawConfig] = useState<IConfig>
    ({
        color: {
            hex: "#2196f3",
            rgb: {r: 33, g: 150, b: 243, a: 1}
        }, width: 15, clearInstrument: false
    });
    const canvasRef: React.Ref<HTMLCanvasElement> = useRef(null);
    const canvasCircleRef: React.Ref<HTMLDivElement> = useRef(null);
    useEffect((): void => {
        if (!(canvasRef.current && canvasCircleRef.current)) {
            return;
        }
        const ctx: CanvasRenderingContext2D | null = canvasRef.current.getContext('2d');
        const rect: DOMRect = canvasRef.current.getBoundingClientRect();
        const scale: number = window.devicePixelRatio;
        if (!ctx) {
            return;
        }
        canvasRef.current.width = rect.width * scale;
        canvasRef.current.height = rect.height * scale;
        ctx.scale(scale, scale);
        ctx.lineCap = 'round';
        const mouseMove$: Observable<MouseEvent> = fromEvent<MouseEvent>(canvasRef.current, 'mousemove');
        const mouseDown$: Observable<MouseEvent> = fromEvent<MouseEvent>(canvasRef.current, 'mousedown');
        const mouseUp$: Observable<MouseEvent> = fromEvent<MouseEvent>(canvasRef.current, 'mouseup');
        const mouseOut$: Observable<MouseEvent> = fromEvent<MouseEvent>(canvasRef.current, 'mouseout');
        const mouseIn$: Observable<MouseEvent> = fromEvent<MouseEvent>(canvasRef.current, 'mouseover');
        const pipedLineWidth$: Observable<number> = lineWidth$.pipe(
            startWith(defaultConfig.width),
        );
        const pipedStrokeStyle$: Observable<string> = strokeStyle$.pipe(
            startWith(defaultConfig.color),
        );
        const streamBase$: Observable<IBaseStreamData> = mouseMove$
            .pipe(
                map((e: MouseEvent): Coords => ({
                    x: e.offsetX,
                    y: e.offsetY,
                })),
                withLatestFrom(pipedLineWidth$, pipedStrokeStyle$, (data: Coords, lineWidth: number, strokeStyle: string): IBaseStreamData => {
                    return {lineWidth, strokeStyle, x: data.x, y: data.y};
                })
            );
        streamBase$.pipe(
            skipUntil(mouseIn$)
        ).subscribe(({x, y, strokeStyle, lineWidth}: IBaseStreamData) => {
                if (!canvasCircleRef.current) {
                    return;
                }
                canvasCircleRef.current.style.visibility = 'visible';
                canvasCircleRef.current.style.width = lineWidth + 'px';
                canvasCircleRef.current.style.height = lineWidth + 'px';
                canvasCircleRef.current.style.left = x + rect.left - lineWidth / 2 + 'px';
                canvasCircleRef.current.style.top = y + rect.top - lineWidth / 2 + 'px';
                if (strokeStyle === 'TRANSPARENT') {
                    canvasCircleRef.current.style.borderColor = 'white';
                    canvasCircleRef.current.style.borderRadius = String(0);
                    return;
                }
                canvasCircleRef.current.style.borderRadius = '50%';
                canvasCircleRef.current.style.borderColor = strokeStyle;
            }
        );
        const streamDraw$: Observable<[IBaseStreamData, IBaseStreamData]> = mouseDown$
            .pipe(
                map((e: MouseEvent): Coords => ({
                    x: e.offsetX,
                    y: e.offsetY,
                })),
                withLatestFrom(pipedLineWidth$, pipedStrokeStyle$, (data: Coords, lineWidth: number, strokeStyle: string): IBaseStreamData => {
                    return {lineWidth, strokeStyle, x: data.x, y: data.y};
                }),
                switchMap((data: IBaseStreamData): Observable<[IBaseStreamData, IBaseStreamData]> =>
                    merge(
                        streamBase$.pipe(
                            map((x: IBaseStreamData): IBaseStreamData => ({
                                ...x,
                                lineWidth: data.lineWidth,
                                strokeStyle: data.strokeStyle
                            })),
                            takeUntil(mouseUp$),
                            takeUntil(mouseOut$)
                        ),
                        of(data).pipe(
                            repeat(2),
                        )
                    ).pipe(pairwise())
                )
            );
        mouseOut$.subscribe((): void => {
            if (canvasCircleRef.current) {
                canvasCircleRef.current.style.visibility = 'hidden'

            }
        });
        streamDraw$.subscribe(([from, to]: [IBaseStreamData, IBaseStreamData]): void => {
            if (from.strokeStyle === 'TRANSPARENT') {
                ctx.clearRect(to.x - to.lineWidth / 2, to.y - to.lineWidth / 2, to.lineWidth, to.lineWidth);
                return;
            }
            ctx.lineWidth = to.lineWidth;
            ctx.strokeStyle = to.strokeStyle;
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.stroke();
        });
    }, []);
    const handleChangeColor = (color: ColorResult): void => {
        setDrawConfig((prev: IConfig): IConfig => ({...prev, color}));
        strokeStyle$.next(drawConfig.clearInstrument ? 'TRANSPARENT' : color.hex);
    };
    const handleChangeWidth = (_: ChangeEvent<{}>, width: number | number[]): void => {
        if (!Array.isArray(width)) {
            setDrawConfig((prev: IConfig): IConfig => ({...prev, width}));
            lineWidth$.next(width);
        }
    };
    const HandleClearInstrumentSelect = (): void => {
        strokeStyle$.next(!drawConfig.clearInstrument ? 'TRANSPARENT' : drawConfig.color.hex);
        setDrawConfig((prev: IConfig): IConfig => ({...prev, clearInstrument: !prev.clearInstrument}));
    };
    const ClearAllHandler = (): void => {
        if (!canvasRef.current) {
            return;
        }
        const rect: DOMRect = canvasRef.current.getBoundingClientRect();
        const context: CanvasRenderingContext2D | null = canvasRef.current.getContext('2d');
        if (context) {
            context.clearRect(0, 0, rect.width, rect.height);
        }
    };
    const CancelHandler = (): void => {
        setHandText(false);
    };
    const SaveHandler = (): void => {
        if (canvasRef.current) {
            const dataURL = canvasRef.current.toDataURL();
            setAttachedImage((pr: string[] | null): string[] => pr ? [...pr, dataURL] : [dataURL]);
            ClearAllHandler();
            setHandText(false);
        }
    };
    const clearInstrumentClass: string = classNames('ClearInstrumentCanvas', {ClearInstrumentCanvasSelected: drawConfig.clearInstrument});
    return (
        <Backdrop open={handText}>
            <div className={'HandTextPanelContainer'}>
                <div className={'primaryHeader'}>Нарисуйте свое послание</div>
                <canvas ref={canvasRef} className={'HandTextCanvas'}/>
                <div ref={canvasCircleRef} className={'canvasCircle'}/>
                <div className="canvasControlsContainer">
                    <Slider valueLabelDisplay={'on'} min={3} max={50} value={drawConfig.width}
                            onChange={handleChangeWidth}/>
                    <CirclePicker color={drawConfig.color.hex} onChange={handleChangeColor}/>
                    <div onClick={HandleClearInstrumentSelect} className={clearInstrumentClass}>
                        <img src="https://img.icons8.com/color/100/000000/eraser.png" alt={'Стереть'}/>
                    </div>
                </div>
                <div className="buttonContainerCanvas">
                    <div onClick={ClearAllHandler} className={'button'}>Стереть все</div>
                    <div onClick={SaveHandler} className={'button'}>Сохранить</div>
                    <div onClick={CancelHandler} className={'button'}>Отмена</div>
                </div>
                <CloseWindow actionClose={CancelHandler}/>
            </div>
        </Backdrop>
    );
};
