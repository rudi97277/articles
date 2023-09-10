import { HttpException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const storage = diskStorage({
  destination: './public/img',
  filename: (req, file, callback) => {
    callback(null, generateFilename(file));
  },
});

function generateFilename(file) {
  return `${randomUUID()}${extname(file.originalname)}`;
}

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new HttpException('Only image files are allowed!', 422),
      false,
    );
  }
  callback(null, true);
};
