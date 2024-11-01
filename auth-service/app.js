const express = require('express');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');

dotenv.config();
const cognito = new AWS.CognitoIdentityServiceProvider();
const app = express();
app.use(express.json());

app.post('/signup', async (req, res) => {
    const { username, password, email } = req.body;
    const params = {
        ClientId: process.env.APP_CLIENT_ID,
        Username: username,
        Password: password,
        UserAttributes: [{ Name: 'email', Value: email }],
    };

    try {
        await cognito.signUp(params).promise();
        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: process.env.APP_CLIENT_ID,
        AuthParameters: { USERNAME: username, PASSWORD: password },
    };

    try {
        const result = await cognito.initiateAuth(params).promise();
        res.status(200).json(result.AuthenticationResult);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Auth service running on port 3000'));
