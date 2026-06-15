import { useState } from 'react';
import Card from '../components/common/Card';
import SectionTitle from '../components/common/SectionTitle';
import MetricCard from '../components/common/MetricCard';
import { MATRIX_DATA } from '../data/dashboardData';

export default function MatrixPage() {
  const [selectedCell, setSelectedCell] = useState(null);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [optimizing, setOptimizing] = useState(false);
  const [optSuccess, setOptSuccess] = useState(false);

  const getCellScore = (roiString) => {
    if (!roiString) return 'stable';
    const roi = parseFloat(roiString);
    if (roi >= 75) return 'best';
    if (roi >= 55) return 'high';
    if (roi >= 30) return 'stable';
    return 'low';
  };

  const getCellData = (row, header) => {
    let cell = null;
    switch (header) {
      case 'Direct Admissions':
        cell = row.direct;
        break;
      case 'Agents':
        cell = row.agents;
        break;
      case 'Regional Offices':
        cell = row.offices;
        break;
      case 'Digital Campaigns':
        cell = row.digital;
        break;
      case 'Education Fairs':
        cell = row.fairs;
        break;
      default:
        return null;
    }
    if (!cell) return null;

    return {
      count: cell.apps,
      revenue: cell.rev,
      conversion: cell.enroll,
      score: getCellScore(cell.roi),
      note: cell.note,
      roi: cell.roi
    };
  };

  const getScoreBadge = (score) => {
    switch (score) {
      case 'best':
        return <span className="badge badge-green font-bold text-[9px] uppercase tracking-wider">Best Yield</span>;
      case 'high':
        return <span className="badge badge-blue font-bold text-[9px] uppercase tracking-wider">High</span>;
      case 'stable':
        return <span className="badge badge-blue font-bold text-[9px] uppercase tracking-wider" style={{ opacity: 0.7 }}>Stable</span>;
      case 'low':
        return <span className="badge badge-red font-bold text-[9px] uppercase tracking-wider">Low Yield</span>;
      default:
        return null;
    }
  };

  const triggerOptimization = () => {
    setOptimizing(true);
    setOptSuccess(false);
    setTimeout(() => {
      setOptimizing(false);
      setOptSuccess(true);
      setTimeout(() => setOptSuccess(false), 4000);
    }, 2000);
  };

  const bestChannels = [
    { program: 'MD (Medicine)', channel: 'Agents', metric: '$7.4M Revenue', conversion: '91.2% enrollment', note: 'Global Ed Group recruits 55%.' },
    { program: 'Nursing (B.Sc)', channel: 'Agents', metric: '$5.8M Revenue', conversion: '90.1% enrollment', note: 'Oasis Recruitment Group manages strong pipelines.' },
    { program: 'BBA (Undergrad)', channel: 'Regional Offices', metric: '$1.7M Revenue', conversion: '86.4% enrollment', note: 'India Regional Recruitment Office leads.' },
    { program: 'MBA (Executive)', channel: 'Direct Admissions', metric: '$4.4M Revenue', conversion: '88.2% enrollment', note: 'Executives prefer direct web portal.' }
  ];

  return (
    <>
      <SectionTitle title="Program × Channel matrix" />
      
      {/* Yield Discoveries */}
      <section className="portfolio-grid" style={{ marginBottom: '18px' }}>
        {bestChannels.map((item, idx) => (
          <Card key={idx} title={item.program}>
            <div className="detail-panel" style={{ gap: '6px' }}>
              <span className="badge badge-green">{item.channel}</span>
              <strong>{item.metric}</strong>
              <p style={{ fontSize: '11px', margin: 0 }}>{item.note}</p>
              <em className="good" style={{ fontSize: '10px', fontStyle: 'normal', fontWeight: 'bold' }}>{item.conversion}</em>
            </div>
          </Card>
        ))}
      </section>

      {/* Main Grid split */}
      <section className="two-column">
        
        {/* The Matrix Card */}
        <Card title="Interactive Profitability & Conversion Matrix">
          <p className="card-copy" style={{ marginBottom: '14px' }}>
            Click on any intersection cell to load operational logs, yield warnings, and compliance diagnostic records.
          </p>
          
          <div className="table-wrap">
            <table className="matrix-table">
              <thead>
                <tr>
                  <th style={{ background: '#f8fafc', fontWeight: 'bold' }}>Program</th>
                  {MATRIX_DATA.headers.slice(1).map(header => (
                    <th key={header} style={{ textAlign: 'center' }}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATRIX_DATA.rows.map((row) => (
                  <tr key={row.program}>
                    <td style={{ background: '#f8fafc', fontWeight: 'bold', borderRight: '1px solid #eef2f7' }}>
                      {row.program}
                    </td>
                    {MATRIX_DATA.headers.slice(1).map(header => {
                      const cell = getCellData(row, header);
                      const isSelected = selectedCell?.program === row.program && selectedCell?.channel === header;
                      const isHovered = hoveredCell?.program === row.program && hoveredCell?.channel === header;
                      
                      return (
                        <td 
                          key={header}
                          onClick={() => setSelectedCell({ program: row.program, channel: header, data: cell })}
                          onMouseEnter={() => setHoveredCell({ program: row.program, channel: header })}
                          onMouseLeave={() => setHoveredCell(null)}
                          style={{
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            backgroundColor: isSelected ? '#eff6ff' : isHovered ? '#f8fafc' : '#ffffff',
                            boxShadow: isSelected ? 'inset 0 0 0 2px #3b82f6' : 'none',
                          }}
                        >
                          <div style={{ padding: '6px 4px' }}>
                            <div style={{ fontWeight: 'bold', color: '#1e293b' }}>{cell.count} apps</div>
                            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 'semibold', margin: '2px 0' }}>
                              {cell.revenue}
                            </div>
                            <div style={{ fontSize: '10px', color: '#94a3b8' }}>
                              {cell.conversion} enroll
                            </div>
                            <div style={{ marginTop: '6px' }}>
                              {getScoreBadge(cell.score)}
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Selected Cell Audit Note */}
        <Card title="Channel Diagnostics">
          {selectedCell ? (
            <div className="detail-panel">
              <span className="badge badge-blue">{selectedCell.channel}</span>
              <strong>{selectedCell.program}</strong>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', borderY: '1px solid #e2e8f0', padding: '10px 0', margin: '8px 0' }}>
                <div>
                  <span className="muted" style={{ fontSize: '10px', display: 'block' }}>Applications</span>
                  <span style={{ fontWeight: 'bold', fontSize: '13px' }}>{selectedCell.data.count} candidates</span>
                </div>
                <div>
                  <span className="muted" style={{ fontSize: '10px', display: 'block' }}>Est. Revenues</span>
                  <span style={{ fontWeight: 'bold', fontSize: '13px', color: '#0f766e' }}>{selectedCell.data.revenue}</span>
                </div>
                <div>
                  <span className="muted" style={{ fontSize: '10px', display: 'block' }}>Enrollment rate</span>
                  <span style={{ fontWeight: 'bold', fontSize: '13px' }}>{selectedCell.data.conversion}</span>
                </div>
                <div>
                  <span className="muted" style={{ fontSize: '10px', display: 'block' }}>Estimated ROI</span>
                  <span style={{ fontWeight: 'bold', fontSize: '13px', color: '#1d73bd' }}>{selectedCell.data.roi}</span>
                </div>
              </div>

              <div style={{ marginTop: '8px' }}>
                <span className="muted" style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                  Risk & Operations Note
                </span>
                <p className="card-copy" style={{ fontSize: '12px', fontStyle: 'italic', background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #f1f5f9', margin: 0 }}>
                  "{selectedCell.data.note}"
                </p>
              </div>

              {selectedCell.data.score === 'low' && (
                <div className="badge badge-red" style={{ padding: '8px 12px', borderRadius: '8px', width: '100%', whiteSpace: 'normal', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
                  <span>⚠️ Yield optimization suggested. Consider reallocation.</span>
                </div>
              )}

              <div style={{ marginTop: '12px' }}>
                <button 
                  className="primary" 
                  onClick={triggerOptimization}
                  disabled={optimizing}
                  style={{ width: '100%' }}
                >
                  {optimizing ? 'Running audit simulations...' : 'Trigger channel optimization'}
                </button>
              </div>

              {optimizing && (
                <div className="progress-track" style={{ marginTop: '10px' }}>
                  <i style={{ width: '100%', background: '#3b82f6', animation: 'pulse 1.5s infinite' }} />
                </div>
              )}

              {optSuccess && (
                <div className="badge badge-green animate-in fade-in duration-200" style={{ marginTop: '10px', width: '100%', textAlign: 'center', display: 'block', fontWeight: 'bold' }}>
                  ✨ Channel parameters optimized successfully in ledger!
                </div>
              )}

            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '48px 16px', color: '#94a3b8' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>ℹ️</div>
              <strong>No cell selected</strong>
              <p className="card-copy" style={{ fontSize: '12px', marginTop: '4px' }}>
                Click on any intersection cell in the matrix table to load operational notes and yield audits.
              </p>
            </div>
          )}
        </Card>
      </section>
    </>
  );
}
