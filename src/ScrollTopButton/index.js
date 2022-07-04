import { useEffect, useState } from 'react'
import styles from './ScrollTopButton.module.css'

export default function ScrollTopButton() {

    const [show, setShow] = useState(false)

    useEffect(() => {   
        function toggleScrollTopButton () {
            if (window.scrollY >= 500) {
                setShow(true)
            } else {
                setShow(false)
            }
        }

        window.addEventListener('scroll', toggleScrollTopButton)
    }, [])

    function handleScrollTop() {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    }

    return (
        show
            &&
        <div
            className={styles['scroll-btn']}
            onClick={handleScrollTop}
        >
            <div className={styles['scroll-content']}>
                <i className="fa-solid fa-caret-up"></i>
                TOP
            </div>
        </div>
    )
}