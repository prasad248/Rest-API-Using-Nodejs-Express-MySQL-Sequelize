const express = require('express');

const app = express();
const cors = require('cors');

var corsOptions={
    origin:'https://localhost:8081'
}

// middlewares
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended:true}));

// routers
const router = require('./routers/productRouters.js')
app.use('/api/products',router)


//testing api

app.get('/', (req,res)=>{
    res.json({message:'hello from node'})
});
//port
const port=process.env.PORT||8080
 
//server
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
});