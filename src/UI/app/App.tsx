import React, { useEffect, useState } from 'react'
import './App.css'
import { Image } from '../components/image/Image'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from 'BLL/redux/store'

import { Preloader } from 'common/Preloader/Preloader'
import Pagination from '../../common/Pagination/Pagination'
import {
    deleteImageAC,
    fetchImagesTC,
    ImageType,
    RequestStatusType,
    setCurrentPageAC,
    setImagesAC,
    setPageSizeAC,
} from 'BLL/redux/imagesReducer'

function App() {
    const images = useSelector<AppRootStateType, Array<ImageType>>(
        (state) => state.imagesReducer.images
    )
    const newImages = useSelector<AppRootStateType, Array<ImageType>>(
        (state) => state.imagesReducer.newImages
    )
    const status = useSelector<AppRootStateType, RequestStatusType>(
        (state) => state.imagesReducer.status
    )
    const currentPage = useSelector<AppRootStateType, number>(
        (state) => state.imagesReducer.currentPage
    )
    const pageSize = useSelector<AppRootStateType, number>(
        (state) => state.imagesReducer.pageSize
    )

    const dispatch = useDispatch()

    const [width, setWidth] = useState(window.innerWidth)
    window.addEventListener('resize', () => {
        setWidth(window.innerWidth)
    })

    useEffect(() => {
        dispatch(fetchImagesTC())
    }, [dispatch])

    const skip = pageSize * (currentPage - 1)

    const portion = newImages.filter(
        (image, index) => index + 1 > skip && index < skip + pageSize
    )

    const onClickSelected = (id: number) => {
        if (id) {
            dispatch(setImagesAC(images.filter((i) => i.albumId === id)))
        } else {
            dispatch(setImagesAC(images))
        }
    }

    const onPageChanged = (pageNumber: number) => {
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
                totalItemsCount={newImages.length}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChanged={onPageChanged}
                portionSize={portionSize}
            />
        </div>
    )
}

export default App
