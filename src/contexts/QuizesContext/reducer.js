import {
    TYPE_QUIZ,
    CATEGORY_QUIZ,
    SET_PAGE
} from './constants'

const initialState = {
    typeQuiz: '',
    categoryQuiz: {},
    setPage: () => { }
}

/* 
    results: [
        {
            name = userName + typeQuiz + id,
            date,
            totalQuestions = number,
            correctAnswers = number,
            final = 'failed' or 'passed',
            score: percent,
            grade: A B C D F,
            topic,
            questions: []
        }
    ]
*/

function reducer(state, action) {
    switch (action.type) {
        case TYPE_QUIZ:
            return {
                ...state,
                typeQuiz: action.payload
            }
        case CATEGORY_QUIZ:
            return {
                ...state,
                categoryQuiz: action.payload
            }
        case SET_PAGE:
            return {
                ...state,
                setPage: action.payload
            }
        default:
            throw new Error(`Action type ${action.type} is not supported`)
    }
}

export { initialState }
export default reducer