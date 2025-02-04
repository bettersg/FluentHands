import React, { useState } from 'react'
import Header from "../components/header"
import LessonMenu from '../components/lesson/lessonMenu'
import LessonContent from '../components/lesson/lessonContent';
import LessonResult from '../components/lesson/lessonResult';
import { Routes, Route, useNavigate } from "react-router-dom";

export default function Lessons() {
  const navigate = useNavigate();
  const [lessonMode, setLessonMode] = useState('menu');

  return (
    <>
      <Header/>
      {lessonMode == 'menu' && <LessonMenu setMode={setLessonMode}/>}
      <Routes>
        <Route path="lessons/:letter" element={<LessonContent setMode={setLessonMode} />} />
      </Routes>
      {lessonMode == 'end' && <LessonResult setMode={setLessonMode}/>}
    </>
    )
}