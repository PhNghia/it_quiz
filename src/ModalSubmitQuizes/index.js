import styles from './ModalSubmitQuizes.module.css'
import Button from '../Button'


function ModalSubmitQuizes({ setOpen, getResult }) {

    return (
        <div className={styles['container']}>
            <div className={styles['overlay']}></div>
            <div className={styles['content']}>
                <div className={styles['background']}></div>
                <div className={styles['bubble']}>
                    <p className={styles['close']} onClick={() => setOpen(false)}>&times;</p>
                    <div className={styles['description']}>
                        <h3>Are you sure?</h3>
                        <p>Please review your questions and make sure you've answered on all of them! There is no going back!</p>
                    </div>
                    <div>
                        <Button
                            stylesProps={{
                                content: "return to quiz",
                                isBackgroundClr: true,
                                color: 'var(--purple)',
                                isFullWidth: false
                            }}
                            callback={() => setOpen(false)}
                        />
                        <Button
                            stylesProps={{
                                content: "submit quiz",
                                isBackgroundClr: true,
                                color: 'var(--green)',
                                isFullWidth: false
                            }}
                            callback={() => {
                                getResult()
                                setOpen(false);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalSubmitQuizes