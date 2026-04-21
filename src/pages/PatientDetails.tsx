import React, { useState, useEffect } from 'react';
import {
    ArrowLeft, Heart, Activity, Droplets, Thermometer,
    Wind, ClipboardList, Eye, History, Plus, AlertTriangle,
    Clock, User, Stethoscope, MessageSquare, Zap, CheckCircle2,
    ShieldCheck, BellRing, ChevronRight, BadgeCheck, Smartphone,
    Target, Shield, FileText, Settings, RefreshCw
} from 'lucide-react';
import api from '../services/api';

interface Props {
    patient: any;
    vitals: any;
    onBack: () => void;
    onEnterVitals?: () => void;
    onIssueInstruction?: () => void;
    onViewHistory?: () => void;
    isDoctor?: boolean;
}

const PatientDetails: React.FC<Props> = ({ patient, vitals: initialVitals, onBack, onEnterVitals, onIssueInstruction, onViewHistory, isDoctor = false }) => {
    const [vitals, setVitals] = useState<any>(initialVitals || null);
    const [fetchingVitals, setFetchingVitals] = useState(false);

    /* Always fetch the latest vitals from dedicated /latest endpoint on mount */
    useEffect(() => {
        const episodeId = patient?.activeEpisode?.id;
        if (!episodeId) return;

        const fetchLatestVitals = async () => {
            setFetchingVitals(true);
            try {
                const res: any = await api.get(`/episodes/${episodeId}/vitals/latest`);
                const latest = res?.data?.vitals || res?.vitals;
                if (latest) {
                    setVitals(latest);
                }
            } catch { /* silent — show initial vitals if fetch fails */ }
            finally { setFetchingVitals(false); }
        };

        fetchLatestVitals();
    }, [patient]);

    const name = patient?.name || 'Unknown Patient';
    const age = patient?.age || '--';
    const gender = patient?.gender || '--';
    const mrn = patient?.hospitalPatientId || patient?.patient_id || patient?.id || '--';
    const procedure = patient?.procedure || 'Observation Protocol';
    const allergies = patient?.allergies || 'none';

    const bp = vitals?.systolicBP ? `${vitals.systolicBP}/${vitals.diastolicBP}` : '--/--';
    
    const lastSync = vitals?.recordedAt 
        ? new Date(vitals.recordedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : '--:--';

    return (
        <div className="fade-in" style={{ backgroundColor: '#fff', minHeight: '100vh', paddingBottom: '140px' }}>
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
                            backgroundColor: fetchingVitals ? '#F59E0B' : '#22C55E', 
                            padding: '8px 24px', borderRadius: '12px', 
                            fontSize: '12px', fontWeight: '900', letterSpacing: '0.08em',
                            display: 'flex', alignItems: 'center', gap: '8px', 
                            boxShadow: fetchingVitals ? '0 8px 16px rgba(245,158,11,0.2)' : '0 8px 16px rgba(34,197,94,0.2)',
                            transition: 'all 0.3s'
                        }}>
                            {fetchingVitals 
                                ? <><RefreshCw size={18} className="spin" /> SYNCING VITALS</>
                                : <><ShieldCheck size={18} /> LIVE MONITORING</>
                            }
                        </div>
                    </div>

                    <div style={{ marginTop: 'auto' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px', marginBottom: '12px' }}>
                            <h1 style={{ fontSize: '42px', fontWeight: '900', letterSpacing: '-0.03em' }}>{name}</h1>
                            <div style={{ 
                                padding: '6px 16px', backgroundColor: 'rgba(255,255,255,0.15)', 
                                borderRadius: '10px', fontSize: '13px', fontWeight: '900', 
                                letterSpacing: '0.05em', border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                Patient ID: {mrn}
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '15px', opacity: 0.8, fontWeight: '700' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><User size={16} /> {age}y • {gender}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Stethoscope size={16} /> {procedure}</span>
                        </div>
                    </div>
                </div>
                
                {/* Decorative Tints */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                     <div style={{ position: 'absolute', top: '10%', right: '5%', opacity: 0.05 }}><Activity size={140} color="#fff" strokeWidth={1} /></div>
                </div>
            </div>

            {/* Content Area */}
            <div style={{ maxWidth: '1100px', margin: '-40px auto 0', padding: '0 32px', position: 'relative', zIndex: 10 }}>
                {/* Allergy Enforcement */}
                {patient?.allergies && patient.allergies !== 'None' && (
                    <div style={{ 
                        backgroundColor: '#FEF2F2', borderRadius: '28px', padding: '24px 32px', 
                        display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px',
                        border: '1px solid #FEE2E2', boxShadow: '0 12px 32px rgba(239,68,68,0.06)'
                    }}>
                        <div style={{ width: '56px', height: '56px', borderRadius: '18px', backgroundColor: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ShieldAlert size={32} color="#EF4444" />
                        </div>
                        <div>
                            <p style={{ fontSize: '11px', fontWeight: '900', color: '#EF4444', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Critical Allergy Alert</p>
                            <p style={{ fontSize: '18px', fontWeight: '900', color: '#1A1A2E' }}>{patient.allergies}</p>
                        </div>
                    </div>
                )}

                {/* Command Telemetry Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
                    <VitalCard icon={<Heart size={20} color="#EF4444" />} label="CARDIAC RATE" value={vitals?.heartRate || '89'} unit="BPM" color="#EF4444" progress="75%" />
                    <VitalCard icon={<Activity size={20} color="#3B82F6" />} label="BP PROFILE" value={bp === '--/--' ? '78/98' : bp} unit="mmHg" color="#3B82F6" progress="60%" />
                    <VitalCard icon={<Droplets size={20} color="#22C55E" />} label="OXYGEN SAT" value={vitals?.spo2 || '89'} unit="%" color="#22C55E" progress="85%" />
                </div>

                {/* Metric Secondary Stream */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
                    <MetricPill icon={<Thermometer size={18} color="#F59E0B" />} label="TEMP" value={`${vitals?.temperature || '89'}°C`} />
                    <MetricPill icon={<Wind size={18} color="#8B5CF6" />} label="RESP" value={`${vitals?.respiratoryRate || '78'} bpm`} />
                    <MetricPill icon={<Zap size={18} color="#F97316" />} label="PAIN" value={`${vitals?.painScore ?? '78'}/10`} color="#F97316" />
                    <MetricPill icon={<CheckCircle2 size={18} color="#10B981" />} label="ALDRETE" value={`${vitals?.recoveryScore ?? '89'}/10`} color="#10B981" />
                </div>

                {/* Management Interaction Center removed as requested by user */}

                <div style={{ textAlign: 'center', marginTop: '64px', color: '#B0BEC5' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
                        <Clock size={16} />
                        <span style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '0.1em' }}>LAST COMMAND SYNC: {lastSync}</span>
                    </div>
                    <p style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '1px' }}>PRECISION CARE INTERFACE • HN V4.0.2</p>
                </div>
            </div>

            {/* Global Sticky Command Bar */}
            <div style={{ 
                position: 'fixed', bottom: '40px', left: '0', right: '0',
                display: 'flex', justifyContent: 'center', padding: '0 32px', zIndex: 1000 
            }}>
                <button 
                  onClick={isDoctor ? onIssueInstruction : onEnterVitals}
                  style={{ 
                    width: '100%', maxWidth: '640px', height: '76px', borderRadius: '28px', 
                    background: 'linear-gradient(135deg, #1565C0 0%, #1E88E5 100%)', 
                    color: '#fff', border: 'none', fontWeight: '900', fontSize: '18px', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px',
                    boxShadow: '0 24px 48px rgba(21, 101, 192, 0.4)', cursor: 'pointer',
                    transition: 'all 0.3s'
                }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                   onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                    {isDoctor ? <MessageSquare size={24} /> : <Zap size={24} />}
                    {isDoctor ? 'ADD CLINICAL ORDER' : 'UPDATE VITAL SIGNS'}
                </button>
            </div>
        </div>
    );
};

const VitalCard = ({ icon, label, value, unit, color, progress = "50%" }: any) => (
    <div style={{ 
        backgroundColor: '#fff', borderRadius: '32px', padding: '28px', 
        border: `2px solid ${color}22`, boxShadow: '0 12px 32px rgba(0,0,0,0.03)',
        transition: 'all 0.3s'
    }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = color; e.currentTarget.style.boxShadow = `0 12px 32px ${color}11`; }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '14px', backgroundColor: '#F8F9FD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {icon}
            </div>
            <span style={{ fontSize: '12px', fontWeight: '900', color: '#90A4AE', letterSpacing: '1px' }}>{label}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '42px', fontWeight: '900', color: '#1A1A2E', lineHeight: 1, letterSpacing: '-0.02em' }}>{value}</span>
            <span style={{ fontSize: '13px', fontWeight: '900', color: '#B0BEC5' }}>{unit}</span>
        </div>
        <div style={{ marginTop: '32px', height: '8px', backgroundColor: '#F8F9FD', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: progress, height: '100%', backgroundColor: color, borderRadius: '4px' }} />
        </div>
    </div>
);

const MetricPill = ({ icon, label, value, color }: any) => (
    <div style={{ 
        backgroundColor: '#fff', borderRadius: '24px', padding: '20px', 
        border: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
    }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#F8F9FD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
        </div>
        <div>
            <p style={{ fontSize: '11px', fontWeight: '900', color: '#90A4AE', letterSpacing: '0.05em', marginBottom: '4px' }}>{label}</p>
            <p style={{ fontSize: '18px', fontWeight: '900', color: color || '#1A1A2E' }}>{value}</p>
        </div>
    </div>
);

const CommandHub = ({ icon, title, desc, onClick, stroke }: any) => (
    <div 
        onClick={onClick}
        style={{ 
            backgroundColor: '#fff', padding: '32px', borderRadius: '32px', 
            border: '1px solid #F1F5F9', cursor: 'pointer', display: 'flex', 
            alignItems: 'center', gap: '24px', transition: 'all 0.3s',
            boxShadow: '0 8px 24px rgba(0,0,0,0.02)'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = stroke || '#1565C0';
            e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#F1F5F9';
            e.currentTarget.style.transform = 'translateY(0)';
        }}
    >
        <div style={{ width: '64px', height: '64px', borderRadius: '20px', backgroundColor: '#F8F9FD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
        </div>
        <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '18px', fontWeight: '900', color: '#1A1A2E', letterSpacing: '-0.01em' }}>{title}</h4>
            <p style={{ fontSize: '14px', fontWeight: '700', color: '#90A4AE' }}>{desc}</p>
        </div>
        <ChevronRight size={24} color="#CFD8DC" />
    </div>
);

const ShieldAlert = ({ size, color }: any) => (
    <div style={{ position: 'relative' }}>
        <Shield size={size} color={color} />
        <AlertTriangle size={size/2} color={color} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
    </div>
);

export default PatientDetails;
