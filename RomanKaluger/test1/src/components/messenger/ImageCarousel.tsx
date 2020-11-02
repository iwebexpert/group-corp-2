import {AutoRotatingCarousel, Slide} from 'material-auto-rotating-carousel';
import {useDispatch, useSelector} from "react-redux";
import {setCommonViewImages} from "../../redux/actions";
import React from "react";
import {ICombinedState, ISystemState} from "../../redux/reduxTypes/rdx";
import {Dispatch} from "redux";

export const ImageCarousel: React.FC = () => {
    const {commonViewImages} = useSelector<ICombinedState, ISystemState>(s => s.system);
    const dispatch: Dispatch = useDispatch();
    return (
        <>
            {
                commonViewImages
                    ? <AutoRotatingCarousel
                        open={!!commonViewImages}
                        onClose={() => dispatch(setCommonViewImages(null))}
                        autoplay={false}
                    >
                        {
                            commonViewImages.map((src: string, i: number): React.ReactNode =>
                                <Slide
                                    mediaBackgroundStyle={{backgroundColor: '#343A40'}}
                                    style={{
                                        backgroundColor: '#343A40',
                                        padding: '30px',
                                    }}
                                    title='' subtitle='' key={i}
                                    media={<img alt={'carouselImage'} className={'carouselImage'} style={{height: '100%'}}
                                                src={src}/>}/>)
                        }
                    </AutoRotatingCarousel>
                    : null
            }
        </>
    );
};
