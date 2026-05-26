import { useState } from "react";
import { Link } from "react-router-dom";
import { HeartHandshake, Menu, X } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#impact", label: "Impact" },
  { href: "#donate", label: "Donate" },
  { href: "#contact", label: "Contact" }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = links.map((link) => (
    <a
      key={link.href}
      href={link.href}
      onClick={() => setIsOpen(false)}
      className="text-sm font-extrabold text-purple-950 transition hover:text-fuchsia-700"
    >
      {link.label}
    </a>
  ));

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/72 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#home" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-700 text-white shadow-glow">
            <HeartHandshake size={24} />
          </span>
          <span className="text-lg font-black tracking-normal text-purple-950 sm:text-xl">She Can Foundation</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks}
          <Link
            to="/admin/login"
            className="rounded-full bg-purple-950 px-5 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-purple-900/20 transition hover:-translate-y-0.5 hover:bg-fuchsia-700"
          >
            Admin Login
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-purple-950 shadow-sm md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {isOpen && (
        <div className="mx-5 mb-4 flex flex-col gap-4 rounded-3xl border border-fuchsia-100 bg-white p-5 shadow-xl md:hidden">
          {navLinks}
          <Link
            to="/admin/login"
            className="rounded-full bg-purple-950 px-5 py-2.5 text-center text-sm font-extrabold text-white"
          >
            Admin Login
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
