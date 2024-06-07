import cookieParser from 'cookie-parser';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import connectDB from './config/db.js';

import profileRoutes from './routes/profile.routes.js';
// import workoutRoutes from './routes/workout.routes.js';
import userRoutes from './routes/user.routes.js';
// import dietRoutes from './routes/diet.routes.js';
import blogRoutes from './routes/blog.routes.js';
import ingredientRoutes from './routes/ingredient.route.js';
import consumptionRoutes from './routes/consumption.routes.js';
import imageRoutes from './routes/image.routes.js';
import exerciseRoutes from './routes/exercise.routes.js';
import recipeRoutes from './routes/recipe.routes.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
// Add the allowed origins or routes where the API can be accessed; in this case, the frontend URLs.
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.get('/', (_req, res) => {
    res.send("API is running...");
});

app.use('/api/profile', profileRoutes);
// app.use('/api/workout', workoutRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/diet', dietRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/ingredient', ingredientRoutes);
app.use('/api/consumption', consumptionRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/exercise', exerciseRoutes);
app.use('/api/recipe', recipeRoutes);

// Connect to the database and start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error(err);
    process.exit(1);
});
