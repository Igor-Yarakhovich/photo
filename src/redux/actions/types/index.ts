import { deleteImageAC, fetchImagesAC, setImagesAC } from 'redux/actions/image'
import { setCurrentPageAC, setPageSizeAC } from 'redux/actions/page'
import { setStatusAC } from 'redux/actions/status'

export type ActionType =
    | ReturnType<typeof fetchImagesAC>
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setPageSizeAC>
    | ReturnType<typeof deleteImageAC>
    | ReturnType<typeof setImagesAC>
