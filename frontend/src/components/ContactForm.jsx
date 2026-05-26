import { forwardRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Mail } from "lucide-react";
import { createMessage } from "../services/messageService.js";

const interestOptions = [
  "General Message",
  "Volunteer",
  "Donation Interest",
  "Partnership",
  "Internship Query"
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  interestType: "General Message",
  message: ""
};

const validateForm = (form) => {
  const errors = {};

  if (form.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (form.phone.trim() && !/^\d{10}$/.test(form.phone.trim())) {
    errors.phone = "Phone must be exactly 10 digits.";
  }

  if (!interestOptions.includes(form.interestType)) {
    errors.interestType = "Please select an interest type.";
  }

  if (form.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
};

const ContactForm = forwardRef(({ prefill }, ref) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (prefill) {
      setForm((current) => ({ ...current, ...prefill }));
    }
  }, [prefill]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));

    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: "" }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      await createMessage(form);
      setForm(initialForm);
      setErrors({});
      setSuccessMessage("Form Submitted Successfully. Thank you for supporting the mission.");
      toast.success("Form Submitted Successfully");
    } catch (error) {
      const apiErrors = error.response?.data?.errors;
      if (apiErrors) {
        setErrors(apiErrors);
      }
      toast.error(error.response?.data?.message || "Could not submit message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="bg-[#fff7fb] py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-fuchsia-700">Contact</p>
          <h2 className="mt-3 text-3xl font-black text-purple-950 sm:text-4xl">Send Us a Message</h2>
          <p className="mt-4 max-w-xl text-base leading-8 text-purple-900/76">
            Share a query, volunteer note, partnership idea, internship question, or donation interest. Public users can submit this form without login.
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-bold text-purple-950">Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-purple-100 bg-white/88 px-4 py-3 outline-none focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100"
                placeholder="Your name"
              />
              {errors.name && <span className="mt-1 block text-sm font-semibold text-rose-600">{errors.name}</span>}
            </label>

            <label className="block">
              <span className="text-sm font-bold text-purple-950">Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-purple-100 bg-white/88 px-4 py-3 outline-none focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100"
                placeholder="you@example.com"
              />
              {errors.email && <span className="mt-1 block text-sm font-semibold text-rose-600">{errors.email}</span>}
            </label>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-bold text-purple-950">Phone optional</span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-purple-100 bg-white/88 px-4 py-3 outline-none focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100"
                placeholder="9876543210"
              />
              {errors.phone && <span className="mt-1 block text-sm font-semibold text-rose-600">{errors.phone}</span>}
            </label>

            <label className="block">
              <span className="text-sm font-bold text-purple-950">Interest Type</span>
              <select
                name="interestType"
                value={form.interestType}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-purple-100 bg-white/88 px-4 py-3 outline-none focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100"
              >
                {interestOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.interestType && <span className="mt-1 block text-sm font-semibold text-rose-600">{errors.interestType}</span>}
            </label>
          </div>

          <label className="mt-5 block">
            <span className="text-sm font-bold text-purple-950">Message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="6"
              className="mt-2 w-full resize-none rounded-2xl border border-purple-100 bg-white/88 px-4 py-3 outline-none focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100"
              placeholder="Write your message..."
            />
            {errors.message && <span className="mt-1 block text-sm font-semibold text-rose-600">{errors.message}</span>}
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-violet-700 px-6 py-3.5 text-sm font-extrabold text-white shadow-glow transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Mail size={18} />
            {isSubmitting ? "Submitting..." : "Submit Message"}
          </button>

          {successMessage && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700"
            >
              {successMessage}
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
});

ContactForm.displayName = "ContactForm";

export default ContactForm;
