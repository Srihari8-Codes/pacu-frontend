import React from 'react';
import { 
    CheckCircle, UserPlus, Activity, Copy, Share2, 
    User, ClipboardList, AlertTriangle, ShieldCheck, ArrowRight,
    Zap, Info, Star, BadgeCheck, Smartphone, Target
} from 'lucide-react';

interface Props {
    patientData: any;
    onEnterVitals?: () => void;
    onViewDetails?: () => void;
    onRegisterAnother?: () => void;
}

const RegistrationSuccess = ({ patientData, onEnterVitals, onViewDetails, onRegisterAnother }: Props) => {
    const handleCopy = () => {
        if (patientData?.mrn) {
            navigator.clipboard.writeText(patientData.mrn);
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Clinical Registration ID',
                text: `Patient: ${patientData?.name}\nMRN: ${patientData?.mrn}`,
            }).catch(() => {});
        } else {
            handleCopy();
        }
    };

    return (
        <div className="fade-in" style={{ backgroundColor: '#F8F9FD', minHeight: '100vh', paddingBottom: '100px' }}>
            {/* Clinical Header */}
            <div style={{ 
                height: '340px', background: 'linear-gradient(135deg, #1A1A2E 0%, #1565C0 100%)', 
                padding: '60px 32px', color: '#fff', textAlign: 'center', position: 'relative'
            }}>
                <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <div style={{ 
                        width: '92px', height: '92px', background: 'rgba(255,255,255,0.1)', 
                        borderRadius: '28px', display: 'flex', alignItems: 'center', 
                        justifyContent: 'center', margin: '0 auto 32px', backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <CheckCircle size={48} color="#4ADE80" className="pulse-slow" />
                    </div>
                    <h1 style={{ fontSize: '42px', fontWeight: '900', letterSpacing: '-0.03em', marginBottom: '12px' }}>Registration Verified</h1>
                    <p style={{ fontSize: '18px', opacity: 0.8, fontWeight: '700' }}>Patient {patientData?.name} establishes clinical presence</p>
                </div>
                
                {/* Decorative Elements */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                     <div style={{ position: 'absolute', top: '10%', right: '5%', opacity: 0.05 }}><BadgeCheck size={120} color="#fff" strokeWidth={1} /></div>
                     <div style={{ position: 'absolute', bottom: '10%', left: '5%', opacity: 0.05 }}><Activity size={100} color="#fff" strokeWidth={1} /></div>
                </div>
            </div>

            <div style={{ maxWidth: '850px', margin: '-100px auto 0', padding: '0 32px', position: 'relative', zIndex: 2 }}>
                {/* Command ID Card */}
                <div style={{ 
                    backgroundColor: '#fff', borderRadius: '40px', padding: '48px', 
                    boxShadow: '0 32px 64px rgba(0,0,0,0.12)', textAlign: 'center',
                    border: '1px solid #F1F5F9', marginBottom: '32px'
                }}>
                    <p style={{ fontSize: '12px', fontWeight: '900', color: '#B0BEC5', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '24px' }}>
                        GLOBAL CENTRAL IDENTIFIER (GCI)
                    </p>
                    <div style={{ 
                        fontSize: '56px', fontWeight: '900', color: '#1565C0', 
                        letterSpacing: '0.08em', marginBottom: '32px', fontVariantNumeric: 'tabular-nums',
                        textShadow: '0 4px 12px rgba(21, 101, 192, 0.1)'
                    }}>
                        {patientData?.mrn || '--- ---'}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                        <button onClick={handleCopy} style={{ 
                            padding: '18px 32px', borderRadius: '20px', background: '#F0F7FF', 
                            color: '#1565C0', border: 'none', fontWeight: '900', fontSize: '14px',
                            display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer',
                            transition: 'all 0.2s'
                        }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E3F2FD'}>
                            <Copy size={20} /> COPY GCI
                        </button>
                        <button onClick={handleShare} style={{ 
                            padding: '18px 32px', borderRadius: '20px', background: '#F0F7FF', 
                            color: '#1565C0', border: 'none', fontWeight: '900', fontSize: '14px',
                            display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer',
                            transition: 'all 0.2s'
                        }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E3F2FD'}>
                            <Share2 size={20} /> BROADCAST ID
                        </button>
                    </div>
                </div>

                {/* Patient Profile Brief */}
                <div style={{ 
                    backgroundColor: '#fff', borderRadius: '40px', padding: '40px', 
                    boxShadow: '0 20px 48px rgba(0,0,0,0.06)', marginBottom: '32px',
                    border: '1px solid #F1F5F9'
                }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#1A1A2E', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Smartphone size={24} color="#1565C0" /> Protocol Assignment Summary
                    </h3>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        <div style={{ background: '#F8F9FD', padding: '24px', borderRadius: '24px', border: '1px solid #ECEFF1' }}>
                            <p style={{ fontSize: '11px', fontWeight: '900', color: '#90A4AE', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>Surgical Procedure</p>
                            <p style={{ fontSize: '18px', fontWeight: '900', color: '#1A1A2E' }}>{patientData?.procedure || 'Standard Recovery Protocol'}</p>
                        </div>
                        <div style={{ background: '#F8F9FD', padding: '24px', borderRadius: '24px', border: '1px solid #ECEFF1' }}>
                            <p style={{ fontSize: '11px', fontWeight: '900', color: '#90A4AE', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>Clinical Metrics</p>
                            <p style={{ fontSize: '18px', fontWeight: '900', color: '#1A1A2E' }}>{patientData?.age}Y • {patientData?.gender?.[0]?.toUpperCase() || 'U'} • BED {patientData?.bedNumber || '-'}</p>
                        </div>
                    </div>

                    {patientData?.allergies && patientData.allergies !== 'None' && (
                        <div style={{ 
                            marginTop: '24px', padding: '24px', borderRadius: '24px', 
                            background: '#FFF5F5', border: '1px solid #FEE2E2',
                            display: 'flex', alignItems: 'center', gap: '16px' 
                        }}>
                            <div style={{ width: '56px', height: '56px', borderRadius: '18px', backgroundColor: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <AlertTriangle size={28} color="#EF4444" />
                            </div>
                            <div>
                                <p style={{ fontSize: '11px', fontWeight: '900', color: '#F87171', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Clinical Allergy Enforcement</p>
                                <p style={{ fontSize: '17px', fontWeight: '800', color: '#B91C1C' }}>{patientData.allergies}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Command Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {onEnterVitals && (
                        <button onClick={onEnterVitals} style={{ 
                            width: '100%', height: '80px', borderRadius: '28px', 
                            background: 'linear-gradient(135deg, #1565C0 0%, #1E88E5 100%)', 
                            color: '#fff', border: 'none', fontWeight: '900', fontSize: '18px', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px',
                            boxShadow: '0 20px 48px rgba(21, 101, 192, 0.4)', cursor: 'pointer',
                            transition: 'all 0.3s'
                        }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                           onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                           id="reg-success-vitals">
                            <Activity size={24} /> INITIALIZE VITALS TELEMETRY
                        </button>
                    )}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        {onViewDetails && (
                            <button onClick={onViewDetails} style={{ 
                                height: '64px', borderRadius: '22px', background: '#fff', 
                                color: '#1A1A2E', border: '2px solid #F1F5F9', fontWeight: '900', 
                                fontSize: '15px', cursor: 'pointer', display: 'flex', 
                                alignItems: 'center', justifyContent: 'center', gap: '10px',
                                transition: 'all 0.2s'
                            }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8F9FD'}
                               id="reg-success-details">
                                <Target size={20} /> ACCESS CHART
                            </button>
                        )}
                        {onRegisterAnother && (
                            <button onClick={onRegisterAnother} style={{ 
                                height: '64px', borderRadius: '22px', background: '#F1F5F9', 
                                color: '#607D8B', border: 'none', fontWeight: '900', 
                                fontSize: '15px', cursor: 'pointer', display: 'flex', 
                                alignItems: 'center', justifyContent: 'center', gap: '10px',
                                transition: 'all 0.2s'
                            }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ECEFF1'}
                               id="reg-success-another">
                                <UserPlus size={20} /> NEW INTAKE NODE
                            </button>
                        )}
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '56px', color: '#B0BEC5' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
                        <ShieldCheck size={18} />
                        <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.05em' }}>REGISTRY SYNCHRONIZED ACROSS COMMAND NODES</span>
                    </div>
                    <p style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.1em' }}>PRECISION CARE INTERFACE • HN V4.0.2</p>
                </div>
            </div>
        </div>
    );
};

export default RegistrationSuccess;
