import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import productRouter from './router/productRouter'
import userRouter from './router/userRouter'
import cartRouter from './router/cartRouter'
import orderRouter from './router/orderRouter'
import dotenv from 'dotenv'
dotenv.config()

const app: Express = express()
// const port = process.env.PORT
const port = 3001

app.get('/', cors(), (req: Request, res: Response) => {
  res.send('123')
})
app.use(
  cors({
    origin: `http://localhost:8080`,
  })
)
app.use('/product', productRouter)
app.use('/user', userRouter)
app.use('/cart', cartRouter)
app.use('/order', orderRouter)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
