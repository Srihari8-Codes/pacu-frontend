import React from 'react';
import { 
    Bell, Shield, HelpCircle, Settings, LogOut, 
    ChevronRight, ArrowLeft, Globe, User, 
    Briefcase, Activity, ShieldCheck, BadgeCheck,
    Smartphone, Lock, Zap, Info, Star
} from 'lucide-react';
import { useAuth } from '../services/authContext';

const DoctorProfile = ({ onBack }: { onBack: () => void }) => {
    const { user, logout } = useAuth();
    const initials = user?.name?.split(' ').map((n: any) => n[0]).join('').toUpperCase().substring(0, 2) || 'DR';

    const menuItems = [
        { icon: <Bell size={22} />, title: 'Alert Protocols', desc: 'Push & telemetry prioritization', color: '#E3F2FD', iconColor: '#1565C0' },
        { icon: <Shield size={22} />, title: 'Command Security', desc: 'Authentication & authorization scopes', color: '#F3E5F5', iconColor: '#7B1FA2' },
        { icon: <HelpCircle size={22} />, title: 'Clinical Intel', desc: 'System documentation & protocols', color: '#FFF3E0', iconColor: '#F57C00' },
        { icon: <Smartphone size={22} />, title: 'Node Management', desc: 'Device linking & sync status', color: '#E8F5E9', iconColor: '#2E7D32' },
    ];

    return (
        <div className="fade-in" style={{ backgroundColor: '#F8F9FD', minHeight: '100vh', paddingBottom: '100px' }}>
            {/* Clinical Header */}
            <div style={{ 
                height: '320px', background: 'linear-gradient(135deg, #1A1A2E 0%, #1565C0 100%)', 
                padding: '48px 32px', color: '#fff', position: 'relative'
            }}>
                <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                        <button onClick={onBack} style={{ 
                            width: '48px', height: '48px', borderRadius: '14px', 
                            backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', 
                            color: '#fff', display: 'flex', alignItems: 'center', 
                            justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)'
                        }}>
                            <ArrowLeft size={24} />
                        </button>
                        <div style={{ 
                            backgroundColor: 'rgba(255,255,255,0.15)', padding: '8px 16px', borderRadius: '12px', 
                            fontSize: '11px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '8px'
                        }}>
                            <ShieldCheck size={14} /> PHYSICIAN SECURE NODE
                        </div>
                    </div>
                    <div>
                        <h1 style={{ fontSize: '36px', fontWeight: '900', letterSpacing: '-0.02em' }}>Clinical Persona</h1>
                        <p style={{ fontSize: '16px', opacity: 0.8, fontWeight: '700', marginTop: '4px' }}>Physician Credentials & System Authorization</p>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '850px', margin: '-80px auto 0', padding: '0 32px' }}>
                {/* Physician Hero Card */}
                <div style={{ 
                    backgroundColor: '#fff', borderRadius: '40px', padding: '48px', 
                    boxShadow: '0 20px 48px rgba(0,0,0,0.08)', textAlign: 'center',
                    border: '1px solid #F1F5F9', marginBottom: '32px', position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', top: '-20px', left: '-20px' }}>
                         <Activity size={120} color="#F8F9FD" strokeWidth={1} />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <div style={{ 
                            width: '120px', height: '120px', borderRadius: '40px', 
                            background: 'linear-gradient(135deg, #1565C0 0%, #1E88E5 100%)', 
                            color: '#fff', display: 'flex', alignItems: 'center', 
                            justifyContent: 'center', fontWeight: '900', fontSize: '36px', 
                            margin: '0 auto 32px', boxShadow: '0 20px 48px rgba(21, 101, 192, 0.3)'
                        }}>
                            {initials}
                        </div>
                        <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#1A1A2E', marginBottom: '12px', letterSpacing: '-0.02em' }}>Dr. {user?.name || 'Physician'}</h2>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '32px' }}>
                            <div style={{ 
                                padding: '8px 20px', borderRadius: '14px', fontSize: '12px', 
                                fontWeight: '900', color: '#1565C0', backgroundColor: '#E3F2FD', 
                                textTransform: 'uppercase', letterSpacing: '0.08em',
                                display: 'flex', alignItems: 'center', gap: '8px'
                            }}>
                                <BadgeCheck size={16} /> SENIOR CLINICAL REGISTRAR
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', alignItems: 'center', gap: '32px', borderTop: '1px solid #F1F5F9', paddingTop: '32px' }}>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontSize: '11px', fontWeight: '900', color: '#B0BEC5', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.05em' }}>Clinical Domain</p>
                                <p style={{ fontSize: '18px', fontWeight: '900', color: '#1A1A2E' }}>PACU COMMAND</p>
                            </div>
                            <div style={{ height: '40px', backgroundColor: '#ECEFF1' }} />
                            <div style={{ textAlign: 'left' }}>
                                <p style={{ fontSize: '11px', fontWeight: '900', color: '#B0BEC5', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.05em' }}>Physician ID</p>
                                <p style={{ fontSize: '18px', fontWeight: '900', color: '#1A1A2E' }}>HN-PHY-8829</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Command Protocols */}
                <div style={{ 
                    backgroundColor: '#fff', borderRadius: '32px', 
                    boxShadow: '0 20px 48px rgba(0,0,0,0.04)', overflow: 'hidden', 
                    border: '1px solid #F1F5F9', marginBottom: '40px' 
                }}>
                    {menuItems.map((item, i) => (
                        <div key={i} style={{ 
                            padding: '24px 32px', display: 'flex', alignItems: 'center', gap: '24px', 
                            borderBottom: i < menuItems.length - 1 ? '1px solid #F8F9FD' : 'none', 
                            cursor: 'pointer', transition: 'all 0.2s' 
                        }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8F9FD'}>
                            <div style={{ 
                                width: '56px', height: '56px', borderRadius: '18px', 
                                backgroundColor: item.color, color: item.iconColor, 
                                display: 'flex', alignItems: 'center', justifyContent: 'center' 
                            }}>
                                {item.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ fontWeight: '900', color: '#1A1A2E', fontSize: '17px', letterSpacing: '-0.01em' }}>{item.title}</h4>
                                <p style={{ fontSize: '13px', color: '#90A4AE', fontWeight: '700' }}>{item.desc}</p>
                            </div>
                            <ChevronRight size={20} color="#CFD8DC" />
                        </div>
                    ))}
                </div>

                <button onClick={logout} style={{ 
                    width: '100%', height: '72px', borderRadius: '24px', 
                    background: '#FEF2F2', color: '#EF4444', border: 'none', 
                    fontWeight: '900', fontSize: '18px', display: 'flex', 
                    alignItems: 'center', justifyContent: 'center', gap: '16px',
                    cursor: 'pointer', transition: 'all 0.3s'
                }} 
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEE2E2'}
                id="doctor-profile-logout">
                    <LogOut size={24} /> TERMINATE COMMAND SESSION
                </button>

                <div style={{ textAlign: 'center', marginTop: '48px', color: '#B0BEC5' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
                        <ShieldCheck size={16} />
                        <span style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '0.08em' }}>HIPAA MULTI-FACTOR BIOMETRIC ENFORCED</span>
                    </div>
                    <p style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.1em' }}>PRECISION PHYSICIAN HANDLER • HN V4.0.2</p>
                </div>
            </div>
        </div>
    );
};

export default DoctorProfile;
