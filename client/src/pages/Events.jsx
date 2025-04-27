import { useEffect, useState } from 'react';
import useEventStore from '../store/eventStore';
import EventCard from '../components/EventCard';

function Events() {
  const { events, fetchEvents } = useEventStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(search.toLowerCase()) ||
    event.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6">All Events</h2>

      <input
        type="text"
        placeholder="Search by name or location..."
        className="w-full border p-3 rounded mb-8"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))
        ) : (
          <p>No events found!</p>
        )}
      </div>
    </div>
  );
}

export default Events;
