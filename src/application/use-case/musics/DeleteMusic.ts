
import { MusicsRepository } from 'src/application/repository/musics/MusicsRepository'
import { Response, normalizationResponse } from '../../../shared/utils/response'
import { IUseCase } from '../../../shared/utils/use_cases'

type DeleteMusicRequest = {
    id: string
    artistId: string
}
type T = DeleteMusicRequest
type DeleteMusicResponse = {
    message: string
}
type K = DeleteMusicResponse

class DeleteMusic implements IUseCase<T, K> {
    constructor(
        private musicsRepository: MusicsRepository) { }

    async execute({ id, artistId }: T): Promise<Response<K>> {
        try {

            if (!id || !artistId) {
                return normalizationResponse.notFound('Music settings')
            }

            const findByArtistId = await this.musicsRepository.findByArtistId({ artistId })

            if (!findByArtistId) {
                return normalizationResponse.conflict('Music does not belong to the artist')
            }

            const deleteMusic = await this.musicsRepository.delete({
                id
            })

            if (!deleteMusic) {
                return normalizationResponse.notFound('Music')
            }

            return normalizationResponse.ok({ message: "Successfully Deleted" })
        } catch (error) {
            return normalizationResponse.serverError(error.message)
        }
    }
}

export {
    DeleteMusic
}