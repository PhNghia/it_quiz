import { useEffect } from 'react'
import { actions } from '../contexts/QuizesContext'
import { useQuizesContext } from '../hooks'
import { useAuth } from '../contexts/AuthContext'
import Button from '../Button'

export default function TypeQuiz() {
  const { currentUser } = useAuth()
  const [state, dispatch] = useQuizesContext()

  useEffect(() => {
    document.title = 'IT Quiz - Select a Quiz'
  }, [])

  function callback () {
    dispatch(actions.setTypeQuiz('random_quiz'))

    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  return (
    <div className="padding-0-15">
      <div className='pt-24 type-quiz padding-0-15 pb-70'>
        <header className='section-header'>
          <h2>Choose your quiz</h2>
          <hr></hr>
        </header>


        <div className='space'></div>

        <div className='padding-15'>
          <div>
            <h3>Random Quiz</h3>
            <p className='lead'>In this section you will test your skills with a uniq quiz. Each time you take a quiz the questions will be different based on the topic you've selected.</p>
          </div>

          <hr></hr>

          <div>
            <h3>Info</h3>
            <p className='lead'>You get at least
              <strong>
                <code> 300 awesome free </code>
              </strong>
              quizzes each month. Be careful and try your best as we will launch a leaderboard soon!</p>
          </div>
        </div>

        <Button
          stylesProps={{
            content: 'random quiz',
            isBackgroundClr: false,
            color: 'var(--purple)',
            isFullWidth: true
          }}
          callback={callback}
          link={currentUser ? '/random_quiz' : '/login'}
        />
      </div>
    </div>
  )
}
