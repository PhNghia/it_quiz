import React, { useEffect } from 'react'
import CategoriesQuiz from '../CategoriesQuiz/CategoriesQuiz'
import styles from './Ranks.module.css'

export default function Ranks() {

    useEffect(() => {
        document.title = 'IT Quiz - Ranks'
    }, [])

    return (
        <div className="padding-0-15">
            <div className='pt-24 padding-0-15 category-quiz'>
                <header className='section-header'>
                    <h2>Ranks</h2>
                    <hr></hr>
                    <p className={styles['sub-heading-results']}>View your ranks</p>
                </header>

                <CategoriesQuiz />
            </div>
        </div>
    )
}
