import { Group, Lock, Rocket, Toolbox } from "lucide-react";

const features = [
  { title: "Secure Data", desc: "End-to-end encryption for your privacy.", icon: <Lock className="text-primary text-3xl text-[#e63946]" /> },
  { title: "High Speed", desc: "Lightning fast media uploads globally.", icon: <Rocket className="text-primary text-3xl text-[#e63946]" /> },
  { title: "Community First", desc: "No algorithm bias, just people.", icon: <Group className="text-primary text-3xl text-[#e63946] " /> },
  { title: "Creative Tools", desc: "Built-in editing for your photos.", icon: <Toolbox className="text-primary text-3xl text-[#e63946]" /> },
];

export default function Features() {
  return (
    <section id="features" className="relative z-20 -mt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div key={i} className="group bg-white dark:bg-surface-dark/60 backdrop-blur-xl border border-gray-100 dark:border-white/5 rounded-2xl p-8 shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
              <span className="material-icons-round text-primary text-3xl group-hover:text-white">{f.icon}</span>
            </div>
            <h3 className="font-display font-bold text-xl mb-3 dark:text-white">{f.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}