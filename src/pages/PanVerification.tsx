
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PanVerification: React.FC = () => {
    const [panNumber, setPanNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (panNumber.length !== 10) return;

        setLoading(true);

        const storedUser = localStorage.getItem('gst_user');
        if (!storedUser) {
            alert('Please login first');
            navigate('/');
            return;
        }

        const user = JSON.parse(storedUser);

        try {
            const response = await fetch(`http://localhost:5000/api/users/${user._id}/pan`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ panNumber }),
            });

            if (response.ok) {
                // Update local storage if needed, or just navigate
                const updatedUser = await response.json();
                localStorage.setItem('gst_user', JSON.stringify({ ...user, ...updatedUser }));
                setTimeout(() => {
                    setLoading(false);
                    navigate('/verify-gst');
                }, 1000);
            } else {
                setLoading(false);
                alert('Failed to verify PAN');
            }
        } catch (error) {
            setLoading(false);
            alert('Error connecting to server');
        }
    };

    return (
        <div className="center-layout">
            <div className="box-card">
                <h1>Identity Verification</h1>
                <p className="subtitle">Enter your 10-digit PAN Number</p>

                <form onSubmit={handleVerify}>
                    <div>
                        <label>PAN Number</label>
                        <input
                            type="text"
                            placeholder="ABCDE1234F"
                            value={panNumber}
                            onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                            maxLength={10}
                            required
                            style={{ textTransform: 'uppercase', letterSpacing: '1px' }}
                        />
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify PAN'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PanVerification;
