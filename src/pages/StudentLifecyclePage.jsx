import { useState } from "react";
import {
  AlertTriangle, CheckCircle, Clock, Users, ArrowRight, FileText,
  CreditCard, Plane, GraduationCap, IdCard, Award, ChevronRight, Zap,
  Shield, XCircle, Eye, Bell, TrendingUp, MapPin, User, Calendar, Filter,
} from "lucide-react";
import { STUDENTS, DECREE_STUDENTS, LIFECYCLE_STAGES } from "../data/dashboardData";

const STAGE_ACTIONS = {
  "Application":  "Ensure all documents uploaded. Target 10-day review turnaround.",
  "Offer":        "Academic review team to clear pending conditional offers within SLA.",
  "Fee Payment":  "Finance office to send payment reminders and enable flexible payment options.",
  "Visa Applied": "Visa compliance team to track embassy status updates daily.",
  "Arrived":      "Student services to conduct arrival check-in and campus orientation.",
  "Enrolled":     "Registrar to confirm course registration and issue student IDs.",
  "TRC":          "International office to process Temporary Residence Certificate applications.",
};

const STAGE_ICONS = {
  "Application":  FileText,
  "Offer":        Award,
  "Fee Payment":  CreditCard,
  "Visa Applied": IdCard,
  "Arrived":      Plane,
  "Enrolled":     GraduationCap,
  "TRC":          Shield,
};

function SlaBadge({ sla }) {
  if (sla === "On Time" || sla === "On Track") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
        <CheckCircle size={10} /> On Time
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
      <XCircle size={10} /> Breached
    </span>
  );
}

function StatusBadge({ status }) {
  if (status === "On Track") return <span className="badge badge-green">On Track</span>;
  if (status === "Breached") return <span className="badge badge-red">Breached</span>;
  return <span className="badge badge-blue">{status}</span>;
}

