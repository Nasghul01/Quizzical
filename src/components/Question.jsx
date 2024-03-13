import React from "react";
import blob1 from '../assets/blob1.svg'
import blob2 from '../assets/blob2.svg'

export default function Question (){
    return (
        <div className="container-used p-3 bg.color-light d-flex flex-column position-relative rounded">
            <img src={blob1} alt="blob1" className='position-absolute top-0 end-0 rounded' />
            <p>This is question </p>
            <img src={blob2} alt="blob2" className='position-absolute bottom-0 start-0 rounded' />
        </div>
    )
}

