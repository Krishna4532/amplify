import React from 'react';
import { Badge } from '../ui/Badge';

interface RankRowProps {
  rank: number;
  name: string;
  referrals: number;
  badge: 'Spark' | 'Catalyst' | 'Guardian';
  image: string;
}

export const RankRow = ({ rank, name, referrals, badge, image }: RankRowProps) => {
  const isTopThree = rank <= 3;

  return (
    <div className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${isTopThree ? 'bg-blue-50/50 border border-blue-100' : 'hover:bg-slate-50'}`}>
      <span className={`text-lg font-black w-6 ${rank === 1 ? 'text-yellow-500' : 'text-slate-400'}`}>
        {rank}
      </span>
      <img src={image} alt={name} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
      <div className="flex-1">
        <p className="text-sm font-bold text-slate-800">{name}</p>
        <div className="md:hidden">
            <p className="text-[10px] text-blue-600 font-bold uppercase">{badge}</p>
        </div>
      </div>
      <div className="hidden md:block">
        <Badge type={badge} size="sm" />
      </div>
      <div className="text-right">
        <p className="text-sm font-black text-slate-900">{referrals}</p>
        <p className="text-[10px] text-slate-400 font-bold uppercase leading-none">Referrals</p>
      </div>
    </div>
  );
};