import { useEffect, useState } from 'react';
import api from '../services/api';
import { 
    Users, ClipboardList, Bell, Activity, 
    Loader2, Zap, ShieldAlert, Target, 
    Heart, ShieldCheck, BadgeCheck
} from 'lucide-react';

interface Stats {
    activeEpisodes: number;
    newEpisodesToday: number;
    totalPatients: number;
    pendingTasks: number;
    criticalAlerts: number;
}

const DashboardStats = () => {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response: any = await api.get('/dashboard/stats');
                if (response.data?.success) setStats(response.data.stats);
            } catch (err) {
                console.error('Failed to fetch stats', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return (
        <div style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Loader2 className="spin" size={32} color="#1565C0" />
        </div>
    );

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            <StatCard 
                label="Active Registry" 
                value={stats?.activeEpisodes.toString() || '0'} 
                icon={<Users size={24} />} 
                color="#1565C0" 
                trend="+2 Protocols"
                bg="#F0F7FF"
            />
            <StatCard 
                label="Sentinel Alerts" 
                value={stats?.criticalAlerts.toString() || '0'} 
                icon={<ShieldAlert size={24} />} 
                color="#EF4444" 
                trend="HIGH PRIORITY"
                bg="#FEF2F2"
            />
            <StatCard 
                label="Task Backlog" 
                value={stats?.pendingTasks.toString() || '0'} 
                icon={<ClipboardList size={24} />} 
                color="#F59E0B" 
                trend="Awaiting Sync"
                bg="#FFFBEB"
            />
            <StatCard 
                label="Pulse Density" 
                value={stats?.totalPatients.toString() || '0'} 
                icon={<Activity size={24} />} 
                color="#10B981" 
                trend="99.9% Uptime"
                bg="#F0FDF4"
            />
        </div>
    );
};

const StatCard = ({ label, value, icon, color, trend, bg }: { label: string, value: string, icon: any, color: string, trend: string, bg: string }) => (
    <div style={{ 
        backgroundColor: '#fff', borderRadius: '32px', padding: '32px', 
        border: '1px solid #F1F5F9', boxShadow: '0 12px 32px rgba(0,0,0,0.02)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex', flexDirection: 'column', gap: '20px'
    }}
    onMouseEnter={(e) => {
        (e.currentTarget as any).style.transform = 'translateY(-8px)';
        (e.currentTarget as any).style.boxShadow = '0 24px 48px rgba(0,0,0,0.06)';
        (e.currentTarget as any).style.borderColor = color;
    }}
    onMouseLeave={(e) => {
        (e.currentTarget as any).style.transform = 'translateY(0)';
        (e.currentTarget as any).style.boxShadow = '0 12px 32px rgba(0,0,0,0.02)';
        (e.currentTarget as any).style.borderColor = '#F1F5F9';
    }}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ 
                width: '56px', height: '56px', borderRadius: '18px', 
                backgroundColor: bg, color: color,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                {icon}
            </div>
            <div style={{ 
                padding: '6px 12px', borderRadius: '10px', 
                backgroundColor: bg, color: color, 
                fontSize: '11px', fontWeight: '900', letterSpacing: '0.05em'
            }}>
                {trend}
            </div>
        </div>
        <div>
            <div style={{ fontSize: '42px', fontWeight: '900', color: '#1A1A2E', letterSpacing: '-0.04em', lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: '13px', color: '#94A3B8', fontWeight: '800', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
        </div>
        <div style={{ height: '4px', backgroundColor: '#F8F9FD', borderRadius: '2px', overflow: 'hidden' }}>
             <div style={{ width: '60%', height: '100%', backgroundColor: color, borderRadius: '2px' }} />
        </div>
    </div>
);

export default DashboardStats;
