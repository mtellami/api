import { Request } from 'express'
import * as fs from 'fs'

const dirname = './uploads'
if (!fs.existsSync(dirname)) {
	fs.mkdirSync(dirname)
}

const MulterConfig = {
	dest: dirname,
	fileFilter: (_: Request, file: Express.Multer.File, cb: any) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false)
  	}
  	cb(null, true)
  },
  limits: {
    fileSize: 10 * 1024 * 1024
  }
}

export default MulterConfig
