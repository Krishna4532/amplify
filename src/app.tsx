import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { generateAdvocacyVision } from './lib/gemini';
import { Trophy, Users, Heart, Zap, LogOut, Target, LayoutDashboard, ListOrdered, Copy, Check, ChevronRight } from 'lucide-react';

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'dashboard' | 'leaderboard'>('dashboard');
  const [aiCaption, setAiCaption] = useState("Click generate to see your AI-powered vision...");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // --- CORE LOGIC (UNCHANGED) ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) { console.error(err); }
  };

  const getReferralLink = () => {
    if (!user) return "amplify.io/join";
    const identifier = user.displayName?.toLowerCase().replace(/\s+/g, '') || user.uid.substring(0, 5);
    return `${window.location.origin}/join/${identifier}`;
  };

  if (loading) return (
    <div className="h-screen bg-black flex items-center justify-center text-white font-black text-2xl animate-pulse italic">
      AMPLIFYING IMPACT...
    </div>
  );

  // --- 1. LOGIN VIEW (ISHA FOUNDATION STYLE) ---
  if (!user) {
    return (
      <div className="h-screen w-full flex items-center justify-center relative bg-black overflow-hidden">
        {/* Background Impact Image */}
        <img 
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          alt="Community"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

        <div className="relative z-10 text-center px-6 max-w-4xl animate-in fade-in zoom-in duration-1000">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-white/20">
             <span className="text-black font-black text-4xl italic">A</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase">Amplify</h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 font-medium italic">"Empowering the collective. Multiplied by AI."</p>
          
          <button 
            onClick={handleLogin} 
            className="group bg-white text-black px-12 py-6 rounded-full font-black uppercase text-sm tracking-widest flex items-center gap-4 mx-auto hover:bg-blue-600 hover:text-white transition-all active:scale-95"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5" alt="G" />
            Join the Movement
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  // --- 2. DASHBOARD VIEW (PRESERVED FEATURES + ATTRACTIVE UI) ---
  return (
    <div className="min-h-screen bg-[#050505] text-white pb-20 selection:bg-blue-500">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 h-20 flex items-center px-10">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center font-black italic">A</div>
            <span className="font-black tracking-tighter text-xl uppercase">Amplify</span>
          </div>
          <div className="flex items-center gap-8">
            <button onClick={() => setView('dashboard')} className={`text-[10px] font-black uppercase tracking-widest ${view === 'dashboard' ? 'text-white border-b-2 border-white pb-1' : 'text-slate-500'}`}>Dashboard</button>
            <button onClick={() => setView('leaderboard')} className={`text-[10px] font-black uppercase tracking-widest ${view === 'leaderboard' ? 'text-white border-b-2 border-white pb-1' : 'text-slate-500'}`}>Leaderboard</button>
            <div className="flex items-center gap-4 border-l border-white/10 pl-8">
               <img src={user.photoURL} className="w-8 h-8 rounded-full border border-white/20" alt="Profile" />
               <button onClick={() => signOut(auth)} className="text-red-500"><LogOut size={18} /></button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-32">
        {view === 'dashboard' ? (
          <div className="space-y-16">
            
            {/* PROFILE HEADER WITH COVER PHOTO */}
            <div className="relative h-64 rounded-[3rem] overflow-hidden shadow-2xl border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" 
                className="w-full h-full object-cover opacity-40"
                alt="Banner"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-10 flex items-center gap-6">
                <img src={user.photoURL} className="w-24 h-24 rounded-full border-4 border-black" alt="User" />
                <div>
                   <h2 className="text-4xl font-black tracking-tighter">{user.displayName}</h2>
                   <p className="text-blue-500 font-black uppercase text-[10px] tracking-widest">Global Advocate Level 1</p>
                </div>
              </div>
            </div>

            {/* IMPACT STATS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard label="Rank" value="#2" icon={<Trophy className="text-yellow-500" size={16}/>} />
              <StatCard label="Impact Pts" value="3800" icon={<Zap className="text-blue-500" size={16}/>} />
              <StatCard label="Referrals" value="38" icon={<Users className="text-purple-500" size={16}/>} />
              <StatCard label="Lives Saved" value="190" icon={<Heart className="text-red-500" size={16}/>} />
            </div>

            {/* AI COPILOT SECTION */}
            <div className="bg-[#111] p-16 rounded-[4rem] border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[120px] rounded-full"></div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-8 flex items-center gap-2"><Target size={14} /> AI Advocacy Copilot</h2>
              <p className="text-4xl font-medium leading-tight mb-12 max-w-4xl italic select-none">"{aiCaption}"</p>
              <button 
                onClick={async () => {
                  setIsGenerating(true);
                  const result = await generateAdvocacyVision(38, 190);
                  setAiCaption(result);
                  setIsGenerating(false);
                }}
                className="bg-white text-black px-12 py-6 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 hover:text-white transition-all active:scale-95"
              >
                {isGenerating ? "Gemini is Crafting..." : "Generate New Vision"}
              </button>
            </div>

            {/* NGO STYLE IMPACT CARDS (NEW VISUALS) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <ImpactImageCard title="Education for All" img="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop" />
               <ImpactImageCard title="Clean Water Access" img="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070&auto=format&fit=crop" />
               <ImpactImageCard title="Reforestation" img="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop" />
            </div>

            {/* DYNAMIC REFERRAL LINK */}
            <div className="bg-white p-12 rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-8 text-black shadow-2xl">
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-2">Share the mission</h3>
                <code className="text-2xl font-black tracking-tighter text-black select-all">{getReferralLink()}</code>
              </div>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(getReferralLink());
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className={`flex items-center gap-4 px-12 py-6 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${copied ? 'bg-green-500 text-white' : 'bg-black text-white hover:bg-blue-600'}`}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied" : "Copy Unique Link"}
              </button>
            </div>
          </div>
        ) : (
          /* LEADERBOARD (UNCHANGED LOGIC) */
          <div className="space-y-6">
            <h2 className="text-5xl font-black tracking-tighter mb-12">Global Leaders</h2>
            {[
              { name: "Sarah J.", points: "4200", rank: 1 },
              { name: user.displayName || "Krishna", points: "3800", rank: 2 },
              { name: "Alex Chen", points: "3100", rank: 3 },
            ].map((leader) => (
              <div key={leader.rank} className={`flex items-center justify-between p-10 rounded-[3rem] border ${leader.rank === 2 ? 'bg-white text-black border-transparent scale-105 shadow-2xl' : 'bg-[#111] border-white/5 opacity-60'}`}>
                <div className="flex items-center gap-6">
                  <span className="font-black text-3xl italic">0{leader.rank}</span>
                  <span className="font-bold text-2xl">{leader.name}</span>
                </div>
                <span className="font-black text-2xl">{leader.points} PTS</span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

// UI HELPER COMPONENTS
const StatCard = ({ label, value, icon }: any) => (
  <div className="bg-[#111] border border-white/5 p-12 rounded-[3.5rem] hover:border-white/20 transition-all">
    <div className="mb-6">{icon}</div>
    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{label}</p>
    <p className="text-4xl font-black tracking-tighter">{value}</p>
  </div>
);

const ImpactImageCard = ({ title, img }: any) => (
  <div className="group relative h-96 rounded-[3.5rem] overflow-hidden border border-white/10 shadow-2xl">
    <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60" alt={title} />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
    <div className="absolute bottom-10 left-10">
      <h3 className="text-2xl font-black mb-1">{title}</h3>
      <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest">Active Project</p>
    </div>
  </div>
);

export default App;