const express = require('express')  // Importo express
const ProductManager = require('../Manager/products')  // Importo el manager de productos
const uploader = require('../services/upload') // Importo el uploader

const router = express.Router()  // Instancio las rutas

const porductService = new ProductManager() // Instancio los metodos de productos



// Metodo GET
router.get('/products',(req,res)=>{
    porductService.get()
    .then(r=>res.render('products',{products:r.payload}))
})

// Metodo GET by ID
router.get('/products/:id',(req,res)=>{
    let id = req.params.id
    porductService.getById(id)
    .then(r=>res.send(r))
})

// Metodo POST con middleware (uploader de multer)
router.post('/products', uploader.single('file'), (req,res)=>{
    let product = req.body
    let file = req.file
    if(!file) return res.status(500).send({error:"Couldn't upload file"})
    product.thumbnail = req.protocol+"://"+req.hostname+":8080/img/"+file.filename
    porductService.add(product)
    .then(r=>res.send(r))
})

// Metodo PUT
router.put('/products/:id',(req,res)=>{
    let id = parseInt(req.params.id)
    let updatedProduct = req.body
    porductService.updateById(id, updatedProduct)
    .then(r=>res.send(r))
})

// Metodo DELETE by ID
router.delete('/products/:id',(req,res)=>{
    let id = req.params.id
    porductService.deleteById(id)
    .then(r=>res.send(r))
})

module.exports = router