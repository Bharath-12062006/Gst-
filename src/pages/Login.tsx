
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleData = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (isLogin) {
            // Login Logic
            try {
                const response = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('gst_user', JSON.stringify(data));
                    if (data.validPan && data.validGst) {
                        // Could redirect to dashboard directly if all verifications done
                        alert('Verification already complete!');
                    } else if (data.validPan) {
                        navigate('/verify-gst');
                    } else {
                        navigate('/verify-pan');
                    }
                } else {
                    setError(data.message || 'Login failed');
                }
            } catch (err) {
                setError('Failed to connect to server');
            }
        } else {
            // Signup Logic
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    setMessage('Account created successfully! Please sign in.');
                    setIsLogin(true); // Switch to login mode
                    setPassword('');
                    setConfirmPassword('');
                } else {
                    setError(data.message || 'Registration failed');
                }
            } catch (err) {
                setError('Failed to connect to server');
            }
        }
    };

    return (
        <div className="center-layout">
            <div className="box-card">
                <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
                <p className="subtitle">
                    {isLogin ? 'Sign in to your account' : 'Sign up to get started'}
                </p>

                {error && <div style={{ color: 'red', marginBottom: '10px', fontSize: '0.9rem' }}>{error}</div>}
                {message && <div style={{ color: 'green', marginBottom: '10px', fontSize: '0.9rem' }}>{message}</div>}

                <form onSubmit={handleData}>
                    <div>
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div>
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <button type="submit" className="btn-primary" style={{ marginTop: '16px' }}>
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </button>

                    <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <span
                            style={{ cursor: 'pointer', fontWeight: '600' }}
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError('');
                                setMessage('');
                            }}
                        >
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
