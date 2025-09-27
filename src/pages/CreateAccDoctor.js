import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/variables.css';
import '../styles/modern-auth.css';

function CreateAccDoctor() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        specialization: '',
        contact: '',
        hospital: '',
        licenseNumber: '',
        experience: ''
    });

    const userRef = useRef();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        // Basic validation
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Passwords do not match');
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long');
            setIsLoading(false);
            return;
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            setSuccessMessage('Account created successfully! Redirecting to login...');

            setTimeout(() => {
                navigate('/login', { replace: true });
            }, 2000);

        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong. Please try again.');
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
            <div className="auth-card wide">
                <div className="auth-header">
                    <div className="auth-brand">
                        <div className="auth-brand-icon">🏥</div>
                        <span className="auth-brand-text">HealthPro</span>
                    </div>
                    <h1 className="auth-title">Doctor Registration</h1>
                    <p className="auth-subtitle">Create your professional healthcare account</p>
                </div>

                <div className="auth-content">
                    <form className="auth-form" onSubmit={handleSubmit}>
                        {errorMessage && (
                            <div className="auth-error">
                                {errorMessage}
                            </div>
                        )}

                        {successMessage && (
                            <div className="auth-success">
                                {successMessage}
                            </div>
                        )}

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label" htmlFor="name">
                                    Full Name *
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Dr. John Smith"
                                    ref={userRef}
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="specialization">
                                    Specialization *
                                </label>
                                <select
                                    id="specialization"
                                    name="specialization"
                                    value={formData.specialization}
                                    onChange={handleInputChange}
                                    className="form-select"
                                    required
                                >
                                    <option value="">Select Specialization</option>
                                    <option value="General Medicine">General Medicine</option>
                                    <option value="Cardiology">Cardiology</option>
                                    <option value="Dermatology">Dermatology</option>
                                    <option value="Neurology">Neurology</option>
                                    <option value="Orthopedics">Orthopedics</option>
                                    <option value="Pediatrics">Pediatrics</option>
                                    <option value="Psychiatry">Psychiatry</option>
                                    <option value="Radiology">Radiology</option>
                                    <option value="Surgery">Surgery</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="form-group full-width">
                                <label className="form-label" htmlFor="email">
                                    Email Address *
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="doctor@hospital.com"
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="hospital">
                                    Hospital/Clinic *
                                </label>
                                <input
                                    id="hospital"
                                    name="hospital"
                                    type="text"
                                    value={formData.hospital}
                                    onChange={handleInputChange}
                                    placeholder="General Hospital"
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="licenseNumber">
                                    Medical License Number *
                                </label>
                                <input
                                    id="licenseNumber"
                                    name="licenseNumber"
                                    type="text"
                                    value={formData.licenseNumber}
                                    onChange={handleInputChange}
                                    placeholder="MD123456"
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="experience">
                                    Years of Experience *
                                </label>
                                <input
                                    id="experience"
                                    name="experience"
                                    type="number"
                                    min="0"
                                    max="50"
                                    value={formData.experience}
                                    onChange={handleInputChange}
                                    placeholder="5"
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="contact">
                                    Contact Number *
                                </label>
                                <input
                                    id="contact"
                                    name="contact"
                                    type="tel"
                                    value={formData.contact}
                                    onChange={handleInputChange}
                                    placeholder="+1 (555) 123-4567"
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="password">
                                    Password *
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter secure password"
                                    className="form-input"
                                    required
                                    minLength="6"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="confirmPassword">
                                    Confirm Password *
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="Confirm your password"
                                    className="form-input"
                                    required
                                    minLength="6"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="auth-button"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating Account...' : 'Create Doctor Account'}
                        </button>
                    </form>
                </div>

                <div className="auth-footer">
                    <p className="auth-footer-text">
                        Already have an account?{' '}
                        <Link to="/login" className="auth-link">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CreateAccDoctor;