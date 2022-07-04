import './App.css';
import { useState, useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom';
import Quizes, { CategoryQuiz, TypeQuiz } from './Quizes'
import Quiz from './Quiz'
import QuizesResults from './QuizesResults'
import QuizResult from './QuizResult'
import ScrollTopButton from './ScrollTopButton'
import { CATEGORIES } from './globalConstants'
import { useLocalStorage, useQuizesContext } from './hooks'
import { actions } from './QuizesContext'


function App() {
  const [state, dispatch] = useQuizesContext()

  const [value, setValue] = useLocalStorage('quizesResults', [])

  useEffect(() => {
    dispatch(actions.resetValue(setValue))
  }, [])

  useEffect(() => {
    dispatch(actions.updateValue(value))
  }, [value])

  return (
    <>
      <HashRouter>
        <div className="container">
          <header className="header"></header>
          <main className="main-container">
            <div className="container-quizes bg-light">
              <Routes>
                <Route path="/" element={<Quizes />}>
                  <Route index element={<TypeQuiz />} />
                  <Route path="/random_quiz" element={<CategoryQuiz />} />
                  {CATEGORIES.map(category => <Route key={category.value} path={`random_quiz/${category.value}`} element={<Quiz value={category} />} />)}
                  <Route path="/results" element={<QuizesResults />} />
                  {value.map(result => <Route key={result.name} path={`results/${result.name}`} element={<QuizResult result={result} />} />)}
                </Route>
              </Routes>
            </div>
          </main>
          <ScrollTopButton />
        </div>
      </HashRouter>
    </>
  );
}

export default App;
