import { useState } from 'react'
import { CATEGORIES } from '../globalConstants'
import { actions } from '../contexts/QuizesContext'
import { useQuizesContext } from '../hooks'
import { Link } from 'react-router-dom'
import style from './CategoriesQuiz.module.css'


export default function CategoriesQuiz() {

    const [state, dispatch] = useQuizesContext()
    const [category, setCategory] = useState(() => CATEGORIES.filter(item => item.urlIcon !== undefined))

    return (
        <div className={`${style['category-list']} pb-70`}>
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
                            onClick={() => dispatch(actions.setCategoryQuiz({ ...category }))}
                        >
                            <div className={style["category-content"]}>
                                <span><i className={category.urlIcon}></i></span>
                                <h5>{category.name}</h5>
                            </div>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}
