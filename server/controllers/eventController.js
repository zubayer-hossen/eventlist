// controllers/eventController.js

import Event from "../models/Event.js";

// Create Event
export const createEvent = async (req, res) => {
  const { title, date, time, location, description, category } = req.body;

  // Check if all necessary fields are provided
  if (!title || !date || !time || !location || !description || !category) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  // Create the event object
  const event = new Event({
    title,
    date,
    time,
    location,
    description,
    category,
    createdBy: req.user._id, // Assumes the user is authenticated and available via req.user
  });

  try {
    // Save event
    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating event", error: error.message });
  }
};

// Get All Events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
};

// Get Single Event
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error: error.message });
  }
};

// Update Event
export const updateEvent = async (req, res) => {
  const { title, date, time, location, description, category } = req.body;
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      if (event.createdBy.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: "Not authorized" });
      }

      event.title = title;
      event.date = date;
      event.time = time;
      event.location = location;
      event.description = description;
      event.category = category;

      const updatedEvent = await event.save();
      res.json(updatedEvent);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error: error.message });
  }
};

// Delete Event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      if (event.createdBy.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: "Not authorized" });
      }

      await event.remove();
      res.json({ message: "Event removed" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error: error.message });
  }
};
