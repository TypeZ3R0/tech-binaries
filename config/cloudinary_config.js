import { v2 } from "cloudinary";
const cloudinary = v2;

const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinaryAPIKey = process.env.CLOUDINARY_API_KEY;
const cloudinaryAPISecret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
    cloud_name: cloudinaryCloudName,
    api_key: cloudinaryAPIKey,
    api_secret: cloudinaryAPISecret,
});

export default cloudinary;
