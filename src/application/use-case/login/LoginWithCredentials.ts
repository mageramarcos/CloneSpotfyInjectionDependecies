import bcrypt from 'bcrypt'
import { ArtistsRepository } from '../../repository/artists/ArtistsRepository'
import { Response, normalizationResponse } from '../../../shared/utils/response'
import { IUseCase } from '../../../shared/utils/use_cases'
import { ITokens, generateAppTokens } from '../../../shared/utils/jwt'

type LoginWithCredentialsRequest = {
    email: string
    password: string
}
type T = LoginWithCredentialsRequest
type LoginWithCredentialsResponse = ITokens
type K = LoginWithCredentialsResponse

class LoginWithCredentials implements IUseCase<T, K> {
    constructor(
        private usersRepository: ArtistsRepository,
    ) { }

    async execute({ email, password }: T): Promise<Response<K>> {
        try {

            const user = await this.usersRepository
                .findByEmail({ email })

            if (user !== null) {
                const passwordMatch = await bcrypt
                    .compare(password, user.password)
                if (passwordMatch) {
                    const tokens = generateAppTokens({
                        user_id: user.id
                    })

                    return normalizationResponse.ok(tokens)
                }
            }

            return normalizationResponse.unauthorized()
        } catch (error) {
            return normalizationResponse.serverError(error.message)
        }
    }
}

export {
    LoginWithCredentials
}