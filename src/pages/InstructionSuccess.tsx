import React from 'react';
import { 
    CheckCircle, ClipboardList, PlusCircle, ArrowLeft, 
    ShieldCheck, Activity, Users, ArrowRight,
    BadgeCheck, Smartphone, Zap, Info, Target,
    FileText
} from 'lucide-react';

interface Props {
    patient: any;
    onViewAll: () => void;
    onIssueAnother: () => void;
    onBackToPatient: () => void;
}

const InstructionSuccess = ({ patient, onViewAll, onIssueAnother, onBackToPatient }: Props) => (
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
                <h1 style={{ fontSize: '42px', fontWeight: '900', letterSpacing: '-0.03em', marginBottom: '12px' }}>Directive Issued</h1>
                <p style={{ fontSize: '18px', opacity: 0.8, fontWeight: '700' }}>Clinical instructions have been broadcast to the care hierarchy</p>
            </div>
            
            {/* Decorative Elements */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                 <div style={{ position: 'absolute', top: '10%', right: '5%', opacity: 0.05 }}><FileText size={120} color="#fff" strokeWidth={1} /></div>
                 <div style={{ position: 'absolute', bottom: '10%', left: '5%', opacity: 0.05 }}><ShieldCheck size={100} color="#fff" strokeWidth={1} /></div>
            </div>
        </div>

        <div style={{ maxWidth: '850px', margin: '-100px auto 0', padding: '0 32px', position: 'relative', zIndex: 2 }}>
            {/* Confirmation Brief */}
            <div style={{ 
                backgroundColor: '#fff', borderRadius: '40px', padding: '56px', 
                boxShadow: '0 32px 64px rgba(0,0,0,0.12)', textAlign: 'center',
                border: '1px solid #F1F5F9', marginBottom: '40px'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
                    <div style={{ 
                        width: '84px', height: '84px', borderRadius: '28px', 
                        backgroundColor: '#E3F2FD', display: 'flex', alignItems: 'center', 
                        justifyContent: 'center', color: '#1565C0', boxShadow: '0 12px 24px rgba(21, 101, 192, 0.1)'
                    }}>
                        <Users size={40} />
                    </div>
                    <div>
                        <p style={{ fontSize: '12px', fontWeight: '900', color: '#B0BEC5', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>DIRECTIVE RECIPIENT NODE</p>
                        <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#1A1A2E', letterSpacing: '-0.02em' }}>{patient?.name || 'Clinical Patient'}</h2>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '16px', color: '#22C55E' }}>
                            <BadgeCheck size={20} />
                            <span style={{ fontSize: '15px', fontWeight: '800' }}>INSTRUCTION LOGGED & SYNCED</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Protocol Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <button onClick={onViewAll} style={{ 
                        height: '72px', borderRadius: '24px', 
                        background: 'linear-gradient(135deg, #1565C0 0%, #1E88E5 100%)', 
                        color: '#fff', border: 'none', fontWeight: '900', fontSize: '16px', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                        boxShadow: '0 12px 32px rgba(21, 101, 192, 0.3)', cursor: 'pointer',
                        transition: 'all 0.2s'
                    }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                       onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                       id="instr-success-view-all">
                        <ClipboardList size={22} /> REVIEW LOGS
                    </button>
                    <button onClick={onIssueAnother} style={{ 
                        height: '72px', borderRadius: '24px', 
                        background: '#fff', color: '#1565C0', border: '2px solid #F1F5F9', 
                        fontWeight: '900', fontSize: '16px', display: 'flex', 
                        alignItems: 'center', justifyContent: 'center', gap: '12px',
                        cursor: 'pointer', transition: 'all 0.2s'
                    }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8F9FD'}
                       id="instr-success-another">
                        <PlusCircle size={22} /> ISSUE NEW
                    </button>
                </div>
                
                <button onClick={onBackToPatient} style={{ 
                    width: '100%', height: '64px', background: '#F1F5F9', 
                    color: '#607D8B', border: 'none', borderRadius: '22px',
                    fontWeight: '900', fontSize: '15px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    transition: 'all 0.2s'
                }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ECEFF1'}>
                    <Target size={20} /> RETURN TO PATIENT COMMAND
                </button>
            </div>

            <div style={{ textAlign: 'center', marginTop: '56px', color: '#B0BEC5' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
                    <ShieldCheck size={18} />
                    <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.05em' }}>COMMAND DIRECTIVES AUDITED • HIPAA ENFORCED</span>
                </div>
                <p style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.1em' }}>PRECISION CARE INTERFACE • HN V4.0.2</p>
            </div>
        </div>
    </div>
);

export default InstructionSuccess;
