import React from 'react'
import CategoriesQuiz from '../CategoriesQuiz/CategoriesQuiz'

export default function CategoryQuiz() {
    return (
        <div className="padding-0-15">
            <div className='pt-24 padding-0-15 category-quiz'>
                <header className='section-header'>
                    <h2>Choose your category</h2>
                    <hr></hr>
                </header>

                <CategoriesQuiz />
            </div>
        </div>
    )
}
