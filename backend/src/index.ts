import express from 'express';
import cors from 'cors';
import studentRoutes from './routes/studentRoutes';

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use('/students', studentRoutes);

app.get('/', (_req, res) => {
  res.send('Student Info API is running');
});

app.listen(PORT, () => {
  console.log(`🚀 Backend Server is running on http://localhost:${PORT}`);
  console.log(`📊 API Endpoints available:`);
  console.log(`   GET    http://localhost:${PORT}/`);
  console.log(`   GET    http://localhost:${PORT}/students`);
  console.log(`   POST   http://localhost:${PORT}/students`);
  console.log(`   PUT    http://localhost:${PORT}/students/:id`);
  console.log(`   DELETE http://localhost:${PORT}/students/:id`);
});
