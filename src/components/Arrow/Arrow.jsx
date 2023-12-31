import React, { useEffect } from 'react'
import './Style.scss';



const Arrow = ({ width, gap, noOfItems, containerRef }) => {

    const navigation = (dir) => {
        // const container = carouselContainer.current;
        // 240px is the width of each carousel-item + there is gap of 20px
        let total = width + gap;
        const scrollAmount = dir === "left" ? containerRef?.scrollLeft - (total * noOfItems) : containerRef?.scrollLeft + (total * noOfItems);
        containerRef?.scrollTo({
            left: scrollAmount,
            behavior: "smooth"
        })
    }

    return (
        <div className="arrows">
            <i className="arrow left ri-arrow-left-circle-line" onClick={() => navigation("left")}></i>
            <i className="arrow right ri-arrow-right-circle-line" onClick={() => navigation("right")}></i>
        </div>
    )
}

export default Arrow
