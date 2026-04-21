import React, { useState } from 'react';
import { 
    Bell, AlertTriangle, Clock, ArrowLeft, 
    CheckCircle, ShieldAlert, Activity, 
    Search, Filter, ChevronRight, Zap, 
    ShieldCheck, Heart, Hash, Info, User
} from 'lucide-react';
import api from '../services/api';

const DoctorAlerts = ({ onBack }: { onBack: () => void }) => {
    const [alerts, setAlerts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'Instructions' | 'Vitals Alerts' | 'All Clear'>('Instructions');

    React.useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const response = await api.get('/alerts');
                if (response.data?.success) {
                    const mappedVitals = (response.data.data.alerts || []).map((a: any) => {
                        let type: 'Warning' | 'Critical' = 'Warning';
                        let parameter = 'Unknown'; let value = 'N/A';
                        let message = 'Vitals deviation detected';
                        if (a.spo2 && a.spo2 < 90) { type = 'Critical'; parameter = 'SpO2'; value = `${a.spo2}%`; message = 'Critical Oxygen Saturation'; }
                        else if (a.systolicBP && a.systolicBP > 180) { type = 'Critical'; parameter = 'Blood Pressure'; value = `${a.systolicBP}/${a.diastolicBP} mmHg`; message = 'Hypertensive Crisis'; }
                        else if (a.temperature && a.temperature > 38.5) { parameter = 'Temperature'; value = `${a.temperature}°C`; message = 'Fever Alert'; }
                        return { 
                            id: a.id.slice(-6).toUpperCase(), 
                            patientName: a.episode?.patient?.name || 'Unknown', 
                            type, 
                            message, 
                            time: new Date(a.recordedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
                            parameter, 
                            value, 
                            suggestedAction: 'Assess patient immediately and notify clinical lead.', 
                            category: 'Vitals Alerts'
                        };
                    });
                    const mappedMsgs = (response.data.data.messages || []).map((m: any) => {
                        return {
                            id: m.id.slice(-6).toUpperCase(), 
                            patientName: m.episode?.patient?.name || 'Unknown', 
                            type: m.priority === 'URGENT' ? 'Critical' : 'Warning', 
                            message: m.text, 
                            time: new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
                            parameter: 'Instruction', 
                            value: m.taskStatus?.status || 'PENDING', 
                            suggestedAction: 'Execute directive and mark as complete.', 
                            category: 'Instructions'
                        };
                    });
                    const mappedInstrs = (response.data.data.instructions || []).map((i: any) => {
                        let type: 'Warning' | 'Critical' = 'Warning';
                        const instrText = (i.instruction || '').toUpperCase();
                        if (instrText.includes('[URGENT]')) type = 'Critical';
                        if (instrText.includes('[CRITICAL]')) type = 'Critical';
                        
                        return {
                            id: i.id.slice(-6).toUpperCase(), 
                            patientName: i.patient?.name || 'Unknown', 
                            type, 
                            message: i.instruction, 
                            time: new Date(i.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
                            parameter: 'Instruction', 
                            value: 'ACTIVE', 
                            suggestedAction: 'Execute directive and monitor patient.', 
                            category: 'Instructions'
                        };
                    });
                    setAlerts([...mappedVitals, ...mappedMsgs, ...mappedInstrs]);
                }
            } catch { } finally { setLoading(false); }
        };
        fetchAlerts();
        const interval = setInterval(fetchAlerts, 5000);
        return () => clearInterval(interval);
    }, []);

    const filteredAlerts = alerts.filter(a => a.category === activeTab);

    return (
        <div className="fade-in" style={{ backgroundColor: '#F8F9FD', minHeight: '100vh', paddingBottom: '120px' }}>
            {/* Clinical Header */}
            <div style={{ 
                background: 'linear-gradient(135deg, #1565C0 0%, #1E88E5 100%)', 
                padding: '40px 32px 60px', color: '#fff', position: 'relative'
            }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
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
                            <ShieldCheck size={14} /> SECURITY CLEARANCE: LEVEL 4
                        </div>
                    </div>
                    <h1 style={{ fontSize: '36px', fontWeight: '900', letterSpacing: '-0.02em' }}>Command Alerts</h1>
                    <p style={{ fontSize: '16px', opacity: 0.9, fontWeight: '700', marginTop: '4px' }}>Real-time Clinical Triage & Monitoring</p>
                </div>
            </div>

            <div style={{ maxWidth: '900px', margin: '-30px auto 100px', padding: '0 32px', position: 'relative', zIndex: 10 }}>
                {/* Protocol Tabs */}
                <div style={{ 
                    backgroundColor: '#fff', borderRadius: '24px', padding: '8px', 
                    display: 'flex', gap: '8px', boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
                    marginBottom: '40px', border: '1px solid #F1F5F9'
                }}>
                    {['Instructions', 'Vitals Alerts', 'All Clear'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            style={{
                                flex: 1, height: '52px', borderRadius: '16px', border: 'none', 
                                fontSize: '14px', fontWeight: '900', cursor: 'pointer', transition: 'all 0.2s',
                                background: activeTab === tab ? '#1565C0' : 'transparent',
                                color: activeTab === tab ? '#fff' : '#90A4AE',
                                boxShadow: activeTab === tab ? '0 8px 16px rgba(21,101,192,0.2)' : 'none'
                            }}
                        >
                            {tab.toUpperCase()}
                        </button>
                    ))}
                </div>

                {/* Alerts Stream */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '80px 0' }}>
                            <Activity size={48} color="#1565C0" className="pulse" style={{ margin: '0 auto 20px' }} />
                            <p style={{ color: '#90A4AE', fontWeight: '800', fontSize: '15px' }}>SYNCHRONIZING TELEMETRY STREAMS...</p>
                        </div>
                    ) : filteredAlerts.length > 0 ? (
                        filteredAlerts.map(alert => <AlertItem key={alert.id} alert={alert} />)
                    ) : (
                        <div className="fade-in" style={{ textAlign: 'center', padding: '100px 40px', backgroundColor: '#fff', borderRadius: '40px', border: '2px dashed #ECEFF1' }}>
                            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
                                <CheckCircle size={64} color="#22C55E" />
                            </div>
                            <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#1A1A2E' }}>Clinical Status: Clear</h2>
                            <p style={{ fontSize: '15px', color: '#90A4AE', marginTop: '12px', maxWidth: '400px', margin: '12px auto 0', lineHeight: 1.6, fontWeight: '700' }}>
                                All active clinical episodes are currently within standard parameters. No deviations detected.
                            </p>
                        </div>
                    )}
                </div>
            </div>
            
            <div style={{ position: 'fixed', bottom: '40px', left: '0', right: '0', textAlign: 'center', pointerEvents: 'none' }}>
                <p style={{ fontSize: '11px', fontWeight: '800', color: '#B0BEC5', letterSpacing: '0.1em' }}>PRECISION ALERT MONITOR • V4.0.2</p>
            </div>
        </div>
    );
};

