import { existsSync, mkdirSync } from "fs";

import multer from "multer";

const customStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const filedir = `./photos/${req.params.collectionID}`;
        if (!existsSync()) {
            mkdirSync(filedir);
        }
        cb(null, filedir);
    },

    filename: (_, file, cb) => {
        cb(null, file.originalname);
    }
});


const upload = multer({ storage: customStorage });

export { upload };