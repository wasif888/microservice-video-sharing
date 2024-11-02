const express = require('express');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');

dotenv.config();
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const app = express();
app.use(express.json());

app.post('/metadata', async (req, res) => {
    const { videoId, userId, fileName, s3Url } = req.body;
    const params = {
        TableName: process.env.DYNAMO_TABLE,
        Item: {
            videoId: videoId,
            userId: userId,
            fileName: fileName,
            timestamp: new Date().toISOString(),
            s3Url: s3Url,
        },
    };

    try {
        await dynamoDB.put(params).promise();
        res.status(200).json({ message: 'Metadata saved' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Metadata service running on port 3000'));
