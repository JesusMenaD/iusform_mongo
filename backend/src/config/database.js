import mongoose from 'mongoose';
import 'colors';
const URI = process.env.MONGODB_URI;
// mongoose.set('strictQuery', false);
console.log(URI.bgRed);
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5000ms instead of the default 30000ms
  socketTimeoutMS: 45000 // Keep sockets open for 45 seconds
})
  .then(() => console.log('\nConnected to MongoDB!!!\n'.white.bold))
  .catch(err => console.error('\nCould not connect to MongoDB\n'.red, err));
