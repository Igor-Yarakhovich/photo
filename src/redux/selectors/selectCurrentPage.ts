import { AppRootStateType } from 'redux/store'

export const selectCurrentPage = (state: AppRootStateType): number =>
    state.imageReducer.currentPage
