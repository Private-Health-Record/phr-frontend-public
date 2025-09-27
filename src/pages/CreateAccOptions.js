import { Link } from 'react-router-dom';
import '../styles/variables.css';
import '../styles/modern-auth.css';

function CreateAccOptions() {
    return (
        <div className="auth-container">
            <div className="auth-card options-container">
                <div className="auth-header">
                    <div className="auth-brand">
                        <div className="auth-brand-icon">🏥</div>
                        <span className="auth-brand-text">HealthPro</span>
                    </div>
                    <h1 className="auth-title">Join HealthPro</h1>
                    <p className="auth-subtitle">Choose your account type to get started</p>
                </div>

                <div className="auth-content">
                    <div className="options-grid">
                        <Link to="/CreateAccDoctor" className="option-card">
                            <div className="option-icon">👨‍⚕️</div>
                            <h2 className="option-title">Doctor Account</h2>
                            <p className="option-description">
                                Access patient records, manage appointments, and provide secure healthcare services.
                            </p>
                        </Link>

                        <Link to="/CreateAccPatient" className="option-card">
                            <div className="option-icon">👤</div>
                            <h2 className="option-title">Patient Account</h2>
                            <p className="option-description">
                                Store your health records securely, share with doctors, and control your medical data.
                            </p>
                        </Link>
                    </div>
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

export default CreateAccOptions;