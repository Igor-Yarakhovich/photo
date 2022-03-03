import React from 'react'
import spinner from 'components/common/Preloader/preloader.gif'
import styles from 'components/common/Preloader/Preloader.module.css'

export let Preloader = () => {
    return (
        <div className={styles.preloader}>
            <img alt="" src={spinner} />
        </div>
    )
}
