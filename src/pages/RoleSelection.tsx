import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    User, Stethoscope, Activity, ChevronRight, 
    ShieldCheck, Hospital, Briefcase, Zap, 
    Info, Globe, Lock, ShieldAlert, CheckCircle
} from 'lucide-react';

const RoleSelection = () => {
    const [role, setRole] = useState<'NURSE' | 'DOCTOR' | null>(null);
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleComplete = () => {
        if (!role || !name.trim()) return;
        navigate('/register', { state: { name, role } });
    };

    return (
        <div className="fade-in" style={{ backgroundColor: '#F8F9FD', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Clinical Header */}
            <div style={{ 
                height: '340px', background: 'linear-gradient(135deg, #1A1A2E 0%, #1565C0 100%)', 
                padding: '60px 32px', color: '#fff', textAlign: 'center', position: 'relative'
            }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <div style={{ 
                        width: '92px', height: '92px', background: 'rgba(255,255,255,0.1)', 
                        borderRadius: '28px', display: 'flex', alignItems: 'center', 
                        justifyContent: 'center', margin: '0 auto 32px', backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <Activity size={48} color="#42A5F5" className="pulse-slow" />
                    </div>
                    <h1 style={{ fontSize: '42px', fontWeight: '900', letterSpacing: '-0.03em', marginBottom: '12px' }}>PACU Dashboard</h1>
                    <p style={{ fontSize: '18px', opacity: 0.8, fontWeight: '700' }}>Patient Recovery Monitoring & Clinical Intelligence</p>
                </div>
                
                {/* Decorative Elements */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                     <div style={{ position: 'absolute', top: '10%', right: '5%', opacity: 0.1 }}><Zap size={100} color="#fff" strokeWidth={1} /></div>
                     <div style={{ position: 'absolute', bottom: '10%', left: '5%', opacity: 0.1 }}><ShieldCheck size={120} color="#fff" strokeWidth={1} /></div>
                </div>
            </div>

            <div style={{ maxWidth: '900px', margin: '-100px auto 100px', padding: '0 32px', width: '100%', position: 'relative', zIndex: 2 }}>
                <div style={{ 
                    backgroundColor: '#fff', borderRadius: '40px', padding: '56px', 
                    boxShadow: '0 32px 64px rgba(0,0,0,0.1)', border: '1px solid #F1F5F9'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#1A1A2E', marginBottom: '12px', letterSpacing: '-0.01em' }}>Initialize Clinical Session</h2>
                        <p style={{ fontSize: '15px', color: '#90A4AE', fontWeight: '700' }}>Define personnel scope and secure identity credentials</p>
                    </div>

                    {/* Persona Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '48px' }}>
                        <RoleCard
                            active={role === 'NURSE'}
                            onClick={() => setRole('NURSE')}
                            icon={<Briefcase size={40} />}
                            title="NURSING STAFF"
                            subtitle="Patient care & vital signs monitoring"
                        />
                        <RoleCard
                            active={role === 'DOCTOR'}
                            onClick={() => setRole('DOCTOR')}
                            icon={<Stethoscope size={40} />}
                            title="PHYSICIAN"
                            subtitle="Diagnosis & command directives"
                        />
                    </div>

                    {/* Clinical Identity */}
                    <div style={{ marginBottom: '48px', maxWidth: '560px', margin: '0 auto 48px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', color: '#90A4AE', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px', marginLeft: '4px' }}>
                            Authorized Personnel Name
                        </label>
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: '#1565C0' }}>
                                <User size={24} />
                            </div>
                            <input
                                type="text"
                                placeholder="Enter full legal clinical name..."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ 
                                    width: '100%', padding: '20px 24px 20px 64px', background: '#F8F9FD', 
                                    border: '2px solid transparent', borderRadius: '24px', 
                                    fontSize: '17px', fontWeight: '800', color: '#1A1A2E', 
                                    outline: 'none', transition: 'all 0.3s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#1565C0'}
                                onBlur={(e) => e.target.style.borderColor = 'transparent'}
                                id="role-name"
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button
                            onClick={handleComplete}
                            disabled={!role || !name.trim()}
                            style={{ 
                                width: '100%', maxWidth: '440px', height: '76px', borderRadius: '24px', 
                                background: 'linear-gradient(135deg, #1565C0 0%, #1E88E5 100%)', 
                                color: '#fff', border: 'none', fontWeight: '900', fontSize: '18px', 
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px',
                                boxShadow: !role || !name.trim() ? 'none' : '0 20px 48px rgba(21, 101, 192, 0.4)', 
                                cursor: 'pointer', opacity: !role || !name.trim() ? 0.6 : 1, transition: 'all 0.3s',
                                letterSpacing: '0.02em'
                            }}
                            onMouseEnter={(e) => !(!role || !name.trim()) && (e.currentTarget.style.transform = 'translateY(-4px)')}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                            id="role-get-started"
                        >
                            ESTABLISH NODE ACCESS <ChevronRight size={26} />
                        </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '48px' }}>
                        <div style={{ height: '1px', flex: 1, backgroundColor: '#ECEFF1' }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#B0BEC5' }}>
                            <Lock size={14} />
                            <span style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '0.08em' }}>HIPAA SECURE TUNNEL ACTIVE</span>
                        </div>
                        <div style={{ height: '1px', flex: 1, backgroundColor: '#ECEFF1' }} />
                    </div>
                </div>
                
                <div style={{ textAlign: 'center', marginTop: '48px', color: '#B0BEC5' }}>
                    <p style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.1em' }}>PRECISION ACCESS GATEWAY • HN V4.0.2</p>
                </div>
            </div>
        </div>
    );
};

const RoleCard = ({ active, onClick, icon, title, subtitle }: any) => (
    <div
        onClick={onClick}
        style={{
            padding: '40px 32px', borderRadius: '32px',
            border: `3px solid ${active ? '#1565C0' : 'transparent'}`,
            backgroundColor: active ? '#F0F7FF' : '#F8F9FD',
            cursor: 'pointer', textAlign: 'center',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: active ? '0 20px 48px rgba(21, 101, 192, 0.15)' : 'none',
            position: 'relative', overflow: 'hidden'
        }}
        id={`role-card-${title.toLowerCase().replace(' ', '-')}`}
    >
        <div style={{
            width: '92px', height: '92px', borderRadius: '28px',
            background: active ? 'linear-gradient(135deg, #1565C0, #1E88E5)' : '#fff',
            color: active ? '#fff' : '#CFD8DC',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px', transition: 'all 0.3s',
            boxShadow: active ? '0 12px 32px rgba(21, 101, 192, 0.30)' : '0 4px 12px rgba(0,0,0,0.02)',
            border: active ? 'none' : '1px solid #F1F5F9'
        }}>
            {icon}
        </div>
        <h3 style={{ fontSize: '16px', fontWeight: '900', color: active ? '#1565C0' : '#1A1A2E', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{title}</h3>
        <p style={{ fontSize: '13px', fontWeight: '800', color: active ? '#1565C0' : '#90A4AE', opacity: active ? 0.8 : 1, lineHeight: 1.5 }}>{subtitle}</p>
        
        {active && (
            <div className="fade-in" style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#1565C0', fontSize: '13px', fontWeight: '900' }}>
                <CheckCircle size={16} /> SELECTED SCOPE
            </div>
        )}
    </div>
);

export default RoleSelection;
