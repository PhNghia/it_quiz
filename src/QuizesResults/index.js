import { useEffect } from 'react'
import List from './List'
import styles from './QuizesResults.module.css'

export default function QuizesResults() {

  useEffect(() => {
    document.title = 'IT Quiz - Results'
  }, [])

  return (
    <div className='pt-24 padding-0-15 pb-70'>
      <header className='section-header'>
        <h2>Results</h2>
        <hr></hr>
        <p className={styles['sub-heading-results']}>View your results</p>
      </header>
      <List />
    </div>
  )
}
