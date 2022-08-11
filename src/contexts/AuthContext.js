import React, { useContext, useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { auth } from '../firebase.js'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    
    function register (email, password) {
        return createUserWithEmailAndPassword(auth, email, password) 
    }

    function login (email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout () {
        return signOut(auth)
    }

    function updateProfileUser (user, profile) {
        return updateProfile(user, {
            ...profile
        })
    }

    useEffect(() => {
        const unscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
        })

        return unscribe
    }, [])

    const value = {
        currentUser,
        register,
        login,
        logout,
        updateProfileUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
