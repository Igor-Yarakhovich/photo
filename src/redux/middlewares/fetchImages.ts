import { Dispatch } from 'redux'

import { api } from 'api'
import { LoadingStatus } from 'enums'
import { fetchImagesAC, setStatusAC } from 'redux/actions'

export const fetchImagesTC = () => async (dispatch: Dispatch) => {
    dispatch(setStatusAC(LoadingStatus.Loading))
    try {
        const data = await api.getImages()

        dispatch(fetchImagesAC(data.data))
    } catch (err) {
        console.log(err)
    } finally {
        dispatch(setStatusAC(LoadingStatus.Succeeded))
    }
}
