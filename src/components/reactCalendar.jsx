import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './reactCalendar.css';

function MyCalendar() {
  const [userName, setUserName] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [daysLeft, setDaysLeft] = useState(0);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    // Fetch the user data from the backend
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/getuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('authToken')  // Updated header
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched User Data:", data);

          setUserName(data.FirstName);
          
          // Handle delivery date
          if (data.delivery) {
            let parsedDate = new Date(data.delivery);
            console.log("Parsed Delivery Date:", parsedDate);

            if (!isNaN(parsedDate.getTime())) {
              setDeliveryDate(parsedDate);
            } else {
              console.error("Invalid delivery date format:", data.delivery);
            }
          } else {
            console.error("Delivery date is missing in API response.");
          }
        } else {
          console.error('Failed to fetch user');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  // Calculate the number of days left for delivery
  useEffect(() => {
    if (deliveryDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);  // Reset time to midnight
      const delivery = new Date(deliveryDate);
      delivery.setHours(0, 0, 0, 0);

      console.log("Today:", today);
      console.log("Delivery Date:", delivery);

      const timeDiff = delivery - today;
      const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

      console.log("Days Remaining:", daysRemaining);
      setDaysLeft(daysRemaining > 0 ? daysRemaining : 0); // Avoid negative days
    }
  }, [deliveryDate]);

  // Function to check if a date should be struck through
  const isDateStrikethrough = (date) => {
    const today = new Date();
    return date < today;
  };

  // Function to check if a date is the delivery date
  const isDeliveryDate = (date) => {
    return (
      deliveryDate &&
      date.getDate() === deliveryDate.getDate() &&
      date.getMonth() === deliveryDate.getMonth() &&
      date.getFullYear() === deliveryDate.getFullYear()
    );
  };

  return (
    <div className="calendar-container">
      <h2>
        {daysLeft > 0 ? `Yayy! ${daysLeft} days to go!!` : 'Delivery date has passed!'}
      </h2>
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={({ date, view }) => {
          if (view === 'month') {
            if (isDateStrikethrough(date)) {
              return 'strikethrough';
            }
            if (isDeliveryDate(date)) {
              return 'delivery-date';
            }
          }
        }}
        minDate={new Date()}
      />
    </div>
  );
}

export default MyCalendar;
