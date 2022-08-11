import React, { useEffect, useState, useMemo } from 'react'
import Seperate from '../Seperate'
import { useAuth } from '../contexts/AuthContext'
import { useDatabase } from '../contexts/DatabaseContext'
import style from './Ranks.module.css'

const MAX_POSITION_ON_LEADERBOARD = 100

export default function Rank({ category }) {
    const { currentUser } = useAuth()
    const { ranks, profileUser } = useDatabase()

    const bestResultOfCurrentUser = useMemo(() => {
        const noRankings = {
            score: "--",
            duringFormat: "--",
            position: undefined
        }
        if (currentUser) {
            noRankings.currentUser = { ...profileUser }
        } else {
            noRankings.currentUser = {
                displayName: "--",
                email: "--",
                photoURL: null,
                uid: null
            }
        }
        if (!ranks || !ranks[category.value] || !currentUser) return { ...noRankings }

        let position
        const bestResult = ranks[category.value].find((result, index) => {
            if (result.currentUser.uid === currentUser.uid) {
                position = index
                return true
            }
            return false
        })
        if (isNaN(position)) return { ...noRankings }
        return { ...bestResult, position }
    }, [ranks, currentUser, profileUser])

    const resultsOfRank = useMemo(() => {
        if (!ranks || !ranks[category.value]) return null
        return ranks[category.value]
    }, [ranks])

    useEffect(() => {
        document.title = `IT Quiz - ${category.name} Rank`
    })

    return (
        <div className="pt-24 pb-70">
            <header className="section-header">
                <h2>{category.name + ' Rank'}</h2>
                <hr></hr>
            </header>

            <div>
                <div className={style['title']}>
                    <div className={style['row']}>
                        <div className={style['col-1']}>
                            <span>My Rank</span>
                            <span></span>
                            <span></span>
                        </div>
                        <div className={style['col-2']}>
                            <span>Score</span>
                            <span>Time</span>
                        </div>
                    </div>
                    <RankShow rank={bestResultOfCurrentUser} position={bestResultOfCurrentUser.position + 1} />
                </div>

                <Seperate isFullWidth styles={{ margin: "12px 0" }} />

                <div>
                    {resultsOfRank && resultsOfRank.map((result, index) => {
                        if (index > MAX_POSITION_ON_LEADERBOARD - 1) return <></>
                        return (<RankShow key={index} rank={result} position={index + 1} />)
                    })}
                </div>
            </div>
        </div>
    )
}

function RankShow({ rank, position }) {
    const LogoRank = () => {
        if (isNaN(position) || position > MAX_POSITION_ON_LEADERBOARD) {
            return <span style={{ fontWeight: 'normal', fontSize: "8.8px" }}>Not in Rankings</span>
        }

        switch (position) {
            case 1:
                return <img src={require('../images/first.jpg')} alt="first rank logo" />
            case 2:
                return <img src={require('../images/second.jpg')} alt="second rank logo" />
            case 3:
                return <img src={require('../images/third.jpg')} alt="third rank logo" />
            default:
                return <span>{position}</span>
        }
    }

    return (
        <div className={style['row'] + ' ' + style['content']}>
            <div className={style['col-1']}>
                <div className={style['logo']}><LogoRank /></div>
                <img src={rank.currentUser.photoURL || require("../images/hide-user.jpg")} />
                <span>{rank.currentUser.displayName}</span>
            </div>

            <div className={style['col-2']}>
                <span>{rank.score}</span>
                <span>{rank.duringFormat}</span>
            </div>
        </div>
    )
}
