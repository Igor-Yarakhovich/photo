import { AppRootStateType } from 'redux/store'

export const selectStatus = (state: AppRootStateType): string =>
    state.imageReducer.status
