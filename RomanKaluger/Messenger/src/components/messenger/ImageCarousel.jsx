import {AutoRotatingCarousel} from 'material-auto-rotating-carousel';
import { Slide } from 'material-auto-rotating-carousel';
import {useDispatch, useSelector} from "react-redux";
import {setCommonViewImages} from "../../redux/actions";
import React from "react";

export const ImageCarousel = () => {
    const {commonViewImages} = useSelector(s => s.system);
    const dispatch = useDispatch();
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
                            commonViewImages.map((src, i) =>
                                <Slide
                                    mediaBackgroundStyle={{ backgroundColor: '#343A40' }}
                                    style={{
                                        backgroundColor: '#343A40',
                                        padding: '30px',
                                    }}
                                    title='' subtitle='' key={i}
                                    media={<img alt={'carouselImage'} className={'carouselImage'} style={{ height: '100%'}} src={src}/>}/>)
                        }
                    </AutoRotatingCarousel>
                    : null
            }
        </>
    );
};
