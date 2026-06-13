import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp, 
  AlertTriangle,
  ArrowUpDown,
  Compass,
  DollarSign
} from 'lucide-react';
import { 
  Cell, 
  PieChart, 
  Pie, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { COUNTRY_DATA } from '../data';

export default function CountryGovernance() {
  const [countries, setCountries] = useState(COUNTRY_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('revenue');
  const [sortAsc, setSortAsc] = useState(false);

  // Filter list
  const filteredCountries = countries.filter(c => 
    c.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort list
  const sortedCountries = [...filteredCountries].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    
    if (typeof aVal === 'string') {
      return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return sortAsc ? aVal - bVal : bVal - aVal;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  // Pie chart data preparation
  const pieData = countries.map(c => ({
    name: c.country,
    value: c.revenue
  }));

  // Clean custom HSL/Hex palette
  const COLORS = ['#3b82f6', '#818cf8', '#a78bfa', '#cbd5e1', '#94a3b8', '#64748b', '#475569'];

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
      notation: 'compact'
    }).format(val);
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') {
      return (
        <span className="inline-flex items-center space-x-0.5 px-2 py-0.5 rounded text-[10px] font-bold bg-green-50 text-green-700 border border-green-200">
          <ArrowUpRight className="h-3 w-3 shrink-0 text-green-600" />
          <span>Growing</span>
        </span>
      );
    }
    if (trend === 'down') {
      return (
        <span className="inline-flex items-center space-x-0.5 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
          <ArrowDownRight className="h-3 w-3 shrink-0 text-rose-600" />
          <span>Declining</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-0.5 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-50 text-slate-600 border border-slate-200">
        <span>Stable</span>
      </span>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center space-x-3 text-blue-600 mb-2">
          <Globe className="h-5 w-5" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Layer 3: Market Analysis</h2>
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Country & Market Governance</h1>
        <p className="text-slate-500 text-sm mt-1">
          Complete enrollment yield by country. Identify high-risk visa regions, monitor declining markets, and direct recruitment capital effectively.
        </p>
      </div>

      {/* Grid Layout: Countries Table + Market Intelligence */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Country Table Container (2/3 width) */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm xl:col-span-2 flex flex-col justify-between overflow-hidden">
          
          {/* Table Header Filter */}
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <div className="relative w-72">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search market by country name..."
                className="w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 transition-all text-slate-700 font-medium"
              />
            </div>
            <span className="text-[10px] text-slate-400 font-extrabold uppercase">Active Intake Markets: 7 Regions</span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase bg-slate-50/20">
                  <th className="py-3.5 px-5 select-none cursor-pointer hover:bg-slate-50" onClick={() => handleSort('country')}>
                    <div className="flex items-center space-x-1">
                      <span>Country</span>
                      <ArrowUpDown className="h-3 w-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-3 select-none cursor-pointer hover:bg-slate-50 text-center" onClick={() => handleSort('leads')}>
                    <div className="flex items-center justify-center space-x-1">
                      <span>Leads</span>
                      <ArrowUpDown className="h-3 w-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-3 select-none cursor-pointer hover:bg-slate-50 text-center" onClick={() => handleSort('applications')}>
                    <div className="flex items-center justify-center space-x-1">
                      <span>Apps</span>
                      <ArrowUpDown className="h-3 w-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-3 select-none cursor-pointer hover:bg-slate-50 text-center" onClick={() => handleSort('offers')}>
                    <div className="flex items-center justify-center space-x-1">
                      <span>Offers</span>
                      <ArrowUpDown className="h-3 w-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-3 select-none cursor-pointer hover:bg-slate-50 text-center" onClick={() => handleSort('visaRate')}>
                    <div className="flex items-center justify-center space-x-1">
                      <span>Visa Approval</span>
                      <ArrowUpDown className="h-3 w-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-3 select-none cursor-pointer hover:bg-slate-50 text-center" onClick={() => handleSort('enrollmentRate')}>
                    <div className="flex items-center justify-center space-x-1">
                      <span>Enroll Rate</span>
                      <ArrowUpDown className="h-3 w-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-3 select-none cursor-pointer hover:bg-slate-50 text-center" onClick={() => handleSort('revenue')}>
                    <div className="flex items-center justify-center space-x-1">
                      <span>Revenue</span>
                      <ArrowUpDown className="h-3 w-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4 text-center">Trend Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {sortedCountries.map((c) => {
                  const isVisaRisk = c.visaRate < 80;
                  return (
                    <tr key={c.country} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-5 font-bold text-slate-900">{c.country}</td>
                      <td className="py-4 px-3 text-center">{c.leads.toLocaleString()}</td>
                      <td className="py-4 px-3 text-center">{c.applications.toLocaleString()}</td>
                      <td className="py-4 px-3 text-center">{c.offers.toLocaleString()}</td>
                      <td className={`py-4 px-3 text-center font-bold ${isVisaRisk ? 'text-rose-600 bg-rose-50/20' : 'text-slate-800'}`}>
                        {c.visaRate}%
                      </td>
                      <td className="py-4 px-3 text-center font-semibold">{c.enrollmentRate}%</td>
                      <td className="py-4 px-3 text-center font-black text-slate-900">{formatCurrency(c.revenue)}</td>
                      <td className="py-4 px-4 text-center whitespace-nowrap">{getTrendIcon(c.trend)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-right text-[10px] text-slate-400 font-bold uppercase">
            All stats compiled by International Operations Registrar
          </div>
        </div>

        {/* Market Intelligence Panel (1/3 width) */}
        <div className="space-y-6">
          
          {/* Revenue Distribution Chart */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">Revenue Yield Share</h3>
              <p className="text-slate-400 text-xs">Tuition contribution split across active nations</p>
              
              <div className="h-44 w-full mt-4 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => formatCurrency(value)}
                      contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Color keys */}
            <div className="grid grid-cols-2 gap-2 mt-4 border-t border-slate-50 pt-4 text-[10px] text-slate-500 font-bold uppercase">
              {countries.map((c, idx) => (
                <div key={c.country} className="flex items-center space-x-1.5 truncate">
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  <span className="truncate">{c.country} ({((c.revenue / 128300000) * 100).toFixed(0)}%)</span>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Decision Controls */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Compass className="h-4 w-4 text-blue-600" />
              <span>Investment Allocations</span>
            </h3>

            <div className="space-y-3">
              
              <div className="p-3 border border-slate-100 bg-slate-50 rounded-xl">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-700">United Arab Emirates</span>
                  <span className="text-[10px] font-bold text-emerald-600 px-1.5 py-0.5 bg-emerald-50 rounded border border-emerald-100 uppercase">Strong Buy</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal mt-1">
                  High tuition yield ($36k average) + 97.2% visa success. High capital efficiency.
                </p>
              </div>

              <div className="p-3 border border-slate-100 bg-slate-50 rounded-xl">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-700">Nigeria (Forex Risk)</span>
                  <span className="text-[10px] font-bold text-rose-600 px-1.5 py-0.5 bg-rose-50 rounded border border-rose-100 uppercase">Reduce Hold</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal mt-1">
                  Tuition drop of 24% YoY. High visa rejections due to student bank proof guidelines.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
