import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const carouselImages = [
  {
    src: "https://www.womenentrepreneursreview.com/entrepreneur_images/news_images/ma2qd1.jpg",
    alt: "Girls studying together",
  },
  {
    src: "https://www.sheinspiremagazine.com/userfiles/blog_images/1757659697Women%20Empowerment%20in%20India.jpeg",
    alt: "Confident woman smiling",
  },
  {
    src: "https://womanias.com/wp-content/uploads/2023/10/womanias.jpeg",
    alt: "Women working together",
  },
  {
    src: "https://image.slidesharecdn.com/women-empowerment-231217153929-8a5703d0/75/women-empowerment-for-india-people-knowledge-1-2048.jpg",
    alt: "Women working together",
  },
];

const floatingCards = [
  { label: "Education", icon: BookOpen, className: "left-2 top-10" },
  { label: "Dignity", icon: Sparkles, className: "right-4 top-24" },
  { label: "Awareness", icon: ShieldCheck, className: "left-6 bottom-24" },
  { label: "Support", icon: HeartHandshake, className: "right-8 bottom-12" },
  {
    label: "Equality",
    icon: Users,
    className: "left-1/2 top-2 -translate-x-1/2",
  },
];

const Hero = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [failedImages, setFailedImages] = useState({});

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % carouselImages.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="empowerment-grid bg-gradient-to-br from-white via-fuchsia-50 to-violet-100"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-200 bg-white/76 px-4 py-2 text-sm font-extrabold text-fuchsia-700 shadow-sm">
            <Sparkles size={16} />
            Women empowerment demo platform
          </span>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-normal text-purple-950 sm:text-5xl lg:text-6xl">
            Empowering Women, Building Futures
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-purple-900/78 sm:text-lg">
            Supporting dignity, education, confidence, and opportunities for
            women and girls.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-600 to-violet-700 px-7 py-3.5 text-sm font-extrabold text-white shadow-glow transition hover:-translate-y-0.5"
            >
              Send a Message
              <ArrowRight size={18} />
            </a>
            <a
              href="#donate"
              className="inline-flex items-center justify-center rounded-full border border-purple-200 bg-white/76 px-7 py-3.5 text-sm font-extrabold text-purple-950 transition hover:bg-white"
            >
              Support the Mission
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="relative min-h-[500px]"
        >
          <div className="absolute inset-8 rounded-[2rem] bg-gradient-to-br from-fuchsia-300/45 via-white/60 to-violet-300/45 blur-2xl" />
          <div className="glass-card relative mx-auto h-[455px] max-w-[540px] overflow-hidden rounded-[2rem] p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.65 }}
                className="h-full w-full"
              >
                {failedImages[activeImage] ? (
                  <div className="h-full w-full rounded-[1.5rem] bg-gradient-to-br from-fuchsia-200 via-white to-violet-200" />
                ) : (
                  <img
                    src={carouselImages[activeImage].src}
                    alt={carouselImages[activeImage].alt}
                    onError={() =>
                      setFailedImages((current) => ({
                        ...current,
                        [activeImage]: true,
                      }))
                    }
                    className="h-full w-full rounded-[1.5rem] object-cover"
                  />
                )}
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-x-4 bottom-4 rounded-[1.5rem] bg-white/84 p-5 backdrop-blur-xl">
              <p className="text-sm font-extrabold text-fuchsia-700">
                Confidence grows with community
              </p>

            </div>
          </div>

          {floatingCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.label}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3 + index * 0.35,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`glass-card absolute hidden items-center gap-3 rounded-2xl px-4 py-3 sm:flex ${card.className}`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-700 text-white">
                  <Icon size={18} />
                </span>
                <span className="text-sm font-extrabold text-purple-950">
                  {card.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
