const { response } = require('express');
const express = require('express');
const ProductService = require('./../services/product.service')

const router = express.Router();
const service = new ProductService()

router.get('/', async (req, res) => {
  const products = await service.find()
  res.json(products)
})

router.post('/', async (req, res) => {
  const body = req.body
  const response = await service.create(body)
  res.status(201).json({
    message: 'created',
    data: response
  })
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body)
    res.json({
      message: 'updated',
      data: product
    })
  }
  catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await service.delete(id)
  res.json({
    message: 'deleted',
    data: response
  })
})

// Endpoints especificos van antes de los dinamicos
router.get('/filter', (req, res) => { // especificos
  res.send('Soy un filter')
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await service.findOne(id)
  res.json(product)
})

module.exports = router;
