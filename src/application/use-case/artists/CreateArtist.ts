import joi from 'joi'
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

            const schemaValidate = joi.object({
                name: joi.string().required(),
                email: joi.string().email().required(),
                password: joi.string().required()
            })
            const { error } = schemaValidate.validate({ name, email, password })
            if (error) {
                return normalizationResponse.notFound('Artist settings')
            }

            // if (!name || !email || !password) {
            //     return normalizationResponse.notFound('Artist settings')
            // }

            const artistEmail = await this.artistsRepository
                .findByEmail({ email })

            if (artistEmail) {
                return normalizationResponse.conflict('Email already exists')

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