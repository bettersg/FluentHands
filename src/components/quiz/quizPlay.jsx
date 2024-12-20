import Cam from '../cam'
import Timer from './timer'
import PropTypes from 'prop-types'
import { useState } from 'react'

export default function QuizPlay({setMode, points, incrementPoints}) {
    const handleEndQuiz = () => setMode('end')
    const [quizStart, setQuizStart] = useState(false)
    const evaluateSign = (correct) => {
        if (correct) incrementPoints()
    }
        return (
        <div>
            <Cam evaluateSign = {evaluateSign}/>
            {!quizStart ? <button className='button' onClick={() => setQuizStart(true)}>I'm ready</button> :
            <Timer points={points} handleEndQuiz={handleEndQuiz}/>}
        </div>
  )
}

QuizPlay.propTypes = {
    setMode: PropTypes.func.isRequired,
    points: PropTypes.number.isRequired,
    incrementPoints: PropTypes.func.isRequired,
}