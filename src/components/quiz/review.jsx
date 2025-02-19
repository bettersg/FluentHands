
import { arrayOf, string } from 'prop-types'
import styles from './review.module.css'
import { useEffect, useRef } from 'react'

export default function Review({letters}) {
    const reviewRef = useRef(null)
    const handleScroll = (e) => {
        e.preventDefault()
        reviewRef.current.scrollBy(e.deltaY, 0)
    }

    useEffect(() => {
        reviewRef.current.addEventListener('wheel', handleScroll)
    })

    return (
        <div className={styles.review}>
            <p className={styles.reviewText}>Review the alphabets you’ve missed</p>
            <div className={styles.letters} ref={reviewRef}>
                {letters.map((letter) => {
                    return (
                        <div key={letter} className={styles.letterContainer}>
                            <img className={styles.letterImg} src={`letters/${letter}.png`} alt={`${letter} sign picture`} />
                            <span>{letter}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

Review.propTypes = {
    letters: arrayOf(string)
}