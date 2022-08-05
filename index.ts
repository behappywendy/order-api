import express, { Express, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'
import productRouter from './router/productRouter'
import userRouter from './router/userRouter'
import cartRouter from './router/cartRouter'
import orderRouter from './router/orderRouter'
import dotenv from 'dotenv'
dotenv.config()

const swaggerDocument = require('../swagger.json')
const app: Express = express()
const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
  res.send('123')
})
app.use(
  cors({
    // origin: 'http://localhost:8080',
    origin: '*',
  })
)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/product', productRouter)
app.use('/user', userRouter)
app.use('/cart', cartRouter)
app.use('/order', orderRouter)

app.get('/test', (req, res) => {
  res.send(req.headers)
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
