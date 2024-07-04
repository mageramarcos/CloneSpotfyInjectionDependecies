import { FastifyRequest, FastifyReply } from 'fastify'
import { IWrappedUseCase } from '../../shared/utils/use_cases'

interface IApplyUseCaseOptions {
    param_key?: string
    separate_body?: boolean
}

const applyUseCase = (
    useCase: () => IWrappedUseCase<unknown, unknown>,
    options?: IApplyUseCaseOptions
) => {
    return async (
        req: FastifyRequest<{
            Querystring: Record<string, unknown>,
            Params: Record<string, unknown>,
            Body: Record<string, unknown>
        }>,
        res: FastifyReply
    ) => {
        let data = { ...req.query, ...req.params, ...req.body }
        if (options !== undefined) {
            const { param_key, separate_body } = options
            if (separate_body) {
                const { user_id, holder_id, ...body } = data
                data = {
                    user_id,
                    holder_id,
                    data: body
                }
            }

            if (param_key !== undefined) {
                data[param_key] = req.params.id
            }
        }

        const {
            status_code,
            process,
            body
        } = await useCase().handle(data)

        return res.status(status_code).send({ process, body })
    }
}

export {
    applyUseCase
}