import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

function DoctorDashboard() {
    const [doctorData, setDoctorData] = useState({
        name: 'Dr. Sarah Johnson',
        email: 'dr.johnson@hospital.com',
        specialization: 'Cardiology',
        hospital: 'General Hospital',
        experience: 8
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

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
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
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="header-content">
                    <h1>Doctor Dashboard</h1>
                    <div className="header-actions">
                        <span className="welcome-text">Welcome, {doctorData.name}</span>
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </div>
                </div>
            </header>

            <div className="dashboard-content">
                <div className="dashboard-grid">
                    {/* Doctor Info Card */}
                    <div className="info-card">
                        <h2>Professional Information</h2>
                        <div className="info-details">
                            <div className="info-item">
                                <span className="info-label">Name:</span>
                                <span className="info-value">{doctorData.name}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Email:</span>
                                <span className="info-value">{doctorData.email}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Specialization:</span>
                                <span className="info-value">{doctorData.specialization}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Hospital:</span>
                                <span className="info-value">{doctorData.hospital}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Experience:</span>
                                <span className="info-value">{doctorData.experience} years</span>
                            </div>
                        </div>
                    </div>

                    {/* Statistics Card */}
                    <div className="stats-card">
                        <h2>Dashboard Overview</h2>
                        <div className="stats-grid">
                            <div className="stat-item">
                                <div className="stat-number">{accessibleRecords.length}</div>
                                <div className="stat-label">Total Records</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">
                                    {new Set(accessibleRecords.map(r => r.patientEmail)).size}
                                </div>
                                <div className="stat-label">Patients</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">
                                    {accessibleRecords.filter(r => r.urgency === 'high').length}
                                </div>
                                <div className="stat-label">Urgent Cases</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">
                                    {accessibleRecords.filter(r => {
                                        const recordDate = new Date(r.date);
                                        const today = new Date();
                                        const diffTime = Math.abs(today - recordDate);
                                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                        return diffDays <= 7;
                                    }).length}
                                </div>
                                <div className="stat-label">This Week</div>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filter */}
                    <div className="search-filter-card">
                        <h2>Search & Filter Records</h2>
                        <div className="search-filter-controls">
                            <div className="search-group">
                                <input
                                    type="text"
                                    placeholder="Search by patient name, record title, or type..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="search-input"
                                />
                            </div>
                            <div className="filter-group">
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
                    <div className="records-card full-width">
                        <h2>Patient Health Records ({filteredRecords.length})</h2>
                        <div className="records-list">
                            {filteredRecords.length === 0 ? (
                                <div className="no-records">
                                    <p>No records found matching your search criteria.</p>
                                </div>
                            ) : (
                                filteredRecords.map(record => (
                                    <div key={record.id} className="record-item doctor-record">
                                        <div className="record-header">
                                            <div className="record-title-section">
                                                <h3>{record.title}</h3>
                                                <div className="record-badges">
                                                    <span className={`urgency-badge ${getUrgencyBadge(record.urgency)}`}>
                                                        {record.urgency.toUpperCase()}
                                                    </span>
                                                    <span className="record-type-badge">{record.type}</span>
                                                </div>
                                            </div>
                                            <span className="record-date">{record.date}</span>
                                        </div>

                                        <div className="patient-info">
                                            <div className="patient-details">
                                                <div className="patient-name">
                                                    <strong>Patient:</strong> {record.patientName}
                                                </div>
                                                <div className="patient-meta">
                                                    <span>Age: {record.patientAge}</span>
                                                    <span>Blood Type: {record.patientBloodType}</span>
                                                    <span>Email: {record.patientEmail}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="record-summary">
                                            <p>{record.summary}</p>
                                        </div>

                                        <div className="record-actions">
                                            <button
                                                onClick={() => handleViewRecord(record)}
                                                className="view-btn"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

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
                                            <span className="detail-label">Title:</span>
                                            <span className="detail-value">{selectedRecord.title}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Type:</span>
                                            <span className="detail-value">{selectedRecord.type}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Date:</span>
                                            <span className="detail-value">{selectedRecord.date}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Urgency:</span>
                                            <span className={`detail-value ${getUrgencyBadge(selectedRecord.urgency)}`}>
                                                {selectedRecord.urgency.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="detail-section">
                                    <h4>Patient Information</h4>
                                    <div className="detail-grid">
                                        <div className="detail-item">
                                            <span className="detail-label">Name:</span>
                                            <span className="detail-value">{selectedRecord.patientName}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Email:</span>
                                            <span className="detail-value">{selectedRecord.patientEmail}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Age:</span>
                                            <span className="detail-value">{selectedRecord.patientAge}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Blood Type:</span>
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
                                className="close-detail-btn"
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