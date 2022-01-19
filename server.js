const express = require('express');

const app = express();
const port = process.env.PORT || 3040;

app.use(express.json());

const accountRouter = require('./routes/accountRouter');
const transactionRouter = require('./routes/transactionRouter');

app.use('/accounts', accountRouter);
app.use('/transactions', transactionRouter);

app.get('/', (req, res) => {
    res.send('Individual Money Account by Rae Painter');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});