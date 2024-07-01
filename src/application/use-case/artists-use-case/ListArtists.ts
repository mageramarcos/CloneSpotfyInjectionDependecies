import { ArtistsRepository } from '../../repository/artists/ArtistsRepository'
import { Response, normalizationResponse } from '../../../shared/utils/response'
import { IUseCase } from '../../../shared/utils/use_cases'
import { IArtists } from '../../entities/IArtists'

type ListArtistsRequest = {}
type T = ListArtistsRequest
type ListArtistsResponse = {
    artists: IArtists[]
}
type K = ListArtistsResponse

class ListArtists implements IUseCase<T, K> {
    constructor(private artistsRepository: ArtistsRepository) { }

    async execute({ }: T): Promise<Response<K>> {
        try {

            const listArtists = await this.artistsRepository.findMany({})

            return normalizationResponse.ok({ artists: listArtists })
        } catch (error) {
            return normalizationResponse.serverError(error.message)
        }
    }
}

export {
    ListArtists
}