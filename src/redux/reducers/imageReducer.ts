import { LoadingStatus } from 'enums'
import { ImageType, RequestStatusType } from 'types'
import { ActionType } from 'redux/actions/types'

const initialState = {
    status: LoadingStatus.Loading as RequestStatusType,
    images: [] as ImageType[],
    selectedImages: [] as ImageType[],
    currentPage: 1,
    pageSize: 10,
}

type InitialStateType = typeof initialState

export const imageReducer = (
    state: InitialStateType = initialState,
    action: ActionType
): InitialStateType => {
    switch (action.type) {
        case 'image/FETCH_IMAGES':
            return {
                ...state,
                images: action.images,
                selectedImages: action.images,
            }

        case 'image/SET_STATUS':
            return { ...state, status: action.status }

        case 'image/SET_CURRENT_PAGE_COUNT':
            return { ...state, currentPage: action.currentPage }

        case 'image/SET_PAGE_SIZE':
            return { ...state, pageSize: action.pageSize }

        case 'image/DELETE_IMAGE':
            return {
                ...state,
                selectedImages: state.selectedImages.filter(
                    (i) => i.id !== action.id
                ),
            }

        case 'image/SET_IMAGES':
            return {
                ...state,
                selectedImages: action.selectedImages,
                currentPage: 1,
            }

        default: {
            return state
        }
    }
}
