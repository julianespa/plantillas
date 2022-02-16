const express = require('express'); //importar express
const productRouter = require('./routes/products') // Importo ruta de productos

const  app = express(); //instanciar express
// Permitir a express usar JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Carpeta public
app.use(express.static(__dirname+'/public'))

app.set('views', __dirname+'/views')
app.set('view engine', 'ejs')

app.use('/',productRouter)  // Instancio la ruta a productos

// Iniciar servidor
const PORT = 8080;
const server = app.listen(PORT,()=>console.log(`Listening on ${PORT}`));
