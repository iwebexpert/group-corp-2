import React, {useEffect, useRef, useState} from "react";
import Backdrop from "@material-ui/core/Backdrop";
import {fromEvent, merge, of, Subject} from 'rxjs';
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
import {CirclePicker} from 'react-color';
import "react-number-picker/dist/style.css";
import Slider from "@material-ui/core/Slider";
import classNames from 'classnames';

const defaultConfig = {color: '#2196f3', width: 15};
const lineWidth$ = new Subject();
const strokeStyle$ = new Subject();
export const HandTextPanel = ({handText, setHandText, setAttachedImage}) => {
    const [drawConfig, setDrawConfig] = useState({
        color: {
            hex: "#2196f3",
            rgb: {r: 33, g: 150, b: 243, a: 1}
        }, width: 15, clearInstrument: false
    });
    const canvasRef = useRef();
    const canvasCircleRef = useRef();
    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        const rect = canvasRef.current.getBoundingClientRect();
        const scale = window.devicePixelRatio;
        canvasRef.current.width = rect.width * scale;
        canvasRef.current.height = rect.height * scale;
        ctx.scale(scale, scale);
        ctx.lineCap = 'round';
        const mouseMove$ = fromEvent(canvasRef.current, 'mousemove');
        const mouseDown$ = fromEvent(canvasRef.current, 'mousedown');
        const mouseUp$ = fromEvent(canvasRef.current, 'mouseup');
        const mouseOut$ = fromEvent(canvasRef.current, 'mouseout');
        const mouseIn$ = fromEvent(canvasRef.current, 'mouseover');
        const pipedLineWidth$ = lineWidth$.pipe(
            startWith(defaultConfig.width),
        );
        const pipedStrokeStyle$ = strokeStyle$.pipe(
            startWith(defaultConfig.color),
        );
        const streamBase$ = mouseMove$
            .pipe(
                map(e => ({
                    x: e.offsetX,
                    y: e.offsetY,
                })),
                withLatestFrom(pipedLineWidth$, pipedStrokeStyle$, (data, lineWidth, strokeStyle) => {
                    return {lineWidth, strokeStyle, x: data.x, y: data.y};
                })
            );
        streamBase$.pipe(
            skipUntil(mouseIn$)
        ).subscribe(({x, y, strokeStyle, lineWidth}) => {
                canvasCircleRef.current.style.visibility = 'visible';
                canvasCircleRef.current.style.width = lineWidth + 'px';
                canvasCircleRef.current.style.height = lineWidth + 'px';
                canvasCircleRef.current.style.left = x + rect.left - lineWidth / 2 + 'px';
                canvasCircleRef.current.style.top = y + rect.top - lineWidth / 2 + 'px';
                if (strokeStyle === 'TRANSPARENT') {
                    canvasCircleRef.current.style.borderColor = 'white';
                    canvasCircleRef.current.style.borderRadius = 0;
                    return;
                }
                canvasCircleRef.current.style.borderRadius = '50%';
                canvasCircleRef.current.style.borderColor = strokeStyle;
            }
        );
        const streamDraw$ = mouseDown$
            .pipe(
                map(e => ({
                    x: e.offsetX,
                    y: e.offsetY,
                })),
                withLatestFrom(pipedLineWidth$, pipedStrokeStyle$, (data, lineWidth, strokeStyle) => {
                    return {lineWidth, strokeStyle, x: data.x, y: data.y};
                }),
                switchMap((data) =>
                    merge(
                        streamBase$.pipe(
                            map(x => ({...x, lineWidth: data.lineWidth, strokeStyle: data.strokeStyle})),
                            takeUntil(mouseUp$),
                            takeUntil(mouseOut$)
                        ),
                        of(data).pipe(
                            repeat(2),
                        )
                    ).pipe(pairwise())
                )
            );
        mouseOut$.subscribe(() => canvasCircleRef.current.style.visibility = 'hidden');
        streamDraw$.subscribe(([from, to]) => {
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
    const handleChangeColor = (color, event) => {
        setDrawConfig(prev => ({...prev, color}));
        strokeStyle$.next(drawConfig.clearInstrument ? 'TRANSPARENT' : color.hex);
    };
    const handleChangeWidth = (_, width) => {
        setDrawConfig(prev => ({...prev, width}));
        lineWidth$.next(width);
    };
    const HandleClearInstrumentSelect = () => {
        strokeStyle$.next(!drawConfig.clearInstrument ? 'TRANSPARENT' : drawConfig.color.hex);
        setDrawConfig(prev => ({...prev, clearInstrument: !prev.clearInstrument}));
    };
    const ClearAllHandler = () => {
        const rect = canvasRef.current.getBoundingClientRect();
        canvasRef.current.getContext('2d').clearRect(0, 0, rect.width, rect.height);
    };
    const CancelHandler = () => {
        setHandText(false);
    };
    const SaveHandler = () => {
        const dataURL = canvasRef.current.toDataURL();
        setAttachedImage(pr => pr ? [...pr, dataURL] : [dataURL]);
        ClearAllHandler();
        setHandText(false);
    };
    const clearInstrumentClass = classNames('ClearInstrumentCanvas', {ClearInstrumentCanvasSelected: drawConfig.clearInstrument});
    return (
        <Backdrop open={handText}>
            <div className={'HandTextPanelContainer'}>
                <div className={'primaryHeader'}>Нарисуйте свое послание</div>
                <canvas ref={canvasRef} className={'HandTextCanvas'}/>
                <div ref={canvasCircleRef} className={'canvasCircle'}/>
                <div className="canvasControlsContainer">
                    <Slider valueLabelDisplay={'on'} min={3} max={50} value={drawConfig.width}
                            onChange={handleChangeWidth}/>
                    <CirclePicker color={drawConfig.color} onChange={handleChangeColor}/>
                    <div onClick={HandleClearInstrumentSelect} className={clearInstrumentClass}>
                        <img src="https://img.icons8.com/color/100/000000/eraser.png" alt={'Стереть'}/>
                    </div>
                </div>
                <div className="buttonContainerCanvas">
                    <div onClick={ClearAllHandler} className={'button'}>Стереть все</div>
                    <div onClick={SaveHandler} className={'button'}>Сохранить</div>
                    <div onClick={CancelHandler} className={'button'}>Отмена</div>
                </div>
                <img onClick={CancelHandler} className={'DeleteSign'} alt={'DeleteSign'}
                     src="https://img.icons8.com/color/48/000000/delete-sign.png"/>
            </div>
        </Backdrop>
    );
};
