import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";

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
                <p className="fw-bold">{question.question}</p>
                <div className="d-flex flex-row gap-1 ">
                    {question.answers.map((answer,index) => 
                    <button key={index} className="btn btn-outline-primary rounded-4 ">{answer}</button>)}
                </div>
            </div>
        )}
        <button onClick={props.handleGameClick} className="btn btn-primary">Check Answer</button>
    </div>
        
    </>)
        
}
