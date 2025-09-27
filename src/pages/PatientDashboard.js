import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

function PatientDashboard() {
    const [patientData, setPatientData] = useState({
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
            doctor: 'Dr. Smith',
            type: 'Lab Report',
            summary: 'All levels normal',
            accessGranted: ['dr.smith@hospital.com']
        },
        {
            id: 2,
            title: 'X-Ray Chest',
            date: '2024-01-10',
            doctor: 'Dr. Johnson',
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

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="header-content">
                    <h1>Patient Dashboard</h1>
                    <div className="header-actions">
                        <span className="welcome-text">Welcome, {patientData.name}</span>
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </div>
                </div>
            </header>

            <div className="dashboard-content">
                <div className="dashboard-grid">
                    {/* Patient Info Card */}
                    <div className="info-card">
                        <h2>Personal Information</h2>
                        <div className="info-details">
                            <div className="info-item">
                                <span className="info-label">Name:</span>
                                <span className="info-value">{patientData.name}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Email:</span>
                                <span className="info-value">{patientData.email}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Age:</span>
                                <span className="info-value">{patientData.age}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Blood Type:</span>
                                <span className="info-value">{patientData.bloodType}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Allergies:</span>
                                <span className="info-value">{patientData.allergies.join(', ')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="actions-card">
                        <h2>Quick Actions</h2>
                        <div className="action-buttons">
                            <button
                                onClick={() => setShowUploadForm(true)}
                                className="action-btn upload-btn"
                            >
                                Upload New Record
                            </button>
                            <button
                                onClick={() => setShowAccessForm(true)}
                                className="action-btn access-btn"
                            >
                                Grant Doctor Access
                            </button>
                        </div>
                    </div>

                    {/* Health Records */}
                    <div className="records-card">
                        <h2>Health Records</h2>
                        <div className="records-list">
                            {healthRecords.map(record => (
                                <div key={record.id} className="record-item">
                                    <div className="record-header">
                                        <h3>{record.title}</h3>
                                        <span className="record-date">{record.date}</span>
                                    </div>
                                    <div className="record-details">
                                        <div className="record-info">
                                            <span className="record-type">{record.type}</span>
                                            <span className="record-doctor">Dr: {record.doctor}</span>
                                        </div>
                                        <p className="record-summary">{record.summary}</p>
                                    </div>
                                    <div className="access-section">
                                        <h4>Access Granted To:</h4>
                                        {record.accessGranted.length === 0 ? (
                                            <p className="no-access">No doctors have access</p>
                                        ) : (
                                            <div className="access-list">
                                                {record.accessGranted.map(email => (
                                                    <div key={email} className="access-item">
                                                        <span>{email}</span>
                                                        <button
                                                            onClick={() => handleRevokeAccess(record.id, email)}
                                                            className="revoke-btn"
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
                                <button type="submit" className="submit-btn">Upload Record</button>
                                <button
                                    type="button"
                                    onClick={() => setShowUploadForm(false)}
                                    className="cancel-btn"
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
                                <button type="submit" className="submit-btn">Grant Access</button>
                                <button
                                    type="button"
                                    onClick={() => setShowAccessForm(false)}
                                    className="cancel-btn"
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