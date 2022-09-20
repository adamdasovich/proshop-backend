import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB();
const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
	res.send('API is running');
})

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound)

app.use(errorHandler)
// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static(path.join(__dirname, 'frontend/build')));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold);
})