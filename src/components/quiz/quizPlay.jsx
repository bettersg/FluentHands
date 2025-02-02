import Cam from '../cam'
import Interface from './interface'
import PropTypes from 'prop-types'
import { useState } from 'react'
import styles from './quizPlay.module.css'

export default function QuizPlay({setMode, points, incrementPoints}) {
    const letters = ['A','B','C','D','E','F','G','H','I','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y']
    const generateLetter = (prevLetter='') => {
        let nextLetter = letters[Math.floor(Math.random()*letters.length)]
        while (nextLetter == prevLetter) {
            nextLetter = letters[Math.floor(Math.random()*letters.length)]
        }
        return nextLetter
    }

    const handleEndQuiz = () => setMode('results')
    const [capturing, setCapturing] = useState(false)
    const [letter, setLetter] = useState(generateLetter())
    const [showSkip, setShowSkip] = useState(false)
    const handleQuizPoints = (correct) => {
        if (correct) {
            incrementPoints()
            setShowSkip(false)
            setLetter(prevLetter => generateLetter(prevLetter))
        } else {
            setShowSkip(true)
        }
    }

    const handleSkip = () => {
        setLetter(prevLetter => generateLetter(prevLetter))
        setShowSkip(false)
    }

    return (
        <div className={styles.quizContainer}>
            {capturing && <Interface 
                points={points} 
                instruction={`Sign '${letter}'`}
                handleEndQuiz={handleEndQuiz}
            />}
            <Cam evaluateCallback={handleQuizPoints} capturing={capturing} setCapturing={setCapturing}/>
            {!capturing && <button className='button' onClick={() => setCapturing(true)}>I&apos;m ready</button>}
            {capturing && showSkip && <button className='button' onClick={handleSkip}>Skip</button>}
        </div>
  )
}

QuizPlay.propTypes = {
    setMode: PropTypes.func.isRequired,
    points: PropTypes.number.isRequired,
    incrementPoints: PropTypes.func.isRequired,
}