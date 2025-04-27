import { create } from 'zustand';
import eventService from '../services/eventService';

const useEventStore = create((set) => ({
  events: [],
  
  fetchEvents: async () => {
    const events = await eventService.getEvents();
    set({ events });
  },

  createEvent: async (eventData, token) => {
    await eventService.createEvent(eventData, token);
    await set((state) => ({ events: [...state.events, eventData] }));
  },

  deleteEvent: async (id, token) => {
    await eventService.deleteEvent(id, token);
    set((state) => ({
      events: state.events.filter((e) => e._id !== id)
    }));
  }
}));

export default useEventStore;
