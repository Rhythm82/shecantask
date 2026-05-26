import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { HeartHandshake, IndianRupee, Info } from "lucide-react";
import { createDonationOrder, verifyDonationPayment } from "../services/donationService.js";

const amounts = [100, 500, 1000, 5000];

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const validateDonation = ({ name, email, amount }) => {
  const errors = {};

  if (!name.trim()) {
    errors.name = "Name is required.";
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "Enter a valid email.";
  }

  if (!Number(amount) || Number(amount) < 1) {
    errors.amount = "Choose or enter a valid amount.";
  }

  return errors;
};

const DonationSection = ({ onDonationInterest }) => {
  const [form, setForm] = useState({ name: "", email: "", amount: 500, customAmount: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const selectedAmount = form.customAmount ? Number(form.customAmount) : Number(form.amount);

  const updateField = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: "" }));
    }
  };

  const handleDonate = async () => {
    const validationErrors = validateDonation({
      name: form.name,
      email: form.email,
      amount: selectedAmount
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!import.meta.env.VITE_RAZORPAY_KEY_ID) {
      toast.error("Razorpay Test Mode key is missing in frontend .env");
      return;
    }

    try {
      setIsLoading(true);
      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
        toast.error("Could not load Razorpay checkout");
        return;
      }

      const { data } = await createDonationOrder({
        name: form.name,
        email: form.email,
        amount: selectedAmount
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "She Can Foundation Demo",
        description: "Demo Donation - Test Mode",
        order_id: data.order.id,
        prefill: {
          name: form.name,
          email: form.email
        },
        theme: {
          color: "#a21caf"
        },
        handler: async (response) => {
          try {
            await verifyDonationPayment({
              donationId: data.donationId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            toast.success("Demo Payment Successful. Thank you for supporting the mission.");
            setSuccessMessage("Demo Payment Successful. Thank you for supporting the mission.");
            setForm({ name: "", email: "", amount: 500, customAmount: "" });
          } catch (error) {
            toast.error(error.response?.data?.message || "Payment verification failed");
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not start demo donation");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="donate" className="bg-gradient-to-b from-violet-50 to-white py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-fuchsia-700">Donate</p>
          <h2 className="mt-3 text-3xl font-black text-purple-950 sm:text-4xl">Want to Support the Mission?</h2>
          <p className="mt-5 text-base leading-8 text-purple-900/76">
            This project includes a Razorpay checkout flow for internship demonstration and admin record keeping.
          </p>
          <div className="mt-6 rounded-3xl border border-amber-100 bg-amber-50 p-5 text-sm font-bold leading-7 text-amber-800">
            <Info className="mb-2" size={20} />
            This is a demo donation payment using Razorpay Test Mode. No real donation is collected.
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-bold text-purple-950">Name</span>
              <input
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                className="mt-2 w-full rounded-2xl border border-purple-100 bg-white/88 px-4 py-3 outline-none focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100"
                placeholder="Donor name"
              />
              {errors.name && <span className="mt-1 block text-sm font-semibold text-rose-600">{errors.name}</span>}
            </label>
            <label className="block">
              <span className="text-sm font-bold text-purple-950">Email</span>
              <input
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                className="mt-2 w-full rounded-2xl border border-purple-100 bg-white/88 px-4 py-3 outline-none focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100"
                placeholder="you@example.com"
              />
              {errors.email && <span className="mt-1 block text-sm font-semibold text-rose-600">{errors.email}</span>}
            </label>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {amounts.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => setForm((current) => ({ ...current, amount, customAmount: "" }))}
                className={`rounded-2xl border px-4 py-4 text-sm font-black transition ${
                  selectedAmount === amount && !form.customAmount
                    ? "border-fuchsia-500 bg-fuchsia-600 text-white"
                    : "border-purple-100 bg-white text-purple-950 hover:border-fuchsia-300"
                }`}
              >
                ₹{amount}
              </button>
            ))}
          </div>

          <label className="mt-5 block">
            <span className="text-sm font-bold text-purple-950">Custom Amount</span>
            <input
              type="number"
              min="1"
              value={form.customAmount}
              onChange={(event) => updateField("customAmount", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-purple-100 bg-white/88 px-4 py-3 outline-none focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100"
              placeholder="Enter amount"
            />
            {errors.amount && <span className="mt-1 block text-sm font-semibold text-rose-600">{errors.amount}</span>}
          </label>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleDonate}
              disabled={isLoading}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-violet-700 px-6 py-3.5 text-sm font-extrabold text-white shadow-glow transition hover:-translate-y-0.5 disabled:opacity-70"
            >
              <IndianRupee size={18} />
              {isLoading ? "Opening Test Checkout..." : "Donate in Test Mode"}
            </button>
            <button
              type="button"
              onClick={() => onDonationInterest(selectedAmount || 500)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-purple-200 bg-white px-6 py-3.5 text-sm font-extrabold text-purple-950 transition hover:bg-fuchsia-50"
            >
              <HeartHandshake size={18} />
              Donation Interest
            </button>
          </div>

          {successMessage && (
            <p className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
              {successMessage}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default DonationSection;
