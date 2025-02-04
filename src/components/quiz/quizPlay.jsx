import Cam from '../cam'
import Interface from './interface'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useState } from 'react'
import styles from './quizPlay.module.css'

export default function QuizPlay({setMode, points, incrementPoints}) {
    const letters = ['A','B','C','D','E','F','G','H','I','K','L','M','N','O','P','Q','R','S','U','V','W','X','Y']
    const generateLetter = (prevLetter=" ") => {
        let nextLetter = letters[Math.floor(Math.random()*letters.length)]
        while (nextLetter == prevLetter) {
            nextLetter = letters[Math.floor(Math.random()*letters.length)]
        }
        // console.log('Generated letter:', nextLetter, 'Previous letter:', prevLetter)
        return nextLetter
    }

    const handleEndQuiz = () => setMode('results')
    const [capturing, setCapturing] = useState(false)
    const [letter, setLetter] = useState(generateLetter())
    const [showSkip, setShowSkip] = useState(false)
    const [detectedLetter, setDetectedLetter] = useState('')
    const [correct, setCorrect] = useState(null)

    const handleQuizPoints = (detectedLetter) => {
        console.log('Detected letter:', detectedLetter, 'Required letter:', letter)
        if (detectedLetter == letter) {
            incrementPoints()
            setShowSkip(false)
            // wait before changing letter
            setCorrect("correct")
            setTimeout(() => {
                setLetter(generateLetter(letter))
                setCorrect(null)
            }, 1000)

        } else {
            setShowSkip(true)
            setCorrect("wrong")
            setTimeout(() => {
                setCorrect(null)
            }, 1000)
        }
    }

    useEffect(() => {
        if (capturing) {
            handleQuizPoints(detectedLetter)
        }
    }, [detectedLetter])

    const handleSkip = () => {
        setLetter(generateLetter(letter))
        setShowSkip(false)
    }

    return (
        <div className={styles.quizContainer}>
            {capturing && <Interface 
                points={points} 
                instruction={`Sign '${letter}'`}
                handleEndQuiz={handleEndQuiz}
            />}
            <Cam correct={correct} evaluateCallback={setDetectedLetter} capturing={capturing} setCapturing={setCapturing}/>
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