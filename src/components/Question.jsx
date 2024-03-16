import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";

export default function Question (props){
    const [data, setData] = useState([])
    const renderAfterCalled = useRef(false)

    useEffect(() => {

        if (!renderAfterCalled.current) {
        fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
        .then(res => {
            return res.json();
        })
        .then( loadQuestions => {
            console.log(loadQuestions.results);
            const newTrivia = []
            loadQuestions.results.forEach(question => newTrivia.push(
                {
                    id: nanoid(),
                    answer: shuffledAnswer([question.incorrect_answers, question.correct_answer]),
                    correct: question.correct_answer,
                    selected: null,
                    checked:false
                }
            ))
            setData(newTrivia)
            console.log(newTrivia)
        })
        .catch( err => {
            console.error(err);
        })
        }
        renderAfterCalled.current = true;
        
    },[])
    
    const shuffledAnswer = (answer) => {
        answer.sort(() => Math.random() - 0.5)
    }

    return (<>

    <button onClick={props.handleGameClick} className="btn btn-primary">Play Again</button>
    </>)
        
}
