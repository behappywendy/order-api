import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import productRouter from './router/productRouter'
import userRouter from './router/userRouter'
import dotenv from 'dotenv'
dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.get('/', cors(), (req: Request, res: Response) => {
  res.send('123')
})
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)
app.use('/product', productRouter)
app.use('/user', userRouter)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
