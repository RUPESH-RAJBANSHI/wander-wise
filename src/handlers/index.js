import { Router } from "express";
import USER_ROUTES from "./users.js";
import AUTH_ROUTER from "./auth.js";
import TRIP_ROUTER from "./trip.js";

const HANDLER_ROUTES = Router();

HANDLER_ROUTES.use("/users", USER_ROUTES);
HANDLER_ROUTES.use("/auth", AUTH_ROUTER);
HANDLER_ROUTES.use("/trips", TRIP_ROUTER);

export default HANDLER_ROUTES; 