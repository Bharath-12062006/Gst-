
import React, { useState } from 'react';

interface GstDetails {
    legalName: string;
    tradeName: string;
    status: string;
}

const GstVerification: React.FC = () => {
    const [gstNumber, setGstNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState<GstDetails | null>(null);

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setDetails(null);

        setTimeout(() => {
            setLoading(false);
            setDetails({
                legalName: 'TATA CONSULTANCY SERVICES LIMITED',
                tradeName: 'TCS',
                status: 'Active',
            });
        }, 1500);
    };

    return (
        <div className="center-layout">
            <div className="box-card">
                <h1>GST Validation</h1>
                <p className="subtitle">Verify Business Identity</p>

                <form onSubmit={handleVerify} style={{ marginBottom: details ? '24px' : '0' }}>
                    <div>
                        <label>GSTIN Number</label>
                        <input
                            type="text"
                            placeholder="22AAAAA0000A1Z5"
                            value={gstNumber}
                            onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                            required
                            style={{ textTransform: 'uppercase', letterSpacing: '1px' }}
                        />
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify GST'}
                    </button>
                </form>

                {details && (
                    <div style={{
                        marginTop: '24px',
                        paddingTop: '24px',
                        borderTop: '1px solid var(--border-color)'
                    }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', textAlign: 'center' }}>
                            Business Details
                        </h3>

                        <div style={{ marginBottom: '12px' }}>
                            <label style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>
                                Legal Name
                            </label>
                            <div style={{ fontWeight: '500' }}>{details.legalName}</div>
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                            <label style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>
                                Trade Name
                            </label>
                            <div style={{ fontWeight: '500' }}>{details.tradeName}</div>
                        </div>

                        <div>
                            <label style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>
                                Status
                            </label>
                            <div style={{
                                color: '#166534',
                                backgroundColor: '#dcfce7',
                                display: 'inline-block',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                fontSize: '13px',
                                fontWeight: '500'
                            }}>
                                {details.status}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GstVerification;
