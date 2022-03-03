import { RequestStatusType } from 'types'

export const setStatusAC = (status: RequestStatusType) =>
    ({ type: 'image/SET_STATUS', status } as const)
