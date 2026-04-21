import React, { useState, useEffect } from 'react';
import {
    Bell, UserPlus, Activity, ClipboardList,
    ChevronRight, Users, LogOut, Search, LayoutDashboard,
    LifeBuoy, Globe, Plus, Clock, User, Shield, CheckCircle, 
    X, Zap, ShieldCheck, Heart, Hash, Info, MoreVertical
} from 'lucide-react';
import { useAuth } from '../services/authContext';
import { useSocket } from '../services/socketContext';
import RegisterPatient from './RegisterPatient';
import RegistrationSuccess from './RegistrationSuccess';
import EnterVitals from './EnterVitals';
import VitalsSuccess from './VitalsSuccess';
import PatientDetails from './PatientDetails';
import HelpCenter from './HelpSupport';
import PatientList from './PatientList';
import DoctorAlerts from './DoctorAlerts';
import PatientHistory from './PatientHistory';
import LiveMonitorDetail from './LiveMonitorDetail';
import ProfilePage from './ProfilePage';
import AppSettings from './AppSettings';
import api from '../services/api';

// ─── Sidebar Item ─────────────────────────────────────────────────────────────
const SidebarItem = ({ icon, label, active = false, badge, onClick }: any) => (
    <div
        onClick={onClick}
        style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 20px', borderRadius: '14px', cursor: 'pointer',
            transition: 'all 0.2s', marginBottom: '4px',
            backgroundColor: active ? 'rgba(21,101,192,0.15)' : 'transparent',
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
const PatientRow = ({ name, id, mrn, diagnosis, status, bed, onClick }: any) => {
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
                    <h4 style={{ fontWeight: '900', color: '#1A1A2E', fontSize: '15px' }}>{name || 'Clinical Subject'}</h4>
                    <p style={{ fontSize: '12px', color: '#90A4AE', fontWeight: '700', marginTop: '2px' }}>Patient ID: {id} • Bed: {bed || 'TBD'}</p>
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
                    {status || 'ADMITTED'}
                </div>
                <ChevronRight size={18} color="#CFD8DC" />
            </div>
        </div>
    );
};

