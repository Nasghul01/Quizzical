import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import Answer from "./Answer";
import { decode } from "he";

export default function Question (props){
    const [questions, setQuestions] = useState([])
    const renderAfterCalled = useRef(false)
    const shuffledAnswer = (answer) => {
        return answer.sort(() => Math.random() - 0.5)
    }

    useEffect(() => {

        if (!renderAfterCalled.current) {
        fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
        .then(res => {
            return res.json();
        })
        .then( loadQuestions => {
            const newTrivia = []
            loadQuestions.results.forEach(question => newTrivia.push(
                {
                    id: nanoid(),
                    question: question.question,
                    answers: shuffledAnswer([...question.incorrect_answers,question.correct_answer]),
                    correct: question.correct_answer,
                    selected: null,
                    checked:false
                }
            ))
            setQuestions(newTrivia)
            console.log(newTrivia)
            
        })
        .catch( err => {
            console.error(err);
        })
        }
        renderAfterCalled.current = true;
        
    },[])


    function handleAnswer() {

    }


    return (<>
    <div className="container d-flex flex-column  z-3 m-3">
        {questions.map(question => 
            <div className="container py-1" key={question.id}>
                <p className="fw-bold">{decode(question.question)}</p>
                <Answer
                answers={question.answers}
                
                
                />
            </div>
        )}
        <button onClick={handleCheckAnswer}>Check</button>
        <button onClick={props.handleGameClick} className="btn btn-primary m-3">Check Answer</button>
    </div>
        
    </>)
        
}
