import { MusicsRepository } from 'src/application/repository/musics/MusicsRepository'
import { Response, normalizationResponse } from '../../../shared/utils/response'
import { IUseCase } from '../../../shared/utils/use_cases'
import { IMusics } from 'src/application/entities/IMusics'


type GetUniqueMusicRequest = {
    id: string
}
type T = GetUniqueMusicRequest
type GetUniqueMusicResponse = {
    music: IMusics | null
}
type K = GetUniqueMusicResponse

class GetUniqueMusic implements IUseCase<T, K> {
    constructor(private musicsRepository: MusicsRepository) { }

    async execute({ id }: T): Promise<Response<K>> {
        try {
            if (!id) {
                return normalizationResponse.notFound('Music settings')

            }
            const getUniqueMusic = await this.musicsRepository.findUnique({
                id
            })

            if (!getUniqueMusic) {
                return normalizationResponse.notFound('Music')
            }


            return normalizationResponse.ok({ music: getUniqueMusic })
        } catch (error) {
            return normalizationResponse.serverError(error.message)
        }
    }

}

export {
    GetUniqueMusic
}