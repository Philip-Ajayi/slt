import { Schema, model, models } from "mongoose";

const CounterSchema = new Schema({
  year: { type: Number, required: true, unique: true },
  seq: { type: Number, default: 200 }, // start at 100, so first becomes 101
});

export const Counter = models.Counter || model("Counter", CounterSchema);
