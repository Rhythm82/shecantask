import { motion } from "framer-motion";
import { BadgeCheck, HeartPulse, PackageCheck, School, Sparkles } from "lucide-react";

const impacts = [
  { label: "Girls Supported", value: "1,20,000+", icon: School },
  { label: "Free Sanitary Pad Support", value: "Care", icon: HeartPulse },
  { label: "Awareness Workshops", value: "Action", icon: BadgeCheck },
  { label: "Dignity Kits", value: "Support", icon: PackageCheck },
  { label: "Community Outreach", value: "Growth", icon: Sparkles }
];

const Impact = () => {
  return (
    <section id="impact" className="bg-gradient-to-b from-white to-violet-50 py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-fuchsia-700">Impact</p>
            <h2 className="mt-3 text-3xl font-black text-purple-950 sm:text-4xl">Visible change through dignity-led work</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-purple-900/68">
            Impact figures are based on publicly available She Can Foundation information.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {impacts.map((impact, index) => {
            const Icon = impact.icon;

            return (
              <motion.article
                key={impact.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="rounded-3xl border border-fuchsia-100 bg-white p-6 shadow-sm"
              >
                <Icon className="text-fuchsia-600" size={27} />
                <p className="mt-5 text-2xl font-black text-purple-950">{impact.value}</p>
                <p className="mt-2 text-sm font-bold text-purple-900/66">{impact.label}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Impact;
