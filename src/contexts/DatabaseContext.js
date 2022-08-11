import React, { useContext, useEffect, useState, useRef } from 'react'
import { database } from '../firebase'
import { onValue, ref, set, update, remove } from 'firebase/database'
import { useAuth } from './AuthContext'

const DatabaseContext = React.createContext()

export function useDatabase() {
    return useContext(DatabaseContext)
}

export function DatabaseProvider({ children }) {
    const { currentUser } = useAuth()
    const [profileUser, setProfileUser] = useState(null)
    const [results, setResults] = useState(null)
    const [ranks, setRanks] = useState(null)

    useEffect(() => {
        if (currentUser) {
            getResults()
            getProfileOfCurrentUser()
            return
        } else {
            setResults(null)
            setProfileUser(null)
        }
    }, [currentUser])

    useEffect(() => {
        getRanks()
    }, [])

    function getProfileOfCurrentUser () {
        const userRef = ref(database, `users/${currentUser.uid}`)
        onValue(userRef, snapshot => {
            const data = snapshot.val()
            if (data) {
                setProfileUser({ ...data })
            } else {
                setProfileUser(null)
            }
        })
    }

    function updateProfileUserFromDatabase (user, propsProfile) {
        const pathUser = `users/${user.uid}`
        update(ref(database), {
            [pathUser]: { ...profileUser, ...propsProfile }
        })
        syncProfileDataOnRanks({ ...profileUser, ...propsProfile })
    }

    function syncProfileDataOnRanks (profile) {
        const categoryOfRanks = [...Object.keys(ranks)]
        categoryOfRanks.forEach(key => {
            const user = ranks[key].find(result => result.currentUser.uid === profile.uid)
            if (!user) return
            const path = `ranks/${key}/${currentUser.uid}/currentUser`
            update(ref(database), {
                [path]: { ...profile }
            })
        })
    }

    function getResults() {
        const resultsRef = ref(database, `results/${currentUser.uid}`)
        onValue(resultsRef, (snapshot) => {
            const data = snapshot.val()
            if (data) {
                const results = [...Object.values(data)]
                const sortResults = results.sort((obj1, obj2) => {
                    if (obj1.timeStamp < obj2.timeStamp) return 1
                    if (obj1.timeStamp > obj2.timeStamp) return -1
                    return 0
                })
                setResults(sortResults)
            } else {
                setResults([])
            }
        })
    }

    function addNewResult(result) {
        const resultRef = ref(database, `results/${currentUser.uid}/${result.timeStamp}`)
        set(resultRef, {
            ...result
        })
    }

    function removeResult (id) {
        remove(ref(database, `results/${currentUser.uid}/${id}`))
    }

    function getRanks () {
        onValue(ref(database, `ranks`), snapshot => {
            const data = snapshot.val()
            if (data) {
                const ranks = {}
                const sortRanks = (result1, result2) => {
                    if (result1.score < result2.score) return 1
                    if (result1.score > result2.score) return -1
                    if (result1.duringMiliseconds > result2.duringMiliseconds) return 1
                    if (result1.duringMiliseconds < result2.duringMiliseconds) return -1
                    if (result1.timeStamp > result2.timeStamp) return 1
                    if (result1.timeStamp < result2.timeStamp) return -1
                    return 0
                }
                for (let categoryValue in data) {
                    const results = [...Object.values(data[categoryValue])]
                    results.sort(sortRanks)
                    ranks[categoryValue] = results
                }        
                setRanks(ranks)
            } else {
                setRanks([])
            }
        })
    }

    function updateRankWithNewResult (result) {
        const ranksPath = `ranks/${result.category.value}/${currentUser.uid}`
        update(ref(database), {
            [ranksPath]: { ...result }
        })
    }

    const value = {
        results,
        addNewResult,
        removeResult,
        ranks,
        updateRankWithNewResult,
        profileUser,
        getProfileOfCurrentUser,
        updateProfileUserFromDatabase,
    }

    return (
        <DatabaseContext.Provider value={value}>
            {children}
        </DatabaseContext.Provider>
    )
}
