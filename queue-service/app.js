const express = require('express');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const sqs = new AWS.SQS({ region: process.env.AWS_REGION });

app.use(express.json());


app.get('/poll', async (req, res) => {
    const params = {
        QueueUrl: process.env.SQS_QUEUE_URL,
        MaxNumberOfMessages: 10,  
        WaitTimeSeconds: 10,      
    };

    try {
        const data = await sqs.receiveMessage(params).promise();
        if (data.Messages) {
            res.status(200).json({ messages: data.Messages });
            
            data.Messages.forEach(async (message) => {
                console.log("Processing message:", message.Body);
                
                
                const deleteParams = {
                    QueueUrl: process.env.SQS_QUEUE_URL,
                    ReceiptHandle: message.ReceiptHandle,
                };
                await sqs.deleteMessage(deleteParams).promise();
            });
        } else {
            res.status(200).json({ message: 'No messages to process' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Queue service running on port 3000'));
