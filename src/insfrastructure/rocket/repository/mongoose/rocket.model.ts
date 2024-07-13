import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

interface IRocket extends Document {
  _id: string;
  name: string;
  size: number;
}

const rocketSchema: Schema = new Schema({
  _id: { type: String, default: uuidv4 },
  name: {
    type: String,
    required: true,
  },
  size: { type: Number, required: true },
});

export const RocketModel = mongoose.model<IRocket>('Rocket', rocketSchema);
