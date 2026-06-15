import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  ArrowUpRight, 
  ArrowDownRight, 
  ArrowUpDown,
  Compass
} from 'lucide-react';
import { 
  Cell, 
  PieChart, 
  Pie, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import Card from '../components/common/Card';
import SectionTitle from '../components/common/SectionTitle';

// High-fidelity country data
const COUNTRY_DATA = [
  { country: 'India', leads: 4800, apps: 2100, offers: 1650, visaRate: 94.5, enrollmentRate: 88.2, revenue: 38200000, trend: 'up' },
  { country: 'Nigeria', leads: 3200, apps: 1450, offers: 1080, visaRate: 72.3, enrollmentRate: 78.0, revenue: 22400000, trend: 'down' },
  { country: 'UAE', leads: 1800, apps: 820, offers: 640, visaRate: 97.2, enrollmentRate: 91.5, revenue: 21600000, trend: 'up' },
  { country: 'Nepal', leads: 1500, apps: 710, offers: 510, visaRate: 85.0, enrollmentRate: 82.1, revenue: 11400000, trend: 'up' },
  { country: 'Bangladesh', leads: 1200, apps: 540, offers: 390, visaRate: 78.1, enrollmentRate: 75.3, revenue: 8800000, trend: 'down' },
  { country: 'Kenya', leads: 950, apps: 420, offers: 320, visaRate: 91.8, enrollmentRate: 86.4, revenue: 7900000, trend: 'up' }
];

export default function MarketsPage() {
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

  // HSL/Hex palette matching the new SaaS light theme
  const COLORS = ['#3b82f6', '#818cf8', '#a78bfa', '#6366f1', '#60a5fa', '#4f46e5'];

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
        <span className="badge badge-green font-bold text-[10px] inline-flex items-center gap-0.5">
          <ArrowUpRight className="h-3 w-3 text-emerald-600" />
          <span>Growing</span>
        </span>
      );
    }
    if (trend === 'down') {
      return (
        <span className="badge badge-red font-bold text-[10px] inline-flex items-center gap-0.5">
          <ArrowDownRight className="h-3 w-3 text-rose-600" />
          <span>Declining</span>
        </span>
      );
    }
    return (
      <span className="badge badge-blue font-bold text-[10px]" style={{ opacity: 0.8 }}>
        <span>Stable</span>
      </span>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Page Title */}
      <SectionTitle title="Country & market governance" />

      {/* Grid Layout: Countries Table + Market Intelligence */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Country Table Container (2/3 width) */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm xl:col-span-2 flex flex-col justify-between overflow-hidden">
          
          {/* Table Header Filter */}
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-72">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search market by country name..."
                className="w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-xl bg-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 transition-all text-slate-700 font-semibold"
              />
            </div>
            <span className="text-[10px] text-slate-400 font-extrabold uppercase">Active Intake Markets: {countries.length} Regions</span>
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
                  <th className="py-3.5 px-3 select-none cursor-pointer hover:bg-slate-50 text-center hidden lg:table-cell" onClick={() => handleSort('leads')}>
                    <div className="flex items-center justify-center space-x-1">
                      <span>Leads</span>
                      <ArrowUpDown className="h-3 w-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-3 select-none cursor-pointer hover:bg-slate-50 text-center" onClick={() => handleSort('apps')}>
                    <div className="flex items-center justify-center space-x-1">
                      <span>Apps</span>
                      <ArrowUpDown className="h-3 w-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-3 select-none cursor-pointer hover:bg-slate-50 text-center hidden md:table-cell" onClick={() => handleSort('offers')}>
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
                  <th className="py-3.5 px-3 select-none cursor-pointer hover:bg-slate-50 text-center hidden lg:table-cell" onClick={() => handleSort('enrollmentRate')}>
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
                      <td className="py-4 px-3 text-center hidden lg:table-cell">{c.leads.toLocaleString()}</td>
                      <td className="py-4 px-3 text-center">{c.apps.toLocaleString()}</td>
                      <td className="py-4 px-3 text-center hidden md:table-cell">{c.offers.toLocaleString()}</td>
                      <td className={`py-4 px-3 text-center font-bold ${isVisaRisk ? 'text-rose-600 bg-rose-50/20' : 'text-slate-800'}`}>
                        {c.visaRate}%
                      </td>
                      <td className="py-4 px-3 text-center font-semibold hidden lg:table-cell">{c.enrollmentRate}%</td>
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
              <p className="text-slate-400 text-xs font-semibold">Tuition contribution split across active nations</p>
              
              <div className="h-44 w-full mt-4 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={3}
                      dataKey="value"
                      animationDuration={800}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => formatCurrency(value)}
                      contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 'bold' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Color keys */}
            <div className="grid grid-cols-2 gap-2 mt-4 border-t border-slate-50 pt-4 text-[9px] text-slate-500 font-bold uppercase">
              {countries.map((c, idx) => (
                <div key={c.country} className="flex items-center space-x-1.5 truncate">
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  <span className="truncate">{c.country} ({((c.revenue / 110300000) * 100).toFixed(0)}%)</span>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Decision Controls */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Compass className="h-4.5 w-4.5 text-blue-600" />
              <span>Investment Allocations</span>
            </h3>

            <div className="space-y-3">
              
              <div className="p-3 border border-slate-100 bg-slate-50 rounded-xl">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-700">United Arab Emirates</span>
                  <span className="badge badge-green font-bold text-[9px] uppercase">Strong Buy</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal mt-1 font-semibold">
                  High tuition yield ($36k average) + 97.2% visa success. High capital efficiency.
                </p>
              </div>

              <div className="p-3 border border-slate-100 bg-slate-50 rounded-xl">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-700">Nigeria (Forex Risk)</span>
                  <span className="badge badge-red font-bold text-[9px] uppercase">Reduce Hold</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal mt-1 font-semibold">
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
