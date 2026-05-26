import { motion } from "framer-motion";
import { HandHeart, Megaphone, UsersRound } from "lucide-react";

const cards = [
  {
    title: "Support & Resources",
    description: "Connecting women and girls with practical support, resources, and dignity-focused help.",
    icon: HandHeart
  },
  {
    title: "Awareness Campaigns",
    description: "Promoting conversations around health, dignity, safety, confidence, and opportunity.",
    icon: Megaphone
  },
  {
    title: "Training & Empowerment",
    description: "Encouraging skills, self-belief, advocacy, and leadership through community initiatives.",
    icon: UsersRound
  }
];

const About = () => {
  return (
    <section id="about" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-fuchsia-700">About</p>
          <h2 className="mt-3 text-3xl font-black text-purple-950 sm:text-4xl">About She Can Foundation</h2>
          <p className="mt-5 text-base leading-8 text-purple-900/76">
            She Can Foundation is a women empowerment focused NGO registered under the Indian Society Act, 1860. The foundation works to create a more equitable society by supporting women and girls through awareness, resources, training, advocacy, and dignity-focused initiatives.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <motion.article
                key={card.title}
                whileHover={{ y: -8 }}
                className="glass-card rounded-3xl p-7"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-700 text-white">
                  <Icon size={25} />
                </span>
                <h3 className="mt-6 text-xl font-extrabold text-purple-950">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-purple-900/72">{card.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
