import { AppRootStateType } from 'redux/store'
import { ImageType } from 'types'

export const selectImages = (state: AppRootStateType): ImageType[] =>
    state.imageReducer.images
