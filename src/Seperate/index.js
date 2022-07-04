import styles from './Seperate.module.css'

export default function Seperate ({ content, isFullwidth, ...props }) {
    return (
        <h6 className={styles.seperate} style={{ '--width': isFullwidth ? '100%' : '60%', ...props.styles }}>{content}</h6>
    )
}