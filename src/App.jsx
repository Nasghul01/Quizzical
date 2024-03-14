import { useState , useEffect} from 'react'
import blob1 from './assets/blob1.svg'
import blob2 from './assets/blob2.svg'
import Question from './components/Question.jsx'

function App() {

  const [quiz , setQuiz] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
      fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
      .then(res => {
        return res.json();
      })
      .then( loadQuestions => {
        console.log(loadQuestions.results);
        // loadQuestions.results.map (loadQuestions => {
          setData(loadQuestions.results)
      })
      .catch( err => {
        console.error(err);
      })
}, [quiz, true])




  return (
    <main className='p-3 position-relative rounded d-flex'>
          <img src={blob1} alt="blob1" className='position-absolute top-0 end-0 rounded' />
          {
            quiz ?
            <Question 
            data = {data}/>
            :
            <div className='container d-flex flex-column justify-content-center align-items-center'>
              <h1 className=''>Quizzical</h1>
              <p>Some description if needed</p>
              <button 
                className='btn btn-primary p-2 w-25 rounded' 
                onClick= { () => setQuiz(true)} >
                Quiz
              </button>
            </div>
          }
          <img src={blob2} alt="blob2" className='position-absolute bottom-0 start-0 rounded' />
    </main>
  )
}

export default App
