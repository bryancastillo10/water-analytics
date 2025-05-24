import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import path from 'path';

export const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    cb(null, 'assets/');
  },
  filename: function (req: Request, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
