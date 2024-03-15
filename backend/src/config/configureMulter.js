import multer from 'multer';
import path from 'path';
import { mkdir } from 'fs';
import { promisify } from 'util';

const mkdirAsync = promisify(mkdir);

export const configureMulterSingle = (fieldName = 'image', destinationFolder = '') => {
  const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
      const folderPath = path.join('src/uploads', destinationFolder);
      try {
        await mkdirAsync(folderPath, { recursive: true });
        cb(null, folderPath);
      } catch (err) {
        cb(err);
      }
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extname = path.extname(file.originalname);
      cb(null, fieldName + '-' + uniqueSuffix + extname);
    }
  });

  return multer({ storage }).single(fieldName);
};

export const configureMulterArray = (fieldName = 'documents', destinationFolder = '') => {
  const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
      const folderPath = path.join('src/uploads', destinationFolder);
      try {
        await mkdirAsync(folderPath, { recursive: true });
        cb(null, folderPath);
      } catch (err) {
        cb(err);
      }
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extname = path.extname(file.originalname);
      cb(null, fieldName + '-' + uniqueSuffix + extname);
    }
  });

  return multer({ storage }).array(fieldName, 15);
};

export const configureMulterMixed = (destinationFolder = '', names = []) => {
  const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
      const folderPath = path.join('src/uploads', destinationFolder);
      try {
        await mkdirAsync(folderPath, { recursive: true });
        cb(null, folderPath);
      } catch (err) {
        cb(err);
      }
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extname = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + extname);
    }
  });

  return multer({
    storage
  }).fields(names.map(name => ({ name, maxCount: 1 })));
};
