import { decode } from "he";
import React, { useState } from "react";

export default function Answer (props){

    const [isActiveIndex, setIsActiveIndex] = useState(-1);

    const handleClick = ((index) => {
        setIsActiveIndex(index);
    }) 
    return (
        <div className="d-flex flex-row gap-1 ">
                    {props.answers.map((answer,index) => 
                    <button key={index} 
                        className={`btn btn-outline-primary rounded-3 
                        ${ index === isActiveIndex ? 'active': ''}` }
                        onClick={() => handleClick(index)}
                        
                    >
                    {decode(answer)}
                    
                    </button>)}
                </div>
    )
}