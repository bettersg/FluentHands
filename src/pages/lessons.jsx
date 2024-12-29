import React, { useState } from 'react'
import LessonButton from '../components/lessonButton'

export default function Lessons() {
  const [doneA, setDoneA] = useState(false);
  const [doneB, setDoneB] = useState(false);
  const [doneC, setDoneC] = useState(false);
  const [doneD, setDoneD] = useState(false);
  const [doneE, setDoneE] = useState(false);
  const [doneF, setDoneF] = useState(false);
  const [doneG, setDoneG] = useState(false);
  const [doneH, setDoneH] = useState(false);
  const [doneI, setDoneI] = useState(false);
  const [doneJ, setDoneJ] = useState(false);
  const [doneK, setDoneK] = useState(false);
  const [doneL, setDoneL] = useState(false);
  const [doneM, setDoneM] = useState(false);
  const [doneN, setDoneN] = useState(false);
  const [doneO, setDoneO] = useState(false);
  const [doneP, setDoneP] = useState(false);
  const [doneQ, setDoneQ] = useState(false);
  const [doneR, setDoneR] = useState(false);
  const [doneS, setDoneS] = useState(false);
  const [doneT, setDoneT] = useState(false);
  const [doneU, setDoneU] = useState(false);
  const [doneV, setDoneV] = useState(false);
  const [doneW, setDoneW] = useState(false);
  const [doneX, setDoneX] = useState(false);
  const [doneY, setDoneY] = useState(false);
  const [doneZ, setDoneZ] = useState(false);

  function toggleDoneA() {
    setDoneA((doneState => !doneState));
  }

  function toggleDoneB() {
    setDoneB((doneState => !doneState));
  }

  function toggleDoneC() {
    setDoneC((doneState => !doneState));
  }

  function toggleDoneD() {
    setDoneD((doneState => !doneState));
  }

  function toggleDoneE() {
    setDoneE((doneState => !doneState));
  }

  function toggleDoneF() {
    setDoneF((doneState => !doneState));
  }

  function toggleDoneG() {
    setDoneG((doneState => !doneState));
  }

  function toggleDoneH() {
    setDoneH((doneState => !doneState));
  }

  function toggleDoneI() {
    setDoneI((doneState => !doneState));
  }

  function toggleDoneJ() {
    setDoneJ((doneState => !doneState));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', marginTop: '50px' }}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        <span style={{color: '#00729C', fontSize:'45px'}}>Learn the Alphabets</span>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', padding: '25px 57px'}}>
        <LessonButton
        letter = 'A'
        done = {doneA}
        onClick={toggleDoneA}
        />
        <LessonButton
        letter = 'B'
        done = {doneB}
        onClick={toggleDoneB}
        />
        <LessonButton
        letter = 'C'
        done = {doneC}
        onClick={toggleDoneC}
        />
        <LessonButton
        letter = 'D'
        done = {doneD}
        onClick={toggleDoneD}
        />
        <LessonButton
        letter = 'E'
        done = {doneE}
        onClick={toggleDoneE}
        />
      </div>
      <div style={{display: 'flex', flexDirection: 'row', padding: '25px 57px'}}>
        <LessonButton
        letter = 'F'
        done = {doneF}
        onClick={toggleDoneF}
        />
        <LessonButton
        letter = 'G'
        done = {doneG}
        onClick={toggleDoneG}
        />
        <LessonButton
        letter = 'H'
        done = {doneH}
        onClick={toggleDoneH}
        />
        <LessonButton
        letter = 'I'
        done = {doneI}
        onClick={toggleDoneI}
        />
        <LessonButton
        letter = 'J'
        done = {doneJ}
        onClick={toggleDoneJ}
        />
      </div>
      <div style={{display: 'flex', flexDirection: 'row', padding: '25px 57px'}}>
        <LessonButton
        letter = 'A'
        done = {doneA}
        onClick={toggleDoneA}
        />
        <LessonButton
        letter = 'B'
        done = {doneB}
        onClick={toggleDoneB}
        />
        <LessonButton
        letter = 'C'
        done = {doneC}
        onClick={toggleDoneC}
        />
        <LessonButton
        letter = 'D'
        done = {doneD}
        onClick={toggleDoneD}
        />
        <LessonButton
        letter = 'E'
        done = {doneE}
        onClick={toggleDoneE}
        />
      </div>
      <div style={{display: 'flex', flexDirection: 'row', padding: '25px 57px'}}>
        <LessonButton
        letter = 'A'
        done = {doneA}
        onClick={toggleDoneA}
        />
        <LessonButton
        letter = 'B'
        done = {doneB}
        onClick={toggleDoneB}
        />
        <LessonButton
        letter = 'C'
        done = {doneC}
        onClick={toggleDoneC}
        />
        <LessonButton
        letter = 'D'
        done = {doneD}
        onClick={toggleDoneD}
        />
        <LessonButton
        letter = 'E'
        done = {doneE}
        onClick={toggleDoneE}
        />
      </div>
      <div style={{display: 'flex', flexDirection: 'row', padding: '25px 57px'}}>
        <LessonButton
        letter = 'A'
        done = {doneA}
        onClick={toggleDoneA}
        />
        <LessonButton
        letter = 'B'
        done = {doneB}
        onClick={toggleDoneB}
        />
        <LessonButton
        letter = 'C'
        done = {doneC}
        onClick={toggleDoneC}
        />
        <LessonButton
        letter = 'D'
        done = {doneD}
        onClick={toggleDoneD}
        />
        <LessonButton
        letter = 'E'
        done = {doneE}
        onClick={toggleDoneE}
        />
      </div>
    </div>
  );
}