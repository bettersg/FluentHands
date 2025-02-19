import { MdArrowForwardIos } from "react-icons/md";
import { IoMdRefresh } from "react-icons/io";
import PointsDisplay from './pointsDisplay'
import { func, instanceOf, number } from 'prop-types'
import { useNavigate } from 'react-router'
import styles from './quizResults.module.css'
import Review from "./review";


export default function QuizResults({setMode, points, setPoints, skippedLetters, setSkippedLetters}) {
  const navigate = useNavigate()
  const handleBack = () => navigate('/')
  const handleRetry = () => {
    setPoints(0)
    setSkippedLetters(new Set())
    setMode('play')
  }

  return (
    <div className={styles.resultsContainer}>
        <div className={styles.results}>
          {skippedLetters.size == 0 ? 
            <img className={styles.resultsImg} src="./complete.svg" alt="girl standing proudly and pointing to herself" /> :
            <Review letters={Array.from(skippedLetters).sort()}/>
          }
          <PointsDisplay points={points} maxPoints={30}/>
          <h3 className={styles.resultsPara}>Bravo! You’ve completed the quiz — what’s your next challenge?</h3>
        </div>
        
        <div className={styles.btnContainer}>
            <button className='button' onClick={handleRetry}> 
              <IoMdRefresh/> Try again
            </button>
            <button className='button' onClick={handleBack}> 
              <MdArrowForwardIos/> Back to homepage
            </button>
        </div>

    </div>
  )
}

QuizResults.propTypes = {
  setMode: func.isRequired,
  points: number.isRequired,
  setPoints: func.isRequired,
  skippedLetters: instanceOf(Set).isRequired,
  setSkippedLetters: func.isRequired
}