// ─── Instruction Card ─────────────────────────────────────────────────────────
const InstructionCard = ({ name, text, time, priority }: any) => {
    const isUrgent = priority === 'HIGH' || priority === 'URGENT';
    return (
        <div style={{
            padding: '20px', backgroundColor: '#fff',
            borderRadius: '24px',
            border: `1px solid ${isUrgent ? '#FEE2E2' : '#F1F5F9'}`,
            borderLeft: `6px solid ${isUrgent ? '#EF4444' : '#FB8C00'}`,
            boxShadow: '0 8px 24px rgba(0,0,0,0.02)',
            marginBottom: '16px',
            transition: 'all 0.2s'
        }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <h4 style={{ fontWeight: '900', fontSize: '14px', color: '#1A1A2E' }}>{name}</h4>
                <div style={{ 
                    color: isUrgent ? '#EF4444' : '#FB8C00', 
                    display: 'flex', alignItems: 'center', gap: '6px', 
                    fontSize: '11px', fontWeight: '900',
                    backgroundColor: isUrgent ? '#FEE2E2' : '#FFF3E0',
                    padding: '4px 8px', borderRadius: '6px'
                }}>
                    <Clock size={12} />{time}
                </div>
            </div>
            <p style={{ fontSize: '13px', color: '#546E7A', fontWeight: '700', lineHeight: 1.6 }}>{text}</p>
        </div>
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const NurseDashboard = () => {
    const { user, logout } = useAuth();
    const { socket } = useSocket();
    const [view, setView] = useState('overview');
    const [activeEpisodes, setActiveEpisodes] = useState<any[]>([]);
    const [tasks, setTasks] = useState<any[]>([]);
    const [currentPatient, setCurrentPatient] = useState<any>(null);
    const [currentVitals, setCurrentVitals] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [alertMsg, setAlertMsg] = useState<string | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const joinedRooms = React.useRef<Set<string>>(new Set());
    
    const initials = user?.name?.split(' ').map((n: any) => n[0]).join('').toUpperCase().substring(0, 2) || 'NA';

    const normalizedSearch = (searchQuery || '').toLowerCase().trim();

    // 1. Socket Listener Registration (Stable)
    useEffect(() => {
        if (!socket) return;
        
        const handleNewMessage = (msg: any) => {
            if (msg.type === 'TASK') {
                setTasks(prev => {
                    // Avoid duplicate tasks
                    if (prev.find(t => t.id === msg.id)) return prev;
                    return [msg, ...prev];
                });
                setAlertMsg(`New Dr. Order received`);
            }
        };

        const handleNewEpisode = (newEpisode: any) => {
            setActiveEpisodes(prev => {
                if (prev.find(ep => ep.id === newEpisode.id)) return prev;
                return [newEpisode, ...prev];
            });
        };
        
        socket.on('new_message', handleNewMessage);
        socket.on('new_episode', handleNewEpisode);
        return () => { 
            socket.off('new_message', handleNewMessage); 
            socket.off('new_episode', handleNewEpisode);
        };
    }, [socket]);

    // 2. Room Joining Logic (State-dependent but throttled by Ref)
    useEffect(() => {
        if (!socket || !activeEpisodes.length) return;
        
        activeEpisodes.forEach(ep => {
            if (!joinedRooms.current.has(ep.id)) {
                socket.emit('join_episode', ep.id);
                joinedRooms.current.add(ep.id);
            }
        });
    }, [socket, activeEpisodes]);

    // 3. Initial Fetch & Episode Polling
    useEffect(() => {
        const pollEpisodes = async () => {
            try {
                const res: any = await api.get('/episodes/active');
                if (res.success) {
                    const episodes = res.data?.episodes || res.episodes || [];
                    setActiveEpisodes(episodes);
                }
            } catch { }
        };
        pollEpisodes();
        const interval = setInterval(pollEpisodes, 15000);
        return () => clearInterval(interval);
    }, []);

    // 4. Message/Task Polling (Simplified)
    useEffect(() => {
        const pollTasks = async () => {
            if (!activeEpisodes.length) return;
            try {
                let all: any[] = [];
                for (const ep of activeEpisodes) {
                    const patientId = ep.patient?.patient_id || ep.patient?.id;
                    if (!patientId) continue;

                    const res: any = await api.get(`/instructions/${patientId}`);
                    const instrs = res.data?.instructions || res.instructions || [];
                    
                    const epTasks = instrs.map((i: any) => {
                        let priority = 'NORMAL';
                        const instrText = (i.instruction || '').toUpperCase();
                        if (instrText.includes('[URGENT]')) priority = 'URGENT';
                        if (instrText.includes('[CRITICAL]')) priority = 'CRITICAL';
                        
                        return {
                            id: i.id,
                            text: i.instruction,
                            priority,
                            createdAt: i.createdAt,
                            patientName: ep.patient?.name
                        };
                    });
                    all = [...all, ...epTasks];
                }
                all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setTasks(all);
            } catch { }
        };
        pollTasks();
        const interval = setInterval(pollTasks, 30000);
        return () => clearInterval(interval);
    }, [activeEpisodes.length]); // Only re-run if number of episodes changes

    const handleRegisterComplete = async (data: any) => {
        try {
            setLoading(true);
            // api interceptor unwraps response.data, so `res` IS the body
            const res: any = await api.post('/patients', { 
                name: data.name, 
                age: parseInt(data.age) || 0, 
                gender: data.gender, 
                procedure: data.procedure, 
                allergies: data.allergies 
            });
            
            if (res.success) { 
                const newPatient = res.data?.patient || res.patient;
                try {
                    // Use newPatient.id as the foreign key
                    const epRes: any = await api.post('/episodes', { 
                        patientId: newPatient.id, 
                        bedNumber: data.bedNumber || 'TBD' 
                    });
                    if (epRes.success) {
                        setCurrentPatient({ ...newPatient, activeEpisode: epRes.data?.episode || epRes.episode });
                    } else {
                        setCurrentPatient(newPatient);
                    }
                } catch (e) { setCurrentPatient(newPatient); }
                setView('success'); 
            } else { alert(`Registration failed: ${res.message || 'Unknown protocol error'}`); }
        } catch (err: any) { 
            // Interceptor rejects with a string, not an Error object
            const msg = typeof err === 'string' ? err : (err?.response?.data?.message || err?.message || 'System connectivity failure');
            alert(`Registration failed: ${msg}`); 
        } 
        finally { setLoading(false); }
    };

    const handleVitalsSave = async (data: any) => {
        try {
            setLoading(true);
            const episodeId = currentPatient?.activeEpisode?.id;
            if (!episodeId) return;
            const res: any = await api.post(`/episodes/${episodeId}/vitals`, { 
                recordedAt: new Date().toISOString(),
                heartRate: parseInt(data.heartRate) || undefined, 
                systolicBP: parseInt(data.bpSystolic) || undefined, 
                diastolicBP: parseInt(data.bpDiastolic) || undefined, 
                spo2: parseInt(data.spO2) || undefined, 
                temperature: parseFloat(data.temperature) || undefined, 
                respiratoryRate: parseInt(data.respiratoryRate) || undefined, 
                painScore: parseInt(data.painScore) || undefined, 
                recoveryScore: parseInt(data.recoveryScore) || undefined, 
                remarks: data.notes 
            });
            if (res.success) { setCurrentVitals(res.data?.vitals || res.vitals); setView('vitals_success'); }
        } catch (err: any) { alert(`Failed to log vitals`); } 
        finally { setLoading(false); }
    };

    const handlePatientClick = (episode: any) => {
        setCurrentPatient({ ...episode.patient, activeEpisode: episode });
        if (episode.vitals && episode.vitals.length > 0) {
            setCurrentVitals(episode.vitals[0]);
        } else {
            setCurrentVitals(null);
        }
        setView('patient_details');
    };

    const filteredEpisodes = activeEpisodes.filter(e =>
        (e.patient?.name || '').toLowerCase().includes(normalizedSearch) ||
        (e.patient?.patient_id || '').toLowerCase().includes(normalizedSearch)
    );

    const renderMainOverview = () => (
        <div className="fade-in">
            {/* Clinical Alert Toast */}
            {alertMsg && (
                <div style={{ backgroundColor: '#EF4444', color: '#fff', padding: '20px 24px', borderRadius: '24px', boxShadow: '0 20px 48px rgba(239, 68, 68, 0.3)', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px', fontWeight: '900', border: '1px solid rgba(255,255,255,0.2)' }}>
                    <Bell size={24} className="pulse" />
                    <span style={{ flex: 1, fontSize: '15px' }}>{alertMsg}</span>
                    <button onClick={() => setAlertMsg(null)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', cursor: 'pointer', padding: '8px', borderRadius: '12px' }}><X size={20} /></button>
                </div>
            )}

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
                            Good Afternoon, Nurse {user?.name?.split(' ')[1] || user?.name}
                        </h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                            <ShieldCheck size={14} color="#4CAF50" />
                            <p style={{ color: '#90A4AE', fontSize: '13px', fontWeight: '800' }}>Senior Staff Nurse • Wing Recovery 02</p>
                        </div>
                    </div>
                </div>
                <button onClick={() => setView('alerts')} style={{ width: '52px', height: '52px', backgroundColor: '#F8F9FD', border: '1px solid #F1F5F9', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
                    <Bell size={22} color="#1565C0" />
                    {tasks.length > 0 && <div style={{ position: 'absolute', top: '14px', right: '14px', width: '10px', height: '10px', backgroundColor: '#EF4444', borderRadius: '50%', border: '2px solid #fff' }} />}
                </button>
            </div>

            {/* Quick Workflow Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
                <ActionCard onClick={() => setView('vitals')} icon={<Activity size={24} />} title="Update Vitals" color="#E3F2FD" iconColor="#1565C0" />
                <ActionCard onClick={() => setView('register')} icon={<UserPlus size={24} />} title="New Patient" color="#F0FDF4" iconColor="#22C55E" />
                <ActionCard onClick={() => setView('alerts')} icon={<ClipboardList size={24} />} title="Clinical Orders" color="#F3E5F5" iconColor="#7B1FA2" />
            </div>

            {/* Content Feed */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '32px', paddingBottom: '100px' }}>
                {/* Registry View */}
                <section>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Users size={18} color="#1565C0" />
                            <p style={{ fontSize: '13px', fontWeight: '900', color: '#90A4AE', textTransform: 'uppercase', letterSpacing: '0.08em' }}>My Active Units</p>
                        </div>
                        <button onClick={() => setView('patient-list')} style={{ background: 'none', border: 'none', color: '#1565C0', fontWeight: '900', fontSize: '13px', cursor: 'pointer' }}>EXPLORE ALL</button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {filteredEpisodes.length > 0 ? filteredEpisodes.slice(0, 8).map(ep => (
                            <PatientRow key={ep.id} name={ep.patient?.name} id={ep.patient?.patient_id} diagnosis={ep.procedure} bed={ep.bedNumber} status={ep.status} onClick={() => handlePatientClick(ep)} />
                        )) : (
                            <div style={{ textAlign: 'center', padding: '80px 40px', backgroundColor: '#fff', borderRadius: '32px', border: '2px dashed #ECEFF1' }}>
                                <Users size={48} color="#CFD8DC" style={{ margin: '0 auto 20px', opacity: 0.5 }} />
                                <p style={{ fontSize: '16px', color: '#90A4AE', fontWeight: '800' }}>Registry unit is empty</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Directive Stream */}
                <aside>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                        <Zap size={18} color="#FB8C00" />
                        <p style={{ fontSize: '13px', fontWeight: '900', color: '#90A4AE', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Clinical Directives</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {tasks.length > 0 ? tasks.map((task) => (
                            <InstructionCard
                                key={task.id}
                                name={task.patientName}
                                text={task.text}
                                time={new Date(task.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                priority={task.priority}
                            />
                        )) : (
                            <div style={{ textAlign: 'center', backgroundColor: '#fff', borderRadius: '32px', padding: '48px 24px', border: '1px solid #F1F5F9' }}>
                                <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#F0FDF4', color: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                                    <CheckCircle size={28} />
                                </div>
                                <p style={{ color: '#1A1A2E', fontSize: '15px', fontWeight: '900' }}>Directives Cleared</p>
                                <p style={{ color: '#90A4AE', fontSize: '12px', fontWeight: '700', marginTop: '4px' }}>Stable recovery environment.</p>
                            </div>
                        )}
                    </div>
                </aside>
            </div>

            {/* Primary Action Button */}
            <button onClick={() => setView('register')} style={{ position: 'fixed', bottom: '40px', right: '40px', width: '72px', height: '72px', borderRadius: '24px', background: 'linear-gradient(135deg, #1565C0 0%, #1E88E5 100%)', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 48px rgba(21, 101, 192, 0.4)', cursor: 'pointer', zIndex: 100, transition: 'all 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}>
                <Plus size={40} />
            </button>
        </div>
    );

    const renderContent = () => {
        switch(view) {
            case 'register': return <RegisterPatient onBack={() => setView('overview')} onSubmit={handleRegisterComplete} />;
            case 'success': return <RegistrationSuccess patientData={currentPatient} onEnterVitals={() => setView('vitals')} onViewDetails={() => setView('overview')} onRegisterAnother={() => setView('register')} />;
            case 'vitals': return <EnterVitals patientName={currentPatient?.name || 'Patient'} patientId={currentPatient?.mrn || currentPatient?.id || 'N/A'} onBack={() => (currentPatient ? setView('success') : setView('overview'))} onSave={handleVitalsSave} />;
            case 'vitals_success': return <VitalsSuccess patientName={currentPatient?.name || 'Patient'} onViewPatient={() => setView('patient_details')} onRecordNew={() => setView('vitals')} />;
            case 'patient_details': return <PatientDetails patient={currentPatient} vitals={currentVitals} onBack={() => setView('overview')} onEnterVitals={() => setView('vitals')} />;
            case 'help-support': return <HelpCenter onBack={() => setView('profile')} />;
            case 'patient-list': return <PatientList onBack={() => setView('overview')} />;
            case 'alerts': return <DoctorAlerts onBack={() => setView('overview')} />;
            case 'vitals-log': return <PatientHistory patient={currentPatient || { name: 'Select Patient' }} onBack={() => setView('overview')} />;
            case 'profile': return <ProfilePage onBack={() => setView('overview')} onNavigate={setView} isDoctor={false} />;
            case 'settings': return <AppSettings onBack={() => setView('profile')} />;
            case 'live-monitor': return <LiveMonitorDetail episodeId={currentPatient?.activeEpisode?.id} patientName={currentPatient?.name} onBack={() => setView('overview')} />;
            default: return renderMainOverview();
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8F9FD' }}>
            <Sidebar view={view} setView={setView} user={user} initials={initials} logout={logout} tasks={tasks} showDropdown={showDropdown} setShowDropdown={setShowDropdown} />
            <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

// ─── Sidebar ───────────────────────────────────────────────────────────
const Sidebar = ({ view, setView, user, initials, logout, tasks, showDropdown, setShowDropdown }: any) => (
    <aside style={{ width: '280px', backgroundColor: '#1A1A2E', color: '#fff', display: 'flex', flexDirection: 'column', padding: '32px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '0 16px', marginBottom: '48px' }}>
            <div style={{ width: '44px', height: '44px', backgroundColor: '#1565C0', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(21, 101, 192, 0.3)' }}>
                <Activity size={24} color="#fff" />
            </div>
            <span style={{ fontSize: '20px', fontWeight: '900', letterSpacing: '-0.02em' }}>PACU DASHBOARD</span>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <SidebarItem icon={<LayoutDashboard size={20} />} label="Ward Overview" active={view === 'overview' || view === 'vitals' || view === 'register' || view === 'success' || view === 'vitals_success'} onClick={() => setView('overview')} />
            <SidebarItem icon={<Users size={20} />} label="Patient Registry" active={view === 'patient-list' || view === 'patient_details'} onClick={() => setView('patient-list')} />
            <SidebarItem icon={<Activity size={20} />} label="Vitals History" active={view === 'vitals-log'} onClick={() => setView('vitals-log')} />
        </nav>

        <div style={{ position: 'relative', marginTop: 'auto', padding: '0 8px' }}>
            <div onClick={() => setShowDropdown(!showDropdown)} style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '20px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#1565C0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '14px' }}>
                    {initials}
                </div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                    <p style={{ fontSize: '14px', fontWeight: '800', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{user?.name}</p>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: '700' }}>Senior Nurse</p>
                </div>
                <MoreVertical size={16} color="rgba(255,255,255,0.3)" />
            </div>
            {showDropdown && (
                <div className="fade-in" style={{ position: 'absolute', bottom: 'calc(100% + 12px)', left: 8, right: 8, backgroundColor: '#fff', borderRadius: '20px', padding: '8px', boxShadow: '0 20px 48px rgba(0,0,0,0.3)', zIndex: 100 }}>
                    <button onClick={() => { setView('profile'); setShowDropdown(false); }} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', backgroundColor: '#fff', color: '#1A1A2E', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', cursor: 'pointer', fontWeight: '800' }}>
                        <User size={18} color="#90A4AE" /> Personnel Detail
                    </button>
                    <button onClick={() => { setView('help-support'); setShowDropdown(false); }} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', backgroundColor: '#fff', color: '#1A1A2E', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', cursor: 'pointer', fontWeight: '800' }}>
                        <LifeBuoy size={18} color="#90A4AE" /> System Support
                    </button>
                    <div style={{ height: '1px', backgroundColor: '#F1F5F9', margin: '4px 0' }} />
                    <button onClick={logout} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', backgroundColor: '#fff', color: '#EF4444', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', cursor: 'pointer', fontWeight: '900' }}>
                        <LogOut size={18} color="#EF4444" /> Terminate Shift
                    </button>
                </div>
            )}
        </div>
    </aside>
);

export default NurseDashboard;
