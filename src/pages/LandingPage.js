import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/variables.css';
import '../styles/landing.css';

function LandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const features = [
        {
            icon: '🔒',
            title: 'Secure & Private',
            description: 'Your health data is encrypted and stored securely on the blockchain, ensuring complete privacy and control.',
        },
        {
            icon: '👩‍⚕️',
            title: 'Doctor Collaboration',
            description: 'Seamlessly share your health records with healthcare providers and manage access permissions.',
        },
        {
            icon: '📱',
            title: 'Mobile Ready',
            description: 'Access your health records anytime, anywhere with our responsive and intuitive mobile interface.',
        },
        {
            icon: '⚡',
            title: 'Real-time Updates',
            description: 'Get instant notifications and updates on your health records and access permissions.',
        },
        {
            icon: '🏥',
            title: 'Multi-Provider',
            description: 'Connect with multiple healthcare providers and maintain a comprehensive health history.',
        },
        {
            icon: '📊',
            title: 'Health Analytics',
            description: 'Visualize your health trends and get insights from your medical data over time.',
        },
    ];

    const testimonials = [
        {
            name: 'Dr. Sarah Johnson',
            role: 'Cardiologist',
            image: '👩‍⚕️',
            quote: 'HealthPro has revolutionized how I access patient records. The security and ease of use are unmatched.',
        },
        {
            name: 'Michael Chen',
            role: 'Patient',
            image: '👨',
            quote: 'Finally, I have complete control over my health data. Sharing records with specialists has never been easier.',
        },
        {
            name: 'Dr. Emily Rodriguez',
            role: 'Family Medicine',
            image: '👩‍⚕️',
            quote: 'The blockchain technology gives both me and my patients confidence in data security and authenticity.',
        },
    ];

    return (
        <div className="landing-page">
            {/* Navigation */}
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="nav-container">
                    <div className="nav-brand">
                        <Link to="/" className="brand-link">
                            <div className="brand-icon">🏥</div>
                            <span className="brand-text">HealthPro</span>
                        </Link>
                    </div>

                    <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                        <Link to="#features" className="nav-link">Features</Link>
                        <Link to="#about" className="nav-link">About</Link>
                        <Link to="#testimonials" className="nav-link">Testimonials</Link>
                        <Link to="#contact" className="nav-link">Contact</Link>
                    </div>

                    <div className="nav-actions">
                        <Link to="/" className="btn btn-outline">Sign In</Link>
                        <Link to="/CreateAccOptions" className="btn btn-primary">Get Started</Link>
                    </div>

                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1 className="hero-title">
                                Your Health Records,
                                <span className="gradient-text"> Secured Forever</span>
                            </h1>
                            <p className="hero-description">
                                Take control of your health data with blockchain technology.
                                Securely store, share, and manage your medical records with complete privacy and transparency.
                            </p>
                            <div className="hero-actions">
                                <Link to="/CreateAccOptions" className="btn btn-primary btn-large">
                                    Start Your Journey
                                </Link>
                                <button className="btn btn-outline btn-large">
                                    Watch Demo
                                </button>
                            </div>
                            <div className="hero-stats">
                                <div className="stat">
                                    <div className="stat-number">10K+</div>
                                    <div className="stat-label">Patients</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-number">500+</div>
                                    <div className="stat-label">Doctors</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-number">99.9%</div>
                                    <div className="stat-label">Uptime</div>
                                </div>
                            </div>
                        </div>
                        <div className="hero-visual">
                            <div className="hero-image">
                                <div className="floating-card card-1">
                                    <div className="card-icon">🩺</div>
                                    <div className="card-content">
                                        <div className="card-title">Secure Records</div>
                                        <div className="card-desc">Blockchain Protected</div>
                                    </div>
                                </div>
                                <div className="floating-card card-2">
                                    <div className="card-icon">👩‍⚕️</div>
                                    <div className="card-content">
                                        <div className="card-title">Doctor Access</div>
                                        <div className="card-desc">Permission Based</div>
                                    </div>
                                </div>
                                <div className="floating-card card-3">
                                    <div className="card-icon">📱</div>
                                    <div className="card-content">
                                        <div className="card-title">Mobile Ready</div>
                                        <div className="card-desc">Access Anywhere</div>
                                    </div>
                                </div>
                                <div className="hero-main-visual">
                                    <div className="visual-bg"></div>
                                    <div className="visual-content">
                                        <div className="visual-icon">🔐</div>
                                        <div className="visual-text">Your Data, Your Control</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Why Choose HealthPro?</h2>
                        <p className="section-description">
                            Experience the future of healthcare data management with cutting-edge technology
                        </p>
                    </div>
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card">
                                <div className="feature-icon">{feature.icon}</div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="about-section">
                <div className="container">
                    <div className="about-content">
                        <div className="about-text">
                            <h2 className="about-title">Revolutionizing Healthcare Data Management</h2>
                            <p className="about-description">
                                HealthPro leverages blockchain technology to create a secure, transparent, and
                                patient-controlled health record system. Our platform ensures that you maintain
                                complete ownership of your health data while enabling seamless collaboration with
                                healthcare providers.
                            </p>
                            <div className="about-features">
                                <div className="about-feature">
                                    <div className="feature-check">✓</div>
                                    <span>End-to-end encryption</span>
                                </div>
                                <div className="about-feature">
                                    <div className="feature-check">✓</div>
                                    <span>Immutable health records</span>
                                </div>
                                <div className="about-feature">
                                    <div className="feature-check">✓</div>
                                    <span>Smart contract automation</span>
                                </div>
                                <div className="about-feature">
                                    <div className="feature-check">✓</div>
                                    <span>HIPAA compliant</span>
                                </div>
                            </div>
                            <Link to="/CreateAccOptions" className="btn btn-primary">
                                Join HealthPro Today
                            </Link>
                        </div>
                        <div className="about-visual">
                            <div className="about-image">
                                <div className="blockchain-visual">
                                    <div className="block">🔐</div>
                                    <div className="block">📋</div>
                                    <div className="block">🏥</div>
                                    <div className="connecting-line"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="testimonials-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">What Our Users Say</h2>
                        <p className="section-description">
                            Trusted by healthcare professionals and patients worldwide
                        </p>
                    </div>
                    <div className="testimonials-grid">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="testimonial-card">
                                <div className="testimonial-content">
                                    <div className="quote-icon">"</div>
                                    <p className="testimonial-quote">{testimonial.quote}</p>
                                </div>
                                <div className="testimonial-author">
                                    <div className="author-avatar">{testimonial.image}</div>
                                    <div className="author-info">
                                        <div className="author-name">{testimonial.name}</div>
                                        <div className="author-role">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2 className="cta-title">Ready to Take Control of Your Health Data?</h2>
                        <p className="cta-description">
                            Join thousands of patients and healthcare providers who trust HealthPro
                            for secure, accessible health record management.
                        </p>
                        <div className="cta-actions">
                            <Link to="/CreateAccOptions" className="btn btn-primary btn-large">
                                Get Started Free
                            </Link>
                            <Link to="/" className="btn btn-outline btn-large">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <div className="brand-link">
                                <div className="brand-icon">🏥</div>
                                <span className="brand-text">HealthPro</span>
                            </div>
                            <p className="footer-description">
                                Secure, blockchain-powered health record management for the modern world.
                            </p>
                        </div>
                        <div className="footer-links">
                            <div className="footer-section">
                                <h4>Product</h4>
                                <Link to="#features">Features</Link>
                                <Link to="#about">About</Link>
                                <Link to="#testimonials">Testimonials</Link>
                            </div>
                            <div className="footer-section">
                                <h4>Support</h4>
                                <Link to="#contact">Contact</Link>
                                <Link to="#help">Help Center</Link>
                                <Link to="#privacy">Privacy Policy</Link>
                            </div>
                            <div className="footer-section">
                                <h4>Company</h4>
                                <Link to="#careers">Careers</Link>
                                <Link to="#blog">Blog</Link>
                                <Link to="#press">Press</Link>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2024 HealthPro. All rights reserved.</p>
                        <div className="footer-social">
                            <span>Built for Midnight Hackathon 2024</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;