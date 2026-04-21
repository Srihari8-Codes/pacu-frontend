import React, { useState, useEffect } from 'react';
import { 
    ArrowLeft, Heart, Activity, Droplets, 
    Thermometer, Wind, Zap, Clock, Shield, 
    Hash, ShieldCheck, Wifi, Signal, BadgeCheck,
    Smartphone, Target, Info, Target as TargetIcon,
    AlertCircle, FileText, User, Stethoscope
} from 'lucide-react';
import { useSocket } from '../services/socketContext';
import api from '../services/api';

interface Props {
    episodeId: string;
    patientName: string;
    onBack: () => void;
}

const LiveMonitorDetail: React.FC<Props> = ({ episodeId, patientName, onBack }) => {
    const [vitals, setVitals] = useState<any>(null);
    const { socket } = useSocket();

    useEffect(() => {
        const fetchLatest = async () => {
            try {
                const res: any = await api.get(`/episodes/${episodeId}/vitals/latest`);
                if (res.success) setVitals(res.data.vitals);
            } catch { }
        };
        fetchLatest();
        if (socket) {
            socket.emit('join_episode', episodeId);
            const handler = (data: any) => { if (data.episodeId === episodeId) setVitals(data); };
            socket.on('new_vitals', handler);
            return () => { socket.off('new_vitals', handler); };
        }
    }, [episodeId, socket]);

    const cards = [
        { icon: <Heart size={26} />, label: 'Cardiac Rate', value: vitals?.heartRate, unit: 'BPM', color: '#FEF2F2', iconColor: '#EF4444' },
        { icon: <Activity size={26} />, label: 'Blood Pressure', value: vitals ? `${vitals.systolicBP}/${vitals.diastolicBP}` : null, unit: 'mmHg', color: '#F0F9FF', iconColor: '#3B82F6' },
        { icon: <Droplets size={26} />, label: 'Oxygen Sat', value: vitals?.spo2, unit: '%', color: '#F0FDF4', iconColor: '#22C55E' },
        { icon: <Thermometer size={26} />, label: 'Core Temp', value: vitals?.temperature, unit: '°C', color: '#FFFBEB', iconColor: '#F59E0B' },
        { icon: <Wind size={26} />, label: 'Resp. Rate', value: vitals?.respiratoryRate, unit: 'BPM', color: '#F5F3FF', iconColor: '#8B5CF6' },
        { icon: <Shield size={26} />, label: 'Pain Index', value: vitals?.painScore, unit: '/10', color: '#F0F9FF', iconColor: '#0EA5E9' },
    ];

    return (
        <div className="fade-in" style={{ backgroundColor: '#F8F9FD', minHeight: '100vh', paddingBottom: '100px' }}>
            {/* Clinical Header */}
            <div style={{ 
                height: '300px', background: 'linear-gradient(135deg, #1A1A2E 0%, #1565C0 100%)', 
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
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <div style={{ 
                                backgroundColor: 'rgba(34, 197, 94, 0.15)', padding: '10px 24px', borderRadius: '12px', 
                                fontSize: '12px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '10px',
                                border: '1px solid rgba(34, 197, 94, 0.3)', color: '#4ADE80', letterSpacing: '0.08em'
                            }}>
                                <Signal size={16} className="pulse" /> LIVE TELEMETRY
                            </div>
                            <div style={{ 
                                backgroundColor: 'rgba(255,255,255,0.1)', padding: '10px 24px', borderRadius: '12px', 
                                fontSize: '12px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '10px',
                                color: '#fff', border: '1px solid rgba(255,255,255,0.1)', letterSpacing: '0.08em'
                            }}>
                                <Wifi size={16} /> SYNC ACTIVE
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: 'auto' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px', marginBottom: '12px' }}>
                            <h1 style={{ fontSize: '42px', fontWeight: '900', letterSpacing: '-0.03em' }}>{patientName}</h1>
                            <div style={{ 
                                padding: '6px 16px', backgroundColor: 'rgba(255,255,255,0.15)', 
                                borderRadius: '10px', fontSize: '13px', fontWeight: '900', 
                                letterSpacing: '0.05em', border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                EPI: {episodeId}
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '17px', opacity: 0.8, fontWeight: '700' }}>
                            <Smartphone size={18} />
                            <span>Real-time Post-Anesthesia Recovery Stream</span>
                        </div>
                    </div>
                </div>
                
                {/* Decorative Tints */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                     <div style={{ position: 'absolute', top: '10%', right: '5%', opacity: 0.05 }}><Activity size={140} color="#fff" strokeWidth={1} /></div>
                </div>
            </div>

            {/* Content Area */}
            <div style={{ maxWidth: '1100px', margin: '-50px auto 0', padding: '0 32px', position: 'relative', zIndex: 10 }}>
                {/* Vitals Command Nodes */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
                    {cards.map((card, i) => (
                        <div key={i} style={{ 
                            backgroundColor: '#fff', borderRadius: '40px', padding: '40px', 
                            boxShadow: '0 24px 64px rgba(0,0,0,0.06)', border: '1px solid #F1F5F9',
                            display: 'flex', flexDirection: 'column', gap: '24px',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }} onMouseEnter={(e) => e.currentTarget.style.borderColor = card.iconColor}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <div style={{ 
                                    width: '52px', height: '52px', borderRadius: '16px', 
                                    backgroundColor: card.color, color: card.iconColor, 
                                    display: 'flex', alignItems: 'center', justifyContent: 'center' 
                                }}>
                                    {card.icon}
                                </div>
                                <span style={{ fontSize: '12px', fontWeight: '900', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{card.label}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                                <span style={{ fontSize: '56px', fontWeight: '900', color: '#1A1A2E', letterSpacing: '-0.04em', lineHeight: 1 }}>{card.value ?? '--'}</span>
                                <span style={{ fontSize: '18px', fontWeight: '900', color: '#CBD5E1' }}>{card.unit}</span>
                            </div>
                            <div style={{ marginTop: 'auto', height: '6px', backgroundColor: '#F8F9FD', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ width: card.value ? '70%' : '0%', height: '100%', backgroundColor: card.iconColor, borderRadius: '3px', transition: 'width 1s' }} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Narrative Detail Node */}
                <div style={{ 
                    backgroundColor: '#fff', borderRadius: '40px', padding: '48px', 
                    boxShadow: '0 24px 64px rgba(0,0,0,0.06)', border: '1px solid #F1F5F9'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: '#F0F7FF', color: '#1565C0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FileText size={26} />
                        </div>
                        <h3 style={{ fontSize: '22px', fontWeight: '900', color: '#1A1A2E', letterSpacing: '-0.01em' }}>Bedside Narrative Stream</h3>
                    </div>
                    
                    <div style={{ 
                        backgroundColor: '#F8F9FD', borderRadius: '28px', padding: '32px', 
                        border: '1px solid #F1F5F9', marginBottom: '32px' 
                    }}>
                        <p style={{ fontSize: '18px', fontWeight: '800', color: '#334155', lineHeight: 1.7, fontStyle: vitals?.remarks ? 'normal' : 'italic' }}>
                            {vitals?.remarks || 'Establishing secure clinical tunnel... Waiting for protocol narrative from the primary bedside node.'}
                        </p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <ShieldCheck size={20} color="#22C55E" />
                            </div>
                            <div>
                                <p style={{ fontSize: '11px', fontWeight: '900', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Node Integrity Verified</p>
                                <span style={{ fontSize: '14px', color: '#1A1A2E', fontWeight: '900' }}>
                                    LATEST SYNC: {vitals?.recordedAt ? new Date(vitals.recordedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'ESTABLISHING...'}
                                </span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: '#F8F9FD', padding: '12px 24px', borderRadius: '16px', border: '1px solid #F1F5F9' }}>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                 <span style={{ fontSize: '13px', fontWeight: '900', color: '#1565C0', letterSpacing: '0.05em' }}>STREAM SECURE</span>
                                 <div className="pulse" style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22C55E', boxShadow: '0 0 12px rgba(34, 197, 94, 0.4)' }} />
                             </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '64px', color: '#B0BEC5' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
                    <BadgeCheck size={18} />
                    <span style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '0.08em' }}>ISO-27001 COMPLIANT • REAL-TIME AUDIT LOG ACTIVE</span>
                </div>
                <p style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '1px' }}>PACU COMMAND NODE • HN V4.0.2</p>
            </div>
        </div>
    );
};

export default LiveMonitorDetail;
