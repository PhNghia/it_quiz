import { useReducer, createContext } from 'react'
import reducer, { initialState } from './reducer'

const QuizesContext = createContext()

function QuizesProvider ({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <QuizesContext.Provider value={[state, dispatch]}>
            {children}
        </QuizesContext.Provider>
    )
}

export { QuizesContext, QuizesProvider }
export  * as constanst  from './constants'
export * as actions from './actions'