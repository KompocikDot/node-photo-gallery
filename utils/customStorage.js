import { existsSync, mkdirSync } from "fs";

import multer from "multer";

const customStorage = multer.diskStorage({
    destination: (req, _, cb) => {
        const filedir = `./photoStorage/${req.params.collectionID}`;
        if (!existsSync(filedir)) {
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