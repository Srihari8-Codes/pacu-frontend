import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface Props {
    onBack: () => void;
}

const AppSettings: React.FC<Props> = ({ onBack }) => {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className="fade-in" style={{ backgroundColor: '#F8F9FD', minHeight: '100vh', paddingBottom: '100px' }}>
            {/* Header */}
            <div style={{ padding: '24px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', gap: '24px', borderBottom: '1px solid #F1F5F9' }}>
                <button 
                    onClick={onBack} 
                    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A1A2E' }}
                >
                    <ArrowLeft size={24} strokeWidth={2} />
                </button>
                <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#1A1A2E', margin: 0 }}>App Settings</h1>
            </div>

            <div style={{ maxWidth: '600px', margin: '24px auto', padding: '0 24px' }}>
                {/* Display Card */}
                <div style={{ 
                    backgroundColor: '#F8F9FD', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px', marginBottom: '24px' 
                }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#1A1A2E', marginBottom: '20px' }}>Display</h3>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <span style={{ fontSize: '15px', color: '#475569', fontWeight: '500' }}>Dark Mode</span>
                        {/* Toggle Switch */}
                        <div 
                            onClick={() => setDarkMode(!darkMode)}
                            style={{ 
                                width: '44px', height: '24px', borderRadius: '12px', 
                                backgroundColor: darkMode ? '#1A1A2E' : '#CBD5E1', 
                                position: 'relative', cursor: 'pointer', transition: 'all 0.3s'
                            }}
                        >
                            <div style={{ 
                                width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#fff', 
                                position: 'absolute', top: '2px', left: darkMode ? '22px' : '2px', 
                                transition: 'all 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '15px', color: '#475569', fontWeight: '500' }}>Language</span>
                        <span style={{ fontSize: '15px', color: '#64748B', fontWeight: '600', cursor: 'pointer' }}>English</span>
                    </div>
                </div>

                {/* Data & Cache Card */}
                <div style={{ 
                    backgroundColor: '#F8F9FD', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px', marginBottom: '24px' 
                }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#1A1A2E', marginBottom: '20px' }}>Data & Cache</h3>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                        <span style={{ fontSize: '15px', color: '#475569', fontWeight: '500' }}>Clear Cache</span>
                        <span style={{ fontSize: '14px', color: '#1A1A2E', fontWeight: '800' }}>2.5 MB</span>
                    </div>
                </div>

                <div style={{ fontSize: '13px', color: '#94A3B8', fontWeight: '500' }}>
                    Version 1.0.2
                </div>
            </div>
        </div>
    );
};

export default AppSettings;
