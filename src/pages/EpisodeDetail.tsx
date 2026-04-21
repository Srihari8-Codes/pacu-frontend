import React from 'react';
import { 
    Activity, Heart, Wind, Thermometer, Clock, ArrowLeft, 
    ChevronRight, AlertCircle, ShieldCheck, BadgeCheck,
    Smartphone, Zap, Info, Target, Shield, FileText,
    MessageSquare, User, Stethoscope, CheckCircle2
} from 'lucide-react';

interface EpisodeDetailProps {
    onBack: () => void;
    patientId?: string;
}

const EpisodeDetail = ({ onBack, patientId = 'ep-3' }: EpisodeDetailProps) => {
    // Mock data for Robert Chen (Normalized Clinical Context)
    const patient = {
        name: 'Robert Chen',
        age: 64,
        gender: 'Male',
        bedNumber: 'C-301',
        mrn: 'MRN-11029',
        admissionTime: '2024-03-09 08:30 AM',
        diagnosis: 'Post-op Cardiac Bypass recovery',
        vitals: {
            hr: 115,
            spo2: 89,
            bp: '150/95',
            temp: 37.8,
            rr: 22
        }
    };

    return (
        <div className="fade-in" style={{ backgroundColor: '#F8F9FD', minHeight: '100vh', paddingBottom: '120px' }}>
            {/* Clinical Header */}
            <div style={{ 
                height: '320px', background: 'linear-gradient(135deg, #1A1A2E 0%, #1565C0 100%)', 
                padding: '48px 32px', color: '#fff', position: 'relative'
            }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                        <button onClick={onBack} style={{ 
                            width: '48px', height: '48px', borderRadius: '14px', 
                            backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', 
                            color: '#fff', display: 'flex', alignItems: 'center', 
                            justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)'
                        }}>
                            <ArrowLeft size={24} />
                        </button>
                        <div style={{ 
                            backgroundColor: '#EF4444', padding: '8px 24px', borderRadius: '12px', 
                            fontSize: '12px', fontWeight: '900', letterSpacing: '0.08em',
                            display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 24px rgba(239,68,68,0.25)'
                        }}>
                            <AlertCircle size={18} /> CRITICAL STATUS
                        </div>
                    </div>

                    <div style={{ marginTop: 'auto' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px', marginBottom: '12px' }}>
                            <h1 style={{ fontSize: '42px', fontWeight: '900', letterSpacing: '-0.03em' }}>{patient.name}</h1>
                            <div style={{ 
                                padding: '6px 16px', backgroundColor: 'rgba(255,255,255,0.15)', 
                                borderRadius: '10px', fontSize: '13px', fontWeight: '900', 
                                letterSpacing: '0.05em', border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                MRN: {patient.mrn}
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '17px', opacity: 0.8, fontWeight: '700' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><User size={18} /> {patient.age}Y • {patient.gender}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Stethoscope size={18} /> Bed {patient.bedNumber}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div style={{ maxWidth: '1100px', margin: '-60px auto 0', padding: '0 32px', position: 'relative', zIndex: 10 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '32px' }}>
                    {/* Telemetry Overview */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <BigVitalCard icon={<Heart color="#EF4444" />} label="CARDIAC RATE" value={patient.vitals.hr} unit="BPM" status="CRITICAL HIGH" color="#EF4444" />
                            <BigVitalCard icon={<Wind color="#3B82F6" />} label="OXYGEN SAT" value={patient.vitals.spo2} unit="%" status="CRITICAL LOW" color="#EF4444" />
                            <BigVitalCard icon={<Activity color="#F59E0B" />} label="BP PROFILE" value={patient.vitals.bp} unit="mmHg" status="HYPERTENSION" color="#F59E0B" />
                            <BigVitalCard icon={<Thermometer color="#10B981" />} label="CORE TEMP" value={patient.vitals.temp} unit="°C" status="STABLE" color="#10B981" />
                        </div>

                        {/* Real-time Telemetry Trend */}
                        <div style={{ backgroundColor: '#fff', borderRadius: '40px', padding: '40px', border: '1px solid #F1F5F9', boxShadow: '0 20px 48px rgba(0,0,0,0.04)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                                <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#1A1A2E', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Activity size={24} color="#1565C0" /> Telemetry Stream (Last 120m)
                                </h3>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                     <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22C55E' }} />
                                     <span style={{ fontSize: '11px', fontWeight: '900', color: '#22C55E' }}>LIVE SYNC</span>
                                </div>
                            </div>
                            <div style={{ height: '320px', backgroundColor: '#F8F9FD', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#90A4AE', border: '2px dashed #ECEFF1' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <Smartphone size={48} color="#CFD8DC" style={{ marginBottom: '16px' }} />
                                    <p style={{ fontSize: '14px', fontWeight: '800' }}>HIGH FIDELITY WAVEFORM RENDERING...</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Clinical Sidebar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ backgroundColor: '#fff', borderRadius: '32px', padding: '32px', border: '1px solid #F1F5F9', boxShadow: '0 12px 32px rgba(0,0,0,0.03)' }}>
                            <p style={{ fontSize: '11px', fontWeight: '900', color: '#B0BEC5', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Diagnosis Protocol</p>
                            <h4 style={{ fontSize: '18px', fontWeight: '900', color: '#1A1A2E', lineHeight: 1.5 }}>{patient.diagnosis}</h4>
                        </div>

                        <div style={{ backgroundColor: '#fff', borderRadius: '32px', padding: '32px', border: '1px solid #F1F5F9', boxShadow: '0 12px 32px rgba(0,0,0,0.03)' }}>
                            <p style={{ fontSize: '11px', fontWeight: '900', color: '#B0BEC5', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px' }}>Clinical Observations</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <BriefingItem author="Dr. Sarah" time="15m ago" text="Increased O2 flow to 4L. Monitoring SpO2 closely for secondary intervention." />
                                <BriefingItem author="Nurse John" time="45m ago" text="Patient reporting slight chest discomfort. ECG synchronized." />
                            </div>
                            <button style={{ 
                                width: '100%', marginTop: '24px', height: '56px', borderRadius: '18px', 
                                border: '2px dashed #1565C0', background: 'transparent', color: '#1565C0', 
                                fontWeight: '900', fontSize: '14px', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
                            }}>
                                <Plus size={18} /> APPEND OBSERVATION
                            </button>
                        </div>

                        <div style={{ backgroundColor: '#fff', borderRadius: '32px', padding: '32px', border: '1px solid #F1F5F9', boxShadow: '0 12px 32px rgba(0,0,0,0.03)' }}>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                 <ShieldCheck size={20} color="#22C55E" />
                                 <span style={{ fontSize: '14px', fontWeight: '900', color: '#1A1A2E' }}>Protocol Verified</span>
                             </div>
                             <p style={{ fontSize: '13px', color: '#90A4AE', fontWeight: '700' }}>HIPAA Compliant telemetry stream authorized for clinical review.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '64px', color: '#B0BEC5' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
                    <Clock size={16} />
                    <span style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '0.1em' }}>ADMISSION RECORD: {patient.admissionTime}</span>
                </div>
                <p style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '1px' }}>PRECISION EPISODE HANDLER • HN V4.0.2</p>
            </div>
        </div>
    );
};

const BigVitalCard = ({ icon, label, value, unit, status, color }: any) => (
    <div style={{ 
        backgroundColor: '#fff', borderRadius: '32px', padding: '32px', 
        border: '1px solid #F1F5F9', boxShadow: '0 12px 32px rgba(0,0,0,0.03)',
        display: 'flex', flexDirection: 'column', gap: '20px'
    }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '14px', backgroundColor: '#F8F9FD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {icon}
            </div>
            <div style={{ 
                fontSize: '10px', fontWeight: '900', color, 
                backgroundColor: `${color}15`, padding: '6px 12px', 
                borderRadius: '8px', letterSpacing: '0.05em' 
            }}>
                {status}
            </div>
        </div>
        <div>
            <p style={{ fontSize: '11px', fontWeight: '900', color: '#90A4AE', letterSpacing: '0.05em', marginBottom: '8px' }}>{label}</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '32px', fontWeight: '900', color: '#1A1A2E', letterSpacing: '-0.02em' }}>{value}</span>
                <span style={{ fontSize: '14px', fontWeight: '800', color: '#B0BEC5' }}>{unit}</span>
            </div>
        </div>
    </div>
);

const BriefingItem = ({ author, time, text }: any) => (
    <div style={{ padding: '20px', backgroundColor: '#F8F9FD', borderRadius: '20px', border: '1px solid #ECEFF1' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontWeight: '900', color: '#1A1A2E', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={14} color="#1565C0" /> {author}
            </span>
            <span style={{ color: '#90A4AE', fontSize: '11px', fontWeight: '800' }}>{time}</span>
        </div>
        <p style={{ color: '#455A64', fontSize: '13px', fontWeight: '700', lineHeight: 1.5 }}>{text}</p>
    </div>
);

const Plus = ({ size }: any) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
    </div>
);

export default EpisodeDetail;
