import { Request } from "express-serve-static-core";
import { diskStorage } from "multer";
import path, { extname } from "path";


type Callback = (error: null | Error, val: any) => void;
type File = Express.Multer.File;

export namespace uploads {
  export const options = {
    storage: diskStorage({
      destination: path.join(__dirname, '../upload'),
      filename: function (req, file, cb) {
        console.log('filenamefilenamefilename', file)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.csv')
      }
    }),
    fileFilter: (req: Request, file: File, cb: Callback) => {
      console.log('isvaliddd', file)
      const isValid = file.mimetype == "text/csv" && extname(file.originalname) == ".csv";
      // console.log(`Uploaded file with mime type ${file.mimetype} is ${isValid ? "valid" : "invalid"}.`);
      cb(null, isValid);
    },
    limits: {
      fieldNameSize: 255,
      fileSize: 1024 * 1024 * 2
    }
  };
}