import { useState } from 'react'
import Header from "../components/header"
import LessonMenu from '../components/lesson/lessonMenu'
import LessonContent from '../components/lesson/lessonContent';
import LessonResult from '../components/lesson/lessonResult';
import { Routes, Route } from "react-router";

export default function Lessons() {
  const [lessonMode, setLessonMode] = useState('menu');

  return (
    <>
      <Header/>
      {lessonMode == 'menu' && <LessonMenu setMode={setLessonMode}/>}
      <Routes>
        <Route path=":letter" element={<LessonContent mode={lessonMode} setMode={setLessonMode} />} />
      </Routes>
      {lessonMode == 'end' && <LessonResult/>}
    </>
    )
}