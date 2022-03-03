import { ImageType } from 'types'

export const fetchImagesAC = (images: Array<ImageType>) =>
    ({ type: 'image/FETCH_IMAGES', images } as const)

export const deleteImageAC = (id: number) =>
    ({ type: 'image/DELETE_IMAGE', id } as const)

export const setImagesAC = (selectedImages: Array<ImageType>) =>
    ({ type: 'image/SET_IMAGES', selectedImages } as const)
