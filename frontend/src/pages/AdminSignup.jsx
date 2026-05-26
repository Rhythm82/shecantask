import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff, HeartHandshake, UserPlus } from "lucide-react";
import { registerAdmin } from "../services/authService.js";

const initialForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const validateSignup = (form) => {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = "Enter a valid email.";
  }

  if (form.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  if (form.confirmPassword !== form.password) {
    errors.confirmPassword = "Passwords must match.";
  }

  return errors;
};

const AdminSignup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: "" }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateSignup(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsLoading(true);
      await registerAdmin({
        name: form.name,
        email: form.email,
        password: form.password
      });
      toast.success("Admin account created. Please login.");
      navigate("/admin/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-fuchsia-50 to-violet-100 px-5 py-12">
      <section className="glass-card w-full max-w-md rounded-3xl p-7 sm:p-8">
        <Link to="/" className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-700 text-white shadow-glow">
          <HeartHandshake size={28} />
        </Link>
        <div className="mt-6 text-center">
          <h1 className="text-3xl font-black text-purple-950">Admin Signup</h1>
          <p className="mt-2 text-sm leading-6 text-purple-900/70">For internship demo admin setup only.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block">
            <span className="text-sm font-bold text-purple-950">Name</span>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-purple-100 bg-white/88 px-4 py-3 outline-none focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100"
              placeholder="Admin name"
            />
            {errors.name && <span className="mt-1 block text-sm font-semibold text-rose-600">{errors.name}</span>}
          </label>

          <label className="block">
            <span className="text-sm font-bold text-purple-950">Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-purple-100 bg-white/88 px-4 py-3 outline-none focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100"
              placeholder="admin@example.com"
            />
            {errors.email && <span className="mt-1 block text-sm font-semibold text-rose-600">{errors.email}</span>}
          </label>

          <label className="block">
            <span className="text-sm font-bold text-purple-950">Password</span>
            <div className="mt-2 flex items-center rounded-2xl border border-purple-100 bg-white/88 px-4 py-3 focus-within:border-fuchsia-400 focus-within:ring-4 focus-within:ring-fuchsia-100">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
                placeholder="Minimum 6 characters"
              />
              <button type="button" onClick={() => setShowPassword((current) => !current)} className="text-fuchsia-700">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <span className="mt-1 block text-sm font-semibold text-rose-600">{errors.password}</span>}
          </label>

          <label className="block">
            <span className="text-sm font-bold text-purple-950">Confirm Password</span>
            <input
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-purple-100 bg-white/88 px-4 py-3 outline-none focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100"
              placeholder="Repeat password"
            />
            {errors.confirmPassword && <span className="mt-1 block text-sm font-semibold text-rose-600">{errors.confirmPassword}</span>}
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-violet-700 px-6 py-3.5 text-sm font-extrabold text-white shadow-glow transition hover:-translate-y-0.5 disabled:opacity-70"
          >
            <UserPlus size={18} />
            {isLoading ? "Creating account..." : "Create Admin Account"}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm font-bold">
          <Link to="/admin/login" className="text-fuchsia-700 hover:text-purple-950">Login</Link>
          <Link to="/" className="text-purple-900/68 hover:text-purple-950">Back to Home</Link>
        </div>
      </section>
    </main>
  );
};

export default AdminSignup;
