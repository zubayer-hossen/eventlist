// routes/eventRoutes.js

import express from "express";
import { createEvent, getEvents, getEventById, updateEvent, deleteEvent } from "../controllers/eventController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route for fetching all events and creating an event
router.route("/")
  .get(getEvents)    // GET all events
  .post(protect, createEvent);   // POST to create an event (protected)

// Route for individual event (by ID): getting, updating, deleting
router.route("/:id")
  .get(getEventById)   // GET a single event by ID
  .put(protect, updateEvent)  // PUT to update event (protected)
  .delete(protect, deleteEvent);   // DELETE event (protected)

export default router;
