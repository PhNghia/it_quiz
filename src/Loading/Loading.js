import React from 'react'
import style from './Loading.module.css'

export default function Loading() {
    return (
        <div className={style["ease-in-out-loading"]}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
