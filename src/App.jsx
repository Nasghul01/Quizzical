import { useState , useEffect} from 'react'
import blob1 from './assets/blob1.svg'
import blob2 from './assets/blob2.svg'
import Question from './components/Question.jsx'

function App() {

  const [quiz , setQuiz] = useState(false)

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
    .then(res => res.json())
    .then(data => console.log(data))
  }, [])

  return (
    <>
      {!quiz ? 
      <>
        <div className='container-used p-3 bg.color-light d-flex flex-column justify-content-center align-items-center position-relative rounded'>
          <img src={blob1} alt="blob1" className='position-absolute top-0 end-0 rounded' />
          <h1 className=''>Quizzical</h1>
          <p>Some description if needed</p>
          <button 
            className='btn btn-primary p-2 w-25 rounded' 
            onClick={() => setQuiz(true)} >
             Quiz
            </button>
          <img src={blob2} alt="blob2" className='position-absolute bottom-0 start-0 rounded' />
        </div>
      </> :
        <Question/>
      }
    </>
  )
}

export default App
