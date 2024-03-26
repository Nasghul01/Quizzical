import { useState , useEffect, useRef} from 'react'
import blob1 from './assets/blob1.svg'
import blob2 from './assets/blob2.svg'
import Question from './components/Question.jsx'

function App() {

  const [quiz , setQuiz] = useState(false)

  function handleGame() {
    setQuiz(!quiz)
  }

  

  return (
    <main className='p-3 position-relative rounded d-flex'>
          <img src={blob1} alt="blob1" className='position-absolute top-0 end-0 rounded' />
          {
            quiz ?
            <Question
            handleGameClick = {handleGame}/>
            :
            <div className='container d-flex flex-column justify-content-center align-items-center'>
              <h1 className=''>Quizzical</h1>
              <p className='m-3 text-center p-2'>Quiz web featuring five questions encompassing a range of general knowledge topics, sourced dynamically from the Open Trivia API</p>
              <button 
                className='btn btn-primary p-2 w-25 rounded' 
                onClick= {handleGame} >
                Quiz
              </button>
            </div>
          }
          <img src={blob2} alt="blob2" className='position-absolute bottom-0 start-0 rounded' />
    </main>
  )
}

export default App
