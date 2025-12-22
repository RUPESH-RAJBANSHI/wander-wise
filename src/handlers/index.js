import { Router } from "express";
import USER_ROUTES from "./users.js";
import AUTH_ROUTER from "./auth.js";
import TRIP_ROUTER from "./trip.js";
import BAGGAGE_ROUTER from "./baggage.js";
import ITINERARY_ROUTER from "./itinerary.js";

const HANDLER_ROUTES = Router();

HANDLER_ROUTES.use("/users", USER_ROUTES);
HANDLER_ROUTES.use("/auth", AUTH_ROUTER);
HANDLER_ROUTES.use("/trips", TRIP_ROUTER);
HANDLER_ROUTES.use("/:tripId/baggages", BAGGAGE_ROUTER);
HANDLER_ROUTES.use("/:tripId/itineraries", ITINERARY_ROUTER);

export default HANDLER_ROUTES; 