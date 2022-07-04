import { useState, useEffect } from 'react'
import styles from './Quiz.module.css'
import Button from '../Button'
import Seperate from '../Seperate'

export default function QuizQuestions({ questions }) {

    /** question => {
         *  question,
         *  answers,
         *  correctAnswers,
         *  numberCorrectAnswers,
         *  selectedAnswers
     * }*/

    // stt question
    const [number, setNumber] = useState(0)
    const [prevNumber, setPrevNumber] = useState(-1)
    const [nextNumber, setNextNumber] = useState(1)
    const [currentQuestion, setCurrentQuestion] = useState(questions[number])

    function handleChangeQuestion(number) {
        setNumber(number)
    }

    function handlePrevQuestion() {
        setNumber(number - 1)
    }

    function handleNextQuestion() {
        setNumber(number + 1)
    }

    function handleSelectedAnswer(index) {
        switch (currentQuestion.numberCorrectAnswers) {
            case 1:
                questions[number] = {
                    ...currentQuestion,
                    selectedAnswers: currentQuestion.selectedAnswers.map((ans, i) => i === index ? true : false)
                }
                setCurrentQuestion(questions[number])
                return
            default:
                let selectedAnswersLength = currentQuestion.selectedAnswers.filter(ans => ans).length
                if (selectedAnswersLength === currentQuestion.numberCorrectAnswers) {
                    if (currentQuestion.selectedAnswers[index] === false) return
                }

                questions[number] = {
                    ...currentQuestion,
                    selectedAnswers: currentQuestion.selectedAnswers.map((ans, i) => i === index ? !ans : ans)
                }
                setCurrentQuestion(questions[number])
        }
    }

    useEffect(() => {
        setCurrentQuestion(questions[number])
        setPrevNumber(number - 1)
        setNextNumber(number + 1)
    }, [number])

    return (
        <>
            <div className={styles['container-questions']}>
                <div className={styles.questions}>
                    {questions.map((q, index) => (
                        <div key={index} className='padding-15'>
                            <button
                                className={`
                                ${styles['question-btn']} 
                                ${index === number ? styles['current-question'] : ''}
                                ${q.selectedAnswers.filter(answer => answer).length === q.numberCorrectAnswers ?
                                        styles['answered-question'] :
                                        ''
                                    }
                            `}
                                onClick={() => handleChangeQuestion(index)}
                            >
                                question
                                <span> {index + 1}</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className='mt-48'>
                <Seperate content={`Question ${number + 1}`} isFullWidth />
            </div>

            <p className={styles['number-correct-answers']}>Correct Answers: <span>{currentQuestion.numberCorrectAnswers}/{currentQuestion.answers.length}</span></p>

            <div>
                {currentQuestion && <h4 className="lead">{currentQuestion.question}</h4>}
                <div className={styles['form-answers']}>
                    {currentQuestion.answers.map((answer, index) => (
                        <div key={index} className={styles.answer}>
                            <input
                                type="checkbox"
                                checked={currentQuestion.selectedAnswers[index]}
                                className={currentQuestion.selectedAnswers[index] ? styles['checked-answer'] : undefined}
                                onChange={() => handleSelectedAnswer(index)}
                            />
                            <span>{answer}</span>
                        </div>
                    ))}
                </div>
            </div>

            <hr></hr>

            <div className={styles['convert-question-btn']}>
                {
                    prevNumber > -1 &&
                    <Button
                        stylesProps={{
                            content: "previous question",
                            color: 'var(--purple)',
                            isFullWidth: false,
                            isBackgroundClr: false
                        }}
                        callback={handlePrevQuestion}
                    />
                }

                {
                    nextNumber < questions.length &&
                    <Button
                        stylesProps={{
                            content: "next question",
                            color: 'var(--purple)',
                            isFullWidth: false,
                            isBackgroundClr: false
                        }}
                        callback={handleNextQuestion}
                    />
                }
            </div>

            <div className='margin-32-0'>
                <Seperate content='Finish Quiz' isFullWidth />
            </div>
        </>
    )
}
