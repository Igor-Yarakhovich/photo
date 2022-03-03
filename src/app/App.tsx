import React, { useEffect, useState } from 'react'
import 'app/App.css'
import { Image } from 'components/image/Image'
import { useDispatch, useSelector } from 'react-redux'

import { Preloader } from 'components/common/Preloader/Preloader'
import { fetchImagesTC } from 'redux/middlewares/fetchImages'
import {
    deleteImageAC,
    setCurrentPageAC,
    setImagesAC,
    setPageSizeAC,
} from 'redux/actions'
import Pagination from 'components/common/Pagination/Pagination'
import {
    selectCurrentPage,
    selectImages,
    selectPageSize,
    selectSelectedImages,
    selectStatus,
} from 'redux/selectors'

function App() {
    const images = useSelector(selectImages)
    const selectedImages = useSelector(selectSelectedImages)
    const status = useSelector(selectStatus)
    const pageSize = useSelector(selectPageSize)
    const currentPage = useSelector(selectCurrentPage)

    const [width, setWidth] = useState(window.innerWidth)

    const dispatch = useDispatch()

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth)
        })

        dispatch(fetchImagesTC())
    }, [dispatch])

    const skip = pageSize * (currentPage - 1)

    const portion = selectedImages.filter(
        (image, index) => index + 1 > skip && index < skip + pageSize
    )

    const onClickSelected = (id: number) => {
        if (id) {
            dispatch(setImagesAC(images.filter((i) => i.albumId === id)))
        } else {
            dispatch(setImagesAC(images))
        }
    }

    const onCurrentPageClick = (pageNumber: number) => {
        dispatch(setCurrentPageAC(pageNumber))
        dispatch(setPageSizeAC(pageSize))
    }

    const deleteImageCallback = (imageId: number) => {
        dispatch(deleteImageAC(imageId))
    }

    if (status === 'loading') {
        return <Preloader />
    }

    const ids = images.map((i) => i.albumId)
    const uniqId = ids.filter((i, index) => {
        return ids.indexOf(i) === index
    })

    const portionSize = width > 767 ? 10 : 5

    return (
        <div className="App">
            <div className="select">
                <b>Sorting by albumId: </b>
                <span>
                    <select
                        defaultValue=""
                        name="select"
                        onChange={(e) => onClickSelected(+e.target.value)}
                    >
                        <option value="">All</option>
                        {uniqId.map((albumId) => (
                            <option value={albumId} key={albumId}>
                                {albumId}
                            </option>
                        ))}
                    </select>
                </span>
            </div>
            <div className="ImagesContainer">
                {portion.map((img) => {
                    return (
                        <Image
                            img={img}
                            deleteImageCallback={deleteImageCallback}
                            key={img.id}
                        />
                    )
                })}
            </div>

            <Pagination
                totalItemsCount={selectedImages.length}
                currentPage={currentPage}
                pageSize={pageSize}
                onCurrentPageClick={onCurrentPageClick}
                portionSize={portionSize}
            />
        </div>
    )
}

export default App
