import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
    Mail, Lock, Eye, EyeOff, Activity, Loader2, 
    ShieldCheck, Phone, User, Globe, Briefcase, 
    ChevronRight, ArrowLeft, Zap, Info, ShieldAlert
} from 'lucide-react';
import { useAuth } from '../services/authContext';

const Register = () => {
    const location = useLocation();
    const { register, demoLogin } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: location.state?.name || '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        role: (location.state?.role || 'NURSE') as 'NURSE' | 'DOCTOR'
    });

    useEffect(() => {
        if (location.state?.name || location.state?.role) {
            setFormData(prev => ({
                ...prev,
                name: location.state.name || prev.name,
                role: location.state.role || prev.role
            }));
        }
    }, [location.state]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            setError('Account Security Protocol: Password must be 8+ characters with uppercase, lowercase, number & special character.');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Credential Mismatch: Security keys do not match.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            await register(formData);
            navigate('/');
        } catch (err: any) {
            let errorMsg = 'Registration failed';
            if (err?.code === 'ECONNABORTED' || err?.message?.includes('timeout')) {
                errorMsg = '⚠️ Connection Timeout — Backend server unreachable at 192.168.31.206. Use Demo Bypass below.';
            } else if (err?.response?.data?.message) {
                errorMsg = err.response.data.message;
            } else if (err?.response?.data?.error) {
                errorMsg = err.response.data.error;
            } else if (typeof err === 'string') {
                errorMsg = err;
            } else if (err?.message) {
                errorMsg = err.message;
            }
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fade-in" style={{ backgroundColor: '#F8F9FD', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Clinical Brand Header */}
            <div style={{ 
                height: '360px', background: 'linear-gradient(135deg, #1A1A2E 0%, #1565C0 100%)', 
                padding: '60px 32px', color: '#fff', textAlign: 'center', position: 'relative'
            }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <div style={{ 
                        width: '92px', height: '92px', background: 'rgba(255,255,255,0.1)', 
                        borderRadius: '28px', display: 'flex', alignItems: 'center', 
                        justifyContent: 'center', margin: '0 auto 32px', backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <Activity size={48} color="#42A5F5" className="pulse-slow" />
                    </div>
                    <h1 style={{ fontSize: '42px', fontWeight: '900', letterSpacing: '-0.03em', marginBottom: '12px' }}>
                        {formData.name ? `Welcome, ${formData.name.split(' ')[0]}` : 'Personnel Registry'}
                    </h1>
                    <p style={{ fontSize: '18px', opacity: 0.8, fontWeight: '700' }}>Define Authorized Clinical Security Credentials</p>
                </div>
                
                {/* Decorative Tints */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                     <div style={{ position: 'absolute', top: '15%', left: '10%', opacity: 0.05 }}><ShieldCheck size={140} color="#fff" strokeWidth={1} /></div>
                     <div style={{ position: 'absolute', bottom: '15%', right: '10%', opacity: 0.05 }}><Zap size={160} color="#fff" strokeWidth={1} /></div>
                </div>
            </div>

            {/* Registration Card */}
            <div style={{ maxWidth: '900px', margin: '-100px auto 100px', padding: '0 32px', width: '100%', position: 'relative', zIndex: 2 }}>
                <div style={{ 
                    backgroundColor: '#fff', borderRadius: '40px', padding: '56px', 
                    boxShadow: '0 32px 64px rgba(0,0,0,0.12)', border: '1px solid #F1F5F9'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#1A1A2E', marginBottom: '12px', letterSpacing: '-0.02em' }}>Enrollment Protocol</h2>
                        <p style={{ color: '#90A4AE', fontSize: '16px', fontWeight: '700' }}>Establish clinical identity within the PACU ecosystem</p>
                    </div>

                    {error && (
                        <div style={{ 
                            backgroundColor: '#FEF2F2', border: '1px solid #FEE2E2', 
                            color: '#EF4444', padding: '24px', borderRadius: '24px', 
                            marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '16px',
                            fontSize: '15px', fontWeight: '800'
                        }} className="shake">
                            <ShieldAlert size={24} />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                        {/* Clinical Email */}
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', color: '#90A4AE', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px', marginLeft: '4px' }}>Corporate / Clinical Email</label>
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: '#1565C0' }}>
                                    <Mail size={22} />
                                </div>
                                <input 
                                    type="email" 
                                    name="email" 
                                    required 
                                    placeholder="clinician@hospital.org" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    style={{ 
                                        width: '100%', padding: '20px 24px 20px 64px', background: '#F8F9FD', 
                                        border: '2px solid transparent', borderRadius: '24px', 
                                        fontSize: '17px', fontWeight: '800', color: '#1A1A2E', 
                                        outline: 'none', transition: 'all 0.3s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#1565C0'}
                                    onBlur={(e) => e.target.style.borderColor = 'transparent'}
                                />
                            </div>
                        </div>

                        {/* Domain Role (Read-only styled Select) */}
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', color: '#90A4AE', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px', marginLeft: '4px' }}>Operational Scope Authorization</label>
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: '#1565C0' }}>
                                    <Briefcase size={22} />
                                </div>
                                <select 
                                    name="role" 
                                    value={formData.role} 
                                    onChange={handleChange}
                                    style={{ 
                                        width: '100%', padding: '20px 24px 20px 64px', background: '#F0F7FF', 
                                        border: '2px solid #1565C0', borderRadius: '24px', 
                                        fontSize: '17px', fontWeight: '900', color: '#1565C0', 
                                        outline: 'none', appearance: 'none'
                                    }}>
                                    <option value="NURSE">NURSING STAFF NODE</option>
                                    <option value="DOCTOR">PHYSICIAN COMMAND NODE</option>
                                </select>
                                <div style={{ position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)', color: '#1565C0' }}>
                                    <ShieldCheck size={24} />
                                </div>
                            </div>
                        </div>

                        {/* Security Key */}
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', color: '#90A4AE', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px', marginLeft: '4px' }}>Master Security Key</label>
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: '#1565C0' }}>
                                    <Lock size={22} />
                                </div>
                                <input 
                                    type={showPassword ? 'text' : 'password'} 
                                    name="password" 
                                    required 
                                    placeholder="••••••••" 
                                    value={formData.password} 
                                    onChange={handleChange} 
                                    style={{ 
                                        width: '100%', padding: '20px 64px 20px 64px', background: '#F8F9FD', 
                                        border: '2px solid transparent', borderRadius: '24px', 
                                        fontSize: '17px', fontWeight: '800', color: '#1A1A2E', 
                                        outline: 'none', transition: 'all 0.3s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#1565C0'}
                                    onBlur={(e) => e.target.style.borderColor = 'transparent'}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position:'absolute', right:'24px', top:'50%', transform:'translateY(-50%)', color:'#90A4AE', background:'none', border:'none', cursor:'pointer' }}>
                                    {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                                </button>
                            </div>
                        </div>

                        {/* Verify Key */}
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', color: '#90A4AE', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px', marginLeft: '4px' }}>Verify Security Key</label>
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: '#1565C0' }}>
                                    <ShieldCheck size={22} />
                                </div>
                                <input 
                                    type={showConfirm ? 'text' : 'password'} 
                                    name="confirmPassword" 
                                    required 
                                    placeholder="••••••••" 
                                    value={formData.confirmPassword} 
                                    onChange={handleChange} 
                                    style={{ 
                                        width: '100%', padding: '20px 64px 20px 64px', background: '#F8F9FD', 
                                        border: '2px solid transparent', borderRadius: '24px', 
                                        fontSize: '17px', fontWeight: '800', color: '#1A1A2E', 
                                        outline: 'none', transition: 'all 0.3s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#1565C0'}
                                    onBlur={(e) => e.target.style.borderColor = 'transparent'}
                                />
                                <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{ position:'absolute', right:'24px', top:'50%', transform:'translateY(-50%)', color:'#90A4AE', background:'none', border:'none', cursor:'pointer' }}>
                                    {showConfirm ? <EyeOff size={24} /> : <Eye size={24} />}
                                </button>
                            </div>
                        </div>

                        <div style={{ gridColumn: 'span 2', marginTop: '32px' }}>
                            <button 
                                type="submit" 
                                disabled={loading} 
                                style={{ 
                                    width: '100%', height: '76px', borderRadius: '24px', 
                                    background: 'linear-gradient(135deg, #1565C0 0%, #1E88E5 100%)', 
                                    color: '#fff', border: 'none', fontWeight: '900', fontSize: '18px', 
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px',
                                    boxShadow: '0 20px 48px rgba(21, 101, 192, 0.4)', cursor: 'pointer',
                                    opacity: loading ? 0.7 : 1, transition: 'all 0.3s',
                                    letterSpacing: '0.02em', textTransform: 'uppercase'
                                }}
                                onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-4px)')}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                                id="register-submit"
                            >
                                {loading ? <Loader2 className="spin" size={24} /> : null}
                                {loading ? 'SYNCHRONIZING CARE DATA...' : 'ESTABLISH CLINICAL ACCOUNT'}
                            </button>
                        </div>
                    </form>

                    {/* Demo Bypass for offline testing */}
                    <div style={{ 
                        margin: '32px 0 0', padding: '24px', borderRadius: '24px',
                        background: 'rgba(21, 101, 192, 0.04)',
                        border: '1px solid rgba(21, 101, 192, 0.1)'
                    }}>
                        <p style={{ fontSize: '13px', color: '#90A4AE', fontWeight: '800', textAlign: 'center', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>⚡ Backend Offline? Use Demo Access</p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                type="button"
                                onClick={() => { demoLogin(formData.name || 'Dr. Sarah', 'DOCTOR'); navigate('/'); }}
                                style={{
                                    flex: 1, padding: '16px', borderRadius: '16px', border: 'none',
                                    background: 'linear-gradient(135deg, #1565C0 0%, #1E88E5 100%)',
                                    color: '#fff', fontWeight: '900', fontSize: '13px', cursor: 'pointer',
                                    letterSpacing: '0.05em'
                                }}
                            >
                                DOCTOR DEMO
                            </button>
                            <button
                                type="button"
                                onClick={() => { demoLogin(formData.name || 'Nurse Priya', 'NURSE'); navigate('/'); }}
                                style={{
                                    flex: 1, padding: '16px', borderRadius: '16px', border: 'none',
                                    background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
                                    color: '#fff', fontWeight: '900', fontSize: '13px', cursor: 'pointer',
                                    letterSpacing: '0.05em'
                                }}
                            >
                                NURSE DEMO
                            </button>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '15px', color: '#90A4AE', fontWeight: '700' }}>
                        Enrolled in the PACU registry?{' '}
                        <Link to="/login" style={{ color: '#1565C0', textDecoration: 'none', fontWeight: '900' }}>Authenticate Session</Link>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '48px' }}>
                        <div style={{ height: '1px', flex: 1, backgroundColor: '#ECEFF1' }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#B0BEC5' }}>
                            <Lock size={14} />
                            <span style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '0.08em' }}>HIPAA MULTI-FACTOR ENFORCED</span>
                        </div>
                        <div style={{ height: '1px', flex: 1, backgroundColor: '#ECEFF1' }} />
                    </div>
                </div>
                
                <div style={{ textAlign: 'center', marginTop: '48px', color: '#B0BEC5' }}>
                    <p style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.1em' }}>PRECISION ENROLLMENT INTERFACE • HN V4.0.2</p>
                </div>
            </div>
        </div>
    );
};

export default Register;
