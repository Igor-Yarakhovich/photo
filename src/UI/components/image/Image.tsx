import React, { useState } from 'react'
import { ImageType } from 'BLL/redux/imagesReducer'
import styles from './Image.module.css'
import Modal from 'common/Modal/Modal'

type ImagePropsType = {
    img: ImageType
    deleteImageCallback: (imageId: number) => void
}

export const Image = ({ img, deleteImageCallback }: ImagePropsType) => {
    const deleteOnClickHandler = () => deleteImageCallback(img.id)
    const setShowOnClickHandler = () => setShow(true)
    const [show, setShow] = useState(false)

    return (
        <div className={styles.Image}>
            <button onClick={deleteOnClickHandler} className={styles.button}>
                X
            </button>
            <img
                src={img.thumbnailUrl}
                alt=""
                onClick={setShowOnClickHandler}
            />
            <div>
                <b>albumId: </b>
                {img.albumId}
            </div>
            <div>
                <b>Id: </b>
                {img.id}
            </div>
            <div className={styles.Title}>
                <b>Title: </b>
                {img.title}
            </div>
            <Modal
                enableBackground={true}
                backgroundOnClick={() => setShow(false)}
                width={600}
                height={600}
                modalOnClick={() => setShow(false)}
                show={show}
            >
                <img src={img.url} alt="" />
            </Modal>
        </div>
    )
}
