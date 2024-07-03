import { MusicsRepository } from 'src/application/repository/musics/MusicsRepository'
import { Response, normalizationResponse } from '../../../shared/utils/response'
import { IUseCase } from '../../../shared/utils/use_cases'
import { IMusics } from 'src/application/entities/IMusics'


type ListMusicRequest = {

}
type T = ListMusicRequest
type ListMusicResponse = {
    musics: IMusics[]
}
type K = ListMusicResponse

class ListMusic implements IUseCase<T, K> {
    constructor(private musicsRepository: MusicsRepository) { }

    async execute({ }: T): Promise<Response<K>> {
        try {
            const listMusics = await this.musicsRepository.findMany({})

            return normalizationResponse.ok({ musics: listMusics })
        } catch (error) {
            return normalizationResponse.serverError(error.message)
        }
    }
}

export {
    ListMusic
}