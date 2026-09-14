import React, { useEffect, useState } from 'react';
import { Loader2, RefreshCw, ChevronDown, ChevronUp, Save, StickyNote } from 'lucide-react';
import {
  adminGetRequests,
  adminUpdateRequestStatus,
  adminUpdateRequestNotes,
} from '../../lib/api';
import { ProjectRequest, ProjectRequestStatus } from '../../types';

const STATUS_OPTIONS: { value: ProjectRequestStatus; label: string; color: string }[] = [
  { value: 'new', label: 'New', color: 'text-blue-400 bg-blue-900/20 border-blue-800/40' },
  { value: 'in_discussion', label: 'In Discussion', color: 'text-yellow-400 bg-yellow-900/20 border-yellow-800/40' },
  { value: 'accepted', label: 'Accepted', color: 'text-emerald-400 bg-emerald-900/20 border-emerald-800/40' },
  { value: 'rejected', label: 'Rejected', color: 'text-red-400 bg-red-900/20 border-red-800/40' },
  { value: 'completed', label: 'Completed', color: 'text-purple-400 bg-purple-900/20 border-purple-800/40' },
];

const getStatusStyle = (status: string) =>
  STATUS_OPTIONS.find((s) => s.value === status)?.color || 'text-slate-400 bg-slate-800/40 border-slate-700';

const getStatusLabel = (status: string) =>
  STATUS_OPTIONS.find((s) => s.value === status)?.label || status;

const RequestCard: React.FC<{
  request: ProjectRequest;
  onUpdate: (updated: ProjectRequest) => void;
}> = ({ request, onUpdate }) => {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState<ProjectRequestStatus>(request.status);
  const [notes, setNotes] = useState(request.adminNotes || '');
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  const handleStatusChange = async (newStatus: ProjectRequestStatus) => {
    setStatus(newStatus);
    setSaving(true);
    const res = await adminUpdateRequestStatus(request.id, newStatus);
    if (res.success && res.data) onUpdate(res.data);
    setSaving(false);
  };

  const handleSaveNotes = async () => {
    setSaving(true);
    const res = await adminUpdateRequestNotes(request.id, notes);
    if (res.success && res.data) {
      onUpdate(res.data);
      setSavedMsg('Saved!');
      setTimeout(() => setSavedMsg(''), 2000);
    }
    setSaving(false);
  };

  return (
    <div className="bg-dark-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all">
      {/* Summary row */}
      <button
        type="button"
        className="w-full flex items-start gap-4 p-5 text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`px-2 py-0.5 text-[10px] font-mono font-semibold rounded-md border ${getStatusStyle(status)}`}>
              {getStatusLabel(status)}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              {new Date(request.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
            </span>
          </div>
          <p className="text-sm font-bold text-white truncate">{request.projectTitle}</p>
          <p className="text-xs text-slate-400 truncate">
            {request.fullName} · {request.email} {request.company ? `· ${request.company}` : ''}
          </p>
        </div>
        <div className="flex-shrink-0 text-slate-500 mt-1">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-slate-800 p-5 space-y-5">
          {/* Quick info grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            {[
              { label: 'SERVICE', value: request.service },
              { label: 'BUDGET', value: request.budgetRange },
              { label: 'TIMELINE', value: request.expectedTimeline },
              { label: 'CLIENT', value: request.fullName },
              { label: 'EMAIL', value: request.email },
              request.company ? { label: 'COMPANY', value: request.company } : null,
            ].filter(Boolean).map((item) => (
              <div key={item!.label}>
                <p className="text-[10px] font-mono text-slate-500 mb-0.5">{item!.label}</p>
                <p className="text-slate-200 text-xs break-all">{item!.value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <p className="text-[10px] font-mono text-slate-500 mb-1">PROJECT DESCRIPTION</p>
            <p className="text-sm text-slate-300 leading-relaxed">{request.projectDescription}</p>
          </div>

          {request.additionalRequirements && (
            <div>
              <p className="text-[10px] font-mono text-slate-500 mb-1">ADDITIONAL REQUIREMENTS</p>
              <p className="text-sm text-slate-300 leading-relaxed">{request.additionalRequirements}</p>
            </div>
          )}

          {request.referenceUrl && (
            <div>
              <p className="text-[10px] font-mono text-slate-500 mb-1">REFERENCE URL</p>
              <a
                href={request.referenceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-cyan text-xs hover:underline break-all"
              >
                {request.referenceUrl}
              </a>
            </div>
          )}

          {/* Status selector */}
          <div>
            <p className="text-[10px] font-mono text-slate-500 mb-2">UPDATE STATUS</p>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleStatusChange(opt.value)}
                  disabled={saving}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                    status === opt.value
                      ? opt.color
                      : 'text-slate-500 border-slate-800 hover:border-slate-700 hover:text-slate-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Private notes */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <StickyNote className="w-3.5 h-3.5 text-yellow-500" />
              <p className="text-[10px] font-mono text-slate-500">PRIVATE ADMIN NOTES</p>
              <span className="text-[10px] text-slate-600">(never visible publicly)</span>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-dark-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/20 transition-all resize-none h-24"
              placeholder="Add private notes about this inquiry..."
            />
            <div className="flex items-center gap-3 mt-2">
              <button
                type="button"
                onClick={handleSaveNotes}
                disabled={saving}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-cyan text-dark-950 font-semibold text-xs hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                Save Notes
              </button>
              {savedMsg && <span className="text-xs text-emerald-400">{savedMsg}</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const AdminRequests: React.FC = () => {
  const [requests, setRequests] = useState<ProjectRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ProjectRequestStatus | 'all'>('all');

  useEffect(() => {
    document.title = 'Inquiries | Admin Panel';
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    const res = await adminGetRequests();
    if (res.success && res.data) setRequests(res.data);
    setLoading(false);
  };

  const handleUpdate = (updated: ProjectRequest) => {
    setRequests((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
  };

  const filtered = filter === 'all' ? requests : requests.filter((r) => r.status === filter);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Client Inquiries</h1>
          <p className="text-sm text-slate-500 mt-0.5">{requests.length} total inquiries</p>
        </div>
        <button
          onClick={fetchRequests}
          className="p-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
            filter === 'all'
              ? 'bg-brand-cyan text-dark-950 border-brand-cyan'
              : 'text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          All ({requests.length})
        </button>
        {STATUS_OPTIONS.map((opt) => {
          const count = requests.filter((r) => r.status === opt.value).length;
          return (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                filter === opt.value
                  ? opt.color
                  : 'text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {opt.label} ({count})
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[300px] gap-3 text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin text-brand-cyan" />
          <span>Loading inquiries...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-500">No inquiries found.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((req) => (
            <RequestCard key={req.id} request={req} onUpdate={handleUpdate} />
          ))}
        </div>
      )}
    </div>
  );
};
