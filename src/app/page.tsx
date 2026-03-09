import Link from "next/link";
import { Shield, Lock, Zap, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[130px] rounded-full" />
      </div>

      <nav className="relative z-10 flex justify-between items-center p-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">PureWill <span className="text-purple-500 text-sm">AI</span></span>
        </div>
        <Link href="/dashboard" className="px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10 text-sm font-medium">
          Dashboard
        </Link>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 pb-40 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-8">
          <Zap className="w-3 h-3" /> Powered by AI Willpower
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
          RECLAIM YOUR <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">DIGITAL FREEDOM</span>
        </h1>
        
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
          The world's first AI-powered commitment contract platform for students. 
          Lock your focus, block adult content, and reach your true potential.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
          <Link href="/dashboard" className="flex-1 py-4 px-8 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 font-bold text-lg hover:opacity-90 transition-all shadow-2xl shadow-purple-600/20 flex items-center justify-center gap-2">
            Start Your Journey <ArrowRight className="w-5 h-5" />
          </Link>
          <a href="#extension" className="flex-1 py-4 px-8 rounded-2xl bg-white/5 hover:bg-white/10 font-bold text-lg transition-all border border-white/10 flex items-center justify-center">
            Chrome Extension
          </a>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5 backdrop-blur-xl">
            <Lock className="w-8 h-8 text-purple-500 mb-6" />
            <h3 className="text-xl font-bold mb-3">Commitment Contract</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">Seal your discipline with a binding contract that cannot be broken until the timer hits zero.</p>
          </div>
          <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5 backdrop-blur-xl">
            <Shield className="w-8 h-8 text-blue-500 mb-6" />
            <h3 className="text-xl font-bold mb-3">AI Content Filter</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">Advanced AI scans and blocks adult content in real-time across the entire web.</p>
          </div>
          <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5 backdrop-blur-xl">
            <Zap className="w-8 h-8 text-yellow-500 mb-6" />
            <h3 className="text-xl font-bold mb-3">Accountability</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">Notify a trusted partner instantly if you ever attempt to bypass your protective locks.</p>
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-12 text-center text-zinc-600 text-sm">
        &copy; 2026 PureWill AI. Built for Discipline.
      </footer>
    </div>
  );
}
