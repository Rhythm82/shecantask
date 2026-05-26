import { motion } from "framer-motion";
import { BookOpenCheck, HandHeart, HeartPulse, Megaphone } from "lucide-react";

const missions = [
  {
    title: "Education & Confidence",
    description: "Helping women and girls grow through learning, self-belief, and mentorship.",
    icon: BookOpenCheck
  },
  {
    title: "Menstrual Hygiene & Dignity",
    description: "Supporting awareness and dignity-led access around menstrual health.",
    icon: HeartPulse
  },
  {
    title: "Women Empowerment",
    description: "Creating space for leadership, independence, and stronger voices.",
    icon: HandHeart
  },
  {
    title: "Community Awareness",
    description: "Building local awareness through outreach, campaigns, and advocacy.",
    icon: Megaphone
  }
];

const Mission = () => {
  return (
    <section className="bg-[#fff7fb] py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-fuchsia-700">Mission</p>
          <h2 className="mt-3 text-3xl font-black text-purple-950 sm:text-4xl">Building futures with care and courage</h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {missions.map((mission) => {
            const Icon = mission.icon;

            return (
              <motion.article
                key={mission.title}
                whileHover={{ y: -8 }}
                className="rounded-3xl border border-fuchsia-100 bg-white p-6 shadow-sm"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-violet-700 p-3 text-white">
                  <Icon size={24} />
                </span>
                <h3 className="mt-5 text-lg font-extrabold text-purple-950">{mission.title}</h3>
                <p className="mt-3 text-sm leading-7 text-purple-900/72">{mission.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Mission;
