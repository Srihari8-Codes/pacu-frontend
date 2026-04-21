import React, { useState } from 'react';
import {
    Bell, Search, Activity, ClipboardList, AlertTriangle,
    Users, LogOut, ChevronRight, Home, LifeBuoy, Globe, X, 
    User, LayoutDashboard, Database, ShieldCheck, Zap,
    Clock, Heart, Hash, Info, Settings, MoreVertical
} from 'lucide-react';
import { useAuth } from '../services/authContext';
import { useSocket } from '../services/socketContext';
import api from '../services/api';
import FindPatient from './FindPatient';
import DoctorAlerts from './DoctorAlerts';
import HelpSupport from './HelpSupport';
import PatientDetails from './PatientDetails';
import PatientList from './PatientList';
import IssueInstruction from './IssueInstruction';
import InstructionSuccess from './InstructionSuccess';
import PatientHistory from './PatientHistory';
import EnterVitals from './EnterVitals';
import ProfilePage from './ProfilePage';
import AppSettings from './AppSettings';

// ─── Sidebar Item ─────────────────────────────────────────────────────────────
const SidebarItem = ({ icon, label, active = false, badge, onClick }: any) => (
    <div
        onClick={onClick}
        style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 20px', borderRadius: '14px', cursor: 'pointer',
            transition: 'all 0.2s', marginBottom: '4px',
            backgroundColor: active ? 'rgba(21, 101, 192, 0.15)' : 'transparent',
            color: active ? '#42A5F5' : '#90A4AE',
        }}
    >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ color: active ? '#42A5F5' : '#546E7A' }}>{icon}</div>
            <span style={{ fontSize: '14px', fontWeight: active ? '800' : '600', letterSpacing: '0.01em' }}>{label}</span>
        </div>
        {badge && (
            <span style={{ 
                backgroundColor: '#EF4444', color: '#fff', fontSize: '10px', 
                fontWeight: '900', padding: '2px 8px', borderRadius: '20px' 
            }}>{badge}</span>
        )}
    </div>
);

