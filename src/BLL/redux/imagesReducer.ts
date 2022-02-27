import {Dispatch} from "redux";
import {imagesApi} from "../../API/imagesApi";

const initialState = {
    status: 'loading' as RequestStatusType,
    images: [] as ImageType[],
    newImages: [] as ImageType[],
    currentPage: 1,
    pageSize: 10,
}

export const imagesReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'image/FETCH_IMAGES':
            return {...state, images: action.images, newImages: action.images}

        case 'image/SET_STATUS':
            return {...state, status: action.status}

        case 'image/SET_CURRENT_PAGE_COUNT':
            return {...state, currentPage: action.currentPage,}

        case 'image/SET_PAGE_SIZE':
            return {...state, pageSize: action.pageSize}

        case 'image/DELETE_IMAGE':
            return {...state, newImages: state.newImages.filter((i) => i.id !== action.id)}

        case 'image/SET_IMAGES':
            return {...state, newImages: action.newImages, currentPage: 1}

        default: {
            return state
        }
    }
}

//actions

export const fetchImagesAC = (images: Array<ImageType>) =>
    ({type: 'image/FETCH_IMAGES', images} as const)

export const setStatusAC = (status: RequestStatusType) =>
    ({type: 'image/SET_STATUS', status} as const)

export const setCurrentPageAC = (currentPage: number) =>
    ({type: 'image/SET_CURRENT_PAGE_COUNT', currentPage} as const)

export const setPageSizeAC = (pageSize: number) =>
    ({type: 'image/SET_PAGE_SIZE', pageSize} as const)

export const deleteImageAC = (id: number) =>
    ({type: 'image/DELETE_IMAGE', id} as const)

export const setImagesAC = (newImages: Array<ImageType>) =>
    ({type: 'image/SET_IMAGES', newImages} as const)


//thunk

export const fetchImagesTC = () => async (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    try {
        let data = await imagesApi.getImages()
        dispatch(fetchImagesAC(data.data))
    } catch (err) {
        console.log(err)
    } finally {
        dispatch(setStatusAC('succeeded'))
    }
}


//types

type InitialStateType = typeof initialState;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded'

type ActionType = ReturnType<typeof fetchImagesAC>
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setPageSizeAC>
    | ReturnType<typeof deleteImageAC>
    | ReturnType<typeof setImagesAC>

export type ImageType = {
    "albumId": number,
    "id": number,
    "title": string,
    "url": string,
    "thumbnailUrl": string
}
