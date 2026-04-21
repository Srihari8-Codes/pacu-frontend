import React from 'react';
import { Activity, Heart, Thermometer, Wind, Droplets, Zap, ShieldCheck, Target, BadgeCheck } from 'lucide-react';

interface VitalCardProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    unit: string;
    color: string;
    bg: string;
}

const VitalCard = ({ icon, label, value, unit, color, bg }: VitalCardProps) => (
    <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '24px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
        (e.currentTarget as any).style.borderColor = color;
        (e.currentTarget as any).style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
    }}
    onMouseLeave={(e) => {
        (e.currentTarget as any).style.borderColor = 'rgba(255, 255, 255, 0.05)';
        (e.currentTarget as any).style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
    }}
    >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94A3B8' }}>
            <div style={{ 
                width: '40px', height: '40px', borderRadius: '12px', 
                backgroundColor: bg, color: color,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                {icon}
            </div>
            <span style={{ fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '32px', fontWeight: '900', color: color, letterSpacing: '-0.02em' }}>{value || '--'}</span>
            <span style={{ fontSize: '14px', fontWeight: '800', color: '#64748B' }}>{unit}</span>
        </div>
        {/* Sparkline track */}
        <div style={{ height: '4px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '2px', overflow: 'hidden', marginTop: '4px' }}>
             <div style={{ width: value ? '70%' : '0%', height: '100%', backgroundColor: color, borderRadius: '2px', transition: 'width 1.5s' }} />
        </div>
    </div>
);

const VitalsMonitor = () => {
    return (
        <div style={{
            backgroundColor: '#1A1A2E',
            borderRadius: '40px',
            padding: '48px',
            color: 'white',
            boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.05)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Texture */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.02, pointerEvents: 'none' }}>
                 <div style={{ position: 'absolute', top: '10%', right: '5%' }}><Target size={200} strokeWidth={1} /></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px', position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ 
                        padding: '16px', backgroundColor: 'rgba(21, 101, 192, 0.2)', 
                        borderRadius: '20px', color: '#3B82F6',
                        boxShadow: '0 12px 24px rgba(0,0,0,0.2)'
                    }}>
                        <Activity size={32} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '24px', fontWeight: '900', letterSpacing: '-0.03em' }}>Patient Control Node</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                             <BadgeCheck size={16} color="#3B82F6" />
                             <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: '800', letterSpacing: '0.05em' }}>PRIMARY TELEMETRY STREAM • ENCRYPTED</span>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(34, 197, 94, 0.1)', padding: '10px 24px', borderRadius: '16px', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                    <div className="pulse" style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22C55E' }}></div>
                    <span style={{ fontSize: '13px', fontWeight: '900', color: '#22C55E', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Signal Stable</span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', position: 'relative', zIndex: 2 }}>
                <VitalCard
                    icon={<Heart size={20} />}
                    label="Cardiac Rate"
                    value="72"
                    unit="BPM"
                    color="#EF4444"
                    bg="rgba(239, 68, 68, 0.1)"
                />
                <VitalCard
                    icon={<Droplets size={20} />}
                    label="BP Registry"
                    value="118/72"
                    unit="mmHg"
                    color="#3B82F6"
                    bg="rgba(59, 130, 246, 0.1)"
                />
                <VitalCard
                    icon={<Activity size={20} />}
                    label="Oxygen Sat"
                    value="98"
                    unit="%"
                    color="#22C55E"
                    bg="rgba(34, 197, 94, 0.1)"
                />
                <VitalCard
                    icon={<Thermometer size={20} />}
                    label="Core Temp"
                    value="36.6"
                    unit="°C"
                    color="#F59E0B"
                    bg="rgba(245, 158, 11, 0.1)"
                />
            </div>

            {/* Simulated Clinical Waveform */}
            <div style={{
                marginTop: '48px',
                height: '140px',
                backgroundColor: 'rgba(255,255,255,0.02)',
                borderRadius: '28px',
                border: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ width: '100%', height: '60px', opacity: 0.4, overflow: 'hidden', position: 'relative' }}>
                    <svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none">
                        <path
                            d="M 0 50 Q 25 10 50 50 T 100 50 T 150 50 T 200 50 T 250 50 T 300 50 T 350 50 T 400 50 T 450 50 T 500 50 T 550 50 T 600 50 T 650 50 T 700 50 T 750 50 T 800 50 T 850 50 T 900 50 T 950 50 T 1000 50"
                            fill="none"
                            stroke="#3B82F6"
                            strokeWidth="3"
                            strokeLinecap="round"
                            className="ekg-wave"
                        />
                    </svg>
                </div>
                <div style={{ position: 'absolute', bottom: '20px', left: '32px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                     <Target size={14} color="#64748B" />
                     <span style={{ fontSize: '11px', fontWeight: '900', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.15em' }}>EKG Waveform Telemetry Data Signal</span>
                </div>
                
                <style>{`
                    .ekg-wave {
                        stroke-dasharray: 2000;
                        stroke-dashoffset: 2000;
                        animation: ekg-flow 4s linear infinite;
                    }
                    @keyframes ekg-flow {
                        to { stroke-dashoffset: 0; }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default VitalsMonitor;
