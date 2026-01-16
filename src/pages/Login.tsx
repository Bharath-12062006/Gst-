
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

    const handleData = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (isLogin) {
            // Login Logic
            const storedUsers = JSON.parse(localStorage.getItem('gst_users') || '[]');
            const user = storedUsers.find((u: any) => u.email === email && u.password === password);

            if (user) {
                navigate('/verify-pan');
            } else {
                setError('Invalid email or password. Please sign up if you do not have an account.');
            }
        } else {
            // Signup Logic
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }

            const storedUsers = JSON.parse(localStorage.getItem('gst_users') || '[]');
            const userExists = storedUsers.some((u: any) => u.email === email);

            if (userExists) {
                setError('User already exists. Please login.');
                return;
            }

            const newUser = { email, password };
            localStorage.setItem('gst_users', JSON.stringify([...storedUsers, newUser]));

            setMessage('Account created successfully! Please sign in.');
            setIsLogin(true); // Switch to login mode
            // Clear passwords for security/UX
            setPassword('');
            setConfirmPassword('');
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
