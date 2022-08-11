import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useDatabase } from '../contexts/DatabaseContext'
import style from './Profile.module.css'

export default function Profile() {
  const { currentUser, logout } = useAuth()
  const { profileUser, updateProfileUserFromDatabase } = useDatabase()

  function handleUpdatePresidentImg(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      if (profileUser.photoURL === reader.result) return
      updateProfileUserFromDatabase(currentUser, { photoURL: reader.result })
    }
  }

  function handleToggleAccording(e) {
    let parentElement = e.target.parentElement
    while (parentElement) {
      if (parentElement.matches(`.${style['prevSibling-according']}`)) break
      parentElement = parentElement.parentElement
    }
    const according = parentElement.nextElementSibling
    according.classList.toggle(style['show'])
    if (according.matches(`.${style['show']}`)) {
      according.style.height = according.scrollHeight + 'px'
    } else {
      according.style.height = 0
    }
  }

  useEffect(() => {
    document.title = `IT Quiz - Profile`
  }, [])

  return (
    <div className="padding-0-15">
      <div className='pt-24 padding-0-15'>
        <header className={`${style['header']} section-header`}>
          <h2>Profile</h2>
          <hr></hr>
        </header>
      </div>

      <div className={style['container']}>
        <div className={style['president']}>
          <div className={style['contain-img']}>
            <input
              type="file"
              title="Change your president image"
              onChange={handleUpdatePresidentImg}
            />
            <div className={style['circle-img']}>
              {profileUser && (profileUser.photoURL && <img src={profileUser.photoURL} />)}
              {profileUser && (!profileUser.photoURL && <img src={require("../images/hide-user.jpg")} />)}
              {!profileUser && <img src={require("../images/hide-user.jpg")} />}
            </div>
          </div>
          <Link to="/" className={style['btn-signout']} onClick={logout}>Sign Out</Link>
        </div>

        <div className={style['user']}>
          <div>
            <div className={`${style['name']} ${style['prevSibling-according']}`}>
              <p>Tên: <span>{profileUser.displayName || '-----'}</span></p>
              <button onClick={handleToggleAccording} className={style['btn-edit']}>Edit <i className="fa-solid fa-pen"></i></button>
            </div>
            <div className={style['according']}>
              <FormDisplayName />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FormDisplayName() {
  const { currentUser, login, updateUser } = useAuth()
  const { updateProfileUserFromDatabase } = useDatabase()
  const passwordRef = useRef()
  const newNameRef = useRef()

  async function handleUpdateNewName(e) {
    e.preventDefault()
    try {
      await login(currentUser.email, passwordRef.current.value)
      passwordRef.current.style.borderColor = '#333'
      e.target.parentElement.classList.toggle(style['show'])
      e.target.parentElement.style.height = 0
      updateProfileUserFromDatabase(currentUser, {
        displayName: newNameRef.current.value
      })
    } catch (error) {
      passwordRef.current.style.borderColor = 'red'
    }
  }

  return (
    <form className={style['form']} onSubmit={handleUpdateNewName}>
      <div>
        <label>Mật khẩu</label>
        <input type="password" required ref={passwordRef} />
      </div>
      <div>
        <label>Tên mới</label>
        <input type="text" required ref={newNameRef} />
      </div>
      <button className={style['btn-submit']}>Xác nhận</button>
    </form>
  )
}
