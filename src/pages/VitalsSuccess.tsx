import React from 'react';
import { 
    CheckCircle, Activity, ArrowRight, ShieldCheck, 
    ArrowLeft, ClipboardList, Zap, Info, Star,
    BadgeCheck, Smartphone, Target
} from 'lucide-react';

interface Props {
    patientName: string;
    onViewPatient?: () => void;
    onRecordNew?: () => void;
}

const VitalsSuccess = ({ patientName, onViewPatient, onRecordNew }: Props) => (
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
                <h1 style={{ fontSize: '42px', fontWeight: '900', letterSpacing: '-0.03em', marginBottom: '12px' }}>Vitals Synchronized</h1>
                <p style={{ fontSize: '18px', opacity: 0.8, fontWeight: '700' }}>Vital signs successfully recorded for clinical review</p>
            </div>
            
            {/* Decorative Elements */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                 <div style={{ position: 'absolute', top: '10%', right: '5%', opacity: 0.05 }}><Activity size={120} color="#fff" strokeWidth={1} /></div>
                 <div style={{ position: 'absolute', bottom: '10%', left: '5%', opacity: 0.05 }}><Smartphone size={100} color="#fff" strokeWidth={1} /></div>
            </div>
        </div>

        <div style={{ maxWidth: '850px', margin: '-60px auto 0', padding: '0 32px', position: 'relative', zIndex: 2 }}>
            {/* Confirmation Brief */}
            <div style={{ 
                backgroundColor: '#fff', borderRadius: '40px', padding: '56px', 
                boxShadow: '0 32px 64px rgba(0,0,0,0.12)', textAlign: 'center',
                border: '1px solid #F1F5F9', marginBottom: '40px'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
                    <div style={{ 
                        width: '84px', height: '84px', borderRadius: '28px', 
                        backgroundColor: '#F0FDF4', display: 'flex', alignItems: 'center', 
                        justifyContent: 'center', color: '#22C55E', boxShadow: '0 12px 24px rgba(34, 197, 94, 0.1)'
                    }}>
                        <Activity size={40} />
                    </div>
                    <div>
                        <p style={{ fontSize: '12px', fontWeight: '900', color: '#B0BEC5', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>RECORD UPDATED</p>
                        <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#1A1A2E', letterSpacing: '-0.02em' }}>{patientName || 'Clinical Patient'}</h2>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '16px', color: '#22C55E' }}>
                            <BadgeCheck size={20} />
                            <span style={{ fontSize: '15px', fontWeight: '800' }}>VITALS SUCCESSFULLY SAVED</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Protocol Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '560px', margin: '0 auto' }}>
                <button onClick={onViewPatient} style={{ 
                    width: '100%', height: '80px', borderRadius: '28px', 
                    background: 'linear-gradient(135deg, #1565C0 0%, #1E88E5 100%)', 
                    color: '#fff', border: 'none', fontWeight: '900', fontSize: '18px', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px',
                    boxShadow: '0 20px 48px rgba(21, 101, 192, 0.4)', cursor: 'pointer',
                    transition: 'all 0.3s'
                }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                   onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                   id="vitals-success-view">
                    <Target size={24} /> GO TO PATIENT PROFILE
                </button>
                <button onClick={onRecordNew} style={{ 
                    width: '100%', height: '72px', borderRadius: '24px', 
                    background: '#fff', color: '#1565C0', border: '2px solid #F1F5F9', 
                    fontWeight: '900', fontSize: '17px', display: 'flex', 
                    alignItems: 'center', justifyContent: 'center', gap: '12px',
                    cursor: 'pointer', transition: 'all 0.2s'
                }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8F9FD'}
                   id="vitals-success-new">
                    <Zap size={22} /> RECORD NEW VITALS
                </button>
            </div>

            <div style={{ textAlign: 'center', marginTop: '56px', color: '#B0BEC5' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
                    <ShieldCheck size={18} />
                    <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.05em' }}>DATA IMMUTABILITY SECURED • HIPAA COMPLIANT</span>
                </div>
                <p style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.1em' }}>PRECISION CARE INTERFACE • HN V4.0.2</p>
            </div>
        </div>
    </div>
);

export default VitalsSuccess;
