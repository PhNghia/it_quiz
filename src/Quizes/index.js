import { useRef, useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import CategoryQuiz from './CategoryQuiz'
import TypeQuiz from './TypeQuiz'
import { useQuizesContext } from '../hooks'
import { actions } from '../QuizesContext'

export { CategoryQuiz, TypeQuiz }

export default function Quizes() {

    const ulRef = useRef()

    const [page, setPage] = useState(() => {
        const hrefBrowser = document.location.href
        if (hrefBrowser.includes('result')) return 'results'
        return 'takeQuiz'
    })

    const [state, dispatch] = useQuizesContext()

    function handleChangeSection(e) {
        if (e.target.matches('a')) {
            setPage(e.target.dataset.value)
        }
    }

    useEffect(() => {
        dispatch(actions['setPage'](setPage))
    }, [])

    return (
        <>
            <div className="quizes-sidebar shadow-5 bg-light padding-0-15">
                <div>
                    <h3 className="padding-8-0">Quizes</h3>
                    {/* <span>Arrow down</span> */}
                </div>
                <ul
                    ref={ulRef}
                    onClick={handleChangeSection}
                >
                    <li>
                        <Link
                            to="/"
                            className={page === 'takeQuiz' ? 'quizes-active' : ''}
                            data-value='takeQuiz'
                        >
                            <i 
                                className="fa-regular fa-circle-question"
                                style={{ marginRight: '0.1rem', display: 'inline-block', width: '20px', textAlign: 'left'}}
                            ></i>
                            Take a Quiz
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/results"
                            className={page === 'results' ? 'quizes-active' : ''}
                            data-value='results'
                        >   
                            <i 
                                className="fa-regular fa-square-check"
                                style={{ marginRight: '0.1rem', display: 'inline-block', width: '20px', textAlign: 'left'}}
                            ></i>
                            Results
                        </Link>
                    </li>
                </ul>
            </div>
            <Outlet />
        </>
    )
}