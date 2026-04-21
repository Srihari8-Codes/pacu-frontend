import React, { useState } from 'react';
import { 
    ArrowLeft, Heart, Activity, Droplets, 
    Thermometer, Wind, Save, Zap, CheckCircle2, 
    ShieldCheck, BadgeCheck, FileText, User, AlertCircle
} from 'lucide-react';

interface Props {
    patientName: string;
    patientId: string;
    onBack: () => void;
    onSave: (data: any) => void;
}

// ─── VitalInput is defined OUTSIDE EnterVitals ────────────────────────────────
// This is the critical fix: defining a component inside another component
// causes React to treat it as a brand-new type on every parent re-render,
// unmounting and remounting the input (losing focus). Moving it outside
// gives it a stable identity — it updates in place, never losing focus.
interface VitalInputProps {
    icon: React.ReactNode;
    label: string;
    placeholder: string;
    color: string;
    iconColor: string;
    name: string;
    unit: string;
    value: string | number;
    onChange: (name: string, value: string) => void;
}

const VitalInput: React.FC<VitalInputProps> = ({ icon, label, placeholder, color, iconColor, name, unit, value, onChange }) => (
    <div
        style={{
            backgroundColor: '#fff', borderRadius: '28px', border: '1px solid #F1F5F9',
            padding: '28px', boxShadow: '0 8px 32px rgba(0,0,0,0.02)',
            transition: 'border-color 0.2s'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = iconColor)}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#F1F5F9')}
    >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
            <div style={{
                width: 48, height: 48, borderRadius: '16px',
                backgroundColor: color, color: iconColor,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                {icon}
            </div>
            <div>
                <p style={{ fontSize: '11px', fontWeight: '900', color: '#90A4AE', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</p>
                <p style={{ fontSize: '11px', color: '#B0BEC5', fontWeight: '900' }}>{unit}</p>
            </div>
        </div>
        <input
            type="number"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            style={{
                width: '100%', padding: '20px 24px', background: '#F8F9FD',
                border: '2px solid transparent', borderRadius: '20px',
                fontSize: '26px', fontWeight: '900', color: '#1A1A2E',
                outline: 'none', transition: 'border-color 0.15s, background 0.15s',
                fontVariantNumeric: 'tabular-nums'
            }}
            onFocus={(e) => {
                e.target.style.borderColor = '#1565C0';
                e.target.style.backgroundColor = '#fff';
            }}
            onBlur={(e) => {
                e.target.style.borderColor = 'transparent';
                e.target.style.backgroundColor = '#F8F9FD';
            }}
        />
    </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────
const EnterVitals: React.FC<Props> = ({ patientName, patientId, onBack, onSave }) => {
    const [vitals, setVitals] = useState({
        heartRate: '', bpSystolic: '', bpDiastolic: '',
        spO2: '', temperature: '', respiratoryRate: '',
        painScore: '', recoveryScore: '', notes: ''
    });

    // Single stable handler — no inline arrow functions in JSX props
    const handleChange = (name: string, value: string) => {
        setVitals(prev => ({ ...prev, [name]: value }));
    };

    const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setVitals(prev => ({ ...prev, notes: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(vitals);
    };

    return (
        <div className="fade-in" style={{ backgroundColor: '#F8F9FD', minHeight: '100vh', paddingBottom: '140px' }}>
            {/* Clinical Header */}
            <div style={{
                height: '280px', background: 'linear-gradient(135deg, #1A1A2E 0%, #1565C0 100%)',
                padding: '48px 32px', color: '#fff', position: 'relative'
            }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
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
                            backgroundColor: '#22C55E', padding: '8px 24px', borderRadius: '12px',
                            fontSize: '12px', fontWeight: '900', letterSpacing: '0.08em',
                            display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 16px rgba(34,197,94,0.2)'
                        }}>
                            <ShieldCheck size={18} /> ENCRYPTED CHANNEL
                        </div>
                    </div>

                    <div style={{ marginTop: 'auto' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px', marginBottom: '12px' }}>
                            <h1 style={{ fontSize: '38px', fontWeight: '900', letterSpacing: '-0.02em' }}>Vitals Entry</h1>
                            <div style={{
                                padding: '6px 16px', backgroundColor: 'rgba(255,255,255,0.15)',
                                borderRadius: '10px', fontSize: '13px', fontWeight: '900',
                                letterSpacing: '0.05em', border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                MRN: {patientId}
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '17px', opacity: 0.8, fontWeight: '700' }}>
                            <User size={18} />
                            <span>Clinical Observation Sequence for <strong>{patientName}</strong></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div style={{ maxWidth: '1000px', margin: '-30px auto 0', padding: '0 32px', position: 'relative', zIndex: 10 }}>
                <form onSubmit={handleSubmit}>
                    {/* Core Vitals */}
                    <div style={{
                        backgroundColor: '#fff', borderRadius: '40px', padding: '48px',
                        boxShadow: '0 24px 64px rgba(0,0,0,0.06)', marginBottom: '32px',
                        border: '1px solid #F1F5F9'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '40px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: '#F0F7FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Activity size={26} color="#1565C0" />
                            </div>
                            <h3 style={{ fontSize: '22px', fontWeight: '900', color: '#1A1A2E', letterSpacing: '-0.01em' }}>Core Clinical Parameters</h3>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                            <VitalInput icon={<Heart size={22} />}        label="CARDIAC RATE"  placeholder="--" color="#FEF2F2" iconColor="#EF4444" name="heartRate"       unit="BPM"   value={vitals.heartRate}       onChange={handleChange} />
                            <VitalInput icon={<Zap size={22} />}          label="BP SYSTOLIC"   placeholder="--" color="#F0F9FF" iconColor="#3B82F6" name="bpSystolic"      unit="mmHg"  value={vitals.bpSystolic}      onChange={handleChange} />
                            <VitalInput icon={<Zap size={22} />}          label="BP DIASTOLIC"  placeholder="--" color="#F0F9FF" iconColor="#3B82F6" name="bpDiastolic"     unit="mmHg"  value={vitals.bpDiastolic}     onChange={handleChange} />
                            <VitalInput icon={<Droplets size={22} />}     label="OXYGEN SAT"    placeholder="--" color="#F0FDF4" iconColor="#22C55E" name="spO2"            unit="%"     value={vitals.spO2}            onChange={handleChange} />
                            <VitalInput icon={<Thermometer size={22} />}  label="CORE TEMP"     placeholder="--" color="#FFFBEB" iconColor="#F59E0B" name="temperature"     unit="°C"    value={vitals.temperature}     onChange={handleChange} />
                            <VitalInput icon={<Wind size={22} />}         label="RESPIRATIONS"  placeholder="--" color="#F5F3FF" iconColor="#8B5CF6" name="respiratoryRate" unit="BPM"   value={vitals.respiratoryRate} onChange={handleChange} />
                        </div>
                    </div>

                    {/* Recovery Indices */}
                    <div style={{
                        backgroundColor: '#fff', borderRadius: '40px', padding: '48px',
                        boxShadow: '0 24px 64px rgba(0,0,0,0.06)', marginBottom: '32px',
                        border: '1px solid #F1F5F9'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '40px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <BadgeCheck size={26} color="#F59E0B" />
                            </div>
                            <h3 style={{ fontSize: '22px', fontWeight: '900', color: '#1A1A2E', letterSpacing: '-0.01em' }}>Recovery Indices</h3>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <VitalInput icon={<AlertCircle size={22} />}  label="PAIN INDEX"    placeholder="0-10" color="#FFF7ED" iconColor="#F97316" name="painScore"     unit="VISUAL ANALOG SCALE"  value={vitals.painScore}     onChange={handleChange} />
                            <VitalInput icon={<CheckCircle2 size={22} />} label="ALDRETE SCORE" placeholder="0-10" color="#F0FDF4" iconColor="#10B981" name="recoveryScore" unit="ACTIVITY VALIDATION"   value={vitals.recoveryScore} onChange={handleChange} />
                        </div>
                    </div>

                    {/* Clinical Narrative */}
                    <div style={{
                        backgroundColor: '#fff', borderRadius: '40px', padding: '48px',
                        boxShadow: '0 24px 64px rgba(0,0,0,0.06)', marginBottom: '48px',
                        border: '1px solid #F1F5F9'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: '#F8F9FD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FileText size={26} color="#64748B" />
                            </div>
                            <h3 style={{ fontSize: '22px', fontWeight: '900', color: '#1A1A2E', letterSpacing: '-0.01em' }}>Clinical Narrative</h3>
                        </div>
                        <textarea
                            rows={5}
                            placeholder="Append detailed clinical observations or specific patient trajectories for the telemetry log..."
                            value={vitals.notes}
                            onChange={handleNotesChange}
                            style={{
                                width: '100%', padding: '32px', background: '#F8F9FD',
                                border: '2px solid #F1F5F9', borderRadius: '24px',
                                fontSize: '18px', fontWeight: '800', color: '#1A1A2E',
                                outline: 'none', resize: 'none', lineHeight: 1.6, transition: 'all 0.2s',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#1565C0';
                                e.target.style.backgroundColor = '#fff';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#F1F5F9';
                                e.target.style.backgroundColor = '#F8F9FD';
                            }}
                        />
                    </div>

                    {/* Submit */}
                    <div style={{
                        position: 'fixed', bottom: '40px', left: '0', right: '0',
                        display: 'flex', justifyContent: 'center', padding: '0 32px', zIndex: 1000
                    }}>
                        <button type="submit" style={{
                            width: '100%', maxWidth: '640px', height: '76px', borderRadius: '28px',
                            background: 'linear-gradient(135deg, #1565C0 0%, #1E88E5 100%)',
                            color: '#fff', border: 'none', fontWeight: '900', fontSize: '18px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px',
                            boxShadow: '0 24px 48px rgba(21, 101, 192, 0.4)', cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                        >
                            <Save size={24} /> SAVE VITAL SIGNS
                        </button>
                    </div>
                </form>

                <div style={{ textAlign: 'center', marginTop: '64px', color: '#B0BEC5' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
                        <ShieldCheck size={18} />
                        <span style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '0.08em' }}>CRYPTO-VERIFIED SUBMISSION • HIPAA AUDITED</span>
                    </div>
                    <p style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '1px' }}>PRECISION CARE INTERFACE • HN V4.0.2</p>
                </div>
            </div>
        </div>
    );
};

export default EnterVitals;
