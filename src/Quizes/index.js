import { useRef, useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import TypeQuiz from './TypeQuiz'
import CategoryQuiz from './CategoryQuiz'
import { useQuizesContext } from '../hooks'
import { actions } from '../contexts/QuizesContext'
import { useAuth } from '../contexts/AuthContext'
import { useDatabase } from '../contexts/DatabaseContext'

export { CategoryQuiz, TypeQuiz }

export default function Quizes() {
    const { currentUser, logout } = useAuth()
    const ulRef = useRef()

    const [page, setPage] = useState(() => {
        const hrefBrowser = document.location.href
        if (hrefBrowser.includes('result')) return 'results'
        if (hrefBrowser.includes('rank')) return 'ranks'
        if (hrefBrowser.includes('profile')) return 'profile'
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
                {!currentUser && (
                    <div className="account">
                        <span><i className="fa-solid fa-user"></i></span>
                        <Link to="/login">Login</Link>
                        <b>/</b>
                        <Link to="/register">Register</Link>
                    </div>
                )}

                {currentUser && (
                    <div>
                        <h3 className="padding-8-0">Profile Settings</h3>
                        <p onClick={handleChangeSection}>
                            <Link
                                to="/profile"
                                className={page === 'profile' ? 'quizes-active' : ''}
                                data-value='profile'
                            >
                                <i
                                    className="fa-solid fa-gear"
                                    style={{ marginRight: '0.1rem', display: 'inline-block', width: '20px', textAlign: 'left' }}
                                ></i>
                                Profile Settings
                            </Link>
                        </p>
                    </div>
                )}
                
                <div>
                    <h3 className="padding-8-0">Quizes</h3>
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
                                    style={{ marginRight: '0.1rem', display: 'inline-block', width: '20px', textAlign: 'left' }}
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
                                    style={{ marginRight: '0.1rem', display: 'inline-block', width: '20px', textAlign: 'left' }}
                                ></i>
                                Results
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/ranks"
                                className={page === 'ranks' ? 'quizes-active' : ''}
                                data-value='ranks'
                            >
                                <i
                                    className="fa-solid fa-ranking-star"
                                    style={{ marginRight: '0.1rem', display: 'inline-block', width: '20px', textAlign: 'left' }}
                                ></i>
                                Ranks
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}