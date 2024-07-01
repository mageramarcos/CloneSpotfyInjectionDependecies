import { ArtistsRepository } from '../../repository/artists/ArtistsRepository'
import { Response, normalizationResponse } from '../../../shared/utils/response'
import { IUseCase } from '../../../shared/utils/use_cases'
import { IArtists } from '../../entities/IArtists'
import bcrypt from 'bcrypt'



type CreateArtistRequest = {
    name: string
    email: string
    password: string

}
type T = CreateArtistRequest
type CreateArtistResponse = {
    artist: IArtists
}
type K = CreateArtistResponse

class CreateArtist implements IUseCase<T, K> {
    constructor(private artistsRepository: ArtistsRepository) { }

    async execute({ name, email, password }: T): Promise<Response<K>> {
        try {

            if (!name || !email || !password) {
                return normalizationResponse.notFound('Artist settings')
            }

            const passwordEncrypted = await bcrypt.hash(password, 10)

            const createArtist = await this.artistsRepository.create({
                data:
                {
                    name,
                    email,
                    password: passwordEncrypted
                }
            })
            return normalizationResponse.ok({ artist: createArtist })

        } catch (error) {
            return normalizationResponse.serverError(error.message)
        }
    }

}

export {
    CreateArtist
}