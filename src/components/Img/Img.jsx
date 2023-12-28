import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

// Because of this css file it is giving us the blur effect otherwise it wont give the effect
import "react-lazy-load-image-component/src/effects/blur.css";
const Img = ({ src, className }) => {
    return (
        <LazyLoadImage
            className={className || ""}
            src={src}
            effect='blur'
            alt=''
        />
    )
}

export default Img
