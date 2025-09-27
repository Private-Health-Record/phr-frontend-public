import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/variables.css';
import '../styles/modern-dashboard.css';

function PatientDashboard() {
    const [patientData] = useState({
        name: 'John Patient',
        email: 'patient@example.com',
        age: 35,
        bloodType: 'O+',
        allergies: ['Penicillin', 'Shellfish']
    });

    const [healthRecords, setHealthRecords] = useState([
        {
            id: 1,
            title: 'Blood Test Results',
            date: '2024-01-15',
            doctor: 'Smith',
            type: 'Lab Report',
            summary: 'All levels normal',
            accessGranted: ['dr.smith@hospital.com']
        },
        {
            id: 2,
            title: 'X-Ray Chest',
            date: '2024-01-10',
            doctor: 'Johnson',
            type: 'Imaging',
            summary: 'No abnormalities detected',
            accessGranted: []
        }
    ]);

    const [newRecord, setNewRecord] = useState({
        title: '',
        type: '',
        summary: '',
        file: null
    });

    const [doctorEmail, setDoctorEmail] = useState('');
    const [selectedRecordId, setSelectedRecordId] = useState(null);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [showAccessForm, setShowAccessForm] = useState(false);
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    const handleFileUpload = (e) => {
        setNewRecord({ ...newRecord, file: e.target.files[0] });
    };

    const handleUploadRecord = (e) => {
        e.preventDefault();
        if (!newRecord.title || !newRecord.type) return;

        const record = {
            id: healthRecords.length + 1,
            title: newRecord.title,
            date: new Date().toISOString().split('T')[0],
            doctor: 'Self-uploaded',
            type: newRecord.type,
            summary: newRecord.summary,
            accessGranted: []
        };

        setHealthRecords([...healthRecords, record]);
        setNewRecord({ title: '', type: '', summary: '', file: null });
        setShowUploadForm(false);
    };

    const handleGrantAccess = (e) => {
        e.preventDefault();
        if (!doctorEmail || !selectedRecordId) return;

        setHealthRecords(prev => prev.map(record =>
            record.id === selectedRecordId
                ? { ...record, accessGranted: [...record.accessGranted, doctorEmail] }
                : record
        ));

        setDoctorEmail('');
        setSelectedRecordId(null);
        setShowAccessForm(false);
    };

    const handleRevokeAccess = (recordId, doctorEmail) => {
        setHealthRecords(prev => prev.map(record =>
            record.id === recordId
                ? { ...record, accessGranted: record.accessGranted.filter(email => email !== doctorEmail) }
                : record
        ));
    };

    const handleConnectWallet = async () => {
        try {
            const mockAddress = '0x' + Math.random().toString(16).substr(2, 40);
            setWalletAddress(mockAddress);
            setIsWalletConnected(true);
        } catch (error) {
            console.error('Failed to connect wallet:', error);
        }
    };

    const handleDisconnectWallet = () => {
        setWalletAddress('');
        setIsWalletConnected(false);
    };

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
                        <a href="#records" className="nav-link">
                            <span className="nav-icon">📋</span>
                            <span className="nav-text">Health Records</span>
                        </a>
                        <a href="#access" className="nav-link">
                            <span className="nav-icon">🔐</span>
                            <span className="nav-text">Access Control</span>
                        </a>
                    </div>

                    <div className="nav-section">
                        <div className="nav-section-title">Actions</div>
                        <button onClick={() => setShowUploadForm(true)} className="nav-link">
                            <span className="nav-icon">📤</span>
                            <span className="nav-text">Upload Record</span>
                        </button>
                        <button onClick={() => setShowAccessForm(true)} className="nav-link">
                            <span className="nav-icon">👩‍⚕️</span>
                            <span className="nav-text">Grant Access</span>
                        </button>
                    </div>

                    <div className="nav-section">
                        <div className="nav-section-title">Settings</div>
                        <a href="#profile" className="nav-link">
                            <span className="nav-icon">👤</span>
                            <span className="nav-text">Profile</span>
                        </a>
                        <a href="#security" className="nav-link">
                            <span className="nav-icon">🛡️</span>
                            <span className="nav-text">Security</span>
                        </a>
                    </div>
                </nav>

                <div className="sidebar-footer">
                    <div className="user-profile">
                        <div className="user-avatar">👤</div>
                        <div className="user-info">
                            <div className="user-name">{patientData.name}</div>
                            <div className="user-role">Patient</div>
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
                        <h1 className="page-title">Patient Dashboard</h1>
                        <p className="page-subtitle">Manage your health records and access permissions</p>
                    </div>
                    <div className="header-right">
                        <div className="wallet-section">
                            {isWalletConnected ? (
                                <div className="wallet-connected">
                                    <div className="wallet-info">
                                        <div className="wallet-status">
                                            <span className="wallet-indicator">🟢</span>
                                            <span className="wallet-text">Wallet Connected</span>
                                        </div>
                                        <div className="wallet-address">
                                            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                                        </div>
                                    </div>
                                    <button onClick={handleDisconnectWallet} className="btn btn-outline btn-sm">
                                        Disconnect
                                    </button>
                                </div>
                            ) : (
                                <button onClick={handleConnectWallet} className="btn btn-primary">
                                    <span className="btn-icon">👛</span>
                                    Connect Wallet
                                </button>
                            )}
                        </div>
                    </div>
                </header>

                <div className="dashboard-grid">
                    {/* Patient Info Card */}
                    <div className="dashboard-card">
                        <div className="card-header">
                            <h2 className="card-title">Personal Information</h2>
                            <span className="card-icon">👤</span>
                        </div>
                        <div className="card-content">
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">Full Name</span>
                                    <span className="info-value">{patientData.name}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Email Address</span>
                                    <span className="info-value">{patientData.email}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Age</span>
                                    <span className="info-value">{patientData.age} years</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Blood Type</span>
                                    <span className="info-value">
                                        <span className="blood-type-badge">{patientData.bloodType}</span>
                                    </span>
                                </div>
                                <div className="info-item full-width">
                                    <span className="info-label">Known Allergies</span>
                                    <div className="allergies-list">
                                        {patientData.allergies.map((allergy, index) => (
                                            <span key={index} className="allergy-badge">{allergy}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Health Records */}
                    <div className="dashboard-card full-width">
                        <div className="card-header">
                            <h2 className="card-title">Health Records</h2>
                            <div className="card-actions">
                                <button onClick={() => setShowUploadForm(true)} className="btn btn-primary btn-sm">
                                    <span className="btn-icon">📤</span>
                                    Upload
                                </button>
                            </div>
                        </div>
                        <div className="card-content">
                            <div className="records-grid">
                                {healthRecords.map(record => (
                                    <div key={record.id} className="record-card">
                                        <div className="record-header">
                                            <div className="record-title-section">
                                                <h3 className="record-title">{record.title}</h3>
                                                <div className="record-meta">
                                                    <span className="record-type-badge">{record.type}</span>
                                                    <span className="record-date">{record.date}</span>
                                                </div>
                                            </div>
                                            <div className="record-actions">
                                                <button className="btn btn-outline btn-sm">
                                                    <span className="btn-icon">👁️</span>
                                                    View
                                                </button>
                                            </div>
                                        </div>

                                        <div className="record-content">
                                            <div className="record-info">
                                                <div className="record-doctor">
                                                    <span className="doctor-icon">👨‍⚕️</span>
                                                    <span>Dr. {record.doctor}</span>
                                                </div>
                                            </div>
                                            <p className="record-summary">{record.summary}</p>
                                        </div>

                                        <div className="access-section">
                                            <div className="access-header">
                                                <h4 className="access-title">Access Permissions</h4>
                                                <button
                                                    onClick={() => {
                                                        setSelectedRecordId(record.id);
                                                        setShowAccessForm(true);
                                                    }}
                                                    className="btn btn-secondary btn-xs"
                                                >
                                                    Grant Access
                                                </button>
                                            </div>
                                            {record.accessGranted.length === 0 ? (
                                                <div className="no-access">
                                                    <span className="no-access-icon">🔒</span>
                                                    <span>No doctors have access</span>
                                                </div>
                                            ) : (
                                                <div className="access-list">
                                                    {record.accessGranted.map(email => (
                                                        <div key={email} className="access-item">
                                                            <div className="access-doctor">
                                                                <span className="doctor-avatar">👨‍⚕️</span>
                                                                <span className="doctor-email">{email}</span>
                                                            </div>
                                                            <button
                                                                onClick={() => handleRevokeAccess(record.id, email)}
                                                                className="btn btn-danger btn-xs"
                                                            >
                                                                Revoke
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Upload Form Modal */}
            {showUploadForm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>Upload New Health Record</h3>
                            <button
                                onClick={() => setShowUploadForm(false)}
                                className="close-btn"
                            >
                                ×
                            </button>
                        </div>
                        <form onSubmit={handleUploadRecord} className="upload-form">
                            <div className="form-group">
                                <label>Record Title</label>
                                <input
                                    type="text"
                                    value={newRecord.title}
                                    onChange={(e) => setNewRecord({...newRecord, title: e.target.value})}
                                    placeholder="e.g., Blood Test Results"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Record Type</label>
                                <select
                                    value={newRecord.type}
                                    onChange={(e) => setNewRecord({...newRecord, type: e.target.value})}
                                    required
                                >
                                    <option value="">Select Type</option>
                                    <option value="Lab Report">Lab Report</option>
                                    <option value="Imaging">Imaging</option>
                                    <option value="Prescription">Prescription</option>
                                    <option value="Diagnosis">Diagnosis</option>
                                    <option value="Treatment Plan">Treatment Plan</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Summary</label>
                                <textarea
                                    value={newRecord.summary}
                                    onChange={(e) => setNewRecord({...newRecord, summary: e.target.value})}
                                    placeholder="Brief summary of the record"
                                    rows="3"
                                />
                            </div>
                            <div className="form-group">
                                <label>Upload File</label>
                                <input
                                    type="file"
                                    onChange={handleFileUpload}
                                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                />
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="btn btn-primary">Upload Record</button>
                                <button
                                    type="button"
                                    onClick={() => setShowUploadForm(false)}
                                    className="btn btn-outline"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Access Form Modal */}
            {showAccessForm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>Grant Doctor Access</h3>
                            <button
                                onClick={() => setShowAccessForm(false)}
                                className="close-btn"
                            >
                                ×
                            </button>
                        </div>
                        <form onSubmit={handleGrantAccess} className="access-form">
                            <div className="form-group">
                                <label>Select Record</label>
                                <select
                                    value={selectedRecordId || ''}
                                    onChange={(e) => setSelectedRecordId(parseInt(e.target.value))}
                                    required
                                >
                                    <option value="">Choose a record</option>
                                    {healthRecords.map(record => (
                                        <option key={record.id} value={record.id}>
                                            {record.title} ({record.date})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Doctor's Email</label>
                                <input
                                    type="email"
                                    value={doctorEmail}
                                    onChange={(e) => setDoctorEmail(e.target.value)}
                                    placeholder="doctor@hospital.com"
                                    required
                                />
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="btn btn-primary">Grant Access</button>
                                <button
                                    type="button"
                                    onClick={() => setShowAccessForm(false)}
                                    className="btn btn-outline"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PatientDashboard;