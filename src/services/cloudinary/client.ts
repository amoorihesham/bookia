import { env } from '@/data/env/server';
import { env as envClient } from '@/data/env/client';
import { v2 as Cloudinary } from 'cloudinary';

Cloudinary.config({
  api_secret: env.CLOUDINARY_API_SECRET,
  api_key: envClient.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  cloud_name: envClient.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
});

const cloudinary = Cloudinary;

export default cloudinary;
