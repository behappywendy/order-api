import { Request, Response } from 'express'
import { knex } from '../model/mysql'
import moment from 'moment-timezone'
import { Users } from 'knex/types/tables'

export const createUser = (req: Request, res: Response) => {
  const { userName, userPassword, adminPermission } = req.body
  const nowTime = moment.tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
  knex('users')
    .insert({
      createTime: nowTime,
      updateTime: nowTime,
      userName,
      userPassword,
      adminPermission,
    })
    .then((result: any) => {
      res.send(result)
    })
}

export const readUser = (req: Request, res: Response) => {
  const { id } = req.params
  knex('users')
    .select('*')
    .where('userId', id)
    .then((result: Users[]) => {
      result[0].createTime = moment(result[0].createTime).format(
        'YYYY-MM-DD HH:mm:ss'
      )
      result[0].updateTime = moment(result[0].updateTime).format(
        'YYYY-MM-DD HH:mm:ss'
      )
      res.send(result)
    })
}

export const readUsers = (req: Request, res: Response) => {
  knex('users')
    .select('*')
    .then((result: Users[]) => {
      result.forEach((element) => {
        element.createTime = moment(element.createTime).format(
          'YYYY-MM-DD HH:mm:ss'
        )
        element.updateTime = moment(element.updateTime).format(
          'YYYY-MM-DD HH:mm:ss'
        )
      })
      res.send(result)
    })
}

export const updateUser = (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const { userName, userPassword, adminPermission } = req.body
  const nowTime = moment.tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
  knex('users')
    .where('userId', id)
    .update({
      updateTime: nowTime,
      userName,
      userPassword,
      adminPermission,
    })
    .then((result: any) =>
      res.status(!!result ? 200 : 404).json({ success: !!result })
    )
    .catch((error: any) => res.status(500).json(error))
}

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params
  await knex('users')
    .where('userId', id)
    .del()
    .then((result: any) =>
      res.status(!!result ? 200 : 404).json({ success: !!result })
    )
    .catch((error: any) => res.status(500).json(error))
}
