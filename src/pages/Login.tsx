import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Activity, Loader2, ShieldCheck, ShieldAlert, Zap, Globe, Info } from 'lucide-react';
import { useAuth } from '../services/authContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login, demoLogin } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login({ email, password });
            navigate('/');
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || 'Failed to establish clinical session';
            setError(err.code === 'ECONNABORTED' ? 'Connection Timeout: Verify backend IP (192.168.31.206) is active' : msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F8F9FD' }}>
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
                    <h1 style={{ fontSize: '42px', fontWeight: '900', letterSpacing: '-0.03em', marginBottom: '12px' }}>PACU Command</h1>
                    <p style={{ fontSize: '18px', opacity: 0.8, fontWeight: '700' }}>Post-Anesthesia Precision Recovery Portal</p>
                </div>
                
                {/* Decorative Tints */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                     <div style={{ position: 'absolute', top: '15%', left: '10%', opacity: 0.05 }}><Zap size={140} color="#fff" strokeWidth={1} /></div>
                     <div style={{ position: 'absolute', bottom: '15%', right: '10%', opacity: 0.05 }}><Globe size={160} color="#fff" strokeWidth={1} /></div>
                </div>
            </div>

            {/* Authentication Card */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '0 32px 64px', position: 'relative', zIndex: 2 }}>
                <div className="fade-slide-up" style={{
                    width: '100%', maxWidth: 480, background: '#fff', borderRadius: '40px',
                    padding: '56px', boxShadow: '0 32px 64px rgba(0,0,0,0.12)',
                    marginTop: '-100px', border: '1px solid #F1F5F9'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#1A1A2E', marginBottom: '12px', letterSpacing: '-0.02em' }}>Clinician Auth</h2>
                        <p style={{ color: '#90A4AE', fontSize: '16px', fontWeight: '700' }}>Establish secure session for recovery monitoring</p>
                    </div>

                    {error && (
                        <div style={{ 
                            backgroundColor: '#FEF2F2', border: '1px solid #FEE2E2', 
                            color: '#EF4444', padding: '20px', borderRadius: '20px', 
                            marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px',
                            fontSize: '14px', fontWeight: '800'
                        }} className="shake">
                            <ShieldAlert size={20} />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: '28px' }}>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', color: '#90A4AE', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px', marginLeft: '4px' }}>
                                Clinical Identity (Email)
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={20} color="#1565C0" style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="email"
                                    required
                                    placeholder="clinician@hospital.org"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{ 
                                        width: '100%', padding: '20px 24px 20px 64px', background: '#F8F9FD', 
                                        border: '2px solid transparent', borderRadius: '24px', 
                                        fontSize: '16px', fontWeight: '700', color: '#1A1A2E', 
                                        outline: 'none', transition: 'all 0.3s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#1565C0'}
                                    onBlur={(e) => e.target.style.borderColor = 'transparent'}
                                    id="login-email"
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', color: '#90A4AE', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px', marginLeft: '4px' }}>
                                Security Credential
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={20} color="#1565C0" style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{ 
                                        width: '100%', padding: '20px 64px 20px 64px', background: '#F8F9FD', 
                                        border: '2px solid transparent', borderRadius: '24px', 
                                        fontSize: '16px', fontWeight: '700', color: '#1A1A2E', 
                                        outline: 'none', transition: 'all 0.3s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#1565C0'}
                                    onBlur={(e) => e.target.style.borderColor = 'transparent'}
                                    id="login-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)', color: '#90A4AE', background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                                </button>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '36px' }}>
                            <Link to="/forgot-password" style={{ fontSize: '14px', color: '#1565C0', fontWeight: '900' }}>
                                Forgot Credential?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{ 
                                width: '100%', height: '72px', borderRadius: '24px', 
                                background: 'linear-gradient(135deg, #1565C0 0%, #1E88E5 100%)', 
                                color: '#fff', border: 'none', fontWeight: '900', fontSize: '18px', 
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px',
                                boxShadow: '0 20px 48px rgba(21, 101, 192, 0.4)', cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                            onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-4px)')}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                            id="login-submit"
                        >
                            {loading ? <Loader2 className="spin" size={24} /> : null}
                            {loading ? 'SYNCHRONIZING CARE DATA...' : 'INITIALIZE SECURE SESSION'}
                        </button>
                    </form>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', margin: '40px 0' }}>
                        <div style={{ height: '1px', flex: 1, backgroundColor: '#ECEFF1' }} />
                        <span style={{ fontSize: '12px', fontWeight: '900', color: '#B0BEC5' }}>OR</span>
                        <div style={{ height: '1px', flex: 1, backgroundColor: '#ECEFF1' }} />
                    </div>

                    <Link to="/role-selection" style={{ 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', 
                        padding: '20px', borderRadius: '20px', border: '2px solid #F1F5F9', 
                        color: '#1A1A2E', fontWeight: '900', fontSize: '15px', textDecoration: 'none',
                        transition: 'all 0.2s', marginBottom: '16px'
                    }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8F9FD'}>
                        Provision New Personnel Access
                    </Link>

                    <button 
                        onClick={() => {
                            const name = prompt('Enter Clinician Name:', 'Dr. Sarah');
                            const role = prompt('Enter Role (DOCTOR/NURSE):', 'DOCTOR');
                            if (name && role) {
                                demoLogin(name, role);
                                navigate('/');
                            }
                        }}
                        style={{ 
                            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', 
                            padding: '16px', borderRadius: '20px', background: 'rgba(21, 101, 192, 0.05)', 
                            color: '#1565C0', fontWeight: '900', fontSize: '13px', textDecoration: 'none',
                            border: '1px solid rgba(21, 101, 192, 0.1)', cursor: 'pointer',
                            textTransform: 'uppercase', letterSpacing: '0.05em'
                        }}
                    >
                        <ShieldCheck size={16} /> Force Demo Environment Access
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '40px' }}>
                        <ShieldCheck size={16} color="#B0BEC5" />
                        <span style={{ fontSize: '11px', fontWeight: '900', color: '#B0BEC5', letterSpacing: '0.08em' }}>HIPAA BIO-METRIC NODE ENFORCED</span>
                    </div>
                </div>
            </div>
            
            <div style={{ textAlign: 'center', paddingBottom: '40px', color: '#B0BEC5' }}>
                <p style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.1em' }}>PRECISION COMMAND AUTH • HN V4.0.2</p>
            </div>
        </div>
    );
};

export default Login;
