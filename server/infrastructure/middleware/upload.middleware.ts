import multer from "multer";
import { Request } from "express";

import { storage } from "@/utils/multer";

export const upload = multer({
    storage: storage,
    fileFilter: (req: Request, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
        const isMimeTypeValid = allowedTypes.includes(file.mimetype);
        if (isMimeTypeValid) {
            cb(null, true);
          } else {
            cb(new Error(`Invalid file type. Allowed types are: ${allowedTypes.join(", ")}`));
          }
        },
        limits: {
          fileSize: 5 * 1024 * 1024,
        },
});
