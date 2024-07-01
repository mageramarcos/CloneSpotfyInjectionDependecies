import { ArtistsRepository } from '../../repository/artists/ArtistsRepository'
import { Response, normalizationResponse } from '../../../shared/utils/response'
import { IUseCase } from '../../../shared/utils/use_cases'

type DeleteArtistRequest = {
    id: string
}
type T = DeleteArtistRequest
type DeleteArtistResponse = {
    message: string
}
type K = DeleteArtistResponse

class DeleteArtist implements IUseCase<T, K> {
    constructor(private artistsRepository: ArtistsRepository) { }

    async execute({ id }: T): Promise<Response<K>> {
        try {

            if (!id) {
                return normalizationResponse.notFound('Id')
            }

            const deleteArtist = await this.artistsRepository.delete({ id })


            if (!deleteArtist) {
                return normalizationResponse.notFound('Artist')
            }

            return normalizationResponse.ok({ message: "Successfully Deleted" })
        } catch (error) {
            return normalizationResponse.serverError(error.message)
        }
    }

}

export {
    DeleteArtist
}