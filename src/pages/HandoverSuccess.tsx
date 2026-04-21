import React from 'react';
import { 
    LayoutDashboard, Share2, CheckCircle, ShieldCheck, 
    ArrowRight, UserCheck, Activity, ClipboardList,
    Smartphone, Zap, Info, BadgeCheck, Target,
    Shield
} from 'lucide-react';

interface Props {
    onDashboard: () => void;
}

const HandoverSuccess = ({ onDashboard }: Props) => (
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
                    <Share2 size={48} color="#4ADE80" className="pulse-slow" />
                </div>
                <h1 style={{ fontSize: '42px', fontWeight: '900', letterSpacing: '-0.03em', marginBottom: '12px' }}>Handover Verified</h1>
                <p style={{ fontSize: '18px', opacity: 0.8, fontWeight: '700' }}>Clinical responsibility successfully transferred within the care node</p>
            </div>
            
            {/* Decorative Elements */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                 <div style={{ position: 'absolute', top: '10%', right: '5%', opacity: 0.05 }}><Shield size={120} color="#fff" strokeWidth={1} /></div>
                 <div style={{ position: 'absolute', bottom: '10%', left: '5%', opacity: 0.05 }}><UserCheck size={100} color="#fff" strokeWidth={1} /></div>
            </div>
        </div>

        <div style={{ maxWidth: '850px', margin: '-100px auto 0', padding: '0 32px', position: 'relative', zIndex: 2 }}>
            {/* Protocol Card */}
            <div style={{ 
                backgroundColor: '#fff', borderRadius: '40px', padding: '56px', 
                boxShadow: '0 32px 64px rgba(0,0,0,0.12)', textAlign: 'center',
                border: '1px solid #F1F5F9', marginBottom: '40px'
            }}>
                <div style={{ 
                    width: '84px', height: '84px', borderRadius: '28px', 
                    backgroundColor: '#F0FDF4', display: 'flex', alignItems: 'center', 
                    justifyContent: 'center', color: '#22C55E', margin: '0 auto 32px',
                    boxShadow: '0 12px 24px rgba(34, 197, 94, 0.1)'
                }}>
                    <CheckCircle size={40} />
                </div>
                <p style={{ fontSize: '18px', color: '#1A1A2E', lineHeight: 1.8, fontWeight: '800', maxWidth: '560px', margin: '0 auto' }}>
                    Shift handover protocol finalized. The incoming clinical personnel node has been notified and granted secure access to the active patient recovery environment.
                </p>
                <div style={{ height: '1px', backgroundColor: '#F1F5F9', margin: '40px auto', maxWidth: '440px' }} />
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: '#1565C0', fontSize: '14px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    <BadgeCheck size={20} /> PATIENT CARE AUDIT LOG SYNCHRONIZED
                </div>
            </div>

            {/* Command Actions */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={onDashboard} style={{ 
                    width: '100%', maxWidth: '480px', height: '76px', borderRadius: '24px', 
                    background: 'linear-gradient(135deg, #1565C0 0%, #1E88E5 100%)', 
                    color: '#fff', border: 'none', fontWeight: '900', fontSize: '18px', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px',
                    boxShadow: '0 20px 48px rgba(21, 101, 192, 0.4)', cursor: 'pointer',
                    transition: 'all 0.3s'
                }} 
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                id="handover-success-dashboard">
                    <LayoutDashboard size={26} /> RETURN TO COMMAND CONSOLE
                </button>
            </div>

            <div style={{ textAlign: 'center', marginTop: '56px', color: '#B0BEC5' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
                    <ShieldCheck size={18} />
                    <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.05em' }}>MULTI-FACTOR HANDOVER VERIFIED • HIPAA SECURE</span>
                </div>
                <p style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '1px' }}>PRECISION CARE INTERFACE • HN V4.0.2</p>
            </div>
        </div>
    </div>
);

export default HandoverSuccess;
