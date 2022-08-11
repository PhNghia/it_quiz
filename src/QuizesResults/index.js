import { useEffect } from 'react'
import List from './List'
import { useDatabase } from '../contexts/DatabaseContext'
import EmptyList from '../EmptyList/EmptyList'
import styles from './QuizesResults.module.css'

export default function QuizesResults() {

  const { results } = useDatabase()

  useEffect(() => {
    document.title = 'IT Quiz - Results'
  }, [])

  return (
    <div className='pt-24 padding-0-15 pb-70'>
      <header className='section-header'>
        <h2>Results</h2>
        <hr></hr>
        {results && results.length > 0 && <p className={styles['sub-heading-results']}>View your results</p>}
        {(!results || results.length == 0) && <EmptyList />} 
      </header>

      

      {results && results.length > 0 && <List />}
    </div>
  )
}
