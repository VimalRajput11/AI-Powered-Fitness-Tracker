import express from 'express';
import bodyParser from 'body-parser';
import gemini from './controllers/Gemini.js';

const app = express();


app.use(bodyParser.json());
app.use(express.static("public"));
app.use(gemini);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
