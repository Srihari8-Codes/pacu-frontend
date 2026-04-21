import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { 
    User as UserIcon, Shield, Mail, Phone, 
    Loader2, Search, Activity, ChevronRight, 
    Trash2, Edit3, UserCheck, Settings,
    ShieldCheck, Zap, Info, ArrowLeft, MoreHorizontal,
    Star, BadgeCheck
} from 'lucide-react';

interface User {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    role: string;
    _count: {
        episodes: number;
        assignedEpisodes: number;
    };
}

const Users = ({ onBack }: { onBack?: () => void }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response: any = await api.get('/users');
                if (response.data?.success) {
                    setUsers(response.data.users || []);
                } else if (response.users) {
                    setUsers(response.users);
                }
            } catch (err) {
                console.error('Failed to fetch users', err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8F9FD' }}>
            <div style={{ textAlign: 'center' }}>
                <Loader2 className="spin" size={48} color="#1565C0" />
                <p style={{ marginTop: '20px', fontWeight: '900', color: '#1565C0', letterSpacing: '0.2em', fontSize: '13px' }}>DIRECTORY SYNCHRONIZATION...</p>
            </div>
        </div>
    );

    return (
        <div className="fade-in" style={{ backgroundColor: '#F8F9FD', minHeight: '100vh' }}>
            {/* Clinical Header */}
            <div style={{ 
                height: '240px', background: 'linear-gradient(135deg, #1565C0 0%, #1E88E5 100%)', 
                padding: '48px 32px', color: '#fff', position: 'relative'
            }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
                         {onBack && (
                            <button onClick={onBack} style={{ 
                                width: '48px', height: '48px', borderRadius: '14px', 
                                backgroundColor: 'rgba(255,255,255,0.2)', border: 'none', 
                                color: '#fff', display: 'flex', alignItems: 'center', 
                                justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)'
                            }}>
                                <ArrowLeft size={24} />
                            </button>
                         )}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                <BadgeCheck size={32} color="#fff" />
                                <h1 style={{ fontSize: '36px', fontWeight: '900', letterSpacing: '-0.02em' }}>Personnel Registry</h1>
                            </div>
                            <p style={{ fontSize: '16px', opacity: 0.9, fontWeight: '700' }}>Manage authorized clinical staff & access clearance</p>
                        </div>
                    </div>
                    <button style={{ 
                        backgroundColor: '#fff', padding: '16px 28px', borderRadius: '18px', 
                        color: '#1565C0', fontWeight: '900', border: 'none', fontSize: '14px',
                        display: 'flex', alignItems: 'center', gap: '10px',
                        boxShadow: '0 12px 24px rgba(255,255,255,0.2)', cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}>
                        <UserCheck size={20} /> PROVISION STAFF
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div style={{ maxWidth: '1100px', margin: '-44px auto 100px', padding: '0 32px' }}>
                {/* Search Interface */}
                <div style={{ 
                    backgroundColor: '#fff', borderRadius: '32px', padding: '10px 10px 10px 24px', 
                    boxShadow: '0 20px 48px rgba(0,0,0,0.06)', marginBottom: '40px',
                    display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #F1F5F9'
                }}>
                    <Search size={24} color="#1565C0" />
                    <input 
                        type="text" 
                        placeholder="Scan registry by name, role, or clinical identifier..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ 
                            flex: 1, border: 'none', fontSize: '16px', 
                            fontWeight: '700', color: '#1A1A2E', outline: 'none'
                        }}
                        id="staff-search-input"
                    />
                </div>

                {/* Staff Cards Feed */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                    {filteredUsers.map(user => (
                        <div key={user.id} style={{ 
                            backgroundColor: '#fff', borderRadius: '32px', padding: '32px', 
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            border: '1px solid #F1F5F9', boxShadow: '0 8px 24px rgba(0,0,0,0.02)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }} onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.borderColor = '#1565C0';
                        }} onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = '#F1F5F9';
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                                <div style={{ 
                                    width: '72px', height: '72px', borderRadius: '22px', 
                                    background: 'linear-gradient(135deg, #1565C0 0%, #1E88E5 100%)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '28px', fontWeight: '900', color: '#fff',
                                    boxShadow: '0 12px 24px rgba(21,101,192,0.2)'
                                }}>
                                    {user.name.charAt(0)}
                                </div>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
                                        <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#1A1A2E', letterSpacing: '-0.01em' }}>{user.name}</h3>
                                        <div style={{ 
                                            padding: '6px 14px', borderRadius: '10px', fontSize: '11px', 
                                            fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.08em',
                                            backgroundColor: user.role === 'DOCTOR' ? '#E3F2FD' : '#F0FDF4',
                                            color: user.role === 'DOCTOR' ? '#1565C0' : '#22C55E',
                                            display: 'flex', alignItems: 'center', gap: '6px'
                                        }}>
                                             <ShieldCheck size={12} />
                                             {user.role === 'DOCTOR' ? 'PHYSICIAN' : 'NURSING STAFF'}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#90A4AE', fontSize: '14px', fontWeight: '700' }}>
                                            <Mail size={14} color="#B0BEC5" /> {user.email}
                                        </div>
                                        {user.phone && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#90A4AE', fontSize: '14px', fontWeight: '700' }}>
                                                <Phone size={14} color="#B0BEC5" /> {user.phone}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontSize: '10px', fontWeight: '900', color: '#B0BEC5', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.05em' }}>REGISTRY EVENTS</p>
                                    <div style={{ fontSize: '24px', fontWeight: '900', color: '#1A1A2E', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                                        {user._count.episodes + user._count.assignedEpisodes} 
                                        <span style={{ fontSize: '12px', color: '#90A4AE', fontWeight: '800' }}>ACTIONS</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button style={{ width: '48px', height: '48px', borderRadius: '14px', border: '1px solid #F1F5F9', background: '#fff', color: '#1565C0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
                                        <Edit3 size={20} />
                                    </button>
                                    <button style={{ width: '48px', height: '48px', borderRadius: '14px', border: '1px solid #F1F5F9', background: '#fff', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredUsers.length === 0 && (
                        <div className="fade-in" style={{ padding: '100px 40px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '40px', border: '2px dashed #ECEFF1' }}>
                            <Settings size={64} color="#CFD8DC" style={{ marginBottom: '24px' }} />
                            <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#1A1A2E' }}>Void Filter Node</h2>
                            <p style={{ fontSize: '16px', color: '#90A4AE', marginTop: '12px', fontWeight: '700' }}>No clinical personnel signatures match the current search parameters.</p>
                        </div>
                    )}
                </div>
            </div>
            
            <div style={{ position: 'fixed', bottom: '40px', left: '0', right: '0', textAlign: 'center', pointerEvents: 'none' }}>
                <p style={{ fontSize: '11px', fontWeight: '800', color: '#B0BEC5', letterSpacing: '0.1em' }}>STAFF INTELLIGENCE MODULE • HN V4.0.2</p>
            </div>
        </div>
    );
};

export default Users;
