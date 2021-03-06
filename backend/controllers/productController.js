import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {}

  const products = await Product.find({ ...keyword })
  // throw new Error('aaa')
  res.json(products)
})

// @desc    Get product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if(product) {
    res.send(product)
  } else {
    res.status(404)
    throw new Error('Product not Found')
  }
})

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if(!product) {
    throw new Error('Product not Found')
  }

  await product.remove()
  res.json(product)
})

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0, 
    numReviews: 0,
    description: 'Sample description'
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})


// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name, price, image, description, brand, category, countInStock
  } = req.body

  const product = await Product.findById(req.params.id)

  if(!product) {
    res.status(404)
    throw new Error('Product not Found')
  }

  product.name = name
  product.price = price
  product.description = description
  product.image = image
  product.brand = brand
  product.category = category
  product.countInStock = countInStock

  const updatedProduct = await product.save()
  res.json(updatedProduct)
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment} = req.body

  const product = await Product.findById(req.params.id)

  if(!product) {
    res.status(404)
    throw new Error('Product not Found')
  }

  const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
  if(alreadyReviewed){
    res.status(400)
    throw new Error('Product already reviewed')
  }

  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id
  }

  product.reviews.push(review)
  product.numReviews += 1
  product.rating = product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length

  await product.save()

  res.status(201)
  res.json({ message: 'Review Added' })
})

// @desc    Get top products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1}).limit(3)
  if(products)
  res.json(products)
})


export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts
}