import { AppRootStateType } from 'redux/store'
import { ImageType } from 'types'

export const selectSelectedImages = (state: AppRootStateType): ImageType[] =>
    state.imageReducer.selectedImages
