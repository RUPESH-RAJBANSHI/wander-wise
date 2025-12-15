import Trip from "../models/trips.js";

export const createTrip = async (tripData) => {
    const trip = await Trip.create(tripData);
    return trip;
};