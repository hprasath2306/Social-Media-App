import { upload } from "cloudinary-react-native";
import { UploadApiResponse } from "cloudinary-react-native/lib/typescript/src/api/upload/model/params/upload-params";
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
    cloud: {
        cloudName: 'dat8pcpqz'
    }
  });

export const uploadImage = async (file:string) => {
    
    const options = {
      upload_preset: "Default",
      unsigned: true,
    };

    return new Promise<UploadApiResponse>(async (resolve, reject) => {
      await upload(cld, {
        file,
        options: options,
        callback: (error: any, response: any) => {
          if(error || !response) {
            reject(error);
          } else {
            resolve(response);
          }
        },
      });
    });
  };