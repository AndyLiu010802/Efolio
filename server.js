import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE', 
    credentials: true, 
  }));

const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Hello from Node.js!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});






