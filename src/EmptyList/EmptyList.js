import React from 'react'
import style from './EmptyList.module.css'

export default function EmptyList() {
    return (
        <div>
            <div className={style['empty-list']}>
                <h4 className={style['empty-title']}>Empty Results</h4>
            </div>
        </div>
    )
}
