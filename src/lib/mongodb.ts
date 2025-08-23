import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

// Define a type for the cached connection object
type Cached = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Extend NodeJS.Global to include mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: Cached | undefined;
}

// Use the global mongooseCache or initialize
const cached: Cached = global.mongooseCache || { conn: null, promise: null };

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }
  cached.conn = await cached.promise;
  global.mongooseCache = cached;
  return cached.conn;
}
