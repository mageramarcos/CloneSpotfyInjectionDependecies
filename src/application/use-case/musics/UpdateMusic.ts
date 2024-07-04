
import { MusicsRepository } from 'src/application/repository/musics/MusicsRepository'
import { Response, normalizationResponse } from '../../../shared/utils/response'
import { IUseCase } from '../../../shared/utils/use_cases'
import { IMusics } from 'src/application/entities/IMusics'
import { ArtistsRepository } from 'src/application/repository/artists/ArtistsRepository'

type UpdateMusicRequest = {
    id: string
    data: Omit<IMusics,
        | 'id'
        | 'created_at'
        | 'updated_at'
    >
}
type T = UpdateMusicRequest
type UpdateMusicResponse = {
    music: IMusics
}
type K = UpdateMusicResponse

class UpdateMusic implements IUseCase<T, K> {

    constructor(
        private musicsRepository: MusicsRepository,
        private artistsRepository: ArtistsRepository) { }

    async execute({ id, data }: T): Promise<Response<K>> {
        try {

            if (!id || !data) {
                return normalizationResponse.notFound('Music settings')
            }

            const findUniqueArtist = await this.artistsRepository.findUnique({
                id: data.artistId
            })

            if (!findUniqueArtist) {
                return normalizationResponse.conflict('The artist does not own this song')
            }

            const updateMusic = await this.musicsRepository.update({
                id,
                data: {
                    ...data
                }
            })

            if (!updateMusic) {
                return normalizationResponse.notFound('Music')
            }

            return normalizationResponse.ok({ music: updateMusic })
        } catch (error) {
            return normalizationResponse.serverError(error.message)
        }
    }
}

export {
    UpdateMusic
}