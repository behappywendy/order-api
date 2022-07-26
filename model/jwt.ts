import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

declare module 'jsonwebtoken' {
  export interface UserJwtPayload extends jwt.JwtPayload {
    id: number
  }
}

export const getUserFromJwt = (token: string): number | undefined => {
  try {
    const { id } = <jwt.UserJwtPayload>jwt.verify(token, process.env.SECRET!)
    return id
  } catch (error) {
    return undefined
  }
}

export const signJwt = (payload: any) => {
  const token = jwt.sign(payload, process.env.SECRET!, { expiresIn: '1 day' })
  return token
}
