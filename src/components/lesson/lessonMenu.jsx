import React, { useState } from 'react'
import PropTypes from 'prop-types'
import LessonButton from './lessonButton'
import { useNavigate } from "react-router";

export default function LessonMenu({setMode}) {

  const [done, setDone] = useState([
    {id: 0, letter: 'A', value: false},
    {id: 1, letter: 'B', value: false},
    {id: 2, letter: 'C', value: false},
    {id: 3, letter: 'D', value: false},
    {id: 4, letter: 'E', value: false},
    {id: 5, letter: 'F', value: false},
    {id: 6, letter: 'G', value: false},
    {id: 7, letter: 'H', value: false},
    {id: 8, letter: 'I', value: false},
    {id: 9, letter: 'J', value: false},
    {id: 10, letter: 'K', value: false},
    {id: 11, letter: 'L', value: false},
    {id: 12, letter: 'M', value: false},
    {id: 13, letter: 'N', value: false},
    {id: 14, letter: 'O', value: false},
    {id: 15, letter: 'P', value: false},
    {id: 16, letter: 'Q', value: false},
    {id: 17, letter: 'R', value: false},
    {id: 18, letter: 'S', value: false},
    {id: 19, letter: 'T', value: false},
    {id: 20, letter: 'U', value: false},
    {id: 21, letter: 'V', value: false},
    {id: 22, letter: 'W', value: false},
    {id: 23, letter: 'X', value: false},
    {id: 24, letter: 'Y', value: false},
    {id: 25, letter: 'Z', value: false},
  ]);

  const row1 = [0, 1, 2, 3, 4];
  const row2 = [5, 6, 7, 8, 9];
  const row3 = [10, 11, 12, 13, 14];
  const row4 = [15, 16, 17, 18, 19];
  const row5 = [20, 21, 22, 23, 24];
  const row6 = [25];

  const navigate = useNavigate();

  function toggleNavigate(id) {
    const selectedLesson = done.find((item) => item.id === id);
    if(selectedLesson) {
        setMode('lesson');
        navigate(`/lessons/${selectedLesson.letter}`);
    }
    // if (selectedLesson) {
    //   setDone((doneState) =>
    //     doneState.map((item) =>
    //       item.id === id ? { ...item, value: !item.value } : item
    //     )
    //   );
    // }
  }

  return (
    
    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', marginTop: '50px' }}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        <span style={{color: '#00729C', fontSize:'30px', textDecoration: 'underline', textUnderlineOffset: '4px', marginBottom:'20px'}}>Learn the Alphabets</span>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', padding: '10px 57px'}}>
        {row1.map((id) => (
          <LessonButton
          key = {id}
          letter = {done[id].letter}
          done = {done[id].value}
          onClick = {() => toggleNavigate(id)}
          />
        ))}
      </div>
      <div style={{display: 'flex', flexDirection: 'row', padding: '10px 57px'}}>
        {row2.map((id) => (
          <LessonButton
          key = {id}
          letter = {done[id].letter}
          done = {done[id].value}
          onClick = {() => toggleNavigate(id)}
          />
        ))}
      </div>
      <div style={{display: 'flex', flexDirection: 'row', padding: '10px 57px'}}>
        {row3.map((id) => (
          <LessonButton
          key = {id}
          letter = {done[id].letter}
          done = {done[id].value}
          onClick = {() => toggleNavigate(id)}
          />
        ))}
      </div>
      <div style={{display: 'flex', flexDirection: 'row', padding: '10px 57px'}}>
        {row4.map((id) => (
          <LessonButton
          key = {id}
          letter = {done[id].letter}
          done = {done[id].value}
          onClick = {() => toggleNavigate(id)}
          />
        ))}
      </div>
      <div style={{display: 'flex', flexDirection: 'row', padding: '10px 57px'}}>
        {row5.map((id) => (
          <LessonButton
          key = {id}
          letter = {done[id].letter}
          done = {done[id].value}
          onClick = {() => toggleNavigate(id)}
          />
        ))}
      </div>
      <div style={{display: 'flex', flexDirection: 'row', padding: '10px 57px'}}>
        {row6.map((id) => (
          <LessonButton
          key = {id}
          letter = {done[id].letter}
          done = {done[id].value}
          onClick = {() => toggleNavigate(id)}
          />
        ))}
      </div>
    </div>
  );
}

LessonMenu.propTypes = {
    setMode: PropTypes.func.isRequired
}