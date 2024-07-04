import joi from 'joi'
import { ArtistsRepository } from '../../repository/artists/ArtistsRepository'
import { Response, normalizationResponse } from '../../../shared/utils/response'
import { IUseCase } from '../../../shared/utils/use_cases'
import { IArtists } from '../../entities/IArtists'

type GetUniqueArtistRequest = {
    id: string
}
type T = GetUniqueArtistRequest
type GetUniqueArtistResponse = {
    artist: IArtists | null
}
type K = GetUniqueArtistResponse

class GetUniqueArtist implements IUseCase<T, K> {
    constructor(private artistsRepository: ArtistsRepository) { }

    async execute({ id }: T): Promise<Response<K>> {
        try {

            const schemaValidate = joi.object({
                id: joi.string().required()
            })

            const { error } = schemaValidate.validate({ id })
            if (error) {
                return normalizationResponse.notFound('Artist')
            }

            // if (!id) {
            //     return normalizationResponse.notFound('Artist')
            // }

            const getUniqueArtist = await this.artistsRepository.findUnique({ id })

            if (!getUniqueArtist) {
                return normalizationResponse.notFound('Artist')
            }

            return normalizationResponse.ok({ artist: getUniqueArtist })
        } catch (error) {
            return normalizationResponse.serverError(error.message)
        }
    }
}

export {
    GetUniqueArtist
}