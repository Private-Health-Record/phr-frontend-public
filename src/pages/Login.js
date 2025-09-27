import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/variables.css';
import '../styles/modern-auth.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const userRef = useRef();
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock authentication logic
            if (username && password) {
                if (username.toLowerCase().includes('doctor') || username.toLowerCase().includes('dr')) {
                    navigate('/doctor-dashboard', { replace: true, state: { username } });
                } else {
                    navigate('/patient-dashboard', { replace: true, state: { username } });
                }
            } else {
                setErrorMessage('Please enter both username and password');
            }
        } catch (error) {
            setErrorMessage('Login failed. Please try again.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-brand">
                        <div className="auth-brand-icon">🏥</div>
                        <span className="auth-brand-text">HealthPro</span>
                    </div>
                    <h1 className="auth-title">Welcome Back</h1>
                    <p className="auth-subtitle">Sign in to access your health records securely</p>
                </div>

                <div className="auth-content">
                    <form className="auth-form" onSubmit={handleSubmit}>
                        {errorMessage && (
                            <div className="auth-error">
                                {errorMessage}
                            </div>
                        )}

                        <div className="form-group">
                            <label className="form-label" htmlFor="username">
                                Username or Email
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username or email"
                                ref={userRef}
                                className="form-input"
                                required
                                autoComplete="username"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="form-input"
                                required
                                autoComplete="current-password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="auth-button"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                </div>

                <div className="auth-footer">
                    <p className="auth-footer-text">
                        Don't have an account?{' '}
                        <Link to="/CreateAccOptions" className="auth-link">
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;