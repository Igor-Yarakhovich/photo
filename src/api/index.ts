import { instance } from 'api/config'
import { Path } from 'enums'
import { ImageType } from 'types'

export const api = {
    getImages() {
        return instance.get<ImageType[]>(Path.Photos)
    },
}
