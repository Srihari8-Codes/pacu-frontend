import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ShieldCheck, Loader2, Zap, Target, Heart, Shield } from 'lucide-react';

const Splash = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/onboarding');
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="fade-in" style={{ 
            height: '100vh', 
            background: 'linear-gradient(135deg, #0A0F1E 0%, #1A1A2E 100%)', 
            color: '#fff', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Ambient Kinetic Energy */}
            <div style={{ 
                position: 'absolute', width: '800px', height: '800px', 
                background: 'radial-gradient(circle, rgba(21, 101, 192, 0.12) 0%, transparent 70%)', 
                top: '-300px', left: '-300px', borderRadius: '50%', filter: 'blur(100px)' 
            }} />
            <div style={{ 
                position: 'absolute', width: '600px', height: '600px', 
                background: 'radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, transparent 70%)', 
                bottom: '-200px', right: '-200px', borderRadius: '50%', filter: 'blur(100px)' 
            }} />

            {/* Core Command Node */}
            <div className="animate-float" style={{
                width: '240px', height: '240px',
                borderRadius: '56px',
                background: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(30px)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '48px',
                boxShadow: '0 40px 80px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.05)',
                position: 'relative',
                zIndex: 10
            }}>
                <div style={{ 
                    width: '140px', height: '140px',
                    padding: '32px', 
                    background: 'linear-gradient(135deg, #1565C0 0%, #1E88E5 100%)', 
                    borderRadius: '40px',
                    boxShadow: '0 16px 32px rgba(21,101,192,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Activity size={84} color="#fff" strokeWidth={2} className="pulse-clinical" />
                </div>
                
                {/* Orbital Accents */}
                <div style={{ position: 'absolute', top: '-10px', right: '-10px' }}><Shield size={32} color="#22C55E" strokeWidth={2} /></div>
                <div style={{ position: 'absolute', bottom: '-10px', left: '-10px' }}><Zap size={32} color="#F59E0B" strokeWidth={2} /></div>
            </div>

            <div style={{ position: 'relative', zIndex: 10 }}>
                <h1 style={{ fontSize: '48px', fontWeight: '900', letterSpacing: '-0.04em', marginBottom: '12px', color: '#fff', textTransform: 'uppercase' }}>PACU DASHBOARD</h1>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                    <div style={{ height: '2px', width: '24px', backgroundColor: '#1565C0' }} />
                    <p style={{ fontSize: '18px', opacity: 0.8, fontWeight: '700' }}>Vital signs successfully recorded for clinical review</p>
                    <div style={{ height: '2px', width: '24px', backgroundColor: '#1565C0' }} />
                </div>
            </div>

            {/* Initialization Sequence */}
            <div style={{ position: 'absolute', bottom: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <div className="dot-pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1E88E5' }} />
                    <div className="dot-pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1E88E5', animationDelay: '0.2s' }} />
                    <div className="dot-pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1E88E5', animationDelay: '0.4s' }} />
                </div>
                <div style={{ 
                    display: 'flex', alignItems: 'center', gap: '14px', 
                    color: '#94A3B8', fontSize: '13px', fontWeight: '900', 
                    letterSpacing: '0.15em', background: 'rgba(255,255,255,0.05)',
                    padding: '12px 32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <ShieldCheck size={18} color="#22C55E" /> INITIALIZING HN_NODE v4.0.2
                </div>
            </div>

            <div style={{ position: 'absolute', bottom: '40px', opacity: 0.3, fontSize: '11px', fontWeight: '800', color: '#90A4AE', letterSpacing: '0.2em' }}>
                HN HEALTH SOLUTIONS • CLINICAL PATIENT MONITORING SYSTEM
            </div>
            
            {/* Visual Textures */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', opacity: 0.05, backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
    );
};

export default Splash;
