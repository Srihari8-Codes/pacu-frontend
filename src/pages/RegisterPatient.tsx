import React, { useState } from 'react';
import { 
    ArrowLeft, UserPlus, ChevronDown, User, ClipboardList, 
    AlertTriangle, ShieldCheck, Activity, Stethoscope, 
    Hash, MapPin, Calendar, Info, Zap
} from 'lucide-react';

interface Props {
    onBack: () => void;
    onSubmit: (data: any) => void;
}

const RegisterPatient: React.FC<Props> = ({ onBack, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '', age: '', gender: '', procedure: '', allergies: '', notes: '', bedNumber: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const inputStyle = (hasError = false) => ({
        width: '100%', padding: '18px 24px', background: '#F8F9FD', 
        border: '2px solid #F1F5F9', borderRadius: '20px', 
        fontSize: '15px', fontWeight: '700', color: '#1A1A2E', 
        outline: 'none', transition: 'all 0.2s'
    });

    const labelStyle = { 
        display: 'block', fontSize: '12px', fontWeight: '900', 
        color: '#90A4AE', textTransform: 'uppercase', letterSpacing: '0.08em', 
        marginBottom: '10px', marginLeft: '4px' 
    };

    return (
        <div className="fade-in" style={{ backgroundColor: '#F8F9FD', minHeight: '100vh' }}>
            {/* Header Area */}
            <div style={{ 
                height: '240px', background: 'linear-gradient(135deg, #1565C0 0%, #1E88E5 100%)', 
                padding: '48px 32px', color: '#fff', position: 'relative'
            }}>
                <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                        <button onClick={onBack} style={{ 
                            width: '48px', height: '48px', borderRadius: '14px', 
                            backgroundColor: 'rgba(255,255,255,0.2)', border: 'none', 
                            color: '#fff', display: 'flex', alignItems: 'center', 
                            justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)'
                        }}>
                            <ArrowLeft size={24} />
                        </button>
                        <div style={{ 
                            backgroundColor: 'rgba(255,255,255,0.15)', padding: '8px 16px', borderRadius: '12px', 
                            fontSize: '11px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '8px'
                        }}>
                            <ShieldCheck size={14} /> CLINICAL NODE: ALPHA-01
                        </div>
                    </div>
                    <div>
                        <h1 style={{ fontSize: '36px', fontWeight: '900', letterSpacing: '-0.02em' }}>Clinical Subject Registry</h1>
                        <p style={{ fontSize: '16px', opacity: 0.9, fontWeight: '700', marginTop: '4px' }}>Standard intake protocol for post-anesthesia recovery</p>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '850px', margin: '-40px auto 100px', padding: '0 32px' }}>
                <form onSubmit={handleSubmit}>
                    {/* Primary Identity */}
                    <div style={{ 
                        backgroundColor: '#fff', borderRadius: '32px', padding: '40px', 
                        marginBottom: '32px', boxShadow: '0 20px 48px rgba(0,0,0,0.06)',
                        border: '1px solid #F1F5F9'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#E3F2FD', color: '#1565C0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <User size={20} />
                            </div>
                            <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#1A1A2E' }}>Identity Verification</h3>
                        </div>
                        
                        <div style={{ marginBottom: '24px' }}>
                            <label style={labelStyle as any}>Full Legal Name</label>
                            <input 
                                type="text" 
                                required 
                                placeholder="Enter subject name..." 
                                value={formData.name} 
                                onChange={e => setFormData({ ...formData, name: e.target.value })} 
                                style={inputStyle() as any} 
                                onFocus={(e) => e.target.style.borderColor = '#1565C0'}
                                onBlur={(e) => e.target.style.borderColor = '#F1F5F9'}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <div>
                                <label style={labelStyle as any}>Chronological Age</label>
                                <input 
                                    type="number" 
                                    required 
                                    placeholder="Age" 
                                    value={formData.age} 
                                    onChange={e => setFormData({ ...formData, age: e.target.value })} 
                                    style={inputStyle() as any} 
                                    onFocus={(e) => e.target.style.borderColor = '#1565C0'}
                                    onBlur={(e) => e.target.style.borderColor = '#F1F5F9'}
                                />
                            </div>
                            <div>
                                <label style={labelStyle as any}>Biological Gender</label>
                                <div style={{ position: 'relative' }}>
                                    <select 
                                        required 
                                        value={formData.gender} 
                                        onChange={e => setFormData({ ...formData, gender: e.target.value })} 
                                        style={{ ...inputStyle(), appearance: 'none' } as any}
                                        onFocus={(e) => e.target.style.borderColor = '#1565C0'}
                                        onBlur={(e) => e.target.style.borderColor = '#F1F5F9'}
                                    >
                                        <option value="">Select Protocol</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <ChevronDown size={20} color="#B0BEC5" style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Operational Details */}
                    <div style={{ 
                        backgroundColor: '#fff', borderRadius: '32px', padding: '40px', 
                        marginBottom: '40px', boxShadow: '0 20px 48px rgba(0,0,0,0.06)',
                        border: '1px solid #F1F5F9'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#F0FDF4', color: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Stethoscope size={20} />
                            </div>
                            <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#1A1A2E' }}>Operational Metadata</h3>
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <label style={labelStyle as any}>Surgical Procedure Case</label>
                            <div style={{ position: 'relative' }}>
                                <select 
                                    required 
                                    value={formData.procedure} 
                                    onChange={e => setFormData({ ...formData, procedure: e.target.value })} 
                                    style={{ ...inputStyle(), appearance: 'none' } as any}
                                    onFocus={(e) => e.target.style.borderColor = '#1565C0'}
                                    onBlur={(e) => e.target.style.borderColor = '#F1F5F9'}
                                >
                                    <option value="">Select Clinical Case</option>
                                    <option>Total Knee Replacement</option>
                                    <option>Hip Arthroplasty</option>
                                    <option>Cholecystectomy</option>
                                    <option>Hernia Repair</option>
                                    <option>Appendectomy</option>
                                    <option>Spinal Fusion</option>
                                    <option>Cardiac Catheterization</option>
                                    <option>Other Specialized Case</option>
                                </select>
                                <ChevronDown size={20} color="#B0BEC5" style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                            </div>
                        </div>

                        <div style={{ marginBottom: '32px' }}>
                            <label style={labelStyle as any}>Clinical Contraindications (Allergies)</label>
                            <div style={{ 
                                background: '#FFF1F2', borderRadius: '20px', padding: '8px', 
                                border: '2px dashed #FECACA', display: 'flex', alignItems: 'center', gap: '16px' 
                            }}>
                                <div style={{ width: '48px', height: '48px', background: '#FEE2E2', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444' }}>
                                    <AlertTriangle size={24} />
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="List critical allergies or 'None'..." 
                                    value={formData.allergies} 
                                    onChange={e => setFormData({ ...formData, allergies: e.target.value })} 
                                    style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontSize: '15px', fontWeight: '800', color: '#1A1A2E' }} 
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
                            <div>
                                <label style={labelStyle as any}>Bay / Bed Assignment</label>
                                <div style={{ position: 'relative' }}>
                                    <MapPin size={18} color="#B0BEC5" style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)' }} />
                                    <input 
                                        type="text" 
                                        required 
                                        placeholder="Recovery Bed 04" 
                                        value={formData.bedNumber} 
                                        onChange={e => setFormData({ ...formData, bedNumber: e.target.value })} 
                                        style={{ ...inputStyle(), paddingLeft: '56px' } as any} 
                                        onFocus={(e) => e.target.style.borderColor = '#1565C0'}
                                        onBlur={(e) => e.target.style.borderColor = '#F1F5F9'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="submit" style={{ 
                        width: '100%', height: '72px', borderRadius: '24px', 
                        background: 'linear-gradient(135deg, #1565C0 0%, #1E88E5 100%)', 
                        color: '#fff', border: 'none', fontWeight: '900', fontSize: '18px', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px',
                        boxShadow: '0 20px 48px rgba(21, 101, 192, 0.4)', cursor: 'pointer',
                        transition: 'all 0.3s'
                    }} 
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    id="register-patient-submit">
                        <UserPlus size={24} /> INITIALIZE CLINICAL RECORD
                    </button>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '32px' }}>
                        <div style={{ height: '1px', flex: 1, backgroundColor: '#ECEFF1' }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#B0BEC5' }}>
                            <ShieldCheck size={14} />
                            <span style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '0.05em' }}>CERTIFIED MEDICAL GRADE PROTOCOL</span>
                        </div>
                        <div style={{ height: '1px', flex: 1, backgroundColor: '#ECEFF1' }} />
                    </div>
                </form>
            </div>
            
            <div style={{ position: 'fixed', bottom: '40px', left: '0', right: '0', textAlign: 'center', pointerEvents: 'none' }}>
                <p style={{ fontSize: '11px', fontWeight: '800', color: '#B0BEC5', letterSpacing: '0.1em' }}>PRECISION INTAKE SYSTEM • HN V4.0.2</p>
            </div>
        </div>
    );
};

export default RegisterPatient;
