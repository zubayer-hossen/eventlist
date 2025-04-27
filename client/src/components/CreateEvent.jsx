// src/components/CreateEvent.js

import React, { useState } from 'react';
import axios from 'axios';

const CreateEvent = () => {
  const [eventDetails, setEventDetails] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    category: '',
  });

  const handleChange = (e) => {
    setEventDetails({
      ...eventDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post('http://localhost:5000/api/events', eventDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Event Created Successfully!');
      // Redirect to some page, e.g., event list or event details
    } catch (error) {
      console.error(error);
      alert('Error creating event');
    }
  };

  return (
    <div>
      <h1>Create a New Event</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={eventDetails.title}
          onChange={handleChange}
          placeholder="Event Title"
          required
        />
        <input
          type="date"
          name="date"
          value={eventDetails.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          value={eventDetails.time}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          value={eventDetails.location}
          onChange={handleChange}
          placeholder="Event Location"
          required
        />
        <textarea
          name="description"
          value={eventDetails.description}
          onChange={handleChange}
          placeholder="Event Description"
          required
        />
        <input
          type="text"
          name="category"
          value={eventDetails.category}
          onChange={handleChange}
          placeholder="Event Category"
          required
        />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
