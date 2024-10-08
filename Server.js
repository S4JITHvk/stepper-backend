const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('./Config/Db.js');
const app = express();
const Router = require('./Routes/Router.js');
const PORT=5000
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

//cors
app.use(cors({
    origin:["https://stepper-app.vercel.app"],
    credentials:true
}));

app.use('/api', Router);

app.listen(PORT, (error) => {
    if (error) {
        console.error('Error starting the server:', error);
    } else {
        console.log(`Server running at http://localhost:${PORT}`);
    }
});
