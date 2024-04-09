const cloudinary = require('cloudinary').v2

const dotenv = require('dotenv')

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  })

  exports.uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(
            file,
            { resource_type: "auto", folder: folder }, // options object here
            (error, result) => {
                if (error) {
                    // Handle error if any
                    console.error(error);
                    resolve(null); // Resolving with null as there's an error
                } else {
                    resolve({
                        url: result.url,
                        result: result.public_id
                    });
                }
            }
        );
    });
};

  