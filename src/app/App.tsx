import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
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
import { LoadingStatus } from 'enums'

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

    const availableImages = selectedImages.filter(
        (image, index) => index + 1 > skip && index < skip + pageSize
    )

    const onSelectChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        const changedId = Number(event.currentTarget.value)

        if (changedId) {
            const filteredImages = images.filter(
                ({ albumId }) => albumId === changedId
            )

            dispatch(setImagesAC(filteredImages))
        } else {
            dispatch(setImagesAC(images))
        }
    }

    const handleCurrentPageClick = useCallback(
        (pageNumber: number): void => {
            dispatch(setCurrentPageAC(pageNumber))
            dispatch(setPageSizeAC(pageSize))
        },
        [pageSize, dispatch]
    )

    const handleDeleteButtonImageClick = useCallback(
        (imageId: number): void => {
            dispatch(deleteImageAC(imageId))
        },
        [dispatch]
    )

    const portionSize = width > 767 ? 10 : 5

    const ids = images.map((i) => i.albumId)
    const uniqId = ids.filter((i, index) => {
        return ids.indexOf(i) === index
    })

    if (status === LoadingStatus.Loading) {
        return <Preloader />
    }

    return (
        <div className="App">
            <div className="select">
                <b>Sorting by albumId: </b>
                <span>
                    <select
                        defaultValue=""
                        name="select"
                        onChange={onSelectChange}
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
                {availableImages.map((img) => {
                    return (
                        <Image
                            img={img}
                            deleteImageCallback={handleDeleteButtonImageClick}
                            key={img.id}
                        />
                    )
                })}
            </div>

            <Pagination
                totalItemsCount={selectedImages.length}
                currentPage={currentPage}
                pageSize={pageSize}
                onCurrentPageClick={handleCurrentPageClick}
                portionSize={portionSize}
            />
        </div>
    )
}

export default App
