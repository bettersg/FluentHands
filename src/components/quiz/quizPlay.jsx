import Cam from '../cam'
import Interface from './interface'
import { func, number } from 'prop-types'
import { useEffect, useState } from 'react'
import styles from './quizPlay.module.css'

export default function QuizPlay({setMode, setSkippedLetters, points, incrementPoints}) {

    const letters = ['A','B','C','D','E','F','G','H','I','K','L','M','N','O','P','Q','R','S','U','V','W','X','Y']
    const generateLetter = (prevLetter=" ") => {
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
    const [detectedLetter, setDetectedLetter] = useState('')
    const [correct, setCorrect] = useState(null)
    
    // hint states: '', 'button', 'picture'
    const [hint, setHint] = useState('');

    const handleQuizPoints = (detectedLetter) => {
        console.log('Detected letter:', detectedLetter, 'Required letter:', letter)
        if (detectedLetter == letter) {
            incrementPoints()
            setShowSkip(false)
            setHint('')
            setCorrect("correct")
            // wait before changing letter
            setTimeout(() => {
                setLetter(generateLetter(letter))
                setCorrect(null)
            }, 1000)

        } else {
            setShowSkip(true)
            setCorrect("wrong")
            if (hint == '') setHint('button')
            // wait before removing feedback styles
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
        setHint('')
        setSkippedLetters((skippedLetters)=>{
            skippedLetters.add(letter)
            return skippedLetters
        })
        setLetter(generateLetter(letter))
        setShowSkip(false)
    }

    return (
        <div className={styles.quizContainer}>
            {capturing ? 
            <>
                <Interface 
                    points={points} 
                    instruction={`Sign '${letter}'`}
                    handleEndQuiz={handleEndQuiz}
                    capturing={capturing}
                />
                <div className={styles.camContainer}>
                    {hint == 'picture' && <div className={styles.hintPic}></div>}
                    <Cam
                        capturing={capturing}
                        setCapturing={setCapturing}
                        setDetectedLetter={setDetectedLetter}
                        correct={correct}
                        hint={hint}
                        hintButtonHandler={() => setHint('picture')}
                    />
                    {hint == 'picture' && <div className={styles.hintPic}>
                        <img src={`letters/${letter}.png`} alt={`${letter} sign hint`} />
                    </div>}
                </div>
                {showSkip && <button className='button' onClick={handleSkip}>Skip</button>}
            </> : 
            <>
                <p>
                    Place your hand in the orange box (your webcam), so it is visible on screen. <br/>
                    Click the button to begin.
                </p>
                <Cam
                    capturing={true}
                    useML={false}
                />
                <button className='button' onClick={() => setCapturing(true)}>I&apos;m ready</button>
            </>}
        </div>
  )
}

QuizPlay.propTypes = {
    setMode: func.isRequired,
    setSkippedLetters: func.isRequired,
    points: number.isRequired,
    incrementPoints: func.isRequired,
}