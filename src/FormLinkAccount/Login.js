import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Button from '../Button'
import { ValidateForm, ValidateInput } from './ValidateForm'
import style from './FormLinkAccount.module.css'

export default function Login() {
    const { login } = useAuth()

    const formRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState("")

    const navigate = useNavigate()

    async function handleSubmit() {
        try {
            await login(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        } catch (error) {
            setError(error)
        }
    }

    useEffect(() => {
        let hideError = () => {
            setError("")
        }
        if (error) {
            emailRef.current.addEventListener('focus', hideError)
            passwordRef.current.addEventListener('focus', hideError)
        }
    }, [error])

    useEffect(() => {
        const form = new ValidateForm(formRef.current, handleSubmit)
        const email = new ValidateInput(emailRef.current)
        const password = new ValidateInput(passwordRef.current, 6)

        form.inputs = [email, password]

        form.setupSubmit()
        email.setupQueue([email.required, email.email])
        password.setupQueue([password.required, password.password])

        emailRef.current.onblur = email.run.bind(email)
        passwordRef.current.onblur = password.run.bind(password)
    }, [])

    return (
        <div className={style['container']}>
            <main>
                <h3 className={style['title']}>Sign into your account</h3>
                <form className={style['form']} ref={formRef}>
                    <div className={style['form-group']}>
                        <input type="text" placeholder="E-Mail" ref={emailRef} />
                        <span className={style['message-error']}></span>
                    </div>
                    <div className={style['form-group']}>
                        <input type="password" placeholder="Password" ref={passwordRef} />
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
                    Don't have an account?
                    <Link to="/register" className={style['link']}> Register here</Link></p>
            </main>
        </div>
    )
}
