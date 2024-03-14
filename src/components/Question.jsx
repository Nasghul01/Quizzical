import { useState, useEffect } from "react";

export default function Question (props){
    // const [ question, incorect_answers , correct_answer ] = results
    
    return (<>
        {props.data.map((question, index) => (
            <div key={index} className="d-flex flex-row justify-content-center">
                <p >{question.question}</p>
                {/* <p>{question.incorrect_answers.map((answer) => (
                    <li>{answer}</li>
                ))}</p> */}
                <p>{question.correct_answer}</p>
            </div>
        ))}
    </>)
        
}
