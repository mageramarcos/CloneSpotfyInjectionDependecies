import { FastifyRequest, FastifyReply } from 'fastify'
import { normalizationResponse } from '../../shared/utils/response'
import { verifyToken } from '../../shared/utils/jwt'
import { DrizzleArtistsRepository } from 'src/application/repository/implementations/DrizzleArtistsRepository'


interface FindUniqueParams {
    id: string;
}

const authenticate = async (
    req: FastifyRequest,
    reply: FastifyReply
) => {
    const bearer = req.headers.authorization || ''
    const token = bearer.split(' ')[1]

    try {
        if (token) {
            const decoded = verifyToken(token)
            let hasUser = false

            const usersRepository = new DrizzleArtistsRepository()
            hasUser = await usersRepository.findUnique({
                id: decoded.user_id
            } as FindUniqueParams) !== null

            if (!hasUser) {
                return Promise.reject(reply.status(401).send(normalizationResponse.unauthorized()))
            }

            return Promise.resolve()
        }
    } catch (e) {
        if (e.name !== 'TokenExpiredError' && e.name !== 'JsonWebTokenError') {
            console.log(e)
        }
    }

    return Promise.reject(reply.status(401).send(normalizationResponse.unauthorized()))
};

export { authenticate }