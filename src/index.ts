import express, { Express, Request, Response } from 'express'
import productRouter from './router/productRouter'
import dotenv from 'dotenv'
dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
  res.send('123')
})

app.use('/product', productRouter)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
