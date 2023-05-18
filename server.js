
const express = require('express');
const buscas = require('./buscas')
const vento = require('./vento')
const POTENCIA_PLACA = require('./potencia_placa')
const POTENCIA_TURBINA = require('./potencia_turbina')
const TENSAO_PLACA = require('./tensao_placa')
const CORRENTE_PLACA = require('./corrente_placa')
const CORRENTE_TURBINA = require('./corrente_turbina')
const TENSAO_TURBINA = require('./tensao_turbina')
let data;
const app = express();

app.use(express.json());

app.use(function (req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

const PORT = 3000;

app.listen(PORT, () => { console.log(`Rodando na porta ${PORT}`) })



app.get('/', async (req, res) => {
    let query = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        query = await buscas(data);
        return res.status(201).json(query);

})

app.get('/vento', async (req, res) => {
    let query = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        query = await vento(data);
        return res.status(201).json(query);
})

app.post("/data", (req, res) => {
    data = req.body.Data_calendario
    return res.status(201).json(data);

});

app.get('/potencia_placa', async (req, res) => {
    let query = 0
        query = await POTENCIA_PLACA(data);
        return res.status(201).json(query);
})

app.get('/potencia_turbina', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let query = 0
        query = await POTENCIA_TURBINA(data);
        return res.status(201).json(query);
})

app.get('/tensao_placa',async (req,res) => {
    let query =0
    query = await TENSAO_PLACA(data)
    return res.status(201).json(query)
})

app.get('/corrente_placa',async (req,res) => {
    let query =0
    query = await CORRENTE_PLACA(data)
    return res.status(201).json(query)
})

app.get('/tensao_turbina',async (req,res) => {
    let query =0
    query = await TENSAO_TURBINA(data)
    return res.status(201).json(query)
})

app.get('/corrente_turbina',async (req,res) => {
    let query =0
    query = await CORRENTE_TURBINA(data)
    return res.status(201).json(query)
})