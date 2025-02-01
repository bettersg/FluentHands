import React, { useState } from 'react'
import PropTypes from 'prop-types'
import LessonButton from './lessonButton'
import { useNavigate } from "react-router";

export default function LessonMenu({ setMode }) {

  const [done, setDone] = useState(
    Array.from({ length: 26 }, (_, index) => ({
      letter: String.fromCharCode(65 + index),
      value: false
    }))
  );

  const row1 = [0, 1, 2, 3, 4];
  const row2 = [5, 6, 7, 8, 9];
  const row3 = [10, 11, 12, 13, 14];
  const row4 = [15, 16, 17, 18, 19];
  const row5 = [20, 21, 22, 23, 24];
  const row6 = [25];

  const navigate = useNavigate();

  // idk how correct this is back button would help a lot to check
  // need to be called in lessonContent.jsx also
  const markLetterDone = (letter) => {
    const index = done.findIndex((item) => item.letter === letter);

    if(index !== -1) {
      setDone((letterSet) => {
        letterSet.map((item, currentIndex) => {
          currentIndex === index ? { ...item, value: true } : item
        })
      })
    }
  }

  function toggleNavigate(id) {
    const selectedLetter = done[id];
    if (selectedLetter) {
        setMode('lesson');
        navigate(`/lessons/${selectedLetter.letter}`);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', marginTop: '50px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <span style={{ color: '#00729C', fontSize: '45px', fontWeight: '600', marginBottom: '20px' }}>
          Learn the Alphabets
        </span>
      </div>

      {[row1, row2, row3, row4, row5, row6].map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', flexDirection: 'row', padding: '10px 57px' }}>
          {row.map((id) => (
            <LessonButton
              key={id}
              letter={done[id].letter}
              done={done[id].value}
              onClick={() => toggleNavigate(id)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

LessonMenu.propTypes = {
  setMode: PropTypes.func.isRequired
}