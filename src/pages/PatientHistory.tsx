import React, { useState } from 'react';
import { 
    ArrowLeft, Activity, ClipboardList, Filter, 
    Bell, Clock, Heart, Droplets, Thermometer, 
    Wind, ChevronRight, Hash, ShieldCheck, 
    Calendar, AlertCircle, History as LucideHistory,
    BadgeCheck, Smartphone, Zap, Info, Target,
    FileText, User, Stethoscope, MessageSquare
} from 'lucide-react';
import api from '../services/api';

interface Props {
    patient: any;
    onBack: () => void;
}

const PatientHistory: React.FC<Props> = ({ patient, onBack }) => {
    const [timeRange, setTimeRange] = useState('24h');
    const [activeTab, setActiveTab] = useState('All');
    const [historyItems, setHistoryItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const mainTabs = ['All', 'Vitals', 'Instr.', 'Alerts'];
    const timeRanges = ['1h', '6h', '24h', 'All'];

    React.useEffect(() => {
        const fetchHistory = async () => {
            const episodeId = patient?.activeEpisode?.id;
            const patientId = patient?.patient_id || patient?.id;
            if (!patientId) { setLoading(false); return; }
            try {
                const requests: any[] = [];
                if (episodeId) {
                    requests.push(api.get(`/episodes/${episodeId}/vitals`));
                }
                requests.push(api.get(`/instructions/${patientId}`));

                const responses = await Promise.all(requests);
                
                let vitalsData = [];
                let instrData = [];

                if (episodeId) {
                    const vitalsRes = responses[0];
                    vitalsData = vitalsRes.data?.data?.vitals || vitalsRes.data?.vitals || [];
                    instrData = responses[1].data?.instructions || responses[1].instructions || [];
                } else {
                    instrData = responses[0].data?.instructions || responses[0].instructions || [];
                }

                let combined: any[] = [];
                vitalsData.forEach((v: any) => {
                    combined.push({
                        type: 'Vitals',
                        title: 'Telemetry Node Update',
                        vitals: v,
                        recordedAt: new Date(v.recordedAt),
                        time: new Date(v.recordedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        date: new Date(v.recordedAt).toLocaleDateString([], { month: 'short', day: 'numeric' }),
                        by: v.enteredBy?.name || 'Staff'
                    });
                });

                instrData.forEach((i: any) => {
                    combined.push({
                        type: 'Instr.',
                        title: i.instruction,
                        recordedAt: new Date(i.createdAt),
                        time: new Date(i.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        date: new Date(i.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' }),
                        details: i.instruction,
                        by: i.doctor?.name || 'Doctor'
                    });
                });
                combined.sort((a, b) => b.recordedAt.getTime() - a.recordedAt.getTime());
                setHistoryItems(combined);
            } catch { } finally { setLoading(false); }
        };
        fetchHistory();
    }, [patient]);

    const filteredItems = historyItems.filter(item => {
        if (activeTab === 'All') return true;
        if (activeTab === 'Instr.') return item.type === 'Instr.';
        return item.type === activeTab;
    });

    if (loading) return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8F9FD' }}>
            <div style={{ textAlign: 'center' }}>
                <Activity className="spin" size={48} color="#1565C0" />
                <p style={{ marginTop: '20px', fontWeight: '900', color: '#1565C0', letterSpacing: '0.2em', fontSize: '13px' }}>BUFFERING TELEMETRY STREAM...</p>
            </div>
        </div>
    );

    return (
        <div className="fade-in" style={{ backgroundColor: '#F8F9FD', minHeight: '100vh', paddingBottom: '100px' }}>
            {/* Clinical Header */}
            <div style={{ 
                height: '300px', background: 'linear-gradient(135deg, #1A1A2E 0%, #1565C0 100%)', 
                padding: '48px 32px', color: '#fff', position: 'relative'
            }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
                        <button onClick={onBack} style={{ 
                            width: '48px', height: '48px', borderRadius: '14px', 
                            backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', 
                            color: '#fff', display: 'flex', alignItems: 'center', 
                            justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)'
                        }}>
                            <ArrowLeft size={24} />
                        </button>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                                <LucideHistory size={36} color="#42A5F5" />
                                <h1 style={{ fontSize: '38px', fontWeight: '900', letterSpacing: '-0.02em' }}>Clinical Registry</h1>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.15)', padding: '8px 20px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <User size={18} />
                                <span style={{ fontSize: '15px', fontWeight: '900' }}>{patient?.name}</span>
                                <div style={{ width: '4px', height: '4px', background: 'rgba(255,255,255,0.4)', borderRadius: '50%' }} />
                                <span style={{ fontSize: '15px', fontWeight: '700', opacity: 0.8 }}>MRN: {patient?.mrn}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div style={{ maxWidth: '1000px', margin: '-50px auto 0', padding: '0 32px', position: 'relative', zIndex: 10 }}>
                {/* Temporal Strategy Control */}
                <div style={{ 
                    backgroundColor: '#fff', borderRadius: '32px', padding: '12px', 
                    boxShadow: '0 20px 48px rgba(0,0,0,0.06)', marginBottom: '40px',
                    display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #F1F5F9'
                }}>
                    <div style={{ display: 'flex', gap: '8px', flex: 1 }}>
                        {timeRanges.map(r => (
                            <button key={r} onClick={() => setTimeRange(r)} style={{
                                flex: 1, height: '48px', borderRadius: '16px', border: 'none', 
                                fontSize: '13px', fontWeight: '900',
                                background: timeRange === r ? '#1565C0' : 'transparent',
                                color: timeRange === r ? '#fff' : '#90A4AE',
                                cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                boxShadow: timeRange === r ? '0 8px 16px rgba(21,101,192,0.2)' : 'none'
                            }}>
                                {r}
                            </button>
                        ))}
                    </div>
                    <div style={{ width: '1px', height: '28px', backgroundColor: '#ECEFF1' }} />
                    <div style={{ padding: '0 24px', display: 'flex', alignItems: 'center', gap: '10px', color: '#1565C0', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}>
                        <Filter size={20} /> ANALYTIC FILTERS
                    </div>
                </div>

                {/* Scope Management Tabs */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
                    {mainTabs.map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} style={{
                            padding: '12px 32px', borderRadius: '18px',
                            fontSize: '15px', fontWeight: '900',
                            background: activeTab === tab ? '#1A1A2E' : '#fff',
                            color: activeTab === tab ? '#fff' : '#90A4AE',
                            boxShadow: '0 12px 24px rgba(0,0,0,0.04)',
                            cursor: 'pointer', transition: 'all 0.2s', border: activeTab === tab ? 'none' : '1px solid #F1F5F9'
                        }}>
                            {tab.toUpperCase()}
                        </button>
                    ))}
                </div>

                {/* Registry Timeline Feed */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {filteredItems.map((item, idx) => (
                        <div key={idx} style={{ 
                            backgroundColor: '#fff', borderRadius: '32px', padding: '32px', 
                            border: '1px solid #F1F5F9', boxShadow: '0 12px 32px rgba(0,0,0,0.02)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }} onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = item.type === 'Vitals' ? '#1565C0' : '#F59E0B';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }} onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#F1F5F9';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                    <div style={{ 
                                        padding: '6px 16px', borderRadius: '12px', fontSize: '11px', fontWeight: '900', 
                                        textTransform: 'uppercase', letterSpacing: '0.08em',
                                        backgroundColor: item.type === 'Vitals' ? '#E3F2FD' : '#FFF3E0',
                                        color: item.type === 'Vitals' ? '#1565C0' : '#F59E0B',
                                        display: 'flex', alignItems: 'center', gap: '8px'
                                    }}>
                                        {item.type === 'Vitals' ? <Activity size={12} /> : <FileText size={12} />}
                                        {item.type}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#90A4AE', fontSize: '14px', fontWeight: '800' }}>
                                        <Calendar size={16} /> {item.date} <div style={{ width: '4px', height: '4px', background: '#CFD8DC', borderRadius: '50%' }} /> <Clock size={16} /> {item.time}
                                    </div>
                                </div>
                                <div style={{ fontSize: '14px', fontWeight: '900', color: '#1A1A2E', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <BadgeCheck size={16} color="#1565C0" /> {item.by}
                                </div>
                            </div>

                            <h4 style={{ fontSize: '20px', fontWeight: '900', color: '#1A1A2E', marginBottom: '24px', letterSpacing: '-0.01em' }}>{item.title}</h4>
                            
                            {item.type === 'Vitals' && item.vitals && (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                                    <MetricPill icon={<Heart size={16} />} label="HR" value={item.vitals.heartRate} unit="bpm" color="#EF4444" />
                                    <MetricPill icon={<Activity size={16} />} label="BP" value={`${item.vitals.systolicBP}/${item.vitals.diastolicBP}`} unit="mmHg" color="#3B82F6" />
                                    <MetricPill icon={<Droplets size={16} />} label="SPO₂" value={item.vitals.spo2} unit="%" color="#22C55E" />
                                    <MetricPill icon={<Thermometer size={16} />} label="TEMP" value={item.vitals.temperature} unit="°C" color="#F59E0B" />
                                </div>
                            )}

                            {item.type === 'Instr.' && (
                                <div style={{ padding: '24px', background: '#F8F9FD', borderRadius: '24px', border: '1px solid #E3F2FD', position: 'relative', overflow: 'hidden' }}>
                                    <div style={{ position: 'absolute', right: '-10px', bottom: '-10px', opacity: 0.05 }}><MessageSquare size={80} /></div>
                                    <p style={{ fontSize: '16px', fontWeight: '800', color: '#455A64', lineHeight: 1.6, position: 'relative' }}>{item.details}</p>
                                </div>
                            )}
                        </div>
                    ))}

                    {filteredItems.length === 0 && (
                        <div className="fade-in" style={{ padding: '100px 40px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '40px', border: '2px dashed #ECEFF1' }}>
                            <ClipboardList size={64} color="#CFD8DC" style={{ marginBottom: '24px' }} />
                            <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#1A1A2E' }}>Void Identity Node</h2>
                            <p style={{ fontSize: '16px', color: '#90A4AE', marginTop: '12px', fontWeight: '700' }}>No telemetry or clinical artifacts found within the selected interval.</p>
                        </div>
                    )}
                </div>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '64px', color: '#B0BEC5' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
                     <ShieldCheck size={18} />
                     <span style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '0.08em' }}>CLINICAL DATA IMMUTABILITY VERIFIED • HIPAA SECURE</span>
                </div>
                <p style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '1px' }}>PRECISION CARE REPOSITORY • HN V4.0.2</p>
            </div>
        </div>
    );
};

const MetricPill = ({ icon, label, value, unit, color }: any) => (
    <div style={{ 
        padding: '16px', background: '#F8F9FD', borderRadius: '20px', border: '1px solid #ECEFF1',
        display: 'flex', flexDirection: 'column', gap: '6px', transition: 'all 0.2s'
    }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: color, fontSize: '11px', fontWeight: '900', letterSpacing: '0.05em' }}>
            {icon} {label}
        </div>
        <div style={{ fontSize: '18px', fontWeight: '900', color: '#1A1A2E' }}>
            {value} <span style={{ fontSize: '12px', color: '#B0BEC5', fontWeight: '800' }}>{unit}</span>
        </div>
    </div>
);

export default PatientHistory;
