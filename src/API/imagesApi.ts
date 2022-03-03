import axios from 'axios'
import { ImageType } from 'BLL/redux/imagesReducer'

export const instance = axios.create({
    baseURL: 'http://jsonplaceholder.typicode.com/',
})

export const imagesApi = {
    getImages() {
        return instance.get<ImageType[]>('photos')
    },
}
