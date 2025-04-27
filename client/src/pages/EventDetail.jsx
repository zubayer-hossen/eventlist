import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await axios.get(`http://localhost:5000/api/events/${id}`);
      setEvent(res.data);
    };
    fetchEvent();
  }, [id]);

  if (!event) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={event.image || "https://source.unsplash.com/800x400/?event"}
          alt={event.name}
          className="w-full h-96 object-cover"
        />
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4">{event.name}</h1>
          <p className="text-gray-600 mb-2">{event.date} at {event.time}</p>
          <p className="text-gray-700 mb-6">{event.location}</p>
          <p className="text-gray-800">{event.description}</p>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
