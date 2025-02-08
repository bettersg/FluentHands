import PropTypes from 'prop-types';
import { useState, useEffect } from 'react'
import styles from './interface.module.css'

export default function Interface({points, capturing, instruction, handleEndQuiz}) {
    const timeLimitSeconds = 60
    const [minutes, setMinutes] = useState(parseInt(timeLimitSeconds / 60))
    const [seconds, setSeconds] = useState(timeLimitSeconds);

    const deadline = Date.now() + timeLimitSeconds * 1000;
    
    const updateTimer = () => {
        const time = deadline - Date.now();
        if (time >= 0) {
            let mins = parseInt(time / 60000)
            setMinutes(mins)
            let secs = parseInt(time / 1000) % 60
            if (secs < 10) secs = String(secs).padStart(2, '0')
            setSeconds(secs);
        } else {
            handleEndQuiz();
        } 
    };

    useEffect(() => {
        if (capturing) {
            let interval = setInterval(() => updateTimer(), 100)
            return () => clearInterval(interval);
        }
    },[capturing])

    return (
        <div className={styles.interface}>
            <div className={styles.info}>Score: {points}</div>
            <div className={styles.instruction}>{instruction}</div>
            <div className={styles.info}>{minutes}:{seconds}</div>
        </div>
    )
}

Interface.propTypes = {
    points: PropTypes.number.isRequired,
    capturing: PropTypes.bool.isRequired,
    instruction: PropTypes.string.isRequired,
    handleEndQuiz: PropTypes.func.isRequired
}