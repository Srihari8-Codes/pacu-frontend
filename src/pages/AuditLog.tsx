import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { 
    History, User, Clock, Terminal, 
    Loader2, Activity, ShieldCheck, 
    Database, Hash, ChevronRight, Filter,
    Zap, Info, ShieldAlert, ArrowLeft
} from 'lucide-react';

interface AuditLog {
    id: string;
    action: string;
    resource: string;
    resourceId: string | null;
    details: string | null;
    createdAt: string;
    user: { name: string; email: string };
}

const AuditLogs = ({ onBack }: { onBack?: () => void }) => {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response: any = await api.get('/audit-logs?limit=50');
                if (response.data?.success) {
                    setLogs(response.data.logs || []);
                } else if (response.logs) {
                    setLogs(response.logs);
                }
            } catch (err) {
                console.error('Failed to fetch logs', err);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    if (loading) return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8F9FD' }}>
            <div style={{ textAlign: 'center' }}>
                <Loader2 className="spin" size={48} color="#1565C0" />
                <p style={{ marginTop: '20px', fontWeight: '900', color: '#1565C0', letterSpacing: '0.1em', fontSize: '13px' }}>RETRIEVING AUDIT STREAMS...</p>
            </div>
        </div>
    );

    return (
        <div className="fade-in" style={{ backgroundColor: '#F8F9FD', minHeight: '100vh' }}>
            {/* Clinical Header */}
            <div style={{ 
                height: '240px', background: 'linear-gradient(135deg, #1A1A2E 0%, #1565C0 100%)', 
                padding: '48px 32px', color: '#fff', position: 'relative'
            }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
                         {onBack && (
                            <button onClick={onBack} style={{ 
                                width: '48px', height: '48px', borderRadius: '14px', 
                                backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', 
                                color: '#fff', display: 'flex', alignItems: 'center', 
                                justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)'
                            }}>
                                <ArrowLeft size={24} />
                            </button>
                         )}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                <History size={28} color="#42A5F5" />
                                <h1 style={{ fontSize: '36px', fontWeight: '900', letterSpacing: '-0.02em' }}>Security Audit</h1>
                            </div>
                            <p style={{ fontSize: '16px', opacity: 0.8, fontWeight: '700' }}>High-fidelity clinical accountability & event registry</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                         <div style={{ 
                            backgroundColor: 'rgba(76, 175, 80, 0.2)', padding: '8px 16px', borderRadius: '12px', 
                            fontSize: '11px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '8px',
                            border: '1px solid rgba(76, 175, 80, 0.3)', color: '#81C784'
                        }}>
                            <ShieldCheck size={14} /> ENCRYPTED
                        </div>
                        <button style={{ 
                            backgroundColor: 'rgba(255,255,255,0.1)', padding: '12px 24px', 
                            borderRadius: '16px', color: '#fff', fontWeight: '900', border: '1px solid rgba(255,255,255,0.05)',
                            display: 'flex', alignItems: 'center', gap: '10px', backdropFilter: 'blur(10px)',
                            cursor: 'pointer', transition: 'all 0.2s', fontSize: '13px'
                        }}>
                            <Filter size={18} /> TRIAGE LOGS
                        </button>
                    </div>
                </div>
            </div>

            {/* Audit Stream */}
            <div style={{ maxWidth: '1000px', margin: '-44px auto 100px', padding: '0 32px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {logs.map(log => (
                        <div key={log.id} style={{
                            backgroundColor: '#fff', borderRadius: '32px', padding: '32px',
                            boxShadow: '0 20px 48px rgba(0,0,0,0.03)', border: '1px solid #F1F5F9',
                            display: 'flex', gap: '28px', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            cursor: 'pointer', position: 'relative', overflow: 'hidden'
                        }} onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateX(8px)';
                            e.currentTarget.style.borderColor = '#1565C0';
                        }} onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateX(0)';
                            e.currentTarget.style.borderColor = '#F1F5F9';
                        }}>
                            <div style={{ 
                                width: '64px', height: '64px', borderRadius: '20px', 
                                backgroundColor: '#F8F9FD', display: 'flex', alignItems: 'center', 
                                justifyContent: 'center', color: '#1565C0', flexShrink: 0,
                                border: '1px solid #F1F5F9'
                            }}>
                                <Terminal size={28} />
                            </div>

                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <span style={{ 
                                                fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', 
                                                letterSpacing: '0.08em', color: '#1565C0', backgroundColor: '#E3F2FD',
                                                padding: '6px 12px', borderRadius: '10px'
                                            }}>
                                                {log.action.replace(/_/g, ' ')}
                                            </span>
                                            <div style={{ height: '4px', width: '4px', borderRadius: '50%', backgroundColor: '#CFD8DC' }} />
                                            <span style={{ fontSize: '14px', fontWeight: '900', color: '#1A1A2E', letterSpacing: '0.02em' }}>
                                                {log.resource.toUpperCase()} NODE
                                            </span>
                                        </div>
                                        <div style={{ marginTop: '12px', fontSize: '16px', fontWeight: '700', color: '#546E7A', lineHeight: 1.6 }}>
                                            {log.details || `Clinical protocol execution: ${log.action.toLowerCase()} verified on ${log.resource.toLowerCase()} node identifier.`}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                        <div style={{ fontSize: '13px', fontWeight: '900', color: '#90A4AE', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                                            <Clock size={14} /> {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                        </div>
                                        <div style={{ fontSize: '12px', fontWeight: '800', color: '#CFD8DC', marginTop: '4px' }}>
                                            {new Date(log.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ 
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                                    paddingTop: '20px', borderTop: '1px solid #F8F9FD', marginTop: '4px'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ 
                                            width: '32px', height: '32px', borderRadius: '10px', 
                                            backgroundColor: '#1565C0', color: '#fff', 
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                            fontSize: '13px', fontWeight: '900' 
                                        }}>
                                            {log.user.name.charAt(0)}
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                             <span style={{ fontSize: '14px', fontWeight: '900', color: '#1565C0' }}>{log.user.name}</span>
                                             <span style={{ fontSize: '11px', fontWeight: '800', color: '#B0BEC5' }}>AUTHORIZED CLINCAL STAFF</span>
                                        </div>
                                    </div>

                                    {log.resourceId && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ 
                                                display: 'flex', alignItems: 'center', gap: '8px', 
                                                color: '#90A4AE', fontSize: '12px', fontWeight: '800',
                                                backgroundColor: '#F8F9FD', padding: '6px 12px', borderRadius: '10px'
                                            }}>
                                                <Hash size={14} /> <span style={{ fontFamily: 'monospace' }}>RES-{log.resourceId.slice(-8).toUpperCase()}</span>
                                            </div>
                                            <ChevronRight size={18} color="#CFD8DC" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {logs.length === 0 && (
                        <div className="fade-in" style={{ padding: '100px 40px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '40px', border: '2px dashed #ECEFF1' }}>
                            <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#F0F7FF', color: '#1565C0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                                <ShieldCheck size={48} />
                            </div>
                            <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#1A1A2E' }}>Void Audit Registry</h2>
                            <p style={{ fontSize: '16px', color: '#90A4AE', marginTop: '12px', fontWeight: '700' }}>No clinical event signatures detected in the current sector.</p>
                        </div>
                    )}
                </div>
            </div>
            
            <div style={{ position: 'fixed', bottom: '40px', left: '0', right: '0', textAlign: 'center', pointerEvents: 'none' }}>
                <p style={{ fontSize: '11px', fontWeight: '800', color: '#B0BEC5', letterSpacing: '0.1em' }}>PRECISION ACCOUNTABILITY ENGINE • HN V4.0.2</p>
            </div>
        </div>
    );
};

export default AuditLogs;
