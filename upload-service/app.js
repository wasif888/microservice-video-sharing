const express = require('express');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');

dotenv.config();
const s3 = new AWS.S3();
const app = express();
app.use(express.json());

app.post('/upload', async (req, res) => {
    const { userId, fileName, fileContent } = req.body;
    const videoId = uuidv4();
    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: `${userId}/${videoId}/${fileName}`,
        Body: Buffer.from(fileContent, 'base64'),
    };

    try {
        await s3.upload(params).promise();
        res.status(200).json({ videoId, message: 'Upload successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Upload service running on port 3000'));
