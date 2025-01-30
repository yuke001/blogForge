import express from 'express'
import { login, register,updateProfile } from '../controllers/userControllers.js';
import multer from 'multer';
import storage from "../middlewares/fileUpload.js";

let upload=multer({storage:storage,
    limits:{fileSize:1*1024*1024}
})
let router =express.Router();

// router.post("/register",register);
router.post("/register",upload.single("photo"),register);
router.post("/login",login);

router.patch("/profile/:id",upload.single("photo"),updateProfile);


export default router;