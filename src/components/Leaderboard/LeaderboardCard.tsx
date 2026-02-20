import React from 'react';
import { UserImpact } from '../../data/mockData';

export const Leaderboard = ({ users }: { users: UserImpact[] }) => {
  return (
    <div className="space-y-10">
      <header>
        <h2 className="text-5xl font-black tracking-tight">Community Leaders</h2>
        <p className="text-slate-500 mt-2 text-lg">Top advocates making a difference.</p>
      </header>

      <div className="space-y-4">
        {users.map((user, idx) => (
          <div 
            key={user.id} 
            className={`flex items-center gap-4 p-6 rounded-[2rem] border transition-all ${
              idx === 1 ? 'bg-blue-50 border-blue-200 shadow-lg shadow-blue-100' : 'bg-white border-slate-100'
            }`}
          >
            <span className={`text-2xl font-black w-10 ${idx === 0 ? 'text-yellow-500' : 'text-slate-300'}`}>
              {idx + 1}
            </span>
            <img src={user.image} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" alt={user.name} />
            <div className="flex-1">
              <h4 className="font-bold text-slate-900">{user.name} {user.id === '2' && '(You)'}</h4>
              <div className="flex items-center gap-2 mt-1">
                <img src={`/assets/badge-${user.badge.toLowerCase()}.svg`} className="w-4 h-4" alt="badge" />
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">{user.badge}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-black text-slate-900">{user.referrals}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Referrals</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};