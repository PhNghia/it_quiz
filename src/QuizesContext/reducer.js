import {
    SUBMIT_ANSWERS,
    CHOOSE_TYPE_QUIZ,
    CHOOSE_CATEGORY_QUIZ,
    RESET_SET_VALUE,
    UPDATE_VALUE,
    SET_PAGE
} from './constants'

const initialState = {
    typeQuiz: '',
    categoryQuiz: {},
    setValue: () => { },
    value: [],
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
        case SUBMIT_ANSWERS:
            return {
                ...state,
                results: [action.payload, ...state.results]
            }
        case CHOOSE_TYPE_QUIZ:
            return {
                ...state,
                typeQuiz: action.payload
            }
        case CHOOSE_CATEGORY_QUIZ:
            return {
                ...state,
                categoryQuiz: action.payload
            }
        case RESET_SET_VALUE:
            return {
                ...state,
                setValue: action.payload
            }
        case UPDATE_VALUE:
            return {
                ...state,
                value: [...action.payload]
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