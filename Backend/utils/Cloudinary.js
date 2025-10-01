import { v2 as cloudinary } from 'cloudinary';
import dotenv from"dotenv";
dotenv.config();

   // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_Name, 
        api_key: process.env.API_key, 
        api_secret: process.env.API_Secret // Click 'View API Keys' above to copy your API secret
    });

    export default cloudinary