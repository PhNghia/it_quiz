import './App.css';
import { useState, useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useDatabase } from './contexts/DatabaseContext'
import { useAuth } from './contexts/AuthContext'
import Login from './FormLinkAccount/Login'
import Register from './FormLinkAccount/Register'
import Home from './Home'
import { CategoryQuiz, TypeQuiz } from './Quizes'
import Quiz from './Quiz'
import QuizesResults from './QuizesResults'
import QuizResult from './QuizResult'
import Ranks from './Ranks/Ranks'
import Rank from './Ranks/Rank'
import Profile from './Profile/Profile'
import ScrollTopButton from './ScrollTopButton'
import { CATEGORIES } from './globalConstants'
import Loading from './Loading/Loading'


function App() {
  const { currentUser } = useAuth()
  const { results, ranks, profileUser } = useDatabase()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!currentUser) {
      if (ranks) setLoading(false)
      return
    }
    if (results && profileUser) {
      setLoading(false)
      return
    }
    setLoading(true)
  }, [ranks, results, profileUser])

  useEffect(() => {
    if (currentUser) setLoading(true)
  }, currentUser)


  if (loading) return <div className="container-loading-app"><Loading /></div>

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<TypeQuiz />} />
            <Route path="random_quiz" element={<CategoryQuiz />} />
            {CATEGORIES.map(category => <Route key={category.value} path={`random_quiz/${category.value}`} element={<Quiz value={category} />} />)}
            <Route path="results" element={<QuizesResults />} />
            {results && results.map(result => <Route key={result.name} path={`results/${result.timeStamp}`} element={<QuizResult result={result} />} />)}
            <Route path="ranks" element={<Ranks />} />
            {CATEGORIES.map(category => <Route key={category.name} path={`ranks/${category.value}`} element={<Rank category={category} />} />)}
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <ScrollTopButton />
      </HashRouter>
    </>
  );
}

export default App;
