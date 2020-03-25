const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);



app.listen(3333);

//query params enviados na rota apos '?' acesso por request.query

//ROute params enviados na rota usando ':' acesso por request.params

//Body 

//query builder