import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from './backend/data/users.js'
import products from './backend/data/products.js'
import Product from './backend/models/productModel.js'
import User from './backend/models/userModel.js'
import Order from './backend/models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
	try {
		await User.deleteMany()
		await Product.deleteMany()
		await Order.deleteMany()

		const createdUser = await User.insertMany(users)
		const adminUser = createdUser[0]._id

		const sampleProducts = products.map(product => {
			return { ...product, user: adminUser }
		})

		await Product.insertMany(sampleProducts)

		console.log('Data imported successfully'.green.inverse)
		process.exit(1)
	} catch (err) {
		console.error(`${err}`.red.inverse)
	}
}

const destroyData = async () => {
	try {
		await User.deleteMany()
		await Product.deleteMany()
		await Order.deleteMany()

		console.log('Data destroyed'.red.inverse)
		process.exit()
	} catch (err) {
		console.error(`${err}`.red.inverse)
		process.exit(1)
	}
}

process.argv[2] === '-d' ? destroyData() : importData()