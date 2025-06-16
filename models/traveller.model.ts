import mongoose, { Schema, Document } from 'mongoose';

export interface ITraveller extends Document {
  name: string;
  email: string;
  phone?: string;
  userId: mongoose.Types.ObjectId;
}

const TravellerSchema = new Schema<ITraveller>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Traveller = mongoose.models.Traveller || mongoose.model<ITraveller>('Traveller', TravellerSchema);
export default Traveller;
