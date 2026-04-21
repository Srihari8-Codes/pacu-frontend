import React from 'react';
import { Activity, Bell, Heart, Droplets, Zap, ShieldAlert, Target } from 'lucide-react';

interface VitalData {
    bpm: number;
    spo2: number;
    bp: string;
    respiration?: number;
}

interface VitalMonitorProps {
    patientName: string;
    bedNumber: string;
    vitals: VitalData;
    isAlert?: boolean;
    onClick?: () => void;
}

const VitalMonitor = ({ patientName, bedNumber, vitals, isAlert, onClick }: VitalMonitorProps) => {
    return (
        <div 
            onClick={onClick}
            style={{
                backgroundColor: '#1A1A2E',
                borderRadius: '32px',
                padding: '28px',
                border: isAlert ? '2px solid #EF4444' : '1px solid rgba(255,255,255,0.05)',
                boxShadow: isAlert ? '0 0 32px rgba(239, 68, 68, 0.2)' : '0 20px 48px rgba(0,0,0,0.2)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                height: '280px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: onClick ? 'pointer' : 'default',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as any).style.transform = 'translateY(-8px)';
                if (!isAlert) (e.currentTarget as any).style.borderColor = '#1565C0';
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as any).style.transform = 'translateY(0)';
                if (!isAlert) (e.currentTarget as any).style.borderColor = 'rgba(255,255,255,0.05)';
            }}
        >
            {/* Ambient Background Glow */}
            <div style={{ 
                position: 'absolute', top: '-20%', right: '-20%', width: '150px', height: '150px', 
                background: isAlert ? 'radial-gradient(circle, rgba(239,68,68,0.15) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(21,101,192,0.1) 0%, transparent 70%)',
                filter: 'blur(30px)', pointerEvents: 'none'
            }} />

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
                <div>
                    <div style={{ fontSize: '18px', fontWeight: '900', letterSpacing: '-0.02em', color: '#fff' }}>{patientName}</div>
                    <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '900', letterSpacing: '0.1em', marginTop: '4px' }}>UNIT NODE • BED {bedNumber}</div>
                </div>
                {isAlert ? (
                    <div style={{ padding: '8px', backgroundColor: 'rgba(239, 68, 68, 0.2)', borderRadius: '12px', color: '#EF4444' }}>
                        <ShieldAlert size={20} className="pulse" />
                    </div>
                ) : (
                    <div style={{ padding: '8px', backgroundColor: 'rgba(34, 197, 94, 0.1)', borderRadius: '12px', color: '#22C55E' }}>
                        <div className="pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22C55E' }} />
                    </div>
                )}
            </div>

            {/* Simulated Live Waveform */}
            <div style={{ height: '70px', position: 'relative', margin: '20px 0', opacity: 0.6, zIndex: 1 }}>
                <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <path
                        d="M 0 20 L 10 20 L 15 10 L 20 30 L 25 20 L 40 20 L 45 5 L 50 35 L 55 20 L 70 20 L 75 12 L 80 28 L 85 20 L 100 20"
                        fill="none"
                        stroke={isAlert ? '#EF4444' : '#4ADE80'}
                        strokeWidth="2"
                        className="pulse-wave"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            {/* Telemetry Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', position: 'relative', zIndex: 2 }}>
                <MetricNode label="HR" value={vitals.bpm} unit="BPM" icon={<Heart size={14} />} color={isAlert ? '#EF4444' : '#4ADE80'} />
                <MetricNode label="SPO₂" value={vitals.spo2} unit="%" icon={<Droplets size={14} />} color="#60A5FA" />
                <MetricNode label="BP" value={vitals.bp} unit="mmHg" icon={<Zap size={14} />} color="#FCD34D" />
            </div>

            <style>{`
                .pulse-wave {
                    stroke-dasharray: 200;
                    stroke-dashoffset: 200;
                    animation: wave-sync 2.5s linear infinite;
                }
                @keyframes wave-sync {
                    to { stroke-dashoffset: 0; }
                }
            `}</style>
        </div>
    );
};

const MetricNode = ({ label, value, unit, icon, color }: { label: string, value: string | number, unit: string, icon: any, color: string }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontWeight: '900', color: '#64748B', letterSpacing: '0.05em' }}>
            {icon} {label}
        </div>
        <div>
            <div style={{ fontSize: '24px', fontWeight: '900', color, lineHeight: 1 }}>{value || '--'}</div>
            <div style={{ fontSize: '10px', fontWeight: '800', color: '#475569', marginTop: '4px' }}>{unit}</div>
        </div>
    </div>
);

export default VitalMonitor;
