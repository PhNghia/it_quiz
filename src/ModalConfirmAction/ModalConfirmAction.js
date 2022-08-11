import React from 'react'
import Button from '../Button'
import style from './ModalConfirmAction.module.css'

export default function ModalConfirmAction({ setShow, callback, result }) {

  const getClr = () => {
    if (result.score >= 65) return 'var(--success)'
    if (result.score >= 35) return 'var(--warning)'
    return 'var(--danger)'
  }

  return (
    <div className={style['modal']}>
      <div className={style['overlay']}></div>
      <div className={style['container']}>
        <h3>Are you sure remove <span style={{ color: getClr() }}>{result.name}</span> result?</h3>
        <p>Note: The result was removed which does not influence the leaderboard</p>
        <div className={style['actions']}>
          <Button
            stylesProps={{
              content: "Accept",
              color: 'var(--danger)',
              isFullWidth: false,
              isBackgroundClr: true
            }}
            callback={() => { setShow(false); callback() }}
          />
          <Button
            stylesProps={{
              content: "Cancel",
              color: 'var(--success)',
              isFullWidth: false,
              isBackgroundClr: false
            }}
            callback={() => setShow(false)}
          />
        </div>
      </div>
    </div>
  )
}
