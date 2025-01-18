import Cam from '../cam'
import Timer from './timer'
import PropTypes from 'prop-types'
import { useState } from 'react'
import styles from './quizPlay.module.css'

export default function QuizPlay({setMode, points, incrementPoints}) {
    const handleEndQuiz = () => setMode('results')
    const [capturing, setCapturing] = useState(false)
    const handleQuizPoints = (correct) => {
        if (correct) incrementPoints()
    }

    return (
        <div className={styles.quizContainer}>
            <Cam evaluateCallback={handleQuizPoints} capturing={capturing} setCapturing={setCapturing}/>
            {capturing ? <Timer points={points} handleEndQuiz={handleEndQuiz}/>
            : <button className='button' onClick={() => setCapturing(true)}>I&apos;m ready</button>}
        </div>
  )
}

QuizPlay.propTypes = {
    setMode: PropTypes.func.isRequired,
    points: PropTypes.number.isRequired,
    incrementPoints: PropTypes.func.isRequired,
}