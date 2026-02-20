import React, { useState } from 'react';

export const ReferralCard = ({ userId }: { userId: string }) => {
  const [copied, setCopied] = useState(false);
  const link = `amplify.ngo/ref/${userId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-2 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-2">
      <div className="flex-1 px-8 py-4 md:py-0">
        <code className="text-lg font-bold text-blue-600 tracking-tight">{link}</code>
      </div>
      <button 
        onClick={handleCopy}
        className={`w-full md:w-auto px-10 py-5 rounded-[2.2rem] font-black text-sm uppercase tracking-widest transition-all active:scale-95 ${
          copied ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-blue-600'
        }`}
      >
        {copied ? 'Link Copied!' : 'Copy to Clipboard'}
      </button>
    </div>
  );
};