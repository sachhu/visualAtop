const express = require('express');
const cors = require('cors');
const {runAtop} = require('../util/runAtop');

const app = express();
app.use(cors());

app.get('/api/runatop', async (req, res)=>{
    let atopResult = await runAtop();
    return res.send(JSON.stringify(atopResult));
});


app.listen(3000,()=>{
    console.log('server running');
})