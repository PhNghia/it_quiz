import { useCallback } from 'react'
import Button from '../Button'
import { useQuizesContext } from '../hooks'
import styles from './QuizesResults.module.css'

export default function List() {

  const [state, dispatch] = useQuizesContext()

  const getClr = useCallback(item => {
    if (item.score >= 65) return 'var(--success)'
    if (item.score >= 35) return 'var(--warning)'
    return 'var(--danger)'
  }, [])

  return (
    <div className={styles['list']}>
      {state.value.map((item, index) => {
        return (
          <article key={index} className={`${styles['article-result']} padding-0-15`}>
            <h5>{item.name}</h5>
            <div className={styles['article-content']}>
              <div className={styles['article-info']}>
                <p>Date: <span>{item.date}</span></p>
                <p>Score: <span style={{ '--clr-score': getClr(item) }}>{item.score}%</span></p>
                <p>Topic: <span>{item.topic}</span></p>
              </div>
              <div className={styles['article-grade']}>
                <h6>Grade</h6>
                <h2 style={{ '--clr-score': getClr(item) }}>{item.grade}</h2>
              </div>
            </div>
            <Button
              stylesProps={{
                content: "show results",
                color: 'var(--purple)',
                isFullWidth: false,
                isBackgroundClr: false
              }}
              callback={() => { document.body.scrollTop = 0; document.documentElement.scrollTop = 0 }}
              link={item.name}
            />
          </article>
        )
      })}
    </div>
  )
}
