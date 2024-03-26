import { decode } from "he";
import React, { useState } from "react";

export default function Answer (props){

    const [isActiveIndex, setIsActiveIndex] = useState(-1);

    const handleClick = ((answer, index) => {
        setIsActiveIndex(index);
        props.onAnswerSelected(answer,props.id)
        
    }) 
    return (
        <div className="d-flex flex-row gap-1 ">
                    {props.answers.map((answer,index) => 
                    <button key={index} 
                        className={`btn btn-outline-primary  rounded-3
                        ${ !props.result ?
                            index === isActiveIndex ? 'active': ''
                            :
                            props.correct === answer ? 'btn-success ' : 
                            index === isActiveIndex ? 
                            props.checked ? '' : 'btn-danger'
                             : ''
                    }` }
                        
                         onClick={() => handleClick(answer,index)}
                        
                    >
                    {decode(answer)}
                    </button>)}
                </div>
    )
}