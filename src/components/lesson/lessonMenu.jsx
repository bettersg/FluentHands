import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import LessonButton from './lessonButton'
import { useNavigate } from "react-router";
import styles from './lessonMenu.module.css';

const STORAGE_KEY = 'fluentHands';
const STORAGE_VERSION = '1.0';

const defaultDone = {
  version: STORAGE_VERSION,
  data: {
    'A': false, 'B': false, 'C': false, 'D': false, 'E': false, 'F': false, 'G': false, 'H': false, 
    'I': false, 'J': false, 'K': false, 'L': false, 'M': false, 'N': false, 'O': false, 'P': false, 
    'Q': false, 'R': false, 'S': false, 'T': false, 'U': false, 'V': false, 'W': false, 'X': false, 
    'Y': false, 'Z': false
  }
};

export default function LessonMenu({ setMode }) {
  const [done, setDone] = useState(defaultDone.data);
  const navigate = useNavigate();

  useEffect(() => {
    let storedData = localStorage.getItem(STORAGE_KEY);

    if (storedData) {
      try {
        let parsedData = JSON.parse(storedData);
        if (!parsedData.version || parsedData.version !== STORAGE_VERSION) {
          console.warn(`Outdated storage version. Resetting...`);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultDone));
          setDone(defaultDone.data);
        } else {
          setDone(parsedData.data);
        }
      } catch (error) {
        console.error("Corrupt storage data. Resetting...", error);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultDone));
        setDone(defaultDone.data);
      }
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultDone));
    }
  }, []);

  // useEffect(() => {
  //   // Write the done state back to localStorage whenever it changes (just for restarting purpose!)
  //   window.localStorage.setItem('fluentHands', JSON.stringify(done));
  // }, [done]);

  function toggleNavigate(letter) {
    setMode('lesson');
    navigate(`/lessons/${letter}`);
  }

  return (
    <div className={styles.firstLayer}>
      <div className={styles.secLayer}>
        <span className={styles.heading}>Learn the Alphabets</span>
      </div>
      <div className={styles.secLayer}>
        <div className={styles.thirdLayer}>
          {Object.keys(done).map((letter) => {
            return <LessonButton key={letter} letter={letter} done={done[letter]} onClick={() => toggleNavigate(letter)}/>
          })}
        </div>
      </div>
    </div>
  );
}

LessonMenu.propTypes = {
  setMode: PropTypes.func.isRequired
}