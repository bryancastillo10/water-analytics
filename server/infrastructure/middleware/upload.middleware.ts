import multer from "multer";
import { Request } from "express";
import path from "path";

import { storage } from "@/utils/multer";

export const upload = multer({
    storage: storage,
    fileFilter: (req: Request, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp/;
        const extName = allowedTypes.test(path.extname(file.originalname).toLocaleLowerCase());
        const mimeType = allowedTypes.test(file.mimetype);

        if (extName && mimeType) {
            return cb(null, true);
        }
        cb(new Error("Only image file types are allowed"));
    },
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});
