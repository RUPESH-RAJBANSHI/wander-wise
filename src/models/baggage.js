import { schema, model } from "mongoose";

const BaggageSchema = new schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: false }
);

const Baggage = model("Baggage", BaggageSchema);

export default Baggage;