// ─── Action Card ──────────────────────────────────────────────────────────────
const ActionCard = ({ icon, title, color, iconColor, onClick }: any) => (
    <div onClick={onClick} style={{ 
        padding: '24px', backgroundColor: '#fff', borderRadius: '24px', 
        display: 'flex', flexDirection: 'column', gap: '16px', cursor: 'pointer', 
        transition: 'all 0.2s', border: '1px solid #F1F5F9',
        boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
    }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
       onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
        <div style={{
            width: 44, height: 44, borderRadius: '14px',
            backgroundColor: color, color: iconColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            {icon}
        </div>
        <div>
            <h3 style={{ fontSize: '14px', fontWeight: '900', color: '#1A1A2E', letterSpacing: '-0.01em' }}>{title}</h3>
        </div>
    </div>
);

// ─── Patient Row ──────────────────────────────────────────────────────────────
const PatientRow = ({ name, id, diagnosis, status, onClick }: any) => {
    const isActive = status === 'ACTIVE';
    return (
        <div onClick={onClick} style={{ 
            backgroundColor: '#fff', padding: '16px 24px', borderRadius: '20px', 
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
            cursor: 'pointer', border: '1px solid #F1F5F9', marginBottom: '12px', 
            transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.01)'
        }} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#1565C0'}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ 
                    width: 48, height: 48, borderRadius: '14px', 
                    backgroundColor: '#F8F9FD', display: 'flex', 
                    alignItems: 'center', justifyContent: 'center', border: '1px solid #F1F5F9'
                }}>
                    <User size={24} color="#1565C0" />
                </div>
                <div>
                    <h4 style={{ fontWeight: '900', color: '#1A1A2E', fontSize: '15px' }}>{name || 'Unknown Patient'}</h4>
                    <p style={{ fontSize: '12px', color: '#90A4AE', fontWeight: '700', marginTop: '2px' }}>ID: {id || '--'} • Procedure: {diagnosis || 'Observation'}</p>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ 
                    padding: '6px 12px', borderRadius: '10px', fontSize: '11px', fontWeight: '900',
                    backgroundColor: isActive ? '#E3F2FD' : '#FFF3E0',
                    color: isActive ? '#1565C0' : '#FB8C00',
                    display: 'flex', alignItems: 'center', gap: '6px'
                }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: isActive ? '#1565C0' : '#FB8C00' }} />
                    {status || 'PENDING'}
                </div>
                <ChevronRight size={18} color="#CFD8DC" />
            </div>
        </div>
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const DoctorDashboard = () => {
    const { user, logout } = useAuth();
    const { socket } = useSocket();
    const [view, setView] = useState('overview');
    const [patientFilter, setPatientFilter] = useState<'all' | 'my'>('all');
    const [selectedPatient, setSelectedPatient] = useState<any>(null);
    const [selectedVitals, setSelectedVitals] = useState<any>(null);
    const [activeEpisodes, setActiveEpisodes] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searching, setSearching] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    
    const initials = user?.name?.split(' ').map((n: any) => n[0]).join('').toUpperCase().substring(0, 2) || 'DR';
    const joinedRooms = React.useRef<Set<string>>(new Set());
    
    // 1. Initial Fetch & Polling (Stable)
    React.useEffect(() => {
        const fetchEpisodes = async () => {
            try {
                const response: any = await api.get('/episodes/active');
                if (response.success) {
                    const episodes = response.data?.episodes || response.episodes || [];
                    setActiveEpisodes(episodes);
                }
            } catch { }
        };
        fetchEpisodes();
        const interval = setInterval(fetchEpisodes, 15000);
        return () => clearInterval(interval);
    }, []);

    // 2. Socket Listeners (Stable)
    React.useEffect(() => {
        if (!socket) return;

        const handleNewEpisode = (newEpisode: any) => {
            setActiveEpisodes(prev => {
                if (prev.find(ep => ep.id === newEpisode.id)) return prev;
                return [newEpisode, ...prev];
            });
        };

        const handleNewVitals = (newVitals: any) => {
            if (selectedPatient?.activeEpisode?.id === newVitals.episodeId) {
                setSelectedVitals(newVitals);
            }
        };

        socket.on('new_episode', handleNewEpisode);
        socket.on('new_vitals', handleNewVitals);

        return () => {
            socket.off('new_episode', handleNewEpisode);
            socket.off('new_vitals', handleNewVitals);
        };
    }, [socket, selectedPatient?.activeEpisode?.id]);

    // 3. Room Joining (State-dependent but throttled by Ref)
    React.useEffect(() => {
        if (!socket || !activeEpisodes.length) return;

        activeEpisodes.forEach(ep => {
            if (!joinedRooms.current.has(ep.id)) {
                socket.emit('join_episode', ep.id);
                joinedRooms.current.add(ep.id);
            }
        });
    }, [socket, activeEpisodes]);

    const handlePatientClick = (episode: any) => {
        setSelectedPatient({ ...episode.patient, activeEpisode: episode, diagnosis: episode.procedure || 'Monitoring' });
        if (episode.vitals && episode.vitals.length > 0) {
            setSelectedVitals(episode.vitals[0]);
        } else {
            setSelectedVitals(null);
        }
        setView('patient-details');
    };

    const selectPatientById = async (patient: any) => {
        if (!patient) return;
        
        // ID-Agnostic Bridge: try multiple possible identifier paths
        const targetId = patient.id || patient.hospitalPatientId || patient.patient_id;
        
        if (!targetId) {
            alert("Record Access Protocol Error: No valid clinical identifier found.");
            return;
        }

        setSearching(true);
        try {
            // Fetch FULL patient profile including episodes using the most reliable ID available
            const res: any = await api.get(`/patients/${targetId}`);
            const fullPatient = res.data?.patient || res.patient;
            
            if (fullPatient && fullPatient.episodes && fullPatient.episodes.length > 0) {
                const latestEpisode = fullPatient.episodes[0];
                setSelectedPatient({ 
                    ...fullPatient, 
                    activeEpisode: latestEpisode,
                    diagnosis: latestEpisode.procedure || fullPatient.procedure || 'Observation'
                });
                
                // Fetch vitals for this episode specifically
                try {
                    const vitalsRes: any = await api.get(`/episodes/${latestEpisode.id}/vitals/latest`);
                    const latestVitals = vitalsRes.data?.vitals || vitalsRes.vitals;
                    setSelectedVitals(latestVitals || null);
                } catch (vErr) {
                    console.warn("Vitals retrieval deferred:", vErr);
                    setSelectedVitals(null);
                }
            } else {
                setSelectedPatient(fullPatient);
                setSelectedVitals(null);
            }
            setView('patient-details');
        } catch (err: any) {
            console.error("Clinical Profile Sync Error:", err);
            const status = err?.response?.status;
            // Diagnostic fallback: if UUID failed, try hospitalPatientId if different
            if (status === 404 && patient.hospitalPatientId && patient.hospitalPatientId !== targetId) {
                 try {
                     const resFallback: any = await api.get(`/patients/${patient.hospitalPatientId}`);
                     const pFallback = resFallback.data?.patient || resFallback.patient;
                     setSelectedPatient(pFallback);
                     setView('patient-details');
                     return;
                 } catch { }
            }
            alert(`Record Access Protocol Failure [Code ${status || 'E-03'}]`);
        } finally {
            setSearching(false);
        }
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        setSearching(true);
        try {
            const res: any = await api.get(`/patients?q=${searchQuery}`);
            const patients = res.data?.patients || res.patients || [];
            if (patients.length > 0) {
                await selectPatientById(patients[0]);
            } else { alert('Patient record not found.'); }
        } catch { alert('Search protocol failure.'); }
        finally { setSearching(false); }
    };

    const handleIssueInstruction = async (instruction: any) => {
        try {
            const patientId = selectedPatient.patient_id || selectedPatient.id;
            await api.post(`/instructions`, {
                patientId,
                instruction: `[${instruction.priority.toUpperCase()}] ${instruction.category}: ${instruction.details}`
            });
            setView('instruction-success');
        } catch { alert('Failed to issue directive.'); }
    };

    const filteredEpisodes = patientFilter === 'my'
        ? activeEpisodes.filter(ep => ep.createdByUserId === user?.id)
        : activeEpisodes;

    const renderContent = () => {
        switch(view) {
            case 'find-patient': return <FindPatient onBack={() => setView('overview')} onSelectPatient={selectPatientById} />;
            case 'patient-list': return <PatientList onBack={() => setView('overview')} />;
            case 'alerts': return <DoctorAlerts onBack={() => setView('overview')} />;
            case 'help-support': return <HelpSupport onBack={() => setView('profile')} />;
            case 'profile': return <ProfilePage onBack={() => setView('overview')} onNavigate={setView} isDoctor={true} />;
            case 'settings': return <AppSettings onBack={() => setView('profile')} />;
            case 'patient-details': return <PatientDetails isDoctor patient={selectedPatient} vitals={selectedVitals} onBack={() => setView('overview')} onIssueInstruction={() => setView('issue-instruction')} onViewHistory={() => setView('patient-history')} onEnterVitals={() => setView('enter-vitals')} />;
            case 'enter-vitals': return <EnterVitals patientName={selectedPatient?.name || 'Patient'} patientId={selectedPatient?.mrn || ''} onBack={() => setView('patient-details')} onSave={async (data: any) => { try { await api.post(`/episodes/${selectedPatient?.activeEpisode?.id}/vitals`, { recordedAt: new Date().toISOString(), heartRate: parseInt(data.heartRate) || undefined, systolicBP: parseInt(data.bpSystolic) || undefined, diastolicBP: parseInt(data.bpDiastolic) || undefined, spo2: parseInt(data.spO2) || undefined, temperature: parseFloat(data.temperature) || undefined, respiratoryRate: parseInt(data.respiratoryRate) || undefined, painScore: parseInt(data.painScore) || undefined, recoveryScore: parseInt(data.recoveryScore) || undefined, remarks: data.notes }); setView('patient-details'); } catch (err: any) { const msg = typeof err === 'string' ? err : err?.response?.data?.message || err?.message || 'System connectivity failure'; alert(`Failed to log vitals: ${msg}`); } }} />;
            case 'issue-instruction': return <IssueInstruction patient={selectedPatient} onBack={() => setView('patient-details')} onSubmit={handleIssueInstruction} />;
            case 'instruction-success': return <InstructionSuccess patient={selectedPatient} onViewAll={() => setView('overview')} onIssueAnother={() => setView('issue-instruction')} onBackToPatient={() => setView('patient-details')} />;
            case 'patient-history': return <PatientHistory patient={selectedPatient} onBack={() => setView('patient-details')} />;
            default:
                return (
                    <div className="fade-in">
                        {/* Status Header */}
                        <div style={{ backgroundColor: '#fff', borderRadius: '28px', padding: '32px', border: '1px solid #F1F5F9', boxShadow: '0 12px 32px rgba(0,0,0,0.03)', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div style={{ 
                                    width: 64, height: 64, borderRadius: '20px', 
                                    background: 'linear-gradient(135deg, #1565C0 0%, #1E88E5 100%)', 
                                    color: '#fff', display: 'flex', alignItems: 'center', 
                                    justifyContent: 'center', fontWeight: '900', fontSize: '20px',
                                    boxShadow: '0 8px 16px rgba(21, 101, 192, 0.2)'
                                }}>
                                    {initials}
                                </div>
                                <div>
                                    <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#1A1A2E', letterSpacing: '-0.02em' }}>
                                        Greetings, Dr. {user?.name?.split(' ')[1] || user?.name}
                                    </h1>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                                        <ShieldCheck size={14} color="#4CAF50" />
                                        <p style={{ color: '#90A4AE', fontSize: '13px', fontWeight: '800' }}>{user?.role === 'doctor' ? 'Clinical Faculty' : 'Registered Staff'} • Post-Anesthesia Care Unit</p>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button onClick={() => setView('alerts')} style={{ width: '52px', height: '52px', backgroundColor: '#F8F9FD', border: '1px solid #F1F5F9', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
                                    <Bell size={22} color="#1565C0" />
                                    {/* Alert indicator removed if count is effectively dummy */}
                                </button>
                            </div>
                        </div>

                        {/* Quick Clinical Paths */}
                        <div style={{ marginBottom: '32px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                                <Zap size={18} color="#FB8C00" />
                                <p style={{ fontSize: '13px', fontWeight: '900', color: '#90A4AE', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Clinical Command Hub</p>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                                <ActionCard onClick={() => setView('alerts')} icon={<AlertTriangle size={24} />} title="Critical Alerts" color="#FFF1F2" iconColor="#EF4444" />
                                <ActionCard onClick={() => setView('find-patient')} icon={<Search size={24} />} title="Global Search" color="#E3F2FD" iconColor="#1565C0" />
                                <ActionCard onClick={() => setView('patient-list')} icon={<Users size={24} />} title="Clinical Registry" color="#F0FDF4" iconColor="#22C55E" />
                            </div>
                        </div>

                        {/* Active monitoring streams are now handled via the Registry Search */}
                    </div>
                );
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8F9FD' }}>
            <Sidebar view={view} setView={setView} user={user} initials={initials} logout={logout} showDropdown={showDropdown} setShowDropdown={setShowDropdown} />
            <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

// ─── Sidebar ───────────────────────────────────────────────────────────
const Sidebar = ({ view, setView, user, initials, logout, showDropdown, setShowDropdown }: any) => (
    <aside style={{ width: '280px', backgroundColor: '#1A1A2E', color: '#fff', display: 'flex', flexDirection: 'column', padding: '32px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '0 16px', marginBottom: '48px' }}>
            <div style={{ width: '44px', height: '44px', backgroundColor: '#1565C0', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(21, 101, 192, 0.3)' }}>
                <Activity size={24} color="#fff" />
            </div>
            <span style={{ fontSize: '20px', fontWeight: '900', letterSpacing: '-0.02em' }}>PACU DASHBOARD</span>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <SidebarItem icon={<Home size={20} />} label="Clinical Status" active={view === 'overview' || view === 'patient-details' || view === 'enter-vitals' || view === 'issue-instruction' || view === 'instruction-success' || view === 'patient-history'} onClick={() => setView('overview')} />
            <SidebarItem icon={<Users size={20} />} label="Patient Registry" active={view === 'find-patient' || view === 'patient-list'} onClick={() => setView('find-patient')} />
            <SidebarItem icon={<Bell size={20} />} label="Active Alerts" active={view === 'alerts'} onClick={() => setView('alerts')} />
        </nav>

        <div style={{ position: 'relative', marginTop: 'auto', padding: '0 8px' }}>
            <div onClick={() => setShowDropdown(!showDropdown)} style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '20px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#1565C0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '14px' }}>
                    {initials}
                </div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                    <p style={{ fontSize: '14px', fontWeight: '800', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>Dr. {user?.name}</p>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: '700' }}>Senior Staff</p>
                </div>
                <MoreVertical size={16} color="rgba(255,255,255,0.3)" />
            </div>
            {showDropdown && (
                <div className="fade-in" style={{ position: 'absolute', bottom: 'calc(100% + 12px)', left: 8, right: 8, backgroundColor: '#fff', borderRadius: '20px', padding: '8px', boxShadow: '0 20px 48px rgba(0,0,0,0.3)', zIndex: 100 }}>
                    <button onClick={() => { setView('profile'); setShowDropdown(false); }} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', backgroundColor: '#fff', color: '#1A1A2E', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', cursor: 'pointer', fontWeight: '800' }}>
                        <User size={18} color="#90A4AE" /> Command Profile
                    </button>
                    <button onClick={() => { setView('help-support'); setShowDropdown(false); }} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', backgroundColor: '#fff', color: '#1A1A2E', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', cursor: 'pointer', fontWeight: '800' }}>
                        <LifeBuoy size={18} color="#90A4AE" /> System Intel
                    </button>
                    <div style={{ height: '1px', backgroundColor: '#F1F5F9', margin: '4px 0' }} />
                    <button onClick={logout} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', backgroundColor: '#fff', color: '#EF4444', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', cursor: 'pointer', fontWeight: '900' }}>
                        <LogOut size={18} color="#EF4444" /> Terminate Session
                    </button>
                </div>
            )}
        </div>
    </aside>
);

export default DoctorDashboard;
