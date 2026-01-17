export default function Hero() {
  return (
    <div className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#b95a5e] to-transparent pointer-events-none" />
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center mt-10 font-poppins">
        <h1 className="font-extrabold text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight drop-shadow-lg">
          Vibe with the<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-500">World</span>
        </h1>
        <p className="text-base md:text-lg text-gray-200 mb-10 max-w-2xl mx-auto font-light">
          Your Socialverse, reimagined. Connect without compromising your style. 
          Experience a vibrant community built on trust, transparency, and golden-hour vibes.
        </p>

        <div className="flex justify-center gap-4 mb-8">
          <button className="px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-semibold shadow-lg shadow-rose-600/30 transition-colors">
            Join the Fam
          </button>
          <button className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur font-semibold transition-colors">
            Slide In
          </button>
        </div>

        <div className="flex items-center justify-center gap-3 text-gray-300">
          <div className="flex -space-x-2">
            <div className="w-7 h-7 rounded-full ring-2 ring-white/20 bg-gradient-to-tr from-rose-400 to-orange-300" />
            <div className="w-7 h-7 rounded-full ring-2 ring-white/20 bg-gradient-to-tr from-amber-300 to-yellow-400" />
            <div className="w-7 h-7 rounded-full ring-2 ring-white/20 bg-gradient-to-tr from-blue-400 to-cyan-300" />
          </div>
          <span className="text-sm">Join 10,000+ early adopters</span>
        </div>
      </div>
    </div>
  );
}