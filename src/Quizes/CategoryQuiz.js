import { useLayoutEffect, useState } from 'react'
import { CATEGORIES } from '../globalConstants'
import { actions } from '../QuizesContext'
import { useQuizesContext } from '../hooks'
import { Link } from 'react-router-dom'


export default function CategoryQuiz() {

    const [state, dispatch] = useQuizesContext()
    const [category, setCategory] = useState(() => CATEGORIES.filter(item => item.urlIcon !== undefined))

    function handleReload() {
        const hrefOrigin = document.location.origin
        document.location.href = hrefOrigin
    }

    useLayoutEffect(() => {
        window.addEventListener('load', handleReload)

        return () => {
            window.removeEventListener('load', handleReload)
        }
    }, [])

    return (
        <div className="padding-0-15">
            <div className='pt-24 padding-0-15 category-quiz'>
                <header className='section-header'>
                    <h2>Choose your category</h2>
                    <hr></hr>
                </header>

                <div className='category-list pb-70'>
                    {category.map(category => {
                        return (
                            <div
                                className='padding-15'
                                key={category.value}
                            >
                                <Link

                                    to={category.value}
                                    className='bg-img'
                                    style={{
                                        backgroundImage: `url(${require(`../images/${category.value}.jpg`)})`
                                    }}
                                    onClick={() => dispatch(actions.chooseCategoryQuiz({ ...category }))}
                                >
                                    <div className="category-content">
                                        <span><i className={category.urlIcon}></i></span>
                                        <h5>{category.name}</h5>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
