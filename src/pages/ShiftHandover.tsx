import React, { useState, useEffect } from 'react';
import { 
    ArrowLeft, Share2, ChevronDown, UserCheck, 
    ClipboardEdit, AlertCircle, ShieldCheck, 
    User, Search, Clock, Zap, Info
} from 'lucide-react';
import api from '../services/api';

interface Props {
    onBack: () => void;
    onComplete: () => void;
}

const ShiftHandover: React.FC<Props> = ({ onBack, onComplete }) => {
    const [nurses, setNurses] = useState<any[]>([]);
    const [selectedNurse, setSelectedNurse] = useState('');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        api.get('/users?role=NURSE').then((res: any) => {
            if (res.data?.success) setNurses(res.data.users || []);
        }).catch(() => { });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedNurse) { setError('Specify Incoming Staff Badge ID'); return; }
        setLoading(true);
        try {
            // Simulate handover synchronization
            setTimeout(() => {
                onComplete();
                setLoading(false);
            }, 1500);
        } catch { 
            setError('Clinical Synchronizaton Error. Retry handover.'); 
            setLoading(false);
        }
    };

    return (
        <div className="fade-in" style={{ backgroundColor: '#F8F9FD', minHeight: '100vh' }}>
            {/* Clinical Header */}
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
                            <ShieldCheck size={14} /> CONTINUITY OF CARE PROTOCOL
                        </div>
                    </div>
                    <div>
                        <h1 style={{ fontSize: '36px', fontWeight: '900', letterSpacing: '-0.02em' }}>Continuity Handover</h1>
                        <p style={{ fontSize: '16px', opacity: 0.9, fontWeight: '700', marginTop: '4px' }}>Formal transfer of clinical responsibility & telemetry monitoring</p>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '850px', margin: '-40px auto 100px', padding: '0 32px' }}>
                <div style={{ 
                    backgroundColor: '#fff', borderRadius: '32px', padding: '40px', 
                    boxShadow: '0 20px 48px rgba(0,0,0,0.06)', border: '1px solid #F1F5F9'
                }}>
                    <form onSubmit={handleSubmit}>
                        {/* Incoming Staff Section */}
                        <div style={{ marginBottom: '40px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#E3F2FD', color: '#1565C0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <UserCheck size={20} />
                                </div>
                                <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#1A1A2E' }}>Incoming clinical Staff</h3>
                            </div>
                            
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'relative' }}>
                                    <Search size={18} color="#B0BEC5" style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)' }} />
                                    <input 
                                        type="text" 
                                        placeholder="Scan Badge ID or Enter Staff Name..." 
                                        value={selectedNurse} 
                                        onChange={(e) => setSelectedNurse(e.target.value)}
                                        style={{ 
                                            width: '100%', padding: '18px 24px 18px 56px', background: '#F8F9FD', 
                                            border: '2px solid #F1F5F9', borderRadius: '20px', 
                                            fontSize: '15px', fontWeight: '800', color: '#1A1A2E', 
                                            outline: 'none', transition: 'all 0.2s'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#1565C0'}
                                        onBlur={(e) => e.target.style.borderColor = '#F1F5F9'}
                                        id="handover-nurse-id" 
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px', color: '#90A4AE' }}>
                                <Info size={14} />
                                <p style={{ fontSize: '12px', fontWeight: '800' }}>Confirm personnel identity before transfer initialization.</p>
                            </div>
                        </div>

                        {/* Handover Briefing */}
                        <div style={{ marginBottom: '40px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#FFF3E0', color: '#F57C00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <ClipboardEdit size={20} />
                                </div>
                                <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#1A1A2E' }}>Clinical Briefing Summary</h3>
                            </div>
                            
                            <textarea 
                                placeholder="Mandatory Deployment Log: Hemodynamic stability, recent analgesic administration, and pending clinician orders for the sector..." 
                                rows={6} 
                                value={notes} 
                                onChange={(e) => setNotes(e.target.value)}
                                style={{ 
                                    width: '100%', padding: '24px', background: '#F8F9FD', 
                                    border: '1px solid #F1F5F9', borderRadius: '24px', 
                                    fontSize: '15px', fontWeight: '700', color: '#455A64', 
                                    outline: 'none', resize: 'none', lineHeight: 1.6
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#1565C0'}
                                onBlur={(e) => e.target.style.borderColor = '#F1F5F9'}
                                id="handover-notes"
                            />
                        </div>

                        {error && (
                            <div style={{ 
                                backgroundColor: '#FEF2F2', color: '#EF4444', 
                                padding: '20px', borderRadius: '20px', 
                                marginBottom: '32px', textAlign: 'center', 
                                fontSize: '14px', fontWeight: '900', display: 'flex', 
                                alignItems: 'center', justifyContent: 'center', gap: '10px',
                                border: '1px solid #FEE2E2'
                            }}>
                                <AlertCircle size={20} /> {error}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={loading}
                            style={{ 
                                width: '100%', height: '72px', borderRadius: '24px', 
                                background: loading ? '#CFD8DC' : 'linear-gradient(135deg, #F57C00 0%, #FB8C00 100%)', 
                                color: '#fff', border: 'none', fontWeight: '900', fontSize: '18px', 
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px',
                                boxShadow: loading ? 'none' : '0 20px 48px rgba(245,124,0,0.3)', 
                                cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s'
                            }}
                            onMouseEnter={(e) => !loading && ((e.currentTarget as any).style.transform = 'translateY(-4px)')}
                            onMouseLeave={(e) => !loading && ((e.currentTarget as any).style.transform = 'translateY(0)')}
                            id="handover-submit"
                        >
                            <Share2 size={24} /> {loading ? 'SYNCHRONIZING CARE DATA...' : 'FINALIZE CONTINUITY TRANSFER'}
                        </button>
                    </form>
                </div>
                
                <div style={{ textAlign: 'center', marginTop: '32px', color: '#B0BEC5' }}>
                    <p style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '0.1em' }}>PRECISION HANDOVER INTERFACE • HN V4.0.2</p>
                </div>
            </div>
        </div>
    );
};

export default ShiftHandover;
