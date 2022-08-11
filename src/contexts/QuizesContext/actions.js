import {
    TYPE_QUIZ,
    CATEGORY_QUIZ,
    SET_PAGE
} from "./constants";

export const setTypeQuiz = payload => {
    return {
        type: TYPE_QUIZ,
        payload
    }
}

export const setCategoryQuiz = payload => {
    return {
        type: CATEGORY_QUIZ,
        payload
    }
}

export const setPage = payload => {
    return {
        type: SET_PAGE,
        payload
    }
}