import jwt from 'jsonwebtoken'
import "dotenv/config"

export interface ITokens {
    token: string
}

export interface IGenerateAppTokens {
    user_id: string
}

export const generateAppTokens = ({
    user_id

}: IGenerateAppTokens) => {
    const token = jwt.sign(
        { user_id },
        process.env.AUTH_ACCESS_SECRET || '',
        { expiresIn: process.env.AUTH_ACCESS_EXPIRES }
    )
    return { token }
}

export const verifyToken = (bearerToken: string) => {
    return jwt.verify(bearerToken, process.env.AUTH_ACCESS_SECRET || '') as IGenerateAppTokens
}