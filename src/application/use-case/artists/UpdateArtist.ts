
import { ArtistsRepository } from '../../repository/artists/ArtistsRepository'
import { Response, normalizationResponse } from '../../../shared/utils/response'
import { IUseCase } from '../../../shared/utils/use_cases'
import { IArtists } from '../../entities/IArtists'

type UpdateArtistRequest = {
    id: string
    data: Omit<IArtists,
        | 'id'
        | 'created_at'
        | 'updated_at'
    >
}
type T = UpdateArtistRequest
type UpdateArtistResponse = {
    artist: IArtists
}
type K = UpdateArtistResponse

class UpdateArtist implements IUseCase<T, K> {
    constructor(private artistsRepository: ArtistsRepository) { }

    async execute({ id, data }: T): Promise<Response<K>> {
        try {

            if (!id || !data) {
                return normalizationResponse.notFound('Artist settings')
            }

            const updateArtist = await this.artistsRepository.update({
                id,
                data: {
                    ...data,
                }
            })

            if (!updateArtist) {
                return normalizationResponse.notFound('Artist')
            }

            return normalizationResponse.ok({ artist: updateArtist })
        } catch (error) {
            return normalizationResponse.serverError(error.message)
        }
    }
}

export {
    UpdateArtist
}