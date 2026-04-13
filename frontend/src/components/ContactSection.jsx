import { useState } from "react";
import { submitContact } from "../api/client.js";

export default function ContactSection({ profile }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "idle", text: "" });
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: "idle", text: "" });
    try {
      const res = await submitContact(form);
      setStatus({
        type: "success",
        text: `Message received (reference ${res.id}). I will get back to you soon.`,
      });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({
        type: "error",
        text: err.message || "Something went wrong. Please try again shortly.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="bg-gradient-to-b from-slate-50 to-white py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
            Contact
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Let us build something dependable together
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
            This form posts to your Spring Boot contact microservice through the API gateway—ideal for
            wiring to email providers or ticketing tools later.
          </p>
          <div className="mt-8 space-y-3 text-sm text-slate-700">
            <p>
              <span className="font-semibold text-slate-900">Email:</span> {profile.email}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Phone:</span> {profile.phone}
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#0A66C2] px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#084d94]"
            >
              LinkedIn
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2 text-xs font-semibold text-slate-900 shadow-sm transition hover:border-slate-400"
            >
              GitHub
            </a>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
        >
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-600" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                required
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-teal-400/0 transition focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-100"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-teal-400/0 transition focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-100"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-teal-400/0 transition focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-100"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
          </div>

          {status.text && (
            <p
              className={`mt-4 rounded-2xl px-3 py-2 text-xs font-medium md:text-sm ${
                status.type === "success"
                  ? "bg-emerald-50 text-emerald-900"
                  : "bg-rose-50 text-rose-900"
              }`}
            >
              {status.text}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-indigo-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Send message"}
          </button>
        </form>
      </div>
    </section>
  );
}
