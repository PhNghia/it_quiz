import { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDatabase } from '../contexts/DatabaseContext'
import { URL_QUIZ, API_KEY } from '../globalConstants'
import { QuizesContext, actions } from '../contexts/QuizesContext'
import ModalSubmitQuizes from '../ModalSubmitQuizes'
import QuizQuestions from './QuizQuestions'
import Button from '../Button'
import Loading from '../Loading/Loading'
import axios from 'axios'
import { v4 } from 'uuid'
import style from './Quiz.module.css'

export default function Container({ valueProp }) {
  const startTime = useRef(null)
  const category = { ...valueProp }
  const { profileUser, addNewResult, ranks, updateRankWithNewResult } = useDatabase()

  const [questions, setQuestions] = useState(null)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const nameCurrentQuiz = useRef()

  const [state, dispatch] = useContext(QuizesContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (profileUser.email === "vann.nghia0914@gmail.com" && questions) getResult()
  }, [questions])

  useEffect(() => {
    document.title = `IT Quiz - Random ${state.categoryQuiz.name} Quiz`

    setLoading(true)

    let cancel

    axios.get(`${URL_QUIZ}?apiKey=${API_KEY}&category=${category.value}`, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
      .then(res => {
        setLoading(false)
        nameCurrentQuiz.current = `random_quiz-${state.categoryQuiz.value}-${v4().slice(0, 6)}`

        startTime.current = new Date()
        setQuestions(() => {
          const questions = res.data.map(item => {

            let answers = [...Object.values(item.answers)].filter(ans => ans !== null)
            let correctAnswers = Object.values(item.correct_answers)
            let numberCorrectAnswers = correctAnswers.filter(ans => ans === 'true').length
            let selectedAnswers = answers.map(() => false)

            if (profileUser.email === "vann.nghia0914@gmail.com") {
              selectedAnswers = correctAnswers
            }

            return {
              question: item.question,
              answers,
              correctAnswers,
              numberCorrectAnswers,
              selectedAnswers,
              correct: false
            }
          })
          return questions
        })
      })
      .catch(err => {
        if (axios.isCancel(err)) return
      })

    return () => {
      cancel()
    }
  }, [])

  function getResult() {
    let partCorrect = questions.filter(q => {
      for (let i = 0; i < q.answers.length; i++) {
        if (q.selectedAnswers[i].toString() !== q.correctAnswers[i]) return false
      }

      q.correct = true
      return true
    }).length

    const date = new Date()
    const score = ((partCorrect / questions.length) * 100).toFixed(0)
    const topic = category.name
    const grade = (() => {
      if (score >= 80) return 'A'
      if (score >= 65) return 'B'
      if (score >= 50) return 'C'
      if (score >= 35) return 'D'
      return 'F'
    })()
    const duringFormat = (() => {
      // 1 hour = 60 * 60 * 1000 miliseconds = 3.600.00 ms
      const during = date.getTime() - startTime.current.getTime()
      const hours = (during / 3600000).toFixed(0)
      const minutes = ((during % 3600000) / 60000).toFixed(0)
      const seconds = (((during % 3600000) % 60000) / 1000).toFixed(0)
      const miliseconds = (((during % 3600000) % 60000) % 1000)
      return `${hours >= 10 ? hours : `0${hours}`}:${minutes >= 10 ? minutes : `0${minutes}`}:${seconds >= 10 ? seconds : `0${seconds}`}:${miliseconds !== 0 ? miliseconds : "0000"}`
    })()

    const result = {
      currentUser: { ...profileUser },
      category,
      name: nameCurrentQuiz.current,
      date: date.toString(),
      timeStamp: date.getTime(),
      totalQuestions: questions.length,
      correctAnswers: partCorrect,
      final: score >= 50 ? 'passed' : 'failed',
      score,
      grade,
      topic,
      questions,
      duringMiliseconds: date.getTime() - startTime.current.getTime(),
      duringFormat
    }

    addNewResult(result)
    handleChangeRank(result)

    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0

    state.setPage("results")

    navigate(`/results/${result.timeStamp}`)
  }

  function handleChangeRank(result) {
    if (result.score < 50) return
    const valueOfCategory = result.category.value
    if (ranks && ranks[valueOfCategory] && ranks[valueOfCategory][profileUser.uid]) {
      const currentBestResult = ranks[valueOfCategory][profileUser.uid]
      if (result.score < currentBestResult.score) return
      if (result.score > currentBestResult.score) {
        updateRankWithNewResult(result)
        return
      }
      if (result.duringMiliseconds < currentBestResult.duringMiliseconds) {
        updateRankWithNewResult(result)
      }
    } else {
      updateRankWithNewResult(result)
    }
  }

  if (loading) return (
    <div className={style['loading-container']}>
        <Loading />
    </div>
  )

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
            callback={() => setOpen(true)}
          />
        </div>
      </div>

      {open && <ModalSubmitQuizes
        setOpen={setOpen}
        getResult={getResult}
      />}
    </>
  )
}
