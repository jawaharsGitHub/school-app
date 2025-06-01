import express from 'express'
import multer from 'multer'
import fs from 'fs'
import path from 'path'

export const uploadRouter = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.body.tempFolder // passed from frontend
    const dir = path.join('uploads/temp', folder)
    fs.mkdirSync(dir, { recursive: true })
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

uploadRouter.post('/upload', upload.single('file'), (req, res) => {
  res.json({ message: 'File uploaded successfully' })
})
