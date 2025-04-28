const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/userRoute');
const productRouter = require('./routes/productRoute');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
// const phoneRoutes = require('./routes/phones');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;


app.use(bodyParser.json({ limit: '27mb' }));
app.use(cors());
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Kết nối MongoDB
//const mongoURI = process.env.MONGODB_URI || 'mongodb://host.docker.internal:27017/database'; // Thay đổi URI nếu cần
 const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/database'; // Thay đổi URI nếu cần
mongoose.connect(mongoURI)
    .then(() => console.log("✅ Kết nối MongoDB thành công"))
    .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

// Route kiểm tra API
app.get('/api/test', (req, res) => {
    res.json({ message: "API hoạt động tốt!" });
});
app.get('/', (req, res) => {
    res.send('Backend is running!');
  });

// app.use('/api/v2', phoneRoutes);
app.use('/api/v1', usersRouter);
app.use('/api/v2/', productRouter)


// Lắng nghe server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});

// const cors = require('cors');

// // Cho phép frontend từ Vercel (hoặc localhost nếu cần)
// // app.use(cors({
// //   origin: ['https://ktpm-frontend.vercel.app'],
// // }));
// Cấu hình CORS
app.use(cors({
    origin: 'http://localhost:54053', // Địa chỉ của frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức HTTP cho phép
    allowedHeaders: ['Content-Type', 'Authorization'], // Các header cho phép
  }));