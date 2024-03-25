import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import Answer from "./Answer";
import { decode } from "he";

export default function Question (props){
    const [questions, setQuestions] = useState([])
    const renderAfterCalled = useRef(false)
    const [result,setResult] = useState(false)
    const [num, setNum] = useState(0)
    const shuffledAnswer = (answer) => {
        return answer.sort(() => Math.random() - 0.5)
    }
    // const handleActive = (answer => {
    //     setQuestions(prevQuestion => ({
    //         ...prevQuestion,
    //         selected: answer
    //     }))
    // }) 
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
            
        })
        .catch( err => {
            console.error(err);
        })
        }
        renderAfterCalled.current = true;
        
    },[])


    function handleAnswer() {
        setQuestions(prevQuestion => prevQuestion.map(question => {
            if(question.correct === question.selected){
                setNum(prevNum => prevNum + 1)
               return {...question, checked: true}
               
            }
            else
            return {...question, checked: false} 
        
        }
            // question.correct === question.selected ? {...question, checked: true} : {...question, checked: false}
            ))
        setResult(true)
    }
    const handleAnswerSelection = (answer,id) => {
        setQuestions(prevQuestion => prevQuestion.map(question => 
            question.id === id ? {...question, selected: answer } : question
        ))
      };


    return (<>
    <div className="container d-flex flex-column  z-3 m-3">
        {questions.map(question => 
            <div className="container py-1" key={question.id}>
                <p className="fw-bold">{decode(question.question)}</p>
                <Answer
                id ={question.id}
                answers={question.answers}
                onAnswerSelected = {handleAnswerSelection}
                checked={question.checked}
                result={result}
                />

            </div>
        )}

        {result ? 
        <p className="fw-bold">You score {num}/5 correct answers</p>
        :
        ''
        }
        
        <button onClick={!result ? handleAnswer  : props.handleGameClick} 
        className="btn btn-primary m-3">{ !result ?  'Check Answer'  : 'Play Again' }
        </button>
    </div>
        
    </>)
        
}
