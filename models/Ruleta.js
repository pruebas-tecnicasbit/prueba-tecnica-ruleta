import mongoose, {Schema} from "mongoose";

const ruletaSchema = new Schema({
  status: {
    type: Boolean,
    default: false,
  },
  apuesta: [
    {
      type: Schema.Types.ObjectId,
      ref: "Apuesta",
    },
  ],
});

const Ruleta = mongoose.model("Ruleta", ruletaSchema);

export default Ruleta;
