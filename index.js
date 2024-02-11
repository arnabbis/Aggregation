const express = require('express');
const mongoose = require('mongoose');
const router = require('./route');
const app = express();
let PORT = 3000;
app.use(express.json());
mongoose.connect('mongodb+srv://amit_singh:kya_hal_hai_tere@cluster0.jpqo2bq.mongodb.net/Aggregation').then(()=>{
    console.log('Connected to MongoDB');
}).catch(err => console.log(err));
app.use("/api",router);
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})