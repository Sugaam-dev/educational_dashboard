import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  ArrowRight,
  RefreshCw,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { searchBuddyKnowledge } from '../data';

export default function AIBuddy({ initialQuery, user }) {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: `Hello **${user.name || 'Demo User'}**, I am your **AI Governance Buddy**. I have access to the university's compliance metrics, student lifecycle databases, and market intelligence. 

How can I assist you with international governance decisions today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Suggestion list
  const suggestions = [
    "Which campuses are at compliance risk?",
    "Which programs are underperforming?",
    "Show students awaiting ministry decree.",
    "Which students will breach visa SLA this week?",
    "Which agent has the highest visa approval rate?",
    "Which vendors are causing document quality issues?",
    "Which markets should we invest in next intake?",
    "Why are MBA enrollments declining in a specific region?"
  ];

  // Auto-submit initialQuery if provided
  useEffect(() => {
    if (initialQuery) {
      handleSend(initialQuery);
    }
  }, [initialQuery]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const text = textToSend || query;
    if (!text.trim()) return;

    // Add user message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      const responseData = searchBuddyKnowledge(text);
      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: responseData?.answer || "I could not find matching statistics in the database. Please try a different query.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setIsTyping(false);
      setMessages(prev => [...prev, botMsg]);
    }, 1200);
  };

  // Custom premium markdown to HTML parser
  const parseMarkdown = (text) => {
    if (!text) return '';
    
    const lines = text.split('\n');
    let inTable = false;
    let tableRows = [];
    let parsedHtml = [];
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      
      // Handle tables
      if (line.startsWith('|') && line.endsWith('|')) {
        if (!inTable) {
          inTable = true;
          tableRows = [];
        }
        if (line.includes('---') || line.includes(':---')) {
          continue; // Skip divider lines
        }
        const cells = line.split('|').slice(1, -1).map(c => c.trim());
        tableRows.push(cells);
        continue;
      } else {
        if (inTable) {
          inTable = false;
          parsedHtml.push(renderTableHtml(tableRows));
          tableRows = [];
        }
      }
      
      // Headers
      if (line.startsWith('### ')) {
        parsedHtml.push(`<h3 class="text-xs sm:text-sm font-extrabold text-slate-800 mt-4 mb-2 uppercase tracking-wide flex items-center gap-1.5"><span class="h-1.5 w-1.5 rounded-full bg-blue-500"></span>${line.substring(4)}</h3>`);
      } else if (line.startsWith('#### ')) {
        parsedHtml.push(`<h4 class="text-[10px] sm:text-xs font-bold text-slate-700 mt-3 mb-1.5 uppercase">${line.substring(5)}</h4>`);
      } 
      // Bold text block
      else if (line.startsWith('**') && line.endsWith('**')) {
        parsedHtml.push(`<p class="text-[10px] sm:text-xs font-extrabold text-slate-900 mt-2">${line.substring(2, line.length - 2)}</p>`);
      } 
      // Bullet list items
      else if (line.startsWith('* ') || line.startsWith('- ') || line.match(/^\d+\.\s/)) {
        let content = line.startsWith('* ') || line.startsWith('- ') ? line.substring(2) : line.replace(/^\d+\.\s/, '');
        content = content.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        content = content.replace(/_([^_]+)_/g, '<em>$1</em>');
        
        parsedHtml.push(`<li class="text-[10px] sm:text-xs text-slate-600 mb-1.5 list-none pl-4 relative font-medium"><span class="absolute left-0 top-1.5 h-1.5 w-1.5 rounded-full bg-blue-500"></span>${content}</li>`);
      } 
      // Alert Callouts
      else if (line.startsWith('> [!')) {
        let alertType = 'warning';
        if (line.includes('WARNING') || line.includes('CAUTION')) alertType = 'warning';
        else if (line.includes('IMPORTANT')) alertType = 'important';
        else alertType = 'note';
        
        let nextLine = lines[i+1] ? lines[i+1].trim() : '';
        if (nextLine.startsWith('> ')) nextLine = nextLine.substring(2);
        
        let alertClass = 'bg-amber-50 border-amber-200 text-amber-800';
        if (alertType === 'important') alertClass = 'bg-blue-50 border-blue-200 text-blue-800';
        
        parsedHtml.push(`
          <div class="flex items-start gap-2.5 p-3.5 my-3 border rounded-xl text-[10px] sm:text-xs font-medium ${alertClass}">
            <span>${nextLine}</span>
          </div>
        `);
        i++; // skip next line in loop
      } 
      // Normal paragraphs
      else if (line !== '') {
        let content = line.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        content = content.replace(/_([^_]+)_/g, '<em>$1</em>');
        parsedHtml.push(`<p class="text-[10px] sm:text-xs text-slate-600 leading-relaxed my-2">${content}</p>`);
      }
    }
    
    if (inTable) {
      parsedHtml.push(renderTableHtml(tableRows));
    }
    
    return parsedHtml.join('');
  };

  const renderTableHtml = (rows) => {
    if (rows.length === 0) return '';
    const headers = rows[0];
    const bodyRows = rows.slice(1);
    
    let html = `<div class="overflow-x-auto my-3"><table class="w-full text-left border-collapse text-[10px] sm:text-[11px] border border-slate-100 rounded-xl overflow-hidden">`;
    
    // Header
    html += `<thead><tr class="bg-slate-50 border-b border-slate-100">`;
    headers.forEach(h => {
      html += `<th class="py-2 px-3 font-bold text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-wide">${h}</th>`;
    });
    html += `</tr></thead>`;
    
    // Body
    html += `<tbody class="divide-y divide-slate-100 text-slate-600">`;
    bodyRows.forEach(row => {
      html += `<tr class="hover:bg-slate-50/50 bg-white">`;
      row.forEach(cell => {
        html += `<td class="py-2 px-3 font-semibold">${cell}</td>`;
      });
      html += `</tr>`;
    });
    html += `</tbody></table></div>`;
    
    return html;
  };

  return (
    <div className="h-[calc(100vh-10rem)] md:h-[calc(100vh-9.5rem)] flex flex-col xl:flex-row gap-6 animate-in fade-in duration-300">
      
      {/* Chat Conversation Area (Main Panel) */}
      <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col justify-between overflow-hidden">
        
        {/* Chat Titlebar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow shadow-blue-500/20">
              <Sparkles className="h-4.5 w-4.5 text-white" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">AI Governance Helper</h3>
              <span className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase">Connected to Registrar Indices</span>
            </div>
          </div>
          <button 
            onClick={() => setMessages([messages[0]])}
            className="text-[9px] sm:text-[10px] font-bold text-slate-400 hover:text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-lg transition-colors flex items-center space-x-1"
          >
            <RefreshCw className="h-3 w-3" />
            <span className="hidden sm:inline">Clear History</span>
          </button>
        </div>

        {/* Messaging Box (Scrollable) */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/20">
          {messages.map((msg) => {
            const isBot = msg.sender === 'bot';
            return (
              <div 
                key={msg.id} 
                className={`flex gap-2.5 sm:gap-3 max-w-[90%] sm:max-w-2xl lg:max-w-3xl ${isBot ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
              >
                {/* Sender Avatar */}
                <div className={`h-7 w-7 sm:h-8 sm:w-8 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold shadow-sm ${
                  isBot 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-200 text-slate-700'
                }`}>
                  {isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </div>

                {/* Message Bubble */}
                <div className="space-y-1">
                  <div className={`rounded-2xl p-3.5 sm:p-4 shadow-sm border text-[11px] sm:text-xs leading-relaxed ${
                    isBot 
                      ? 'bg-white border-slate-200/60 text-slate-800' 
                      : 'bg-blue-600 border-blue-700 text-white'
                  }`}>
                    {isBot ? (
                      <div 
                        className="prose prose-sm prose-slate"
                        dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.text) }}
                      />
                    ) : (
                      <p className="font-semibold leading-relaxed">{msg.text}</p>
                    )}
                  </div>
                  <span className="text-[8px] sm:text-[9px] text-slate-400 font-bold block px-1 text-right">
                    {msg.time}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Bot Typing Simulator */}
          {isTyping && (
            <div className="flex gap-3 mr-auto max-w-md">
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-blue-600 text-white shrink-0 flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-white border border-slate-200/60 rounded-2xl p-3 sm:p-4 shadow-sm flex items-center space-x-1">
                <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form Bar with Mobile Scrolling Suggestions */}
        <div className="p-3 sm:p-4 border-t border-slate-100 bg-white shrink-0">
          
          {/* Mobile Suggestion Chips (Visible only below xl screen width) */}
          <div className="xl:hidden flex items-center space-x-2 overflow-x-auto pb-3 mb-1.5 scrollbar-none scroll-smooth">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(s)}
                disabled={isTyping}
                className="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-100 text-[10px] font-bold text-slate-500 hover:text-blue-600 rounded-lg whitespace-nowrap transition-all shrink-0 active:scale-95"
              >
                {s}
              </button>
            ))}
          </div>

          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about compliance risks, underperforming courses, visa drops..."
              className="flex-1 px-3.5 py-2 sm:py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 transition-all font-semibold"
            />
            <button
              type="submit"
              disabled={!query.trim() || isTyping}
              className="px-3.5 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 flex items-center space-x-1 shrink-0"
            >
              <span className="hidden sm:inline">Query</span>
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>

      </div>

      {/* Suggested Queries Side panel (Visible only on xl screens and up) */}
      <div className="hidden xl:flex w-80 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex-col justify-between shrink-0 overflow-y-auto">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5 mb-4">
            <HelpCircle className="h-4 w-4 text-blue-600" />
            <span>Suggested Inquiries</span>
          </h4>

          <div className="space-y-2">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(s)}
                disabled={isTyping}
                className="w-full text-left p-3 rounded-xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 text-xs font-semibold text-slate-700 hover:text-blue-700 transition-all leading-normal flex items-start justify-between group"
              >
                <span>{s}</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 shrink-0 mt-0.5 ml-2 transform group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>
        </div>

        <div className="pt-5 border-t border-slate-100 mt-5 flex items-start space-x-2 text-[10px] text-slate-400">
          <AlertCircle className="h-4.5 w-4.5 text-slate-300 shrink-0 mt-0.5" />
          <p className="leading-normal">
            AI responses are backed by raw database indices. Overrides and warnings must be confirmed via the main dashboards.
          </p>
        </div>
      </div>

    </div>
  );
}
