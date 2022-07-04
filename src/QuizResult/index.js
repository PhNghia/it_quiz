import React, { useCallback,  useEffect } from 'react'
import QuizResultQuestion from './QuizResultQuestion'
import Seperate from '../Seperate'
import styles from './QuizResult.module.css'

export default function QuizResult({ result }) {

    useEffect(() => {   
        document.title = 'IT Quiz - Quiz Result'
    }, [])

    const getClr = useCallback(() => {
        if (result.score >= 65) return 'var(--success)'
        if (result.score >= 35) return 'var(--warning)'
        return 'var(--danger)'
    }, [])

    return (
        <div className={`${styles['container']} padding-0-15 pt-24 pb-70`}>
            <header className="section-header">
                <h4>Quiz : {result.name}</h4>
            </header>

            <Seperate content="Quiz Information" isFullWidth styles={{ marginTop: '1.85rem', marginBottom: '1.85rem' }} />

            <div className={styles['quiz-result']}>
                <div className={styles['quiz-result-score']}>
                    <p>Score: <span style={{ color: getClr() }}>{result.score}%</span></p>
                    <p>Total questions: {result.totalQuestions}</p>
                    <p>Correct answers: {result.correctAnswers}</p>
                </div>
                <div className={styles['quiz-result-grade']}>
                    <p>Topic: <span>{result.topic}</span></p>
                    <p>Grade: <span style={{ '--clr-grade': getClr() }}>{result.grade}</span></p>
                    <p>Final: <span style={ result.score >= 50 ? { '--clr-final': 'var(--success)'} : { '--clr-final': 'var(--danger)' } }>{result.final}</span></p>
                </div>
            </div>

            <div className={styles['process-bar-result']}>
                <div className={styles['process-range']} style={{ '--range': `${result.score}%`, '--clr-process': getClr() }}></div>
            </div>

            <Seperate content="Answers" isFullWidth styles={{ marginTop: '1.85rem', marginBottom: '1.85rem' }} />

            {result.questions.map((q, index) => (
                <div key={index}>
                    <QuizResultQuestion resultQuestion={q} index={index} />
                    <hr></hr>
                </div>
            ))}
        </div>
    )
}