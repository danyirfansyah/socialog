import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB || '';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB environment variable inside .env.local');
}

async function connect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }
  const opts = {
    bufferCommands: false,
  }
  await mongoose.connect(MONGODB_URI, opts);
  return mongoose;
}

export default connect;