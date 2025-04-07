import { v2 as cloudinary } from 'cloudinary';
import config from '../app/config';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configuration
cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret_key,
});

export const sendImageToCloudinary = async (imageName: string, path: any) => {
  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(path, {
      public_id: imageName,
    })
    .catch((error) => {
      console.log(error);
    });

  //delete image from local file:
  await fs.unlink(path, (error) => {
    if (error) {
      console.log(error);
    } else {
      // console.log('file deleted');
    }
  });

  return uploadResult;
};

//this is multer for save file to local folder:
const uploadDir = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
