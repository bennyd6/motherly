import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './checkup.css';

export default function Checkup() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    symptoms: '',
    babyMovement: '',
    weight: '',
    temperature: '',
    feeling: '',
    emergency: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

 // Example: handleSubmit in your React component
// Example: handleSubmit in your React component
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem('authToken'); // Retrieve token

    if (!token) {
      alert('User is not authenticated. Please log in.');
      return;
    }

    // Send the form data to the new endpoint '/submit-checkup'
    const response = await axios.post(
      'http://localhost:3000/api/auth/submit-checkup',
      formData, // formData should be an object with fields: name, date, symptoms, etc.
      { headers: { 'auth-token': token } }
    );

    alert(response.data.message);
  } catch (error) {
    console.error('Error submitting form:', error.response?.data || error.message);
    alert('Error submitting form. Please try again.');
  }
};


  

  useEffect(() => {
    const c = document.createElement('canvas');
    c.id = "canvasBackground";
    const parent = document.getElementById('hero');
    parent.appendChild(c);

    const ctx = c.getContext('2d');
    let dotArray = [];

    function createDots(dotCount) {
      for (let i = 0; i < dotCount; i++) {
        const radius = Math.random() * 3 + 1;
        const x = Math.random() * c.width;
        const y = Math.random() * c.height;
        const xVelocity = (Math.random() * 2 - 1) / 50;
        const yVelocity = (Math.random() * 2 - 1) / 50;

        dotArray.push({ radius, x, y, xVelocity, yVelocity });
      }
      animate();
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, c.width, c.height);
      dotArray.forEach(dot => {
        dot.x += dot.xVelocity;
        dot.y += dot.yVelocity;
        if (dot.x < 0 || dot.x > c.width) dot.xVelocity *= -1;
        if (dot.y < 0 || dot.y > c.height) dot.yVelocity *= -1;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#2768A4';
        ctx.fill();
      });
    }

    function setValues() {
      c.width = parent.offsetWidth;
      c.height = parent.offsetHeight;
      dotArray = [];
      createDots(Math.floor((c.width * c.height) / 2000));
    }

    window.addEventListener('resize', setValues);
    setValues();

    return () => {
      window.removeEventListener('resize', setValues);
      parent.removeChild(c); // Remove canvas on unmount
    };
  }, []);

  return (
    <div id="hero">
      <form onSubmit={handleSubmit} className="checkup-form">
        <h2>Daily Pregnancy Checkup Form</h2>

        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Date:</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />

        <label>Symptoms (if any):</label>
        <textarea name="symptoms" value={formData.symptoms} onChange={handleChange} placeholder="Any pain, nausea, dizziness?" />

        <label>Baby's Movement (Times today):</label>
        <input type="number" name="babyMovement" value={formData.babyMovement} onChange={handleChange} placeholder="Number of times" required />

        <label>Weight (kg):</label>
        <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="Current weight" required />

        <label>Temperature (°C):</label>
        <input type="number" name="temperature" value={formData.temperature} onChange={handleChange} placeholder="Current temperature" required />

        <label>How are you feeling today?</label>
        <textarea name="feeling" value={formData.feeling} onChange={handleChange} placeholder="Describe how you're feeling today" required />

        <label>Emergency (Check if any):</label>
        <input type="checkbox" name="emergency" checked={formData.emergency} onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
