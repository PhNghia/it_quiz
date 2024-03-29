import { useCallback, useState, useRef } from 'react'
import { useDatabase } from '../contexts/DatabaseContext'
import ModalConfirmAction from '../ModalConfirmAction/ModalConfirmAction'
import Button from '../Button'
import styles from './QuizesResults.module.css'

export default function List() {
  const { results, removeResult, profileUser } = useDatabase()
  const [show, setShow] = useState(false)
  const [result, setResult] = useState()

  const getClr = useCallback(item => {
    if (item.score >= 65) return 'var(--success)'
    if (item.score >= 35) return 'var(--warning)'
    return 'var(--danger)'
  }, [])

  function handleRemoveResult() {
    const timeRuning = 500
    const resultIsRemoved = document.querySelector(`article[data-timestamp='${result.timeStamp}']`)
    resultIsRemoved.animate([
      {
        height: resultIsRemoved.getBoundingClientRect().height + 'px',
        opacity: '1'
      },
      {
        height: '0px',
        opacity: '0'
      }
    ], {
      duration: timeRuning,
    })

    setTimeout(() => {
      removeResult(result.timeStamp)
    }, timeRuning - 0.0001)
  }

  return (
    <>
      <div className={styles['list']}>
        {results && results.map((item, index) => {
          const date = new Date(item.date)
          return (
            <article
              key={index}
              className={`${styles['article-result']}`}
              data-timestamp={item.timeStamp}
            >
              <div className='padding-0-15'>
                <span className={styles['remove-btn']} onClick={() => { setShow(true); setResult(item) }}><i className="fa-solid fa-xmark"></i></span>
                <h5>{`${profileUser.displayName.replaceAll(" ", "_")}-${item.name}`}</h5>
                <div className={styles['article-content']}>
                  <div className={styles['article-info']}>
                    <p>Date: <span>{`Ngày ${date.getDate()} Tháng ${date.getMonth() + 1} Năm ${date.getFullYear()}`}</span></p>
                    <p>Score: <span style={{ '--clr-score': getClr(item) }}>{item.score}%</span></p>
                    <p>Topic: <span>{item.topic}</span></p>
                  </div>
                  <div className={styles['article-grade']}>
                    <h6>Grade</h6>
                    <h2 style={{ '--clr-score': getClr(item) }}>{item.grade}</h2>
                    <p>During: <span>{item.duringFormat}</span></p>
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
                  link={item.timeStamp.toString()}
                />
              </div>
            </article>
          )
        })}
      </div>

      {show && <ModalConfirmAction setShow={setShow} callback={handleRemoveResult} result={result} />}
    </>
  )
}
