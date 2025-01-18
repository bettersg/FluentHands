import PropTypes from 'prop-types';
import { useState, useEffect } from 'react'

export default function Timer({points, handleEndQuiz}) {
    const timeLimitSeconds = 30
    const [seconds, setSeconds] = useState(timeLimitSeconds);

    const deadline = Date.now() + timeLimitSeconds * 1000;
    
    const updateTimer = () => {
        const time = deadline - Date.now();
        if (time >= 0) {
            let secs = parseInt(time / 1000) % 60
            if (secs < 10) secs = String(secs).padStart(2, '0')
            setSeconds(secs);
        } else {
            handleEndQuiz();
        } 
    };

    useEffect(() => {
        let interval = setInterval(() => updateTimer(), 100)
        return () => clearInterval(interval);
    },[])

    return (
        <>
            <div>0:{seconds}</div>
            <div>Score: {points}</div>
        </>
    )
}

Timer.propTypes = {
    points: PropTypes.number.isRequired,
    handleEndQuiz: PropTypes.func.isRequired
}