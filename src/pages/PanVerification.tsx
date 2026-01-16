
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PanVerification: React.FC = () => {
    const [panNumber, setPanNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        if (panNumber.length !== 10) return;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate('/verify-gst');
        }, 1500);
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
