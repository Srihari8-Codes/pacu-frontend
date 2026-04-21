import { useEffect, useState } from 'react';
import VitalMonitor from './VitalMonitor';
import api from '../services/api';
// Using the correct relative path for the socket context provider if applicable, 
// or providing a fallback for the socket service
import { useSocket } from '../services/socketContext'; 
import { Loader2, Activity, Info, ShieldCheck } from 'lucide-react';

interface Episode {
    id: string;
    patient: { name: string };
    bedNumber: string;
    lastVitals: {
        heartRate: number;
        spo2: number;
        bloodPressure: string;
    } | null;
}

const EpisodeGrid = () => {
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [loading, setLoading] = useState(true);
    const { socket } = useSocket();

    useEffect(() => {
        const fetchEpisodes = async () => {
            try {
                const response: any = await api.get('/episodes/active');
                if (response.data?.success) setEpisodes(response.data.episodes || []);
            } catch (err) {
                console.error('Failed to fetch active episodes', err);
            } finally {
                setLoading(false);
            }
        };
        fetchEpisodes();
        
        // Polling fallback
        const interval = setInterval(fetchEpisodes, 15000);
        return () => clearInterval(interval);
    }, []);

    // Socket logic for real-time vitals
    useEffect(() => {
        if (!socket) return;
        
        const handleVitalUpdate = (update: any) => {
            setEpisodes(prev => prev.map(ep =>
                ep.id === update.episodeId
                    ? { ...ep, lastVitals: update.vitals }
                    : ep
            ));
        };

        socket.on('new_vitals', handleVitalUpdate);
        return () => { socket.off('new_vitals', handleVitalUpdate); };
    }, [socket]);

    if (loading) return (
        <div style={{ height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
            <Loader2 className="spin" size={48} color="#1565C0" />
            <div style={{ textAlign: 'center' }}>
                <p style={{ fontWeight: '900', color: '#1565C0', letterSpacing: '0.2em', fontSize: '13px' }}>SYNCHRONIZING ACTIVE STREAMS</p>
                <p style={{ color: '#94A3B8', fontSize: '12px', fontWeight: '800', marginTop: '8px' }}>ESTABLISHING SECURE PROTOCOL NODES</p>
            </div>
        </div>
    );

    if (episodes.length === 0) return (
        <div style={{ 
            height: '400px', display: 'flex', flexDirection: 'column', 
            alignItems: 'center', justifyContent: 'center', gap: '24px',
            background: '#fff', borderRadius: '40px', border: '2px dashed #F1F5F9'
        }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '24px', backgroundColor: '#F8F9FD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Activity size={40} color="#CBD5E1" />
            </div>
            <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '22px', fontWeight: '900', color: '#1A1A2E', letterSpacing: '-0.02em' }}>Zero Active Streams</h3>
                <p style={{ color: '#94A3B8', fontSize: '16px', fontWeight: '700', marginTop: '8px' }}>No clinical telemetry nodes currently broadcast to this hub.</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1565C0', fontSize: '12px', fontWeight: '900', letterSpacing: '0.05em' }}>
                 <ShieldCheck size={16} /> MONITORING ACTIVE
            </div>
        </div>
    );

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
            {episodes.map(episode => (
                <VitalMonitor
                    key={episode.id}
                    patientName={episode.patient.name}
                    bedNumber={episode.bedNumber}
                    vitals={{
                        bpm: episode.lastVitals?.heartRate || 0,
                        spo2: episode.lastVitals?.spo2 || 0,
                        bp: episode.lastVitals?.bloodPressure || '--/--'
                    }}
                    isAlert={(episode.lastVitals?.spo2 || 0) < 90}
                    onClick={() => window.location.hash = `/episode/${episode.id}`}
                />
            ))}
        </div>
    );
};

export default EpisodeGrid;
