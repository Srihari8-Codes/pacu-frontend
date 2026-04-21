import React, { useState, useCallback } from 'react';
import {
    Search, ArrowLeft, ChevronRight, User,
    Activity, ShieldCheck, Loader2, Database,
    Filter, Zap, Hash, AlertTriangle
} from 'lucide-react';
import api from '../services/api';

interface Props {
    onBack: () => void;
    onSelectPatient?: (patient: any) => void;
}

const FindPatient: React.FC<Props> = ({ onBack, onSelectPatient }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = useCallback(async () => {
        if (!query.trim()) return;
        setLoading(true);
        setSearched(true);
        setError('');
        try {
            // Append a timestamp to bypass any stale browser cache (busting the 304)
            const res: any = await api.get(`/patients?q=${encodeURIComponent(query.trim())}&_t=${Date.now()}`);
            console.log("Fresh Registry Sync:", res);
            
            // Aggressive extraction: handle every possible nesting variation
            let list = [];
            const body: any = res?.data || res;
            if (Array.isArray(body)) list = body;
            else if (body?.patients && Array.isArray(body.patients)) list = body.patients;
            else if (body?.data?.patients && Array.isArray(body.data.patients)) list = body.data.patients;
            else if (body?.data && Array.isArray(body.data)) list = body.data;
            
            // Hydration safety: hard-lock the identifiers
            const hydratedList = list.map((p: any) => {
                const sid = p.id || p.hospitalPatientId || p.patient_id || p._id;
                return {
                    ...p,
                    id: sid,
                    hospitalPatientId: p.hospitalPatientId || p.patient_id || sid
                };
            });
            
            setResults(hydratedList);
        } catch {
            setResults([]);
            setError('Search failed. Check your connection.');
        } finally {
            setLoading(false);
        }
    }, [query]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <div className="fade-in" style={{ backgroundColor: '#F8F9FD', minHeight: '100vh', paddingBottom: '100px' }}>
            {/* Header */}
            <div style={{
                background: 'linear-gradient(135deg, #1565C0 0%, #1E88E5 100%)',
                padding: '60px 32px 100px', color: '#fff', position: 'relative'
            }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                        <button onClick={onBack} style={{
                            width: '48px', height: '48px', borderRadius: '14px',
                            backgroundColor: 'rgba(255,255,255,0.2)', border: 'none',
                            color: '#fff', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)'
                        }}>
                            <ArrowLeft size={24} />
                        </button>
                        <div style={{
                            backgroundColor: 'rgba(255,255,255,0.15)', padding: '8px 16px',
                            borderRadius: '12px', fontSize: '11px', fontWeight: '900',
                            display: 'flex', alignItems: 'center', gap: '8px'
                        }}>
                            <Database size={14} /> PATIENT REGISTRY
                        </div>
                    </div>

                    <h1 style={{ fontSize: '42px', fontWeight: '900', letterSpacing: '-0.03em', marginBottom: '12px' }}>Patient Registry</h1>
                    <p style={{ fontSize: '18px', opacity: 0.9, fontWeight: '700' }}>Locate clinical records via Patient Central ID</p>
                </div>
            </div>

            <div style={{ maxWidth: '900px', margin: '-40px auto 0', padding: '0 32px', position: 'relative', zIndex: 20 }}>
                {/* Protocol Search Bar */}
                <div style={{
                    backgroundColor: '#fff', borderRadius: '32px', padding: '12px 12px 12px 28px',
                    display: 'flex', alignItems: 'center', gap: '20px',
                    boxShadow: '0 20px 48px rgba(0,0,0,0.12)', border: '1px solid #F1F5F9',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                   onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                    <Search size={26} color="#1565C0" />
                    <input
                        type="text"
                        placeholder="Search Patient ID..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        style={{ flex: 1, border: 'none', fontSize: '18px', fontWeight: '800', outline: 'none', color: '#1A1A2E', background: 'transparent' }}
                    />
                    <button onClick={handleSearch} disabled={loading || !query.trim()} style={{
                        backgroundColor: '#1565C0', color: '#fff', border: 'none', borderRadius: '22px',
                        padding: '18px 44px', fontSize: '16px', fontWeight: '900', cursor: 'pointer',
                        transition: 'all 0.2s', boxShadow: '0 8px 16px rgba(21,101,192,0.25)',
                        whiteSpace: 'nowrap'
                    }}>
                        {loading ? '...' : 'ACCESS'}
                    </button>
                </div>

                {/* Results */}
                <div style={{ marginTop: '40px' }}>
                    {!searched ? (
                        /* Idle state */
                        <div style={{ textAlign: 'center', padding: '80px 40px' }}>
                            <div style={{
                                width: '96px', height: '96px', borderRadius: '32px',
                                background: '#fff', display: 'flex', alignItems: 'center',
                                justifyContent: 'center', margin: '0 auto 28px',
                                boxShadow: '0 20px 48px rgba(0,0,0,0.04)', border: '1px solid #F1F5F9'
                            }}>
                                <Zap size={40} color="#CFD8DC" />
                            </div>
                            <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#90A4AE' }}>Ready to Search</h3>
                            <p style={{ fontSize: '14px', color: '#B0BEC5', marginTop: '10px', fontWeight: '600' }}>
                                Enter a patient ID, MRN, or name above and press Search or Enter.
                            </p>
                        </div>
                    ) : error ? (
                        /* Error state */
                        <div style={{ textAlign: 'center', padding: '80px 40px' }}>
                            <div style={{
                                width: '96px', height: '96px', borderRadius: '50%',
                                backgroundColor: '#FEF2F2', color: '#EF4444',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px'
                            }}>
                                <AlertTriangle size={48} />
                            </div>
                            <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#1A1A2E' }}>Search Error</h3>
                            <p style={{ fontSize: '14px', color: '#90A4AE', marginTop: '8px', fontWeight: '600' }}>{error}</p>
                        </div>
                    ) : results.length > 0 ? (
                        /* Results list */
                        <div className="fade-in">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                                <Filter size={15} color="#1565C0" />
                                <p style={{ fontSize: '12px', fontWeight: '900', color: '#90A4AE', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                    {results.length} Record{results.length !== 1 ? 's' : ''} Found
                                </p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {results.map((p: any) => (
                                    <div
                                        key={p.id}
                                        onClick={() => onSelectPatient && onSelectPatient(p)}
                                        style={{
                                            backgroundColor: '#fff', borderRadius: '28px',
                                            padding: '24px 28px',
                                            display: 'flex', alignItems: 'center', gap: '20px',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                                            border: '1px solid #F1F5F9',
                                            cursor: onSelectPatient ? 'pointer' : 'default',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!onSelectPatient) return;
                                            e.currentTarget.style.borderColor = '#1565C0';
                                            e.currentTarget.style.transform = 'translateX(6px)';
                                            e.currentTarget.style.boxShadow = '0 12px 32px rgba(21,101,192,0.1)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = '#F1F5F9';
                                            e.currentTarget.style.transform = 'translateX(0)';
                                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)';
                                        }}
                                    >
                                        {/* Avatar */}
                                        <div style={{
                                            width: '60px', height: '60px', borderRadius: '18px',
                                            backgroundColor: '#EEF2FF', display: 'flex',
                                            alignItems: 'center', justifyContent: 'center',
                                            flexShrink: 0, border: '1px solid #E0E7FF'
                                        }}>
                                            <User size={28} color="#1565C0" />
                                        </div>

                                        {/* Info */}
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <h4 style={{
                                                fontSize: '18px', fontWeight: '900',
                                                color: '#1A1A2E', letterSpacing: '-0.01em',
                                                marginBottom: '6px', whiteSpace: 'nowrap',
                                                overflow: 'hidden', textOverflow: 'ellipsis'
                                            }}>
                                                {p.name || 'Unknown Patient'}
                                            </h4>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                                                <span style={{
                                                    display: 'flex', alignItems: 'center', gap: '4px',
                                                    fontSize: '13px', color: '#64748B', fontWeight: '800'
                                                }}>
                                                    <Hash size={13} color="#94A3B8" />
                                                    MRN: {p.mrn || p.hospitalPatientId || p.id?.slice(0, 8)}
                                                </span>
                                                {p.procedure && (
                                                    <>
                                                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#CBD5E1' }} />
                                                        <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: '700' }}>{p.procedure}</span>
                                                    </>
                                                )}
                                                {p.age && (
                                                    <>
                                                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#CBD5E1' }} />
                                                        <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: '700' }}>{p.age}y • {p.gender}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Status + chevron */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                                            <div style={{
                                                fontSize: '11px', fontWeight: '900',
                                                color: '#1565C0', backgroundColor: '#EEF2FF',
                                                padding: '7px 14px', borderRadius: '10px',
                                                display: 'flex', alignItems: 'center', gap: '6px'
                                            }}>
                                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#1565C0' }} />
                                                {(p.status || 'ACTIVE').toUpperCase()}
                                            </div>
                                            {onSelectPatient && <ChevronRight size={20} color="#CBD5E1" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* No results */
                        <div style={{ textAlign: 'center', padding: '80px 40px' }}>
                            <div style={{
                                width: '96px', height: '96px', borderRadius: '50%',
                                backgroundColor: '#FEF2F2', color: '#EF4444',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px'
                            }}>
                                <Activity size={48} />
                            </div>
                            <h3 style={{ fontSize: '22px', fontWeight: '900', color: '#1A1A2E' }}>No Patient Found</h3>
                            <p style={{ fontSize: '14px', color: '#90A4AE', marginTop: '10px', fontWeight: '600', maxWidth: '320px', margin: '10px auto 0', lineHeight: 1.7 }}>
                                No records matched <strong>"{query}"</strong>. Try a different ID, MRN, or name.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FindPatient;
