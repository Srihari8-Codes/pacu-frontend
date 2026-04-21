import React, { useState } from 'react';
import { ArrowLeft, Send, CheckCircle, HelpCircle } from 'lucide-react';

interface Props {
    onBack: () => void;
}

const HelpSupport: React.FC<Props> = ({ onBack }) => {
    const [subject, setSubject] = useState('');
    const [details, setDetails] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!subject || !details) return;
        
        setSubmitting(true);
        // Simulate API call for support ticket
        setTimeout(() => {
            setSubmitting(false);
            setSuccess(true);
        }, 1500);
    };

    if (success) {
        return (
            <div className="fade-in" style={{ backgroundColor: '#F0F4F8', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
                <div style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '40px 24px', textAlign: 'center', maxWidth: '400px', width: '100%', boxShadow: '0 8px 32px rgba(0,0,0,0.03)', border: '1px solid #E3E8EE' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#F0FDF4', color: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                        <CheckCircle size={32} />
                    </div>
                    <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#1A1A2E', marginBottom: '12px' }}>Request Submitted</h2>
                    <p style={{ fontSize: '15px', color: '#64748B', fontWeight: '500', marginBottom: '32px', lineHeight: 1.5 }}>
                        Our clinical IT support team has received your request and will contact you shortly.
                    </p>
                    <button 
                        onClick={onBack}
                        style={{ width: '100%', padding: '16px', borderRadius: '16px', border: 'none', backgroundColor: '#337BFF', color: '#fff', fontWeight: '800', fontSize: '16px', cursor: 'pointer', boxShadow: '0 8px 24px rgba(51, 123, 255, 0.2)' }}
                    >
                        Return to Command
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fade-in" style={{ backgroundColor: '#F0F4F8', minHeight: '100vh', paddingBottom: '100px' }}>
            {/* Header */}
            <div style={{ padding: '24px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', gap: '24px', borderBottom: '1px solid #F1F5F9' }}>
                <button 
                    onClick={onBack} 
                    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A1A2E' }}
                >
                    <ArrowLeft size={24} strokeWidth={2} />
                </button>
                <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#1A1A2E', margin: 0 }}>Help and Support</h1>
            </div>

            <div style={{ maxWidth: '600px', margin: '32px auto', padding: '0 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: '#E0F2FE', color: '#337BFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <HelpCircle size={24} />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#1A1A2E', marginBottom: '4px' }}>How can we help?</h2>
                        <p style={{ fontSize: '14px', color: '#64748B', fontWeight: '500' }}>Submit a ticket to clinical IT support.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '32px', boxShadow: '0 8px 32px rgba(0,0,0,0.03)', border: '1px solid #E3E8EE' }}>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#475569', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Category / Subject
                        </label>
                        <select 
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                            style={{ 
                                width: '100%', padding: '16px 20px', borderRadius: '16px', border: '1px solid #E2E8F0', 
                                fontSize: '15px', fontWeight: '600', color: '#1A1A2E', outline: 'none', 
                                backgroundColor: '#F8F9FD', appearance: 'none'
                            }}
                        >
                            <option value="" disabled>Select a subject...</option>
                            <option value="System Authentication">System Authentication</option>
                            <option value="Patient Telemetry Sync">Patient Telemetry Sync</option>
                            <option value="Clinical Documentation">Clinical Documentation</option>
                            <option value="Hardware Connectivity">Hardware Connectivity</option>
                            <option value="Other Protocol Issues">Other Protocol Issues</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '32px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#475569', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Detailed Description
                        </label>
                        <textarea 
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            required
                            placeholder="Please provide specific details about the issue you are facing..."
                            style={{ 
                                width: '100%', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', 
                                fontSize: '15px', fontWeight: '500', color: '#1A1A2E', outline: 'none', 
                                backgroundColor: '#F8F9FD', minHeight: '140px', resize: 'vertical', boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={submitting || !subject || !details.trim()}
                        style={{ 
                            width: '100%', padding: '18px', borderRadius: '16px', border: 'none', 
                            background: submitting ? '#94A3B8' : 'linear-gradient(180deg, #33E1FF 0%, #337BFF 100%)', 
                            color: '#fff', fontWeight: '800', fontSize: '16px', cursor: submitting ? 'not-allowed' : 'pointer', 
                            boxShadow: submitting ? 'none' : '0 12px 24px rgba(51, 123, 255, 0.3)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', transition: 'all 0.3s'
                        }}
                    >
                        {submitting ? 'Submitting...' : 'Submit Request'}
                        {!submitting && <Send size={20} />}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default HelpSupport;
