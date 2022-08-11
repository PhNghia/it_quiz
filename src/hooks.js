import { useContext, useEffect, useState } from 'react'
import { QuizesContext } from './contexts/QuizesContext'

export function useQuizesContext () {
    const [state, dispatch] = useContext(QuizesContext)
    return [state, dispatch]
}

export function useFileReaderAsDataURL () {
    
}