import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/variables.css';
import '../styles/modern-dashboard.css';

function DoctorDashboard() {
    const [doctorData] = useState({
        name: 'Dr. Sarah Johnson',
        email: 'dr.johnson@hospital.com',
        specialization: 'Cardiology',
        hospital: 'General Hospital',
        experience: 8,
        licenseNumber: 'MD12345'
    });

    const [accessibleRecords, setAccessibleRecords] = useState([
        {
            id: 1,
            patientName: 'John Patient',
            patientEmail: 'patient@example.com',
            title: 'Blood Test Results',
            date: '2024-01-15',
            type: 'Lab Report',
            summary: 'All levels normal. Cholesterol slightly elevated.',
            patientAge: 35,
            patientBloodType: 'O+',
            urgency: 'normal'
        },
        {
            id: 2,
            patientName: 'Jane Smith',
            patientEmail: 'jane.smith@email.com',
            title: 'ECG Report',
            date: '2024-01-18',
            type: 'Cardiac Test',
            summary: 'Regular heart rhythm, no abnormalities detected.',
            patientAge: 42,
            patientBloodType: 'A+',
            urgency: 'normal'
        },
        {
            id: 3,
            patientName: 'Robert Wilson',
            patientEmail: 'robert.w@email.com',
            title: 'Emergency CT Scan',
            date: '2024-01-20',
            type: 'Imaging',
            summary: 'Head trauma assessment - mild concussion confirmed.',
            patientAge: 28,
            patientBloodType: 'B-',
            urgency: 'high'
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [showRecordDetail, setShowRecordDetail] = useState(false);
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    const handleWalletConnect = async () => {
        // Simulate wallet connection - replace with actual wallet integration
        if (!isWalletConnected) {
            try {
                // Mock wallet connection
                const mockAddress = '0x742d35Cc6634C0532925a3b8d4ac2bf5C0dF5aE9';
                setWalletAddress(mockAddress);
                setIsWalletConnected(true);
            } catch (error) {
                console.error('Failed to connect wallet:', error);
            }
        } else {
            setWalletAddress('');
            setIsWalletConnected(false);
        }
    };

    const filteredRecords = accessibleRecords.filter(record => {
        const matchesSearch = record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            record.type.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filterType === 'all' || record.type === filterType;

        return matchesSearch && matchesFilter;
    });

    const getUrgencyBadge = (urgency) => {
        const badges = {
            high: 'urgency-high',
            medium: 'urgency-medium',
            normal: 'urgency-normal'
        };
        return badges[urgency] || 'urgency-normal';
    };

    const handleViewRecord = (record) => {
        setSelectedRecord(record);
        setShowRecordDetail(true);
    };

    const recordTypes = [...new Set(accessibleRecords.map(record => record.type))];


    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="sidebar-brand">
                        <div className="brand-icon">🏥</div>
                        <span className="brand-text">HealthPro</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <div className="nav-section">
                        <div className="nav-section-title">Overview</div>
                        <a href="#dashboard" className="nav-link active">
                            <span className="nav-icon">📊</span>
                            <span className="nav-text">Dashboard</span>
                        </a>
                        <a href="#patients" className="nav-link">
                            <span className="nav-icon">👥</span>
                            <span className="nav-text">Patient Records</span>
                        </a>
                        <a href="#urgent" className="nav-link">
                            <span className="nav-icon">🚨</span>
                            <span className="nav-text">Urgent Cases</span>
                        </a>
                    </div>

                    <div className="nav-section">
                        <div className="nav-section-title">Tools</div>
                        <a href="#search" className="nav-link">
                            <span className="nav-icon">🔍</span>
                            <span className="nav-text">Search Records</span>
                        </a>
                        <a href="#analytics" className="nav-link">
                            <span className="nav-icon">📈</span>
                            <span className="nav-text">Analytics</span>
                        </a>
                        <a href="#reports" className="nav-link">
                            <span className="nav-icon">📄</span>
                            <span className="nav-text">Reports</span>
                        </a>
                    </div>

                    <div className="nav-section">
                        <div className="nav-section-title">Settings</div>
                        <a href="#profile" className="nav-link">
                            <span className="nav-icon">👤</span>
                            <span className="nav-text">Profile</span>
                        </a>
                        <a href="#preferences" className="nav-link">
                            <span className="nav-icon">⚙️</span>
                            <span className="nav-text">Preferences</span>
                        </a>
                    </div>
                </nav>

                <div className="sidebar-footer">
                    <div className="user-profile">
                        <div className="user-avatar">👨‍⚕️</div>
                        <div className="user-info">
                            <div className="user-name">{doctorData.name}</div>
                            <div className="user-role">Doctor</div>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="logout-button">
                        <span className="logout-icon">🚪</span>
                        <span className="logout-text">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="content-header">
                    <div className="header-left">
                        <h1 className="page-title">Doctor Dashboard</h1>
                        <p className="page-subtitle">Manage patient records and health data</p>
                    </div>
                    <div className="header-right">
                        <div className="wallet-section">
                            {isWalletConnected ? (
                                <div className="wallet-connected">
                                    <div className="wallet-info">
                                        <span className="wallet-icon">🔗</span>
                                        <span className="wallet-address">
                                            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleWalletConnect}
                                        className="btn btn-outline btn-sm"
                                    >
                                        Disconnect
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={handleWalletConnect}
                                    className="btn btn-primary"
                                >
                                    <span className="btn-icon">👛</span>
                                    Connect Wallet
                                </button>
                            )}
                        </div>
                    </div>
                </header>

                <div className="dashboard-grid">
                    {/* Doctor Info Card */}
                    <div className="dashboard-card">
                        <div className="card-header">
                            <h2 className="card-title">Professional Information</h2>
                            <span className="card-icon">👨‍⚕️</span>
                        </div>
                        <div className="card-content">
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">Full Name</span>
                                    <span className="info-value">{doctorData.name}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Email Address</span>
                                    <span className="info-value">{doctorData.email}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Specialization</span>
                                    <span className="info-value">{doctorData.specialization}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Hospital</span>
                                    <span className="info-value">{doctorData.hospital}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Experience</span>
                                    <span className="info-value">{doctorData.experience} years</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">License Number</span>
                                    <span className="info-value">{doctorData.licenseNumber}</span>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Search and Filter */}
                    <div className="dashboard-card full-width">
                        <div className="card-header">
                            <h2 className="card-title">Search & Filter Records</h2>
                            <span className="card-icon">🔍</span>
                        </div>
                        <div className="card-content">
                            <div className="search-controls">
                                <div className="search-input-group">
                                    <input
                                        type="text"
                                        placeholder="Search by patient name, record title, or type..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="search-input"
                                    />
                                    <div className="search-icon">🔍</div>
                                </div>
                                <select
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="all">All Types</option>
                                    {recordTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Patient Records */}
                    <div className="dashboard-card full-width">
                        <div className="card-header">
                            <h2 className="card-title">Patient Health Records ({filteredRecords.length})</h2>
                            <div className="card-actions">
                                <span className="results-count">{filteredRecords.length} results</span>
                            </div>
                        </div>
                        <div className="card-content">
                            {filteredRecords.length === 0 ? (
                                <div className="no-records">
                                    <div className="no-records-icon">📭</div>
                                    <h3>No records found</h3>
                                    <p>No records match your search criteria.</p>
                                </div>
                            ) : (
                                <div className="records-grid">
                                    {filteredRecords.map(record => (
                                        <div key={record.id} className="patient-record-card">
                                            <div className="record-header">
                                                <div className="record-title-section">
                                                    <h3 className="record-title">{record.title}</h3>
                                                    <div className="record-badges">
                                                        <span className={`urgency-badge ${getUrgencyBadge(record.urgency)}`}>
                                                            {record.urgency.toUpperCase()}
                                                        </span>
                                                        <span className="record-type-badge">{record.type}</span>
                                                    </div>
                                                </div>
                                                <div className="record-date">{record.date}</div>
                                            </div>

                                            <div className="patient-info-section">
                                                <div className="patient-summary">
                                                    <div className="patient-avatar">👤</div>
                                                    <div className="patient-details">
                                                        <div className="patient-name">{record.patientName}</div>
                                                        <div className="patient-meta">
                                                            <span>Age: {record.patientAge}</span>
                                                            <span>Blood Type: {record.patientBloodType}</span>
                                                        </div>
                                                        <div className="patient-email">{record.patientEmail}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="record-summary-section">
                                                <p className="record-summary">{record.summary}</p>
                                            </div>

                                            <div className="record-actions">
                                                <button
                                                    onClick={() => handleViewRecord(record)}
                                                    className="btn btn-primary btn-sm"
                                                >
                                                    <span className="btn-icon">👁️</span>
                                                    View Details
                                                </button>
                                                <button className="btn btn-outline btn-sm">
                                                    <span className="btn-icon">💬</span>
                                                    Add Note
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Record Detail Modal */}
            {showRecordDetail && selectedRecord && (
                <div className="modal-overlay">
                    <div className="modal large-modal">
                        <div className="modal-header">
                            <h3>Record Details</h3>
                            <button
                                onClick={() => setShowRecordDetail(false)}
                                className="close-btn"
                            >
                                ×
                            </button>
                        </div>
                        <div className="modal-content">
                            <div className="record-detail">
                                <div className="detail-section">
                                    <h4>Record Information</h4>
                                    <div className="detail-grid">
                                        <div className="detail-item">
                                            <span className="detail-label">Title</span>
                                            <span className="detail-value">{selectedRecord.title}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Type</span>
                                            <span className="detail-value">{selectedRecord.type}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Date</span>
                                            <span className="detail-value">{selectedRecord.date}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Urgency</span>
                                            <span className={`detail-value urgency-badge ${getUrgencyBadge(selectedRecord.urgency)}`}>
                                                {selectedRecord.urgency.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="detail-section">
                                    <h4>Patient Information</h4>
                                    <div className="detail-grid">
                                        <div className="detail-item">
                                            <span className="detail-label">Name</span>
                                            <span className="detail-value">{selectedRecord.patientName}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Email</span>
                                            <span className="detail-value">{selectedRecord.patientEmail}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Age</span>
                                            <span className="detail-value">{selectedRecord.patientAge} years</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Blood Type</span>
                                            <span className="detail-value">{selectedRecord.patientBloodType}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="detail-section">
                                    <h4>Medical Summary</h4>
                                    <div className="summary-content">
                                        <p>{selectedRecord.summary}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button
                                onClick={() => setShowRecordDetail(false)}
                                className="btn btn-outline"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DoctorDashboard;