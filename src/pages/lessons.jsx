import React, { useState } from 'react'
import LessonButton from '../components/lessonButton'

export default function Lessons() {
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

  // const [doneA, setDoneA] = useState(false);
  // const [doneB, setDoneB] = useState(false);
  // const [doneC, setDoneC] = useState(false);
  // const [doneD, setDoneD] = useState(false);
  // const [doneE, setDoneE] = useState(false);
  // const [doneF, setDoneF] = useState(false);
  // const [doneG, setDoneG] = useState(false);
  // const [doneH, setDoneH] = useState(false);
  // const [doneI, setDoneI] = useState(false);
  // const [doneJ, setDoneJ] = useState(false);
  // const [doneK, setDoneK] = useState(false);
  // const [doneL, setDoneL] = useState(false);
  // const [doneM, setDoneM] = useState(false);
  // const [doneN, setDoneN] = useState(false);
  // const [doneO, setDoneO] = useState(false);
  // const [doneP, setDoneP] = useState(false);
  // const [doneQ, setDoneQ] = useState(false);
  // const [doneR, setDoneR] = useState(false);
  // const [doneS, setDoneS] = useState(false);
  // const [doneT, setDoneT] = useState(false);
  // const [doneU, setDoneU] = useState(false);
  // const [doneV, setDoneV] = useState(false);
  // const [doneW, setDoneW] = useState(false);
  // const [doneX, setDoneX] = useState(false);
  // const [doneY, setDoneY] = useState(false);
  // const [doneZ, setDoneZ] = useState(false);

  function toggleDone(id) {
    setDone((doneState) =>
      doneState.map((done) =>
        done.id === id
          ? {id: done.id, letter: done.letter, value: !done.value }
          : done
      ))
  }

  // function toggleDoneA() {
  //   setDoneA((doneState => !doneState));
  // }

  // function toggleDoneB() {
  //   setDoneB((doneState => !doneState));
  // }

  // function toggleDoneC() {
  //   setDoneC((doneState => !doneState));
  // }

  // function toggleDoneD() {
  //   setDoneD((doneState => !doneState));
  // }

  // function toggleDoneE() {
  //   setDoneE((doneState => !doneState));
  // }

  // function toggleDoneF() {
  //   setDoneF((doneState => !doneState));
  // }

  // function toggleDoneG() {
  //   setDoneG((doneState => !doneState));
  // }

  // function toggleDoneH() {
  //   setDoneH((doneState => !doneState));
  // }

  // function toggleDoneI() {
  //   setDoneI((doneState => !doneState));
  // }

  // function toggleDoneJ() {
  //   setDoneJ((doneState => !doneState));
  // }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', marginTop: '50px' }}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        <span style={{color: '#00729C', fontSize:'30px'}}>Learn the Alphabets</span>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', padding: '10px 57px'}}>
        {row1.map((id) => (
          <LessonButton
          key = {id}
          letter = {done[id].letter}
          done = {done[id].value}
          onClick = {() => toggleDone(id)}
          />
        ))}
      </div>
      <div style={{display: 'flex', flexDirection: 'row', padding: '10px 57px'}}>
        {row2.map((id) => (
          <LessonButton
          key = {id}
          letter = {done[id].letter}
          done = {done[id].value}
          onClick = {() => toggleDone(id)}
          />
        ))}
      </div>
      <div style={{display: 'flex', flexDirection: 'row', padding: '10px 57px'}}>
        {row3.map((id) => (
          <LessonButton
          key = {id}
          letter = {done[id].letter}
          done = {done[id].value}
          onClick = {() => toggleDone(id)}
          />
        ))}
      </div>
      <div style={{display: 'flex', flexDirection: 'row', padding: '10px 57px'}}>
        {row4.map((id) => (
          <LessonButton
          key = {id}
          letter = {done[id].letter}
          done = {done[id].value}
          onClick = {() => toggleDone(id)}
          />
        ))}
      </div>
      <div style={{display: 'flex', flexDirection: 'row', padding: '10px 57px'}}>
        {row5.map((id) => (
          <LessonButton
          key = {id}
          letter = {done[id].letter}
          done = {done[id].value}
          onClick = {() => toggleDone(id)}
          />
        ))}
      </div>
      <div style={{display: 'flex', flexDirection: 'row', padding: '10px 57px'}}>
        {row6.map((id) => (
          <LessonButton
          key = {id}
          letter = {done[id].letter}
          done = {done[id].value}
          onClick = {() => toggleDone(id)}
          />
        ))}
      </div>
    </div>
  );
}