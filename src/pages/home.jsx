import './home.css';
import MyCalendar from '../components/reactCalendar';
import im from '../assets/pw.png';
import { useEffect, useState } from 'react';

export default function Home() {
  const [userName, setUserName] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(''); // State for delivery date
  
  useEffect(() => {
    // Fetch user data including name and delivery date
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/getuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('authToken'),
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserName(data.FirstName); // Extract and set the user name
          setDeliveryDate(data.deliveryDate); // Extract and set the delivery date
        } else {
          console.error('Failed to fetch user');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []); // Runs only once when the component mounts

  return (
    <div className="home-main">
      <div className="home-1">
        <img src={im} alt="User" />
        <div className="home-1-txt">
          <h1>
            Hello! <span className="name">{userName ? userName : ''}!</span>
          </h1>
          <h2>How are you feeling today?</h2>
          {deliveryDate && (
            <p>Your delivery is scheduled for: <strong>{new Date(deliveryDate).toLocaleDateString()}</strong></p>
          )}
        </div>
      </div>
      <div className="home-2">
        <div className="home-2-in">
          <MyCalendar />
        </div>
      </div>
    </div>
  );
}
