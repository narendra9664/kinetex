import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowRight, Check } from "lucide-react";
import { submitLead } from "@/lib/leads";

const inputCls =
  "w-full rounded-full border border-navy/15 bg-white px-5 py-3.5 text-base text-navy placeholder:text-muted-brand/70 outline-none focus:border-trust-blue focus:ring-2 focus:ring-trust-blue/20 transition";

/**
 * Name / email / phone form that posts to the Slack lead relay.
 * Calls onSuccess(lead) after the relay accepts the submission.
 */
export function LeadForm({ source, submitLabel = "Submit", onSuccess, compact = false }) {
  const [values, setValues] = useState({ name: "", email: "", phone: "", website: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | error
  const [error, setError] = useState("");

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await submitLead({ ...values, source });
      setStatus("idle");
      onSuccess?.(values);
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className={compact ? "space-y-3" : "space-y-3.5"}>
      <input className={inputCls} placeholder="Your name" autoComplete="name" required value={values.name} onChange={set("name")} aria-label="Name" />
      <input className={inputCls} type="email" placeholder="Email address" autoComplete="email" required value={values.email} onChange={set("email")} aria-label="Email" />
      <input className={inputCls} type="tel" placeholder="Phone number (optional)" autoComplete="tel" value={values.phone} onChange={set("phone")} aria-label="Phone number" />
      {/* Honeypot — hidden from people, filled by bots */}
      <input type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} className="hidden" aria-hidden="true" />
      {error && <p className="text-sm text-destructive px-2">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="group w-full rounded-full bg-navy text-white py-4 text-sm font-semibold tracking-wide inline-flex items-center justify-center gap-2 hover:bg-trust-blue transition-colors disabled:opacity-60"
      >
        {status === "sending" ? "SENDING…" : submitLabel}
        {status !== "sending" && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
      </button>
      <p className="text-[11px] text-muted-brand text-center">No spam. Unsubscribe any time.</p>
    </form>
  );
}

/** Rounded modal wrapper around LeadForm with a built-in success state. */
export default function LeadFormModal({ open, onClose, eyebrow, title, subtitle, source, submitLabel, onSuccess, successContent }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) return;
    setDone(false);
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div className="absolute inset-0 bg-deep-navy/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md rounded-[28px] bg-off-white p-7 sm:p-9 shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 h-9 w-9 rounded-full bg-white text-navy flex items-center justify-center hover:bg-light-blue transition-colors"
            >
              <X size={16} />
            </button>

            {done ? (
              <div className="text-center py-4">
                <div className="mx-auto h-14 w-14 rounded-full bg-accent-green text-navy flex items-center justify-center mb-5">
                  <Check size={26} />
                </div>
                {successContent}
              </div>
            ) : (
              <>
                {eyebrow && <span className="eyebrow text-trust-blue block mb-3">{eyebrow}</span>}
                <h3 className="heading-display text-navy text-3xl sm:text-4xl pr-8">{title}</h3>
                {subtitle && <p className="text-muted-brand text-[15px] mt-3 mb-6 leading-relaxed">{subtitle}</p>}
                <LeadForm
                  source={source}
                  submitLabel={submitLabel}
                  onSuccess={(lead) => {
                    setDone(true);
                    onSuccess?.(lead);
                  }}
                />
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
