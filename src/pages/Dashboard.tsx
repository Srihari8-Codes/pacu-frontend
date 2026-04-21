import { useState } from 'react';
import { 
    LogOut, Activity, Users, ClipboardList, 
    Bell, Settings, FileText, Terminal, ShieldCheck,
    LayoutDashboard, UserCircle, BadgeCheck, Zap,
    Target, Clock, Shield, ChevronRight
} from 'lucide-react';
import { useAuth } from '../services/authContext';
import DashboardStats from '../components/DashboardStats';
import EpisodeGrid from '../components/EpisodeGrid';
import UsersPage from './Users';
import AuditLogPage from './AuditLog';
import PatientList from './PatientList';
import EpisodeDetail from './EpisodeDetail';
import NurseDashboard from './NurseDashboard';
import DoctorDashboard from './DoctorDashboard';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [view, setView] = useState('overview');
    const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

    // If regular nurse, show the specialized mobile-friendly dashboard
    if (user?.role === 'NURSE' && view === 'overview') {
        return <NurseDashboard />;
    }

    // If doctor, show the specialized high-fidelity doctor dashboard
    if (user?.role === 'DOCTOR' && view === 'overview') {
        return <DoctorDashboard />;
    }

    const handlePatientDetail = (id: string) => {
        setSelectedPatient(id);
        setView('detail');
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FD', display: 'flex' }}>
            {/* Command Sidebar */}
            <aside style={{ 
                width: '320px', 
                backgroundColor: '#1A1A2E', 
                padding: '48px 24px', 
                display: 'flex', 
                flexDirection: 'column',
                boxShadow: '20px 0 60px rgba(0,0,0,0.05)',
                position: 'fixed',
                height: '100vh',
                zIndex: 100
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '64px', padding: '0 12px' }}>
                    <div style={{ 
                        backgroundColor: '#1565C0', color: 'white', 
                        width: '52px', height: '52px', borderRadius: '16px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 12px 24px rgba(21, 101, 192, 0.4)'
                    }}>
                        <Activity size={28} />
                    </div>
                    <div>
                        <span style={{ fontWeight: 900, fontSize: '20px', color: '#fff', letterSpacing: '-0.02em', display: 'block' }}>PACU COMMAND</span>
                        <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748B', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Clinical Portal v4.0.2</span>
                    </div>
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <NavItem icon={<LayoutDashboard size={22} />} label="Operational Hub" active={view === 'overview' || view === 'detail'} onClick={() => setView('overview')} />
                    <NavItem icon={<Users size={22} />} label="Patient Census" active={view === 'patients'} onClick={() => setView('patients')} />
                    <NavItem icon={<UserCircle size={22} />} label="Staff Directory" active={view === 'users'} onClick={() => setView('users')} />
                    <NavItem icon={<FileText size={22} />} label="Audit Registry" active={view === 'audit'} onClick={() => setView('audit')} />
                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '12px 0' }} />
                    <NavItem icon={<Settings size={22} />} label="Node Settings" active={view === 'settings'} onClick={() => setView('settings')} />
                </nav>

                <div style={{ 
                    marginTop: 'auto', 
                    backgroundColor: 'rgba(255,255,255,0.03)', 
                    borderRadius: '24px', 
                    padding: '24px',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                         <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#1565C0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '900', color: '#fff' }}>
                             {user?.name?.[0]}
                         </div>
                         <div style={{ overflow: 'hidden' }}>
                             <p style={{ color: '#fff', fontSize: '14px', fontWeight: '800', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{user?.name}</p>
                             <p style={{ color: '#64748B', fontSize: '12px', fontWeight: '700' }}>{user?.role} NODE</p>
                         </div>
                    </div>
                    <button
                        onClick={logout}
                        style={{ 
                            width: '100%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', 
                            color: '#EF4444', fontWeight: '900', padding: '16px', 
                            borderRadius: '16px', background: 'rgba(239, 68, 68, 0.1)', 
                            border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                            fontSize: '14px', letterSpacing: '0.05em'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                    >
                        <LogOut size={18} /> TERMINATE SESSION
                    </button>
                </div>
            </aside>

            {/* Main Operational Space */}
            <main style={{ flex: 1, marginLeft: '320px', minHeight: '100vh', backgroundColor: '#F8F9FD', position: 'relative' }}>
                <div style={{ padding: '64px' }}>
                    {view === 'overview' && (
                        <div className="fade-in">
                            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '48px' }}>
                                <div>
                                    <h1 style={{ fontSize: '38px', fontWeight: '900', color: '#1A1A2E', letterSpacing: '-0.03em', marginBottom: '8px' }}>Operational Overview</h1>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                         <BadgeCheck size={18} color="#22C55E" />
                                         <span style={{ fontSize: '15px', color: '#94A3B8', fontWeight: '700' }}>Primary Control Node • Secure Environment</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                     <div style={{ backgroundColor: '#fff', padding: '12px 24px', borderRadius: '16px', border: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 8px 16px rgba(0,0,0,0.02)' }}>
                                          <div className="pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E' }} />
                                          <span style={{ fontSize: '13px', fontWeight: '900', color: '#1A1A2E', letterSpacing: '0.05em' }}>SYSTEMS NOMINAL</span>
                                     </div>
                                </div>
                            </header>

                            <DashboardStats />

                            <section style={{ marginTop: '56px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                        <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#F0F7FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Zap size={22} color="#1565C0" />
                                        </div>
                                        <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#1A1A2E', letterSpacing: '-0.02em' }}>Live Telemetry Streams</h2>
                                    </div>
                                    <button style={{ background: 'transparent', border: 'none', color: '#1565C0', fontWeight: '900', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        VIEW ALL CHANNELS <ChevronRight size={18} />
                                    </button>
                                </div>
                                
                                <div onClick={() => handlePatientDetail('ep-3')} style={{ cursor: 'pointer' }}>
                                    <EpisodeGrid />
                                </div>
                            </section>
                        </div>
                    )}
                    
                    {view === 'detail' && <EpisodeDetail onBack={() => setView('overview')} patientId={selectedPatient || undefined} />}
                    {view === 'patients' && <PatientList onBack={() => setView('overview')} />}
                    {view === 'users' && <UsersPage onBack={() => setView('overview')} />}
                    {view === 'audit' && <AuditLogPage onBack={() => setView('overview')} />}
                    
                    {(view === 'settings' || view === 'reports') && (
                        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', color: '#94A3B8' }}>
                            <Settings size={64} style={{ opacity: 0.1, marginBottom: '24px' }} />
                            <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#1A1A2E' }}>Node Configuration</h3>
                            <p style={{ fontWeight: '700', marginTop: '8px' }}>This terminal section is currently under maintenance.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

const NavItem = ({ icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick?: () => void }) => (
    <div
        onClick={onClick}
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '18px 24px',
            borderRadius: '20px',
            backgroundColor: active ? 'rgba(21, 101, 192, 0.15)' : 'transparent',
            color: active ? '#fff' : '#64748B',
            fontWeight: active ? 900 : 700,
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            borderLeft: active ? '4px solid #1565C0' : '4px solid transparent',
            position: 'relative',
            overflow: 'hidden'
        }}
        onMouseEnter={(e) => !active && (e.currentTarget.style.color = '#fff')}
        onMouseLeave={(e) => !active && (e.currentTarget.style.color = '#64748B')}
    >
        <div style={{ color: active ? '#1565C0' : 'inherit' }}>{icon}</div>
        <span style={{ fontSize: '15px', letterSpacing: '0.02em' }}>{label}</span>
        {active && <div style={{ position: 'absolute', right: '12px', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#1565C0' }} />}
    </div>
);

export default Dashboard;
