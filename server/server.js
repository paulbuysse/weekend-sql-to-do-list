const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;
const router = require('./routes/task-router')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.use('/tasks', router);

app.listen(PORT, () => {
    console.log('up on port:', PORT);
});