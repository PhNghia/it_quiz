import React from 'react'
import styles from './QuizResult.module.css'

export default function QuizResultQuestion({ resultQuestion, index }) {
    return (
        <div className={styles['question-contain']}>
            <div>
                <h6>Question {index + 1}</h6>
                <p><span>Question : </span>{resultQuestion.question}</p>
            </div>
            <div className={styles['question-results']}>
                <div>
                    <h6>Given Answers</h6>
                    <ul className={styles['list-results']}>
                        {resultQuestion.answers.map((answer, index) => (
                            <li key={index}>
                                <span style={{ '--clr-answer': (resultQuestion.selectedAnswers[index]).toString() === "true" ? 'var(--success)' : 'var(--danger)' }}>{resultQuestion.selectedAnswers[index] ? <i className="fa-solid fa-circle-check"></i> : <i className="fa-solid fa-circle-xmark"></i> }</span>
                                {answer}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h6>Correct Answers</h6>
                    <ul className={styles['list-results']}>
                        {resultQuestion.answers.map((answer, index) => (
                            <li key={index}>
                                <span style={{ '--clr-answer': resultQuestion.correctAnswers[index] === 'true' ? 'var(--success)' : 'var(--danger)' }}>{resultQuestion.correctAnswers[index] === 'true' ? <i className="fa-solid fa-circle-check"></i> : <i className="fa-solid fa-circle-xmark"></i> }</span>
                                {answer}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <h6 style={{ '--clr-correct': resultQuestion.correct ? 'var(--success)' : 'var(--danger)' }}>{resultQuestion.correct ? 'correct' : 'wrong'}</h6>
        </div>
    )
}
