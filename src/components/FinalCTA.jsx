import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Image } from "@/components/ui/image";
import LeadFormModal from "@/components/LeadForm";
import { submitLead, hasSubmittedLead } from "@/lib/leads";

const CTA_IMG =
  "https://media.base44.com/images/public/6ab1997b13a801d33d37441e/50a07bcbb_generated_8c7e6c94.jpg";
const POPUP_SEEN_KEY = "motionpluse_keep_moving_popup_seen";

function popupAlreadySeen() {
  try {
    return sessionStorage.getItem(POPUP_SEEN_KEY) === "1" || hasSubmittedLead();
  } catch {
    return false;
  }
}

export default function FinalCTA() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { amount: 0.3 });
  const [popupOpen, setPopupOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [error, setError] = useState("");

  // Show the pop-up once per visit, the first time ~30% of the section is on screen.
  useEffect(() => {
    if (!inView || popupAlreadySeen()) return;
    try {
      sessionStorage.setItem(POPUP_SEEN_KEY, "1");
    } catch {
      // storage unavailable — pop-up may show again next time
    }
    setPopupOpen(true);
  }, [inView]);

  const onSubscribe = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await submitLead({ email, source: "keep-moving-inline" });
      setStatus("done");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  };

  return (
    <section ref={sectionRef} id="keep-moving" className="relative bg-deep-navy overflow-hidden">
      <div className="absolute inset-0">
        <Image src={CTA_IMG} alt="Athlete in motion" fittingType="fill" className="h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/80 to-deep-navy/60" />
      </div>

      <div className="relative container-px max-w-[1400px] mx-auto py-28 md:py-40 text-center">
        <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="eyebrow text-accent-green mb-6 block">
          Keep Moving
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="heading-display text-white text-[2.6rem] sm:text-7xl md:text-9xl"
        >
          KEEP MOVING.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-white/70 text-lg mt-6 max-w-md mx-auto"
        >
          Get movement tips, recovery guides and member-only offers straight to your inbox.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          onSubmit={onSubscribe}
          className="mt-10 mx-auto max-w-lg flex flex-col sm:flex-row gap-3 sm:gap-0 sm:rounded-full sm:bg-white sm:p-1.5"
        >
          {status === "done" ? (
            <p className="flex-1 rounded-full bg-accent-green text-navy font-semibold py-4 px-6 inline-flex items-center justify-center gap-2">
              <Check size={18} /> You're on the list. Welcome to MotionPluse.
            </p>
          ) : (
            <>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                aria-label="Email address"
                className="flex-1 min-w-0 rounded-full bg-white sm:bg-transparent px-6 py-4 text-navy placeholder:text-muted-brand outline-none"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-full bg-accent-green text-navy px-7 py-4 text-sm font-semibold tracking-wide hover:bg-navy hover:text-white transition-colors disabled:opacity-60"
              >
                {status === "sending" ? "JOINING…" : "JOIN THE LIST"}
              </button>
            </>
          )}
        </motion.form>
        {error && <p className="text-sm text-red-300 mt-3">{error}</p>}

        <Link
          to="/shop"
          className="group mt-10 inline-flex items-center gap-2 text-white text-sm font-semibold tracking-wide border-b border-white/40 pb-1 hover:border-accent-green transition-colors"
        >
          SHOP ALL SUPPORT
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <LeadFormModal
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        eyebrow="Join MotionPluse"
        title="Keep moving with us."
        subtitle="Leave your details for recovery tips, early access to new products and member-only offers."
        source="keep-moving-popup"
        submitLabel="SIGN ME UP"
        successContent={
          <>
            <h3 className="heading-display text-navy text-3xl">You're in!</h3>
            <p className="text-muted-brand mt-3">Thanks for joining. Look out for our first email soon.</p>
            <button onClick={() => setPopupOpen(false)} className="mt-6 rounded-full bg-navy text-white px-7 py-3 text-sm font-semibold">
              KEEP BROWSING
            </button>
          </>
        }
      />
    </section>
  );
}
