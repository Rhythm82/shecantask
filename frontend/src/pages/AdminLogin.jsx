import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff, HeartHandshake, Lock, LogIn, Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { loginAdmin } from "../services/authService.js";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const { data } = await loginAdmin(credentials);
      login({ token: data.token, admin: data.admin });
      toast.success("Welcome back");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Wrong email or password");
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
          <h1 className="text-3xl font-black text-purple-950">Admin Login</h1>
          <p className="mt-2 text-sm leading-6 text-purple-900/70">Access the protected message and donation dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block">
            <span className="text-sm font-bold text-purple-950">Email</span>
            <div className="mt-2 flex items-center gap-3 rounded-2xl border border-purple-100 bg-white/88 px-4 py-3 focus-within:border-fuchsia-400 focus-within:ring-4 focus-within:ring-fuchsia-100">
              <Mail size={18} className="text-fuchsia-600" />
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-purple-950 outline-none"
                placeholder="admin@example.com"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-sm font-bold text-purple-950">Password</span>
            <div className="mt-2 flex items-center gap-3 rounded-2xl border border-purple-100 bg-white/88 px-4 py-3 focus-within:border-fuchsia-400 focus-within:ring-4 focus-within:ring-fuchsia-100">
              <Lock size={18} className="text-fuchsia-600" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-purple-950 outline-none"
                placeholder="Enter password"
              />
              <button type="button" onClick={() => setShowPassword((current) => !current)} className="text-fuchsia-700">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-purple-950 px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-purple-900/20 transition hover:-translate-y-0.5 hover:bg-fuchsia-700 disabled:opacity-70"
          >
            <LogIn size={18} />
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm font-bold">
          <Link to="/admin/signup" className="text-fuchsia-700 hover:text-purple-950">Create admin</Link>
          <Link to="/" className="text-purple-900/68 hover:text-purple-950">Back to Home</Link>
        </div>
      </section>
    </main>
  );
};

export default AdminLogin;
