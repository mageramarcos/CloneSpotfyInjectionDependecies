
import { MusicsRepository } from 'src/application/repository/musics/MusicsRepository'
import { Response, normalizationResponse } from '../../../shared/utils/response'
import { IUseCase } from '../../../shared/utils/use_cases'
import { IMusics } from 'src/application/entities/IMusics'
import { ArtistsRepository } from 'src/application/repository/artists/ArtistsRepository'

type CreateMusicRequest = {
    title: string
    description: string
    artistId: string
}
type T = CreateMusicRequest
type CreateMusicResponse = {
    music: IMusics
}
type K = CreateMusicResponse

class CreateMusic implements IUseCase<T, K> {
    constructor
        (
            private musicsRepository: MusicsRepository,
            private artistsRepository: ArtistsRepository) { }

    async execute({ title, description, artistId, }: T): Promise<Response<K>> {
        try {

            if (!title || !description || !artistId) {
                return normalizationResponse.notFound('Music settings')
            }

            const findUniqueArtist = await this.artistsRepository.findUnique({
                id: artistId
            })

            if (!findUniqueArtist) {
                return normalizationResponse.conflict('Artist does not exist')
            }

            const createMusic = await this.musicsRepository.create({
                data: {
                    title,
                    description,
                    artistId
                }
            })

            return normalizationResponse.ok({ music: createMusic })
        } catch (error) {
            return normalizationResponse.serverError(error.message)
        }
    }

}

export {
    CreateMusic
}