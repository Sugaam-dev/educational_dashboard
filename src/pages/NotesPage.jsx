import { useState, useEffect } from 'react';
import Card from '../components/common/Card';
import SectionTitle from '../components/common/SectionTitle';

export default function NotesPage({ notes, setNotes }) {
  const [activeText, setActiveText] = useState(notes || '');
  const [drafts, setDrafts] = useState([]);
  const [saveStatus, setSaveStatus] = useState('');

  const DRAFT_HISTORY_KEY = 'uni_gov_draft_history';
  const TTL = 10 * 60 * 1000; // 10 minutes

  // Load and clean up drafts on mount
  useEffect(() => {
    const loadDrafts = () => {
      const saved = localStorage.getItem(DRAFT_HISTORY_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const now = Date.now();
          // Filter out drafts older than 10 minutes
          const valid = parsed.filter(item => now - item.timestamp < TTL);
          setDrafts(valid);
          localStorage.setItem(DRAFT_HISTORY_KEY, JSON.stringify(valid));
        } catch (e) {
          console.error(e);
        }
      }
    };
    loadDrafts();
    // Poll every 30 seconds to refresh time-ago and clean expired drafts
    const interval = setInterval(loadDrafts, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSave = () => {
    if (!activeText.trim()) {
      setSaveStatus('Cannot save empty note.');
      setTimeout(() => setSaveStatus(''), 3000);
      return;
    }

    const newDraft = {
      id: Date.now(),
      text: activeText,
      timestamp: Date.now()
    };

    const updated = [newDraft, ...drafts].slice(0, 5); // Keep top 5 drafts
    setDrafts(updated);
    localStorage.setItem(DRAFT_HISTORY_KEY, JSON.stringify(updated));
    setNotes(activeText); // Also update global/session notes

    setSaveStatus('Note saved successfully!');
    setTimeout(() => setSaveStatus(''), 3500);
  };

  const handleRestore = (draftText) => {
    setActiveText(draftText);
    setNotes(draftText);
    setSaveStatus('Draft restored to editor.');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  const handleDelete = (id) => {
    const updated = drafts.filter(d => d.id !== id);
    setDrafts(updated);
    localStorage.setItem(DRAFT_HISTORY_KEY, JSON.stringify(updated));
  };

  const formatTimeAgo = (timestamp) => {
    const diff = Date.now() - timestamp;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins === 1) return '1 minute ago';
    return `${mins} minutes ago`;
  };

  return (
    <>
      <SectionTitle title="Draft notes" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Editor (2/3 width) */}
        <div className="lg:col-span-2">
          <Card title="Governance Draft Editor">
            <p className="muted" style={{ marginBottom: '12px', fontSize: '11px' }}>
              Drafts saved here will be stored in your browser session for 10 minutes.
            </p>
            <textarea
              className="notes-area"
              value={activeText}
              onChange={(event) => {
                setActiveText(event.target.value);
                setNotes(event.target.value); // Sync to parent state
              }}
              placeholder="Write chase notes, meeting notes, escalation drafts, approval outcomes, or blockers here..."
              style={{
                width: '100%',
                minHeight: '240px',
                padding: '12px',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                fontSize: '13px',
                fontFamily: 'Inter, sans-serif',
                resize: 'vertical',
                outline: 'none'
              }}
            />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
              <div>
                {saveStatus && (
                  <span 
                    className={`badge ${saveStatus.includes('successfully') || saveStatus.includes('restored') ? 'badge-green' : 'badge-amber'} animate-in fade-in duration-200`}
                    style={{ fontSize: '11px', fontWeight: 'bold' }}
                  >
                    {saveStatus}
                  </span>
                )}
              </div>
              <button 
                className="primary" 
                onClick={handleSave}
                style={{ padding: '8px 20px', fontSize: '12px', fontWeight: 'bold' }}
              >
                Save Note
              </button>
            </div>
          </Card>
        </div>

        {/* Saved Drafts List (1/3 width) */}
        <Card title="Recent Saved Drafts">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {drafts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px 8px', color: '#94a3b8', fontSize: '12px' }}>
                <p>No saved drafts found.</p>
                <p style={{ fontSize: '10px', marginTop: '4px' }}>Drafts automatically expire after 10 minutes.</p>
              </div>
            ) : (
              drafts.map((draft) => (
                <div 
                  key={draft.id}
                  style={{
                    padding: '10px 12px',
                    border: '1px solid #f1f5f9',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    fontSize: '11px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#94a3b8', fontWeight: 'bold', fontSize: '10px' }}>
                    <span>{formatTimeAgo(draft.timestamp)}</span>
                    <span style={{ color: '#10b981' }}>Expires in {Math.max(0, Math.ceil((10 * 60 * 1000 - (Date.now() - draft.timestamp)) / 60000))}m</span>
                  </div>
                  <p style={{ margin: '0 0 8px 0', color: '#475569', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.4' }}>
                    {draft.text}
                  </p>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button 
                      className="secondary"
                      style={{ fontSize: '10px', padding: '4px 8px' }}
                      onClick={() => handleRestore(draft.text)}
                    >
                      Restore
                    </button>
                    <button 
                      className="secondary"
                      style={{ fontSize: '10px', padding: '4px 8px', color: '#ef4444', borderColor: '#fee2e2' }}
                      onClick={() => handleDelete(draft.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

      </div>
    </>
  );
}

