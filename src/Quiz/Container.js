import { useState, useEffect, useLayoutEffect, useContext } from 'react'
import { URL_QUIZ, API_KEY } from '../globalConstants'
import { QuizesContext, actions } from '../QuizesContext'
import ModalSubmitQuizes from '../ModalSubmitQuizes'
import QuizQuestions from './QuizQuestions'
import Button from '../Button'
import axios from 'axios'
import { v4 } from 'uuid'

export default function Container({ valueProp }) {
  const category = { ...valueProp }

  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [nameCurrentQuiz, setNameCurrentQuiz] = useState('')
  const [open, setOpen] = useState(false)

  const [state, dispatch] = useContext(QuizesContext)

  useEffect(() => {
    document.title = `IT Quiz - Random ${state.categoryQuiz.name} Quiz`

    setLoading(true)
    
    let cancel
    if (category.value === 'random') category.value = undefined

    axios.get(`${URL_QUIZ}?apiKey=${API_KEY}${category.value ? `&category=${category.value}` : ''}`, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
      .then(res => {
        setLoading(false)
        const name = `${state.typeQuiz}-${state.categoryQuiz.value}-${v4().slice(0, 6)}`
        if (!(state.typeQuiz && state.categoryQuiz.value)) {
          handleReload()
          return
        }
        setNameCurrentQuiz(name)
        setQuestions(prev => {
          return res.data.map(item => {

            let answers = [...Object.values(item.answers)].filter(ans => ans !== null)
            let correctAnswers = Object.values(item.correct_answers)
            let numberCorrectAnswers = correctAnswers.filter(ans => ans === 'true').length
            let selectedAnswers = answers.map(() => false)

            return {
              question: item.question,
              answers,
              correctAnswers,
              numberCorrectAnswers,
              selectedAnswers,
              correct: false
            }
          })
        })
      })
      .catch(err => {
        if (axios.isCancel(err)) return
      })

    return () => {
      cancel()
    }
  }, [])

  function handleReload() {
    const hrefOrigin = document.location.origin
    document.location.href = hrefOrigin
  }

  useLayoutEffect(() => {
    window.addEventListener('load', handleReload)

    return () => {
      window.removeEventListener('load', handleReload)
    }
  }, [])

  function handleSubmitAnswers(e) {
    setOpen(true)
    e.preventDefault()
  }

  function getResult() {
    let partCorrect = questions.filter(q => {
      for (let i = 0; i < q.answers.length; i++) {
        if (q.selectedAnswers[i].toString() !== q.correctAnswers[i]) return false
      }

      q.correct = true
      return true
    }).length

    const date = new Date().toDateString()
    const score = partCorrect / questions.length * 100
    const topic = state.categoryQuiz.name
    const grade = (() => {
      if (score >= 80) return 'A'
      if (score >= 65) return 'B'
      if (score >= 50) return 'C'
      if (score >= 35) return 'D'
      return 'F'
    })()

    const result = {
      name: nameCurrentQuiz,
      date: date.slice(date.indexOf(' ') + 1, date.length),
      totalQuestions: questions.length,
      correctAnswers: partCorrect,
      final: score >= 50 ? 'passed' : 'failed',
      score,
      grade,
      topic,
      questions
    }

    state.setValue(prev => [result, ...prev])
    state.setPage('results')

    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  if (loading) return <div className="ease-in-out-loading">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>

  return (
    <>
      <div className="pt-24 padding-0-15 pb-70">
        <header className="section-header">
          <h2>{category.name + ' Quiz'}</h2>
          <hr></hr>
        </header>
        <QuizQuestions questions={questions} />

        <div>
          <Button
            stylesProps={{
              content: "submit answers",
              isBackgroundClr: false,
              color: 'var(--green)',
              isFullWidth: true
            }}
            callback={handleSubmitAnswers}
            link={`/results/${nameCurrentQuiz}`}
          />
        </div>
      </div>

      {open && <ModalSubmitQuizes
        nameCurrentQuiz={nameCurrentQuiz}
        setOpen={setOpen}
        getResult={getResult}
      />}
    </>
  )
}
