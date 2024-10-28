import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    bookingId: {
        type: Number,
        required: true,
        unique: true
    },
    roomId: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        Type: String,
        required: true,
        default: "Pending"
    },
    reason: {
        type: String,
        default: ""
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    notes: {
        type: String,
        default: ""
    }
})

const Booking = mongoose.model("Bookings", bookingSchema)

export default Booking;