const AlertItem = ({ alert }: { alert: any }) => {
    const isCritical = alert.type === 'Critical';
    const accentColor = isCritical ? '#EF4444' : '#FB8C00';

    return (
        <div style={{ 
            backgroundColor: '#fff', borderRadius: '32px', borderLeft: `8px solid ${accentColor}`, 
            padding: '32px', boxShadow: '0 20px 48px rgba(0,0,0,0.04)', border: '1px solid #F1F5F9',
            transition: 'all 0.2s'
        }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ 
                        width: '56px', height: '56px', borderRadius: '18px', 
                        background: isCritical ? '#FEF2F2' : '#FFF7ED', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center' 
                    }}>
                        <ShieldAlert size={28} color={accentColor} />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '18px', fontWeight: '900', color: '#1A1A2E', letterSpacing: '-0.01em' }}>{alert.message}</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                             <User size={14} color="#90A4AE" />
                             <p style={{ fontSize: '14px', color: '#90A4AE', fontWeight: '800' }}>{alert.patientName}</p>
                             <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#CFD8DC' }} />
                             <p style={{ fontSize: '14px', color: '#B0BEC5', fontWeight: '700' }}>ID: {alert.id}</p>
                        </div>
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ 
                        fontSize: '11px', fontWeight: '900', background: isCritical ? '#FEE2E2' : '#FFF3E0', 
                        color: accentColor, padding: '8px 16px', borderRadius: '12px', textTransform: 'uppercase',
                        display: 'inline-block', marginBottom: '8px'
                    }}>
                        {alert.type}
                    </div>
                    <div style={{ fontSize: '13px', color: '#90A4AE', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end', fontWeight: '800' }}>
                        <Clock size={14} /> {alert.time}
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                <div style={{ background: '#F8F9FD', padding: '20px', borderRadius: '20px', border: '1px solid #F1F5F9' }}>
                    <p style={{ fontSize: '10px', fontWeight: '900', color: '#B0BEC5', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>PARAMETER</p>
                    <p style={{ fontSize: '18px', fontWeight: '900', color: '#1A1A2E' }}>{alert.parameter}</p>
                </div>
                <div style={{ background: isCritical ? '#FEF2F2' : '#FFF7ED', padding: '20px', borderRadius: '20px', border: `1px solid ${isCritical ? '#FEE2E2' : '#FFEDD5'}` }}>
                    <p style={{ fontSize: '10px', fontWeight: '900', color: isCritical ? '#FCA5A5' : '#FDBA74', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>CURRENT VALUE</p>
                    <p style={{ fontSize: '18px', fontWeight: '900', color: accentColor }}>{alert.value}</p>
                </div>
            </div>

            <div style={{ background: '#F8F9FD', padding: '20px', borderRadius: '24px', marginBottom: '24px', border: '1px solid #F1F5F9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <Info size={16} color="#1565C0" />
                    <p style={{ fontSize: '11px', fontWeight: '900', color: '#1565C0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Clinical Protocol</p>
                </div>
                <p style={{ fontSize: '15px', color: '#455A64', lineHeight: 1.6, fontWeight: '700' }}>{alert.suggestedAction}</p>
            </div>

            <button style={{ 
                width: '100%', height: '56px', borderRadius: '18px', 
                background: 'linear-gradient(135deg, #1565C0 0%, #1E88E5 100%)', 
                color: '#fff', border: 'none', fontWeight: '900', 
                fontSize: '15px', cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: '0 12px 24px rgba(21,101,192,0.2)'
            }}>
                ACKNOWLEDGE CLINICAL EVENT
            </button>
        </div>
    );
};

export default DoctorAlerts;
