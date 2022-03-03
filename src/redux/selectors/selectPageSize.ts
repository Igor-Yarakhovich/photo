import { AppRootStateType } from 'redux/store'

export const selectPageSize = (state: AppRootStateType): number =>
    state.imageReducer.pageSize
