import React, { useState } from 'react';
import { 
    ArrowLeft, Pill, Eye, Thermometer, Droplets, 
    MoreHorizontal, Send, User, ShieldCheck, AlertCircle,
    Activity, Clock, Hash, ChevronRight, BadgeCheck,
    Smartphone, Zap, Info, Target, Shield, FileText,
    MessageSquare, Stethoscope
} from 'lucide-react';

interface Props {
    patient: any;
    onBack: () => void;
    onSubmit: (instruction: any) => void;
}

const IssueInstruction: React.FC<Props> = ({ patient, onBack, onSubmit }) => {
    const [category, setCategory] = useState('Observation');
    const [priority, setPriority] = useState('Normal');
    const [details, setDetails] = useState('');

    const categories = [
        { id: 'Medication',     icon: <Pill size={24} />,         label: 'Medication' },
        { id: 'Observation',    icon: <Eye size={24} />,          label: 'Observation' },
        { id: 'Pain Management',icon: <Activity size={24} />,     label: 'Pain Mgmt' },
        { id: 'Oxygen/IV',      icon: <Droplets size={24} />,     label: 'Oxygen / IV' },
        { id: 'Other',          icon: <MoreHorizontal size={24} />,label: 'Other' },
    ];

    const priorities = [
        { id: 'Normal',   color: '#22C55E', bg: '#F0FDF4', desc: 'Routine post-op care' },
        { id: 'Urgent',   color: '#F59E0B', bg: '#FFFBE6', desc: 'Required within 15m' },
        { id: 'Critical', color: '#EF4444', bg: '#FEF2F2', desc: 'Immediate execution' },
    ];

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
                            backgroundColor: '#1565C0', padding: '8px 24px', borderRadius: '12px', 
                            fontSize: '12px', fontWeight: '900', letterSpacing: '0.08em',
                            display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 16px rgba(21,101,192,0.2)'
                        }}>
                            <ShieldCheck size={18} /> PHYSICIAN AUTHORITY
                        </div>
                    </div>

                    <div style={{ marginTop: 'auto' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px', marginBottom: '12px' }}>
                            <h1 style={{ fontSize: '38px', fontWeight: '900', letterSpacing: '-0.02em' }}>Command Directive</h1>
                            <div style={{ 
                                padding: '6px 16px', backgroundColor: 'rgba(255,255,255,0.15)', 
                                borderRadius: '10px', fontSize: '13px', fontWeight: '900', 
                                letterSpacing: '0.05em', border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                MRN: {patient?.mrn || patient?.id}
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '17px', opacity: 0.8, fontWeight: '700' }}>
                            <User size={18} />
                            <span>Clinical Instruction for <strong>{patient?.name}</strong></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div style={{ maxWidth: '1000px', margin: '-50px auto 0', padding: '0 32px', position: 'relative', zIndex: 10 }}>
                <div style={{ 
                    backgroundColor: '#fff', borderRadius: '40px', padding: '48px', 
                    boxShadow: '0 24px 64px rgba(0,0,0,0.06)', border: '1px solid #F1F5F9'
                }}>
                    {/* Category Node */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: '#F0F7FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Target size={26} color="#1565C0" />
                        </div>
                        <h3 style={{ fontSize: '22px', fontWeight: '900', color: '#1A1A2E', letterSpacing: '-0.01em' }}>Directive Taxonomy</h3>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '48px' }}>
                        {categories.map(cat => (
                            <div key={cat.id} onClick={() => setCategory(cat.id)} style={{ 
                                padding: '24px 12px', borderRadius: '24px', 
                                border: `2px solid ${category === cat.id ? '#1565C0' : '#F1F5F9'}`,
                                backgroundColor: category === cat.id ? '#F0F7FF' : '#F8F9FD',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
                                cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', textAlign: 'center',
                                boxShadow: category === cat.id ? '0 12px 24px rgba(21,101,192,0.1)' : 'none'
                            }}>
                                <div style={{ 
                                    width: '52px', height: '52px', borderRadius: '16px',
                                    backgroundColor: category === cat.id ? '#1565C0' : '#E9EFF3',
                                    color: category === cat.id ? '#fff' : '#90A4AE',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    transition: 'all 0.2s'
                                }}>
                                    {cat.icon}
                                </div>
                                <span style={{ fontSize: '12px', fontWeight: '900', color: category === cat.id ? '#1A1A2E' : '#90A4AE', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{cat.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Criticality Node */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <AlertCircle size={26} color="#F59E0B" />
                        </div>
                        <h3 style={{ fontSize: '22px', fontWeight: '900', color: '#1A1A2E', letterSpacing: '-0.01em' }}>Clinical Priority Logic</h3>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '48px' }}>
                        {priorities.map(p => (
                            <div key={p.id} onClick={() => setPriority(p.id)} style={{ 
                                padding: '24px', borderRadius: '28px', cursor: 'pointer',
                                border: `2px solid ${priority === p.id ? p.color : '#F1F5F9'}`,
                                backgroundColor: priority === p.id ? p.bg : '#F8F9FD',
                                transition: 'all 0.3s', position: 'relative', overflow: 'hidden'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <p style={{ fontSize: '18px', fontWeight: '900', color: priority === p.id ? '#1A1A2E' : '#64748B' }}>{p.id}</p>
                                    {priority === p.id && <BadgeCheck size={20} color={p.color} />}
                                </div>
                                <p style={{ fontSize: '13px', fontWeight: '700', color: priority === p.id ? p.color : '#90A4AE', lineHeight: 1.4 }}>{p.desc}</p>
                                {priority === p.id && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', backgroundColor: p.color }} />}
                            </div>
                        ))}
                    </div>

                    {/* Operational Narrative Node */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: '#F8F9FD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FileText size={26} color="#64748B" />
                        </div>
                        <h3 style={{ fontSize: '22px', fontWeight: '900', color: '#1A1A2E', letterSpacing: '-0.01em' }}>Directive Description</h3>
                    </div>
                    
                    <textarea
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Define precise clinical instructions, dosages, or follow-up intervals for the recovery stream..."
                        rows={6}
                        style={{ 
                            width: '100%', padding: '32px', background: '#F8F9FD', 
                            border: '2px solid #F1F5F9', borderRadius: '28px', 
                            fontSize: '18px', fontWeight: '800', color: '#1A1A2E', 
                            outline: 'none', resize: 'none', lineHeight: 1.6, marginBottom: '20px',
                            transition: 'all 0.2s'
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

                    {/* Executive Footer Button */}
                    <div style={{ 
                        position: 'fixed', bottom: '40px', left: '0', right: '0',
                        display: 'flex', justifyContent: 'center', padding: '0 32px', zIndex: 1000 
                    }}>
                        <button
                            onClick={() => onSubmit({ category, priority, details, timestamp: new Date().toISOString() })}
                            disabled={!details.trim()}
                            style={{ 
                                width: '100%', maxWidth: '640px', height: '76px', borderRadius: '28px', 
                                background: details.trim() ? 'linear-gradient(135deg, #1565C0 0%, #1E88E5 100%)' : '#E2E8F0', 
                                color: details.trim() ? '#fff' : '#94A3B8', border: 'none', fontWeight: '900', fontSize: '18px', 
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px',
                                boxShadow: details.trim() ? '0 24px 48px rgba(21,101,192,0.4)' : 'none', 
                                cursor: details.trim() ? 'pointer' : 'default', transition: 'all 0.3s',
                                letterSpacing: '0.05em'
                            }}
                            onMouseEnter={(e) => details.trim() && (e.currentTarget.style.transform = 'translateY(-4px)')}
                            onMouseLeave={(e) => details.trim() && (e.currentTarget.style.transform = 'translateY(0)')}
                        >
                            <Send size={24} /> BROADCAST & COMMIT DIRECTIVE
                        </button>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '64px', color: '#B0BEC5' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
                         <ShieldCheck size={18} />
                         <span style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '0.08em' }}>CENTRAL COMMAND AUTHORIZED • HIPAA AUDIT ACTIVE</span>
                    </div>
                    <p style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '1px' }}>PHYSICIAN CARE CONSOLE • HN V4.0.2</p>
                </div>
            </div>
        </div>
    );
};

export default IssueInstruction;
