import { MdArrowForwardIos } from "react-icons/md";
import { IoMdRefresh } from "react-icons/io";
import PointsDisplay from './pointsDisplay'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router'
import styles from './quizResults.module.css'


export default function QuizResults({setMode, points, setPoints}) {
  const navigate = useNavigate()
  const handleBack = () => navigate('/')
  const handleRetry = () => {
    setPoints(0)
    setMode('play')
  }

  return (
    <div className={styles.resultsContainer}>
        <div className={styles.results}>
          <img src="./complete.svg" alt="girl standing proudly and pointing to herself" />
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
  setMode: PropTypes.func.isRequired,
  points: PropTypes.number.isRequired,
  setPoints: PropTypes.func.isRequired
}