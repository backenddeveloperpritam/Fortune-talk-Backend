import { v2 as cloudinary } from "cloudinary"
import fs from "fs"


cloudinary.config({
    cloud_name: "dkeuz2t34",
    api_key: "274212448482754",
    api_secret: "cPjNHnpbjgBjeTBJ8X7KvLYdjD4"
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
<<<<<<< HEAD
        //console.log("file is uploaded on cloudinary ", response.url);
=======
        // console.log("file is uploaded on cloudinary ", response.url);
>>>>>>> 521c435031bb9479ac3b4beb05fffd3768c7d6d2
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



export { uploadOnCloudinary }