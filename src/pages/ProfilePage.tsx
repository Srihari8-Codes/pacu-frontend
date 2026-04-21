import React, { useState } from 'react';
import { 
    Bell, Shield, LifeBuoy, Globe, Settings, LogOut, 
    ChevronRight, ArrowLeft, User, Monitor, HelpCircle, 
    ShieldCheck, Activity, Briefcase, BadgeCheck, Zap,
    Info, Star, Lock, Smartphone, Timer
} from 'lucide-react';
import { useAuth } from '../services/authContext';

const ProfilePage = ({ onBack, onNavigate, isDoctor = false }: { onBack: () => void; onNavigate?: (view: string) => void; isDoctor?: boolean }) => {
    const { user, logout, updateProfile } = useAuth();
    const initials = user?.name?.split(' ').map((n: any) => n[0]).join('').toUpperCase().substring(0, 2) || 'NS';
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(user?.name || '');

    const handleSaveProfile = async () => {
        try {
            await updateProfile({ name: newName });
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update profile', error);
        }
    };

    const department = isDoctor ? 'Clinical Operations' : 'ICU Department';
    const roleLabel = isDoctor ? 'DOCTOR' : 'NURSE';

    return (
        <div className="fade-in" style={{ backgroundColor: '#F0F4F8', minHeight: '100vh', paddingBottom: '100px' }}>
            {/* App Style Header */}
            <div style={{ 
                height: '220px', 
                background: 'linear-gradient(180deg, #33E1FF 0%, #337BFF 100%)', 
                padding: '40px 24px', 
                color: '#fff', 
                position: 'relative',
                borderBottomLeftRadius: '32px',
                borderBottomRightRadius: '32px',
                boxShadow: '0 10px 30px rgba(51, 123, 255, 0.2)'
            }}>
                <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <button onClick={onBack} style={{ 
                        width: '44px', height: '44px', borderRadius: '12px', 
                        backgroundColor: 'rgba(255,255,255,0.25)', border: 'none', 
                        color: '#fff', display: 'flex', alignItems: 'center', 
                        justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)',
                        marginBottom: '32px'
                    }}>
                        <ArrowLeft size={22} strokeWidth={3} />
                    </button>
                    <h1 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-0.01em' }}>My Profile</h1>
                </div>
            </div>

            <div style={{ maxWidth: '600px', margin: '-60px auto 0', padding: '0 20px' }}>
                {/* Identity Card */}
                <div style={{ 
                    backgroundColor: '#fff', borderRadius: '24px', padding: '40px 24px', 
                    boxShadow: '0 8px 32px rgba(0,0,0,0.03)', textAlign: 'center',
                    border: '1px solid #E3E8EE', marginBottom: '24px'
                }}>
                    <div style={{ 
                        width: '96px', height: '96px', borderRadius: '50%', 
                        backgroundColor: '#F0F4F8', color: '#337BFF',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        margin: '0 auto 20px', border: '1px solid #E3E8EE'
                    }}>
                        <User size={40} fill="currentColor" />
                    </div>
                    <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#1A1A2E', marginBottom: '4px' }}>{user?.name || 'srii'}</h2>
                    <p style={{ fontSize: '15px', fontWeight: '700', color: '#64748B', marginBottom: '16px' }}>{roleLabel} • {department}</p>
                    <p style={{ fontSize: '16px', fontWeight: '900', color: '#337BFF' }}>Simats Hospital</p>
                </div>

                {/* Actions Card */}
                <div style={{ 
                    backgroundColor: '#fff', borderRadius: '24px', 
                    boxShadow: '0 8px 32px rgba(0,0,0,0.03)', overflow: 'hidden', 
                    border: '1px solid #E3E8EE', marginBottom: '32px' 
                }}>
                    <ProfileRow onClick={() => setIsEditing(true)} icon={<User size={22} />} title="Edit Profile" />
                    <ProfileRow onClick={() => onNavigate && onNavigate('settings')} icon={<Monitor size={22} />} title="App Settings" />
                    <ProfileRow onClick={() => onNavigate && onNavigate('help-support')} icon={<HelpCircle size={22} />} title="Help and Support" />
                    <div onClick={logout} style={{ padding: '24px 28px', display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer' }}>
                        <div style={{ color: '#FF5252' }}>
                            <Timer size={22} />
                        </div>
                        <h4 style={{ fontWeight: '800', color: '#FF5252', fontSize: '17px', flex: 1 }}>Logout</h4>
                    </div>
                </div>

                <div style={{ textAlign: 'center', color: '#94A3B8', fontSize: '14px', fontWeight: '700' }}>
                    App Version 1.0.2
                </div>
            </div>

            {/* Edit Profile Modal */}
            {isEditing && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
                    <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '24px', width: '90%', maxWidth: '400px', boxShadow: '0 24px 48px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '24px', color: '#1A1A2E' }}>Edit Profile</h3>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', marginBottom: '8px', color: '#64748B', textTransform: 'uppercase' }}>Full Name</label>
                        <input 
                            type="text" 
                            value={newName} 
                            onChange={(e) => setNewName(e.target.value)} 
                            style={{ 
                                width: '100%', padding: '16px 20px', borderRadius: '16px', border: '1px solid #E2E8F0', 
                                marginBottom: '32px', fontSize: '16px', boxSizing: 'border-box',
                                fontWeight: '700', color: '#1A1A2E', outline: 'none', backgroundColor: '#F8F9FD'
                            }}
                        />
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <button onClick={() => setIsEditing(false)} style={{ padding: '14px 24px', borderRadius: '16px', border: '1px solid #E2E8F0', backgroundColor: '#fff', color: '#64748B', fontWeight: '900', cursor: 'pointer' }}>Cancel</button>
                            <button onClick={handleSaveProfile} style={{ padding: '14px 28px', borderRadius: '16px', border: 'none', backgroundColor: '#337BFF', color: '#fff', fontWeight: '900', cursor: 'pointer' }}>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ProfileRow = ({ icon, title, onClick }: any) => (
    <div onClick={onClick} style={{ padding: '24px 28px', display: 'flex', alignItems: 'center', gap: '20px', borderBottom: '1px solid #F1F5F9', cursor: 'pointer' }}>
        <div style={{ color: '#475569' }}>
            {icon}
        </div>
        <h4 style={{ fontWeight: '800', color: '#1A1A2E', fontSize: '17px', flex: 1 }}>{title}</h4>
        <ChevronRight size={20} color="#CBD5E1" />
    </div>
);

export default ProfilePage;
