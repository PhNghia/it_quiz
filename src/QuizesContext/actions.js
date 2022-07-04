import {
    SUBMIT_ANSWERS,
    CHOOSE_TYPE_QUIZ,
    CHOOSE_CATEGORY_QUIZ,
    RESET_SET_VALUE,
    UPDATE_VALUE,
    SET_PAGE
} from "./constants";

export const submitAnswers = payload => {
    return {
        type: SUBMIT_ANSWERS,
        payload
    }
}

export const chooseTypeQuiz = payload => {
    return {
        type: CHOOSE_TYPE_QUIZ,
        payload
    }
}

export const chooseCategoryQuiz = payload => {
    return {
        type: CHOOSE_CATEGORY_QUIZ,
        payload
    }
}

export const resetValue = payload => {
    return {
        type: RESET_SET_VALUE,
        payload
    }
}

export const updateValue = payload => {
    return {
        type: UPDATE_VALUE,
        payload
    }
}

export const setPage = payload => {
    return {
        type: SET_PAGE,
        payload
    }
}