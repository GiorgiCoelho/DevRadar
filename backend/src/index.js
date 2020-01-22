const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const http = require('http');
const { setupWebSocket } = require('./websocket');

//Inicia aplicação express
const app = express();
const server = http.Server(app);

setupWebSocket(server);

//Faz conexão ao banco mongoDB que está no DBAtlas.
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-nnrpc.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
//Permite que todas às rotas entendam parâmetros em JSON.
app.use(express.json());
app.use(routes);

server.listen(3333);