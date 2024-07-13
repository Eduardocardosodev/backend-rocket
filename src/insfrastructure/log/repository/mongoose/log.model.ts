import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

interface Ilog extends Document {
  _id: string;
  commands: string;
  initialPosition: number;
  rocket_id: string;
}

const logSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },

  commands: {
    type: String,
    required: true,
  },
  initialPosition: {
    x: Number,
    y: Number,
    direction: String,
  },
  rocket_id: String,
});

export const LogModel = mongoose.model<Ilog>('Log', logSchema);
