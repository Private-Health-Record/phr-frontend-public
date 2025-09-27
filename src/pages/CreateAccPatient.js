import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/variables.css';
import '../styles/modern-auth.css';

function CreateAccPatient() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        bloodType: '',
        phone: '',
        address: '',
        emergencyContact: '',
        emergencyPhone: '',
        allergies: '',
        medications: ''
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
                    <h1 className="auth-title">Patient Registration</h1>
                    <p className="auth-subtitle">Create your secure health record account</p>
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
                                <label className="form-label" htmlFor="firstName">
                                    First Name *
                                </label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="John"
                                    ref={userRef}
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="lastName">
                                    Last Name *
                                </label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Doe"
                                    className="form-input"
                                    required
                                />
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
                                    placeholder="patient@example.com"
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="dateOfBirth">
                                    Date of Birth *
                                </label>
                                <input
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="gender">
                                    Gender *
                                </label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    className="form-select"
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                    <option value="prefer-not-to-say">Prefer not to say</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="bloodType">
                                    Blood Type
                                </label>
                                <select
                                    id="bloodType"
                                    name="bloodType"
                                    value={formData.bloodType}
                                    onChange={handleInputChange}
                                    className="form-select"
                                >
                                    <option value="">Select Blood Type</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="phone">
                                    Phone Number *
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+1 (555) 123-4567"
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-group full-width">
                                <label className="form-label" htmlFor="address">
                                    Address
                                </label>
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="123 Main St, City, State 12345"
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="emergencyContact">
                                    Emergency Contact Name *
                                </label>
                                <input
                                    id="emergencyContact"
                                    name="emergencyContact"
                                    type="text"
                                    value={formData.emergencyContact}
                                    onChange={handleInputChange}
                                    placeholder="Jane Doe"
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="emergencyPhone">
                                    Emergency Contact Phone *
                                </label>
                                <input
                                    id="emergencyPhone"
                                    name="emergencyPhone"
                                    type="tel"
                                    value={formData.emergencyPhone}
                                    onChange={handleInputChange}
                                    placeholder="+1 (555) 987-6543"
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-group full-width">
                                <label className="form-label" htmlFor="allergies">
                                    Known Allergies
                                </label>
                                <input
                                    id="allergies"
                                    name="allergies"
                                    type="text"
                                    value={formData.allergies}
                                    onChange={handleInputChange}
                                    placeholder="Penicillin, Shellfish (separate with commas)"
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group full-width">
                                <label className="form-label" htmlFor="medications">
                                    Current Medications
                                </label>
                                <input
                                    id="medications"
                                    name="medications"
                                    type="text"
                                    value={formData.medications}
                                    onChange={handleInputChange}
                                    placeholder="List current medications (separate with commas)"
                                    className="form-input"
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
                            {isLoading ? 'Creating Account...' : 'Create Patient Account'}
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

export default CreateAccPatient;