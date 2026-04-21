import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { 
    Users, Search, ChevronRight, Loader2, 
    UserPlus, ArrowLeft, User, Filter, 
    Activity, Clock, AlertCircle, Heart,
    BadgeCheck, Smartphone, Target, Shield,
    FileText, Stethoscope, ShieldCheck, Zap
} from 'lucide-react';

const PatientList = ({ onBack, onSelect }: { onBack?: () => void, onSelect?: (p: any) => void }) => {
    const [patients, setPatients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const handler = setTimeout(async () => {
            if (!search.trim()) {
                const response: any = await api.get('/patients');
                if (response.data?.success) setPatients(response.data.patients || []);
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const response: any = await api.get(`/patients?q=${encodeURIComponent(search)}`);
                if (response.data?.success) {
                    setPatients(response.data.patients || []);
                }
            } catch (err) {
                console.error("Search failed", err);
            } finally {
                setLoading(false);
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(handler);
    }, [search]);

    const filtered = patients; // results are already filtered from API

    if (loading) return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8F9FD' }}>
            <div style={{ textAlign: 'center' }}>
                <Loader2 className="spin" size={48} color="#1565C0" />
                <p style={{ marginTop: '20px', fontWeight: '900', color: '#1565C0', letterSpacing: '0.2em', fontSize: '13px' }}>SYNCHRONIZING CLINICAL CENSUS...</p>
            </div>
        </div>
    );

    return (
        <div className="fade-in" style={{ minHeight: '100vh', backgroundColor: '#F8F9FD', paddingBottom: '140px' }}>
            {/* Clinical Header */}
            <div style={{ 
                height: '280px', background: 'linear-gradient(135deg, #1A1A2E 0%, #1565C0 100%)', 
                padding: '48px 32px', color: '#fff', position: 'relative'
            }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        {onBack && (
                            <button onClick={onBack} style={{ 
                                width: '48px', height: '48px', borderRadius: '14px', 
                                backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', 
                                color: '#fff', display: 'flex', alignItems: 'center', 
                                justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)'
                            }}>
                                <ArrowLeft size={24} />
                            </button>
                        )}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                                <Users size={36} color="#42A5F5" />
                                <h1 style={{ fontSize: '38px', fontWeight: '900', letterSpacing: '-0.02em' }}>Patient Census</h1>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', opacity: 0.8, fontWeight: '700' }}>
                                <ShieldCheck size={18} />
                                <span>Active Clinical Registry • Patients</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Decorative Tints */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                     <div style={{ position: 'absolute', top: '10%', right: '5%', opacity: 0.05 }}><Target size={140} color="#fff" strokeWidth={1} /></div>
                </div>
            </div>

            {/* Content Area */}
            <div style={{ maxWidth: '1100px', margin: '-40px auto 0', padding: '0 32px', position: 'relative', zIndex: 10 }}>
                {/* Search & Filter Hub */}
                <div style={{ 
                    backgroundColor: '#fff', borderRadius: '32px', padding: '12px', 
                    boxShadow: '0 24px 64px rgba(0,0,0,0.06)', marginBottom: '40px',
                    display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #F1F5F9'
                }}>
                    <div style={{ paddingLeft: '24px', color: '#1565C0', display: 'flex', alignItems: 'center' }}>
                        <Search size={22} strokeWidth={3} />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search by Patient Name, ID, or MRN..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ 
                            flex: 1, padding: '20px', border: 'none', 
                            fontSize: '18px', fontWeight: '800', color: '#1A1A2E', 
                            outline: 'none', background: 'transparent'
                        }}
                    />
                    <div style={{ marginRight: '16px', display: 'flex', gap: '12px' }}>
                        <div style={{ 
                            padding: '12px 24px', backgroundColor: '#F0F7FF', borderRadius: '16px', 
                            fontSize: '13px', fontWeight: '900', color: '#1565C0', border: '1px solid #E3F2FD',
                            letterSpacing: '0.05em'
                        }}>
                           {filtered.length} PATIENTS REGISTERED
                        </div>
                    </div>
                </div>

                {/* Patient Registry Feed */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '16px' }}>
                    {filtered.map(patient => (
                        <div 
                            key={patient.id} 
                            onClick={() => onSelect?.(patient)}
                            style={{ 
                                backgroundColor: '#fff', borderRadius: '32px', padding: '32px', 
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                border: '1px solid #F1F5F9', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as any).style.transform = 'translateY(-4px)';
                                (e.currentTarget as any).style.borderColor = '#1565C0';
                                (e.currentTarget as any).style.boxShadow = '0 12px 32px rgba(21, 101, 192, 0.08)';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as any).style.transform = 'translateY(0)';
                                (e.currentTarget as any).style.borderColor = '#F1F5F9';
                                (e.currentTarget as any).style.boxShadow = 'none';
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
                                <div style={{ 
                                    width: '72px', height: '72px', borderRadius: '24px', 
                                    background: 'linear-gradient(135deg, #1A1A2E 0%, #1565C0 100%)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: '0 8px 16px rgba(21,101,192,0.15)'
                                }}>
                                    <User size={36} color="#fff" />
                                </div>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                                        <h3 style={{ fontSize: '22px', fontWeight: '900', color: '#1A1A2E', letterSpacing: '-0.02em' }}>{patient.name}</h3>
                                        <div style={{ 
                                            padding: '6px 16px', backgroundColor: '#F0F7FF', 
                                            borderRadius: '10px', color: '#1565C0', fontSize: '13px', fontWeight: '900',
                                            letterSpacing: '0.05em'
                                        }}>
                                            ID: {patient.mrn}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', color: '#94A3B8', fontSize: '15px', fontWeight: '700' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Stethoscope size={18} color="#CBD5E1" /> {patient.procedure || 'Clinical Protocol'}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Clock size={18} color="#CBD5E1" /> Bed {patient.bedNumber || 'N/A'} • {patient.age}y • {patient.gender?.[0]?.toUpperCase() || 'U'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '11px', fontWeight: '900', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.1em' }}>Care Phase</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'flex-end' }}>
                                        <div className="pulse" style={{ width: '10px', height: '10px', borderRadius: '50%', background: patient.status === 'ACTIVE' ? '#22C55E' : '#F59E0B' }}></div>
                                        <span style={{ fontSize: '16px', fontWeight: '900', color: '#1A1A2E' }}>{patient.status}</span>
                                    </div>
                                </div>
                                <div style={{ width: '56px', height: '56px', borderRadius: '18px', backgroundColor: '#F8F9FD', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#CBD5E1' }}>
                                    <ChevronRight size={28} />
                                </div>
                            </div>
                        </div>
                    ))}

                    {filtered.length === 0 && (
                        <div style={{ padding: '100px 40px', textAlign: 'center', color: '#94A3B8', background: '#fff', borderRadius: '40px', border: '2px dashed #ECEFF1' }}>
                            <AlertCircle size={64} style={{ opacity: 0.2, marginBottom: '24px' }} />
                            <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#1A1A2E' }}>No Patients Found</h2>
                            <p style={{ fontWeight: '700', fontSize: '16px', marginTop: '12px', opacity: 0.6 }}>The specified query does not match any records in the active clinical registry.</p>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Command Footer Action */}
            <div style={{ 
                position: 'fixed', bottom: '40px', left: '0', right: '0',
                display: 'flex', justifyContent: 'center', padding: '0 32px', zIndex: 1000 
            }}>
                <button 
                   onClick={() => window.location.hash = '/register-patient'}
                   style={{ 
                    width: '100%', maxWidth: '640px', height: '76px', borderRadius: '28px', 
                    background: '#1A1A2E', color: '#fff', fontWeight: '900', border: 'none', 
                    boxShadow: '0 24px 48px rgba(0,0,0,0.35)', display: 'flex', 
                    alignItems: 'center', justifyContent: 'center', gap: '16px', 
                    cursor: 'pointer', fontSize: '18px', transition: 'all 0.3s'
                }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                   onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                    <UserPlus size={24} /> ADMIT NEW PATIENT
                </button>
            </div>

            <div style={{ textAlign: 'center', marginTop: '64px', color: '#B0BEC5' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
                    <ShieldCheck size={18} />
                    <span style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '0.08em' }}>SECURE CLINICAL CENSUS • HIPAA COMPLIANT</span>
                </div>
                <p style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '1px' }}>PACU CENSUS MODULE • HN V4.0.2</p>
            </div>
        </div>
    );
};

export default PatientList;
