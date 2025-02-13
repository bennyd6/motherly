import './header.css';
import logo from '../assets/motherly-logo.png';
import user from '../assets/woman.png';
import { useEffect, useState } from 'react';

export default function Header() {
    const [userName, setUserName] = useState('');
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/auth/getuser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('authToken'),
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserName(data.FirstName);
                } else {
                    console.error('Failed to fetch user');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (token) {
            fetchUser();
        }
    }, [token]);

    return (
        <div className="header-main">
            <div className="header-1">
                <img src={logo} alt="" />
                <h1>motherly .</h1>
            </div>
            <div className="header-2">
                <img src={user} alt="" />
                <a href="">{userName ? userName : 'Loading...'}</a>
            </div>
        </div>
    );
}
