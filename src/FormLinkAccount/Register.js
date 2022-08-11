import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useDatabase } from '../contexts/DatabaseContext'
import Button from '../Button'
import { ValidateForm, ValidateInput } from './ValidateForm'
import style from './FormLinkAccount.module.css'

export default function Register() {
  const { register, logout } = useAuth()
  const { updateProfileUserFromDatabase } = useDatabase()

  const formRef = useRef()
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [error, setError] = useState("")

  const navigate = useNavigate()

  async function handleSubmit() {
    try {
      const userCredential = await register(emailRef.current.value, passwordRef.current.value)
      const user = userCredential.user
      updateProfileUserFromDatabase(user, {
        displayName: nameRef.current.value, 
        photoURL: null,
        email: user.email,
        uid: user.uid
      })
      logout()
      navigate("/login")
    } catch (error) {
      setError(error)
    }
  }

  useEffect(() => {
    const form = new ValidateForm(formRef.current, handleSubmit)
    const name = new ValidateInput(nameRef.current)
    const email = new ValidateInput(emailRef.current)
    const password = new ValidateInput(passwordRef.current, 6)
    const passwordConfirm = new ValidateInput(passwordConfirmRef.current)

    form.inputs = [name, email, password, passwordConfirm]
    password.passwordConfirmClass = passwordConfirm
    passwordConfirm.passwordClass = password

    form.setupSubmit()
    name.setupQueue([name.required])
    email.setupQueue([email.required, email.email])
    password.setupQueue([password.required, password.password])
    passwordConfirm.setupQueue([passwordConfirm.required, passwordConfirm.passwordConfirm])

    nameRef.current.onblur = name.run.bind(name)
    emailRef.current.onblur = email.run.bind(email)
    passwordRef.current.onblur = password.run.bind(password)
    passwordConfirmRef.current.onblur = passwordConfirm.run.bind(passwordConfirm)
  }, [])

  useEffect(() => {
    let hideError = () => {
      setError("")
    }
    if (error) {
      emailRef.current.addEventListener('focus', hideError)
      passwordRef.current.addEventListener('focus', hideError)
      passwordConfirmRef.current.addEventListener('focus', hideError)
    }
  }, [error])

  return (
    <div className={style['container']}>
      <main>
        <h3 className={style['title']}>Create an account</h3>
        <form className={style['form']} ref={formRef}>
          <div className={style['form-group']}>
            <input type="text" placeholder="Your Name" ref={nameRef} />
            <span className={style['message-error']}></span>
          </div>

          <div className={style['form-group']}>
            <input type="text" placeholder="E-Mail" ref={emailRef} />
            <span className={style['message-error']}></span>
          </div>

          <div className={style['form-group']}>
            <input type="password" placeholder="Password" ref={passwordRef} />
            <span className={style['message-error']}></span>
          </div>

          <div className={style['form-group']}>
            <input type="password" placeholder="Password (Confirm)" ref={passwordConfirmRef} />
            <span className={style['message-error']}></span>
          </div>

          {error && <p className={style['error-submit']}>{error.code.replaceAll("/", " ").replaceAll("-", " ")}</p>}

          <Button
            stylesProps={{
              content: "Login",
              isBackgroundClr: false,
              color: 'var(--green)',
              isFullWidth: true
            }}
          />
        </form>
        <p className={style['suggest']}>
          <Link to="/" className={style['link']}>Home</Link> /
          Already a member?
          <Link to="/login" className={style['link']}> Login here</Link></p>
      </main>
    </div>
  )
}
