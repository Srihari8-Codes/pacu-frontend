import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ChevronRight, Activity, Zap, ShieldAlert, 
    ShieldCheck, Bell, ClipboardList, Target, 
    HeartPulse, Loader2, ArrowRight, Smartphone,
    Shield, Globe, Lock, UserCheck, Stethoscope, Signal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
    {
        title: "Clinical Command",
        description: "Experience absolute 1:1 parity with the mobile monitoring suite. Track vitals and recovery vectors with millisecond precision.",
        icon: <Activity size={32} />,
        color: "#1565C0",
        component: (
            <div style={{
                background: 'linear-gradient(135deg, #0F172A 0%, #1A1A2E 100%)',
                width: '100%', maxWidth: '440px',
                height: '260px',
                borderRadius: '40px',
                padding: '32px',
                boxShadow: '0 40px 80px rgba(0,0,0,0.4)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <div style={{ color: '#4ADE80', fontSize: '11px', fontWeight: '900', letterSpacing: '0.15em' }}>HEART RATE</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                             <div style={{ color: '#4ADE80', fontSize: '56px', fontWeight: '900', letterSpacing: '-0.03em', lineHeight: '1' }}>72</div>
                             <div style={{ color: '#4ADE80', fontSize: '18px', fontWeight: '900', opacity: 0.7 }}>BPM</div>
                        </div>
                    </div>
                    <div style={{ padding: '8px 16px', background: 'rgba(74, 222, 128, 0.1)', borderRadius: '12px', border: '1px solid rgba(74, 222, 128, 0.2)' }}>
                         <Signal size={16} color="#4ADE80" className="pulse" />
                    </div>
                </div>
                <div style={{ height: '48px', position: 'relative', overflow: 'hidden', opacity: 0.4 }}>
                    <div style={{ 
                        width: '200%', height: '100%', 
                        background: 'linear-gradient(90deg, transparent, #4ADE80, transparent)', 
                        animation: 'wave 1.5s infinite linear' 
                    }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div>
                        <div style={{ color: '#60A5FA', fontSize: '11px', fontWeight: '900', letterSpacing: '0.1em' }}>OXYGEN SAT</div>
                        <div style={{ color: '#60A5FA', fontSize: '28px', fontWeight: '900' }}>98<span style={{ fontSize: '14px', opacity: 0.6 }}>%</span></div>
                    </div>
                    <div>
                        <div style={{ color: '#FCD34D', fontSize: '11px', fontWeight: '900', letterSpacing: '0.1em' }}>BP RATIO</div>
                        <div style={{ color: '#FCD34D', fontSize: '28px', fontWeight: '900' }}>120/80</div>
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "Sentinel Oversight",
        description: "Industry-grade notification protocols ensuring zero clinical oversight. Every signal is triaged through advanced logic layers.",
        icon: <ShieldAlert size={32} />,
        color: "#EF4444",
        component: (
            <div style={{ 
                backgroundColor: '#fff', 
                width: '100%', maxWidth: '440px', 
                borderRadius: '40px', 
                padding: '40px', 
                boxShadow: '0 32px 64px rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '28px',
                position: 'relative'
            }}>
                <div style={{ 
                    width: '72px', height: '72px', borderRadius: '24px', 
                    backgroundColor: '#FEF2F2', display: 'flex', alignItems: 'center', 
                    justifyContent: 'center', color: '#EF4444',
                    boxShadow: '0 12px 24px rgba(239, 68, 68, 0.1)'
                }}>
                    <ShieldAlert size={40} />
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '11px', fontWeight: '900', color: '#EF4444', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Critical Event</div>
                    <div style={{ color: '#1A1A2E', fontWeight: '900', fontSize: '20px', letterSpacing: '-0.02em' }}>Arrhythmia Detected</div>
                    <div style={{ color: '#94A3B8', fontSize: '15px', fontWeight: '700', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Target size={14} /> Bay 07 • Post-Op A
                    </div>
                </div>
                <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                     <Zap size={20} color="#F59E0B" fill="#F59E0B" />
                </div>
            </div>
        )
    },
    {
        title: "Unified Registry",
        description: "Standardized clinical handovers and comprehensive audit trails. Maintain a single source of truth for every patient journey.",
        icon: <ClipboardList size={32} />,
        color: "#1565C0",
        component: (
            <div style={{ 
                width: '100%', maxWidth: '440px', background: 'white', 
                borderRadius: '40px', padding: '40px', 
                boxShadow: '0 32px 64px rgba(0,0,0,0.06)',
                border: '1px solid #F1F5F9'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: '#F0F7FF', color: '#1565C0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Stethoscope size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '12px', fontWeight: '900', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Registry Sync</div>
                        <div style={{ fontSize: '18px', fontWeight: '900', color: '#1A1A2E' }}>Protocol Compliance</div>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {[
                        { text: 'Verify Recovery Vector', done: true },
                        { text: 'Authorize Discharge Slot', done: false }
                    ].map((t, i) => (
                        <div key={i} style={{ 
                            display: 'flex', alignItems: 'center', gap: '20px', 
                            padding: '20px', borderRadius: '24px', 
                            background: t.done ? '#F8F9FD' : '#fff',
                            border: `2px solid ${t.done ? '#F1F5F9' : '#F8F9FD'}`,
                            opacity: t.done ? 0.6 : 1 
                        }}>
                            <div style={{ 
                                width: '28px', height: '28px', borderRadius: '10px', 
                                border: `2px solid ${t.done ? '#1565C0' : '#CBD5E1'}`,
                                backgroundColor: t.done ? '#1565C0' : 'transparent',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
                            }}>
                                {t.done && <ChevronRight size={18} strokeWidth={3} />}
                            </div>
                            <div style={{ fontSize: '16px', fontWeight: '800', color: '#334155', textDecoration: t.done ? 'line-through' : 'none' }}>{t.text}</div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
];

const Onboarding = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const navigate = useNavigate();

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            navigate('/login');
        }
    };

    const skip = () => navigate('/login');

    return (
        <div className="fade-in" style={{ backgroundColor: '#F8F9FD', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
            {/* Ambient Background Elements */}
            <div style={{ position: 'absolute', top: '10%', left: '-5%', opacity: 0.03 }}><Activity size={400} strokeWidth={1} /></div>
            <div style={{ position: 'absolute', bottom: '5%', right: '-5%', opacity: 0.03 }}><Globe size={400} strokeWidth={1} /></div>

            <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', flex: 1, display: 'flex', flexDirection: 'column', padding: '60px 40px', position: 'relative', zIndex: 10 }}>
                <header style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '60px' }}>
                    <button onClick={skip} style={{ 
                        background: 'rgba(255,255,255,0.8)', border: '1px solid #ECEFF1', color: '#94A3B8', 
                        padding: '12px 28px', borderRadius: '16px',
                        fontWeight: '900', fontSize: '13px', cursor: 'pointer', 
                        textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'all 0.2s',
                        backdropFilter: 'blur(10px)'
                    }} onMouseEnter={(e) => e.currentTarget.style.color = '#1565C0'}>Skip Setup</button>
                </header>

                <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <div style={{ height: '360px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '64px' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 1.1, y: -20 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                                style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                            >
                                {steps[currentStep].component}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div style={{ minHeight: '180px', maxWidth: '540px' }}>
                        <h2 style={{ fontSize: '42px', fontWeight: '900', color: '#1A1A2E', marginBottom: '20px', letterSpacing: '-0.03em' }}>
                            {steps[currentStep].title}
                        </h2>
                        <p style={{ color: '#94A3B8', fontSize: '18px', fontWeight: '700', lineHeight: 1.7 }}>
                            {steps[currentStep].description}
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', marginTop: '48px' }}>
                        {steps.map((_, idx) => (
                            <div
                                key={idx}
                                style={{
                                    width: idx === currentStep ? '48px' : '12px',
                                    height: '12px',
                                    borderRadius: '10px',
                                    backgroundColor: idx === currentStep ? '#1565C0' : '#ECEFF1',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    boxShadow: idx === currentStep ? '0 4px 12px rgba(21, 101, 192, 0.2)' : 'none'
                                }}
                            />
                        ))}
                    </div>
                </main>

                <footer style={{ marginTop: 'auto', paddingTop: '80px' }}>
                    <button
                        onClick={nextStep}
                        style={{
                            width: '100%',
                            height: '84px',
                            backgroundColor: '#1565C0',
                            color: 'white',
                            borderRadius: '28px',
                            fontSize: '20px',
                            fontWeight: '900',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '16px',
                            boxShadow: '0 24px 48px rgba(21, 101, 192, 0.3)',
                            border: 'none',
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        {currentStep === steps.length - 1 ? 'Establish Clinical Authority' : 'Next Protocol'}
                        <ArrowRight size={28} />
                    </button>
                    
                    <div style={{ textAlign: 'center', marginTop: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', color: '#B0BEC5' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', padding: '8px 24px', borderRadius: '12px', border: '1px solid #F1F5F9' }}>
                             <Lock size={16} color="#1565C0" />
                             <span style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '0.1em' }}>ISO-27001 IDENTITY VERIFIED</span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Onboarding;
