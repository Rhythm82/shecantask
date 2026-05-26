import { HeartHandshake } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-purple-950 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-[1.2fr_0.8fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-fuchsia-600">
              <HeartHandshake size={23} />
            </span>
            <h2 className="text-xl font-black">She Can Foundation</h2>
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/72">
            Empowering women, supporting dignity, building futures.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-[0.16em] text-fuchsia-200">Quick Links</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm font-semibold text-white/76">
            <a href="#about" className="hover:text-white">About</a>
            <a href="#impact" className="hover:text-white">Impact</a>
            <a href="#donate" className="hover:text-white">Donate</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-[0.16em] text-fuchsia-200">Contact</h3>
          <p className="mt-4 text-sm font-semibold text-white/76">president@shecanfoundation.org</p>
          <p className="mt-2 text-sm font-semibold text-white/76">+91-8283841830</p>
          <p className="mt-5 text-xs leading-6 text-white/52">
            This project is created as an internship task/demo project.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