export default function StudentLifecyclePage({ onAsk }) {
  const [selectedStage, setSelectedStage] = useState(LIFECYCLE_STAGES[0]);
  const [breachFilter, setBreachFilter]   = useState("All");
  const [selectedStudentDetail, setSelectedStudentDetail] = useState(null);
  const [escalationToast, setEscalationToast] = useState(null);
  const [sopDetailStage, setSopDetailStage] = useState(null);

  const stageStudents  = STUDENTS.filter(s => s.stage === selectedStage.stage);
  const slaBreachCount = stageStudents.filter(s => s.status === "Breached").length;
  const allBreached    = STUDENTS.filter(s => s.status === "Breached");
  const breachStages   = [...new Set(allBreached.map(s => s.stage))];
  const filteredBreached = breachFilter === "All"
    ? allBreached
    : allBreached.filter(s => s.stage === breachFilter);

  const getStageThreshold = (stageName) => {
    const match = LIFECYCLE_STAGES.find(l => l.stage === stageName);
    return match ? match.slaThreshold : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/30 text-blue-100 border border-blue-400/40">
              Student Governance
            </span>
            <ChevronRight size={14} className="text-blue-300" />
            <span className="text-blue-200 text-sm">Student Lifecycle</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            Student Admission-to-Settlement Governance
          </h1>
          <p className="text-blue-200 text-sm sm:text-base">
            End-to-End Student Journey Tracking — June 2026 Intake
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {[
              { label: "Total Pipeline", value: LIFECYCLE_STAGES[0].count.toLocaleString(), cls: "text-white" },
              { label: "Enrolled",       value: LIFECYCLE_STAGES[5].count.toLocaleString(), cls: "text-white" },
              { label: "SLA Breaches",   value: allBreached.length, cls: "text-red-300" },
              { label: "Conversion Rate",value: ((LIFECYCLE_STAGES[5].count / LIFECYCLE_STAGES[0].count) * 100).toFixed(1) + "%", cls: "text-green-300" },
            ].map(m => (
              <div key={m.label} className="bg-white/10 rounded-lg px-3 py-2 text-center">
                <p className="text-blue-100 text-xs">{m.label}</p>
                <p className={`font-bold text-lg ${m.cls}`}>{m.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* SECTION 1: PIPELINE */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="section-title">Pipeline View</p>
              <h2 className="text-lg font-bold text-gray-800">Admission Lifecycle — 7 Stages</h2>
            </div>
            <TrendingUp size={20} className="text-blue-500" />
          </div>
          <div className="overflow-x-auto pb-2">
            <div className="flex flex-col md:flex-row gap-1 md:gap-0 min-w-max md:min-w-0 w-full">
              {LIFECYCLE_STAGES.map((stage, idx) => {
                const StageIcon = STAGE_ICONS[stage.stage] || FileText;
                const isSelected = selectedStage.stage === stage.stage;
                const isBreached = stage.sla === "Breached";
                return (
                  <div key={stage.stage} className="flex flex-row md:flex-col items-center">
                    <button
                      onClick={() => setSelectedStage(stage)}
                      className={[
                        "relative flex flex-col items-center justify-center text-center",
                        "rounded-xl p-3 w-full md:w-32 lg:w-36 min-h-[110px]",
                        "transition-all duration-200 border-2",
                        isSelected
                          ? "bg-blue-600 text-white border-blue-700 shadow-lg shadow-blue-200 scale-105"
                          : isBreached
                            ? "bg-red-50 text-gray-700 border-red-200 hover:border-red-400 hover:shadow-md"
                            : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-md",
                      ].join(" ")}
                    >
                      <StageIcon size={20} className={isSelected ? "text-white mb-1" : isBreached ? "text-red-500 mb-1" : "text-blue-500 mb-1"} />
                      <p className={`text-[11px] font-semibold uppercase tracking-wide leading-tight mb-1 ${isSelected ? "text-blue-100" : "text-gray-500"}`}>
                        {stage.stage}
                      </p>
                      <p className={`text-2xl font-extrabold leading-none ${isSelected ? "text-white" : isBreached ? "text-red-600" : "text-gray-800"}`}>
                        {(stage.count / 1000).toFixed(1)}k
                      </p>
                      <p className={`text-[10px] mt-0.5 ${isSelected ? "text-blue-200" : "text-gray-400"}`}>
                        {stage.pct.toFixed(1)}% of total
                      </p>
                      <div className="mt-1.5">
                        <SlaBadge sla={stage.sla} />
                      </div>
                      {isBreached && !isSelected && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      )}
                    </button>
                    {idx < LIFECYCLE_STAGES.length - 1 && (
                      <div className="flex items-center justify-center w-5 h-5 md:w-auto md:h-auto flex-shrink-0">
                        <ArrowRight size={14} className="text-gray-400 rotate-90 md:rotate-0 mx-1" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SECTION 2: STAGE DETAIL */}
        <div className="card p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              {(() => { const I = STAGE_ICONS[selectedStage.stage] || FileText; return <I size={22} className="text-blue-600" />; })()}
              <div>
                <p className="section-title">Stage Detail</p>
                <h2 className="text-xl font-bold text-gray-800">{selectedStage.stage}</h2>
              </div>
              <SlaBadge sla={selectedStage.sla} />
            </div>
            <button
              onClick={() => setSopDetailStage(selectedStage)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg font-medium transition-colors"
            >
              <Zap size={13} /> View Stage SOP
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            {[
              { label: "Avg Days in Stage", value: `${selectedStage.avgDays}d`,    icon: Clock,          color: "text-blue-600 bg-blue-50 border-blue-100" },
              { label: "SLA Threshold",     value: `${selectedStage.slaThreshold}d`,icon: Calendar,       color: "text-purple-600 bg-purple-50 border-purple-100" },
              { label: "SLA Breaches",      value: slaBreachCount,                  icon: AlertTriangle,  color: slaBreachCount > 0 ? "text-red-600 bg-red-50 border-red-100" : "text-green-600 bg-green-50 border-green-100" },
              { label: "Owner Department",  value: selectedStage.owner,             icon: User,           color: "text-gray-600 bg-gray-50 border-gray-100" },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className={`rounded-xl p-3 border ${color}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Icon size={14} />
                  <p className="text-xs font-medium opacity-70">{label}</p>
                </div>
                <p className="font-bold text-lg leading-tight">{value}</p>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-5">
            <Zap size={15} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <span className="font-semibold">Recommended Action: </span>
              {STAGE_ACTIONS[selectedStage.stage] || "Review students in this stage and ensure SLA compliance."}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Users size={15} className="text-blue-500" />
              Students in {selectedStage.stage}
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">{stageStudents.length}</span>
            </p>
            {stageStudents.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <Users size={32} className="text-gray-300 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">No individual student records for this stage in the current sample.</p>
                <p className="text-gray-300 text-xs mt-1">Total cohort: {selectedStage.count.toLocaleString()} students</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-gray-100 table-scroll">
                <table className="w-full text-sm" style={{ minWidth: '850px' }}>
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      {["ID", "Name", "Country", "Program", "Agent", "Days in Stage", "Status", "Action"].map(h => (
                        <th key={h} className="px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {stageStudents.map(student => (
                      <tr key={student.id} className="hover:bg-blue-50/40 transition-colors">
                        <td className="px-3 py-3 font-mono text-xs text-gray-500 whitespace-nowrap">{student.id}</td>
                        <td className="px-3 py-3 font-semibold text-gray-800 whitespace-nowrap">{student.name}</td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="flex items-center gap-1.5">
                            <span className="text-lg">{student.flag}</span>
                            <span className="text-gray-600 text-xs">{student.country}</span>
                          </span>
                        </td>
                        <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{student.program}</td>
                        <td className="px-3 py-3 text-gray-500 text-xs whitespace-nowrap">{student.agent}</td>
                        <td className="px-3 py-3 text-center">
                          <span className={`font-bold text-sm ${student.daysInStage >= student.slaThreshold ? "text-red-600" : "text-gray-700"}`}>
                            {student.daysInStage}d
                          </span>
                          <span className="text-gray-400 text-xs"> / {student.slaThreshold}d</span>
                        </td>
                        <td className="px-3 py-3"><StatusBadge status={student.status} /></td>
                        <td className="px-3 py-3">
                          <button
                            onClick={() => setSelectedStudentDetail(student)}
                            className="flex items-center gap-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors whitespace-nowrap"
                          >
                            <Eye size={11} /> Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* SECTION 3: SLA BREACH MONITOR */}
        <div className="card p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <p className="section-title">SLA Breach Monitor</p>
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <AlertTriangle size={18} className="text-red-500" />
                Breached Students
                <span className="bg-red-100 text-red-700 text-sm font-bold px-2 py-0.5 rounded-full">{allBreached.length}</span>
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Filter size={14} className="text-gray-400" />
              <select
                value={breachFilter}
                onChange={e => setBreachFilter(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
              >
                <option value="All">All Stages</option>
                {breachStages.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          {filteredBreached.length === 0 ? (
            <div className="text-center py-8 bg-green-50 rounded-xl border border-green-100">
              <CheckCircle size={32} className="text-green-400 mx-auto mb-2" />
              <p className="text-green-600 font-medium">No breached students in this stage</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-gray-100 table-scroll">
              <table className="w-full text-sm" style={{ minWidth: '950px' }}>
                <thead>
                  <tr className="bg-red-50 text-left">
                    {["Student ID","Name","Country","Program","Stage","Days in Stage","SLA Threshold","Days Overdue","Agent","Action"].map(h => (
                      <th key={h} className="px-3 py-2.5 text-xs font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredBreached.map(student => {
                    const threshold = getStageThreshold(student.stage);
                    const overdue   = student.daysInStage - threshold;
                    return (
                      <tr key={student.id} className="hover:bg-red-50/50 transition-colors">
                        <td className="px-3 py-3 font-mono text-xs text-gray-500 whitespace-nowrap">{student.id}</td>
                        <td className="px-3 py-3 font-semibold text-gray-800 whitespace-nowrap">{student.name}</td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="flex items-center gap-1.5">
                            <span className="text-lg">{student.flag}</span>
                            <span className="text-gray-600 text-xs">{student.country}</span>
                          </span>
                        </td>
                        <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{student.program}</td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full font-medium">{student.stage}</span>
                        </td>
                        <td className="px-3 py-3 text-center font-bold text-red-600">{student.daysInStage}d</td>
                        <td className="px-3 py-3 text-center text-gray-500">{threshold}d</td>
                        <td className="px-3 py-3 text-center">
                          <span className="font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded text-xs">+{overdue}d</span>
                        </td>
                        <td className="px-3 py-3 text-gray-500 text-xs whitespace-nowrap">{student.agent}</td>
                        <td className="px-3 py-3">
                          <button
                            onClick={() => setEscalationToast(`Escalated SLA breach for ${student.name} (${student.id}) in stage ${student.stage} to Registrar Office.`)}
                            className="flex items-center gap-1 px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                          >
                            <Bell size={11} /> Escalate
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* SECTION 4: MINISTRY DECREE TRACKER */}
        <div className="card p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div>
              <p className="section-title">Ministry Decree Tracker</p>
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Shield size={18} className="text-purple-600" />
                Ministry Decree Tracker — 4 Students Requiring Action
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse inline-block" />
              2 Critical
            </span>
          </div>
          <div className="space-y-3">
            {DECREE_STUDENTS.map(student => {
              const isCritical = student.urgency === "Critical";
              const isMedium   = student.urgency === "Medium";
              const urgencyCard = {
                Critical: "bg-red-50 border border-red-200 border-l-4 border-l-red-500",
                Medium:   "bg-amber-50 border border-amber-200 border-l-4 border-l-amber-500",
                None:     "bg-green-50 border border-green-200 border-l-4 border-l-green-500",
              };
              const urgencyBadge = {
                Critical: "bg-red-100 text-red-700 border border-red-200",
                Medium:   "bg-amber-100 text-amber-700 border border-amber-200",
                None:     "bg-green-100 text-green-700 border border-green-200",
              };
              return (
                <div
                  key={student.id}
                  className={`rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-shadow hover:shadow-md ${urgencyCard[student.urgency] || urgencyCard.None}`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {isCritical ? (
                      <div className="relative flex-shrink-0">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                        <div className="absolute inset-0 w-3 h-3 bg-red-400 rounded-full animate-ping opacity-75" />
                      </div>
                    ) : (
                      <div className={`w-3 h-3 rounded-full flex-shrink-0 ${isMedium ? "bg-amber-400" : "bg-green-400"}`} />
                    )}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <span className="font-mono text-xs text-gray-500">{student.id}</span>
                        <span className="font-bold text-gray-800">{student.name}</span>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <MapPin size={11} className="text-gray-400" />{student.country}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{student.decreeStatus}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {student.daysWaiting > 0 && (
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Days Waiting</p>
                        <p className={`font-bold text-lg ${isCritical ? "text-red-600" : isMedium ? "text-amber-600" : "text-green-600"}`}>
                          {student.daysWaiting}
                        </p>
                      </div>
                    )}
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${urgencyBadge[student.urgency] || urgencyBadge.None}`}>
                      {student.urgency === "None" ? "✓ Approved" : student.urgency}
                    </span>
                    {isCritical && (
                      <button
                        onClick={() => setEscalationToast(`Escalated Ministry Decree action for ${student.name} (${student.id}). A notification has been dispatched to compliance specialists.`)}
                        className="flex items-center gap-1 px-2.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors"
                      >
                        <Bell size={11} /> Act Now
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ── PROFILE MODAL ── */}
      {selectedStudentDetail && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[999]">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-left">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Student Admission File</h3>
            <p className="text-xs text-slate-400 mb-4">UniGov ID: {selectedStudentDetail.id} • Sample Record</p>
            <div className="space-y-3 text-sm text-slate-600 mb-6">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-slate-500">Full Name</span>
                <strong className="text-slate-800">{selectedStudentDetail.name}</strong>
               </div>
               <div className="flex justify-between border-b pb-2">
                 <span className="font-medium text-slate-500">Nationality</span>
                 <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                   <span>{selectedStudentDetail.flag}</span>
                   <span>{selectedStudentDetail.country}</span>
                 </span>
               </div>
               <div className="flex justify-between border-b pb-2">
                 <span className="font-medium text-slate-500">Degree Program</span>
                 <strong className="text-slate-800">{selectedStudentDetail.program}</strong>
               </div>
               <div className="flex justify-between border-b pb-2">
                 <span className="font-medium text-slate-500">Recruitment Agent</span>
                 <strong className="text-slate-800">{selectedStudentDetail.agent}</strong>
               </div>
               <div className="flex justify-between border-b pb-2">
                 <span className="font-medium text-slate-500">Stage Tracked</span>
                 <span className="badge badge-blue">{selectedStudentDetail.stage}</span>
               </div>
               <div className="flex justify-between border-b pb-2">
                 <span className="font-medium text-slate-500">Time at Current Gate</span>
                 <strong className={selectedStudentDetail.daysInStage >= selectedStudentDetail.slaThreshold ? "text-red-600 font-extrabold" : "text-slate-800 font-semibold"}>
                   {selectedStudentDetail.daysInStage} days (SLA: {selectedStudentDetail.slaThreshold} days)
                 </strong>
               </div>
               <div className="flex justify-between">
                 <span className="font-medium text-slate-500">Intake File Status</span>
                 <span className={`badge ${selectedStudentDetail.status === 'Breached' ? 'badge-red' : 'badge-green'}`}>{selectedStudentDetail.status}</span>
               </div>
             </div>
             <div className="flex gap-2">
               <button className="flex-1 secondary" onClick={() => setSelectedStudentDetail(null)}>Close File</button>
               <button className="flex-1 btn-danger" onClick={() => { setEscalationToast(`Escalated student file ${selectedStudentDetail.id} for priority processing.`); setSelectedStudentDetail(null); }}>Escalate File</button>
             </div>
           </div>
         </div>
       )}

       {/* ── ESCALATION TOAST MODAL ── */}
       {escalationToast && (
         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[999]">
           <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-2xl text-center">
             <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
               <Bell size={24} />
             </div>
             <h3 className="text-lg font-bold text-slate-800 mb-2">Escalation Handled</h3>
             <p className="text-xs text-slate-500 leading-relaxed mb-5">{escalationToast}</p>
             <button className="w-full primary" onClick={() => setEscalationToast(null)}>Dismiss</button>
           </div>
         </div>
       )}

       {/* ── SOP DETAIL MODAL ── */}
       {sopDetailStage && (
         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[999]">
           <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl text-left">
             <h3 className="text-xl font-bold text-slate-800 mb-2">Standard Operating Procedure (SOP)</h3>
             <p className="text-xs text-slate-400 mb-4">Admissions Gateway Checklist • Stage: {sopDetailStage.stage}</p>
             <div className="space-y-3.5 mb-6 text-slate-600 text-sm">
               <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                 <strong className="text-slate-700 text-xs block mb-1">RESPONSIBLE DEPARTMENT</strong>
                 <span>{sopDetailStage.owner}</span>
               </div>
               <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                 <strong className="text-slate-700 text-xs block mb-1">TARGET SLA GATEWAY</strong>
                 <span>{sopDetailStage.slaThreshold} business days (Current avg: {sopDetailStage.avgDays} days)</span>
               </div>
               <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                 <strong className="text-slate-700 text-xs block mb-1">SOP MANDATORY WORKFLOW</strong>
                 <ul className="list-disc pl-4 mt-1 space-y-1 text-xs text-slate-500">
                   <li>Verify original academic transcripts against official Ministry index database.</li>
                   <li>Ensure sponsor bank certificates meet local immigration regulatory guidelines.</li>
                   <li>Conduct biometrics and identity matching audits.</li>
                   <li>Log equivalence decree certifications in registration archives.</li>
                 </ul>
               </div>
             </div>
             <button className="w-full secondary" onClick={() => setSopDetailStage(null)}>Close SOP</button>
           </div>
         </div>
       )}

    </div>
  );
}
