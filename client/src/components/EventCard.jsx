import { Link } from 'react-router-dom';

function EventCard({ event }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={event.image || "https://source.unsplash.com/400x200/?event"}
        alt={event.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{event.name}</h2>
        <p className="text-gray-600">{event.date} at {event.time}</p>
        <p className="text-gray-700 mt-2">{event.location}</p>
        <Link to={`/event/${event._id}`} className="text-indigo-600 hover:underline mt-3 block">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
