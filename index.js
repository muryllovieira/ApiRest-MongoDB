//configuração inicial

//dependencias
    //nodemon
    //express
    //mongoose
    //npm init -y
    //npm install express nodemon mongoose
    
const express = require('express');
const mongoose = require('mongoose');
const app = express();

//forma de ler json / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

//rotas da api
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

//rota inicial / endpoint
app.get('/', (req, res) => {

    //mostrar req
    res.json({message: 'Oi Express!'});

})

//cJp1WPZQMqvRqWwR

//mongodb+srv://muryllo:<password>@cluster0.o5yl5tp.mongodb.net/?retryWrites=true&w=majority

//entregar uma porta
const DB_USER = 'muryllo'
const DB_PASSWORD = encodeURIComponent('a8fx7Liz0eH3wj8X')

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.o5yl5tp.mongodb.net/ApiRest-NodeJS?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log('Servidor Conectado pelo MongoDB, porta 8080');
        app.listen(8080)
    })
    .catch((err) => console.log(err))

