const express = require('express');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');

dotenv.config();
const s3 = new AWS.S3();
const app = express();

app.get('/download/:userId/:videoId/:fileName', async (req, res) => {
    const { userId, videoId, fileName } = req.params;
    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: `${userId}/${videoId}/${fileName}`,
    };

    try {
        const data = await s3.getObject(params).promise();
        res.status(200).send(data.Body);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Download service running on port 3000'));
