import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import LessonButton from './lessonButton'
import { useNavigate } from "react-router";
import styles from './lessonMenu.module.css';

const defaultDone = {
  'A': false,
  'B': false,
  'C': false,
  'D': false,
  'E': false,
  'F': false,
  'G': false,
  'H': false,
  'I': false,
  'J': false,
  'K': false,
  'L': false,
  'M': false,
  'N': false,
  'O': false,
  'P': false,
  'Q': false,
  'R': false,
  'S': false,
  'T': false,
  'U': false,
  'V': false,
  'W': false,
  'X': false,
  'Y': false,
  'Z': false,
}

export default function LessonMenu({ setMode }) {
  const [done, setDone] = useState(defaultDone);

  const navigate = useNavigate();

  useEffect(() => {
    let doneStr = window.localStorage.getItem('fluentHands')
    if (doneStr) {
      let doneObj = JSON.parse(window.localStorage.getItem('fluentHands'))
      setDone(doneObj)
    }
  }, []);

  function toggleNavigate(letter) {
    setMode('lesson');
    navigate(`/lessons/${letter}`);
  }

  return (
    <div className={styles.lessonMenu}>
        <span className={styles.heading}>Learn the Alphabets</span>
        <div className={styles.lessonButtons}>
          {Object.keys(done).map((letter) => {
            return <LessonButton key={letter} letter={letter} done={done[letter]} onClick={() => toggleNavigate(letter)}/>
          })}
        </div>
    </div>
  );
}

LessonMenu.propTypes = {
  setMode: PropTypes.func.isRequired
}