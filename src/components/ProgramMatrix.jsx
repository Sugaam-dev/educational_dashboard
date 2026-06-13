import React, { useState } from 'react';
import { 
  Grid, 
  HelpCircle, 
  Award, 
  TrendingUp, 
  Zap, 
  MessageSquare, 
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { PROGRAM_CHANNEL_MATRIX } from '../data';

export default function ProgramMatrix() {
  const [selectedCell, setSelectedCell] = useState(null);
  const [hoveredCell, setHoveredCell] = useState(null);

  // Map header label to row keys
  const getCellData = (row, header) => {
    switch (header) {
      case 'Direct':
        return row.direct;
      case 'Agents':
        return row.agents;
      case 'Regional Offices':
        return row.regionalOffices;
      case 'Digital Campaigns':
        return row.digitalCampaigns;
      default:
        return null;
    }
  };

  const getScoreBadge = (score) => {
    switch (score) {
      case 'best':
        return <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-green-500 text-white border border-green-400 uppercase tracking-wider shadow shadow-green-500/10">Best Yield</span>;
      case 'high':
        return <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">High</span>;
      case 'stable':
        return <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-slate-50 text-slate-600 border border-slate-200 uppercase tracking-wider">Stable</span>;
      case 'low':
        return <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-rose-50 text-rose-700 border border-rose-200 uppercase tracking-wider">Low Yield</span>;
      default:
        return null;
    }
  };

  const bestChannels = [
    { program: 'MD (Doctor of Medicine)', channel: 'Vendor / Agents', metric: '$7.4M Revenue', conversion: '18.2% conversion rate', note: 'Global Ed Group recruits 55% of MD cohorts.' },
    { program: 'Nursing (B.Sc)', channel: 'Vendor / Agents', metric: '$5.8M Revenue', conversion: '20.5% conversion rate', note: 'Oasis Recruitment Group manages nursing pipelines.' },
    { program: 'BBA (Undergrad)', channel: 'Regional Offices', metric: '$1.7M Revenue', conversion: '19.4% conversion rate', note: 'India Regional Recruitment Office leads intake.' },
    { program: 'MBA (Executive)', channel: 'Direct Admissions', metric: '$4.4M Revenue', conversion: '22.1% conversion rate', note: 'Executive candidates prefer direct web portal submissions.' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center space-x-3 text-blue-600 mb-2">
          <Grid className="h-5 w-5" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Layer 3: Cross-Channel Matrices</h2>
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Program × Channel Governance Matrix</h1>
        <p className="text-slate-500 text-sm mt-1">
          Review recruitment yield metrics crossing program segments by marketing channels. Identify which pathways recruit the best students with the lowest drop-offs.
        </p>
      </div>

      {/* Top row: Best Channel Recommendations */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Executive Yield Discoveries</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {bestChannels.map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:translate-y-[-2px] transition-transform flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400 truncate">{item.program}</span>
                  <div className="h-6 w-6 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
                    <Award className="h-3.5 w-3.5" />
                  </div>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{item.channel}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-normal">{item.note}</p>
              </div>
              
              <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[10px] font-black text-emerald-600 uppercase">{item.metric}</span>
                <span className="text-[10px] font-bold text-slate-400">{item.conversion}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle row: The Interactive Matrix Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* The Matrix Table (2/3 width) */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm xl:col-span-2 overflow-hidden flex flex-col justify-between">
          
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900">Profitability & Conversion Matrix</h3>
            <span className="text-[10px] text-slate-400 font-extrabold uppercase">Click any cell for diagnostic logs</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase bg-slate-50/20">
                  <th className="py-4 px-5">Program</th>
                  {PROGRAM_CHANNEL_MATRIX.headers.slice(1).map(header => (
                    <th key={header} className="py-4 px-4 text-center">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {PROGRAM_CHANNEL_MATRIX.rows.map((row) => (
                  <tr key={row.program} className="hover:bg-slate-50/40 transition-colors">
                    <td className="py-5 px-5 font-bold text-slate-900 border-r border-slate-100 bg-slate-50/10">
                      {row.program}
                    </td>
                    {PROGRAM_CHANNEL_MATRIX.headers.slice(1).map(header => {
                      const cell = getCellData(row, header);
                      const isSelected = selectedCell?.program === row.program && selectedCell?.channel === header;
                      const isHovered = hoveredCell?.program === row.program && hoveredCell?.channel === header;
                      
                      return (
                        <td 
                          key={header}
                          onClick={() => setSelectedCell({ program: row.program, channel: header, data: cell })}
                          onMouseEnter={() => setHoveredCell({ program: row.program, channel: header })}
                          onMouseLeave={() => setHoveredCell(null)}
                          className={`py-4 px-4 text-center cursor-pointer transition-all border-r border-slate-50 last:border-r-0 ${
                            isSelected 
                              ? 'bg-blue-50/80 ring-2 ring-blue-500/30' 
                              : isHovered 
                              ? 'bg-slate-50' 
                              : ''
                          }`}
                        >
                          <div className="flex flex-col items-center space-y-1">
                            <span className="text-sm font-black text-slate-950">{cell.count} students</span>
                            <span className="text-xs font-bold text-slate-700">{cell.revenue}</span>
                            <span className="text-[10px] text-slate-400 font-semibold">{cell.conversion} conversion</span>
                            <div className="pt-1">{getScoreBadge(cell.score)}</div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center text-xs text-slate-400 font-bold uppercase">
            <span>Matrix cohort: Q1-Q2 2026 Intake cycles</span>
            <span>Ledger status: Audited</span>
          </div>

        </div>

        {/* Diagnostic Panel (1/3 width) */}
        <div className="space-y-6">
          
          {/* Selected Cell Audit Note */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[300px]">
            {selectedCell ? (
              <div className="space-y-4">
                <div>
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    Channel Diagnostics
                  </span>
                  <h3 className="text-base font-black text-slate-900 mt-3">{selectedCell.program}</h3>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-0.5">Via {selectedCell.channel}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-y border-slate-100 py-3.5 my-3.5 text-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Admissions</span>
                    <span className="text-sm font-black">{selectedCell.data.count} candidates</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Revenues</span>
                    <span className="text-sm font-black text-slate-900">{selectedCell.data.revenue}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Conversion rate</span>
                    <span className="text-sm font-black text-slate-900">{selectedCell.data.conversion}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Yield Ranking</span>
                    <span className="mt-0.5 block">{getScoreBadge(selectedCell.data.score)}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Risk & Operations Note</span>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed font-semibold italic">
                    "{selectedCell.data.note}"
                  </p>
                </div>

                {selectedCell.data.score === 'low' && (
                  <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-center space-x-2 text-rose-700">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    <span className="text-[10px] font-bold">Yield optimization suggested. Consider channeling spend elsewhere.</span>
                  </div>
                )}

              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center h-full py-16 text-slate-400">
                <HelpCircle className="h-8 w-8 text-slate-300 mb-3" />
                <h4 className="text-sm font-bold text-slate-500">No Cell Selected</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-[200px]">
                  Click on any intersection cell in the matrix to load operational notes and compliance audits.
                </p>
              </div>
            )}

            {selectedCell && (
              <div className="pt-4 border-t border-slate-50">
                <button
                  onClick={() => alert(`Optimizing channels for ${selectedCell.program}`)}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow"
                >
                  Trigger Channel Optimization
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
