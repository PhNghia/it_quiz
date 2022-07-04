import React from 'react'
import { Link } from 'react-router-dom'
import stylesObj from './Button.module.css'

export default function Button({ stylesProps, callback, link }) {

    const Btn = {
        Button({ className, style, onClick, children }) {
            return (
                <button
                    className={className}
                    style={style}
                    onClick={onClick}
                >
                    {children}
                </button>
            )
        },
        Link({ className, style, onClick, children }) {
            return (
                <Link
                    to={link}
                    className={className}
                    style={style}
                    onClick={onClick}
                >
                    {children}
                </Link>
            )
        }
    }

    let type = link ? 'Link' : 'Button'

    const Component = Btn[type]

    return (
        <Component
            className={`
                ${stylesObj.btn} 
                ${stylesProps.isBackgroundClr ? stylesObj.bgActive : stylesObj.noneBgActive}
            `}
            style={{ '--clr-btn': stylesProps.color, width: stylesProps.isFullWidth ? '100%' : 'auto' }}
            onClick={callback}
        >
            {stylesProps.content}
        </Component>
    )
}
