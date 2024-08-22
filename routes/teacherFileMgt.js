const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");
const {v4: uuidv4} = require("uuid");
const router = express.Router();
const TeachingMaterial = require("../model/TeachingMaterial");
const auth = require("../middleware/authMiddleware");

// AWS s3 configuration
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({storage});

// Route to handle file upload
router.post('/upload-material', auth, upload.single("file"), async(req, res) =>{
    const file = req.file;
    const teacherId = req.user._id;
    const fileName = `${uuidv4()}-${file.originalname}`;

    // upload the file to S3
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype
    };

    try{
        const uploadResult = await s3.upload(params).promise();

        // save file metadata to MongoDB
        const newMaterial = new TeachingMaterial({
            title: req.body.title,
            s3FileUrl: uploadResult.Location,       // s3 url of the uploaded file
            subject: req.body.subject,
            teacher: teacherId,
        });

        // Save the file to the db
        await newMaterial.save();
        res.status(201).json({message: "File uploaded successfully", material: newMaterial});
    }catch(err){
        console.error(err);
        res.status(500).json({error: "File upload failed"});
    }
});

module.exports = router;