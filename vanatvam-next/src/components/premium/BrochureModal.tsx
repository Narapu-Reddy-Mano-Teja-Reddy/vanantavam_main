"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Leaf, Download, ArrowRight, CheckCircle2 } from "lucide-react";

type BrochureModalProps = {
  isOpen: boolean;
  onClose: () => void;
  brochureUrl?: string | null;
  projectName?: string;
};

export default function BrochureModal({
  isOpen,
  onClose,
  brochureUrl = "/assets/project-images/AnantaVana%20Brochure.pdf",
  projectName = "VanaTvam Project",
}: BrochureModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      project: formData.get("project") || projectName,
      message: `Requested ${projectName} Brochure download.`,
    };

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error("Failed to record lead:", err);
    }

    setSubmitting(false);
    setSubmitted(true);

    // Trigger PDF download automatically
    if (brochureUrl) {
      const link = document.createElement("a");
      link.href = brochureUrl;
      link.download = brochureUrl.split("/").pop() || `${projectName}_Brochure.pdf`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    // Auto close modal after brief confirmation
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "grid",
            placeItems: "center",
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(18, 34, 23, 0.75)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "520px",
              background: "linear-gradient(145deg, #FAFBF9 0%, #F4F7F4 100%)",
              borderRadius: "28px",
              padding: "clamp(28px, 4vw, 40px)",
              boxShadow: "0 30px 70px rgba(0, 0, 0, 0.35)",
              border: "1px solid rgba(198, 162, 101, 0.4)",
              zIndex: 10000,
              boxSizing: "border-box",
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              type="button"
              aria-label="Close modal"
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(18, 34, 23, 0.08)",
                border: "none",
                color: "#183023",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <X size={18} />
            </button>

            {/* Top Gold Accent Line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "15%",
                right: "15%",
                height: "4px",
                borderRadius: "0 0 4px 4px",
                background:
                  "linear-gradient(90deg, transparent, #C6A265, #E9D6AD, #C6A265, transparent)",
              }}
            />

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  textAlign: "center",
                  padding: "20px 0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: "rgba(198, 162, 101, 0.15)",
                    color: "var(--accent-gold, #B38B4D)",
                    display: "grid",
                    placeItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <CheckCircle2 size={36} />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.8rem",
                    color: "#183023",
                    margin: "0 0 10px",
                  }}
                >
                  Brochure Downloading!
                </h3>
                <p style={{ color: "#5A685E", fontSize: "0.98rem", margin: 0 }}>
                  Thank you! Your brochure download has started automatically.
                </p>
              </motion.div>
            ) : (
              <>
                <div style={{ marginBottom: "24px" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "10px",
                    }}
                  >
                    <Leaf size={16} style={{ color: "#B38B4D" }} />
                    <span
                      style={{
                        color: "#987443",
                        fontSize: "0.74rem",
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                      }}
                    >
                      Instant Brochure Access
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(1.8rem, 3vw, 2.2rem)",
                      lineHeight: 1.18,
                      fontWeight: 500,
                      color: "#183023",
                      margin: "0 0 8px",
                    }}
                  >
                    Download {projectName} Brochure
                  </h3>

                  <p
                    style={{
                      color: "#6B776D",
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    Please enter your details below to download the brochure immediately.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <label
                      htmlFor="modal-name"
                      style={{
                        color: "#35483A",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                      }}
                    >
                      Full name
                    </label>
                    <input
                      id="modal-name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      required
                      style={{
                        width: "100%",
                        minHeight: "48px",
                        boxSizing: "border-box",
                        padding: "12px 16px",
                        border: "1px solid #DCE1DA",
                        borderRadius: "10px",
                        background: "#FFFFFF",
                        color: "#26352B",
                        fontFamily: "inherit",
                        fontSize: "0.92rem",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <label
                      htmlFor="modal-phone"
                      style={{
                        color: "#35483A",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                      }}
                    >
                      Phone number
                    </label>
                    <input
                      id="modal-phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      required
                      style={{
                        width: "100%",
                        minHeight: "48px",
                        boxSizing: "border-box",
                        padding: "12px 16px",
                        border: "1px solid #DCE1DA",
                        borderRadius: "10px",
                        background: "#FFFFFF",
                        color: "#26352B",
                        fontFamily: "inherit",
                        fontSize: "0.92rem",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <label
                      htmlFor="modal-email"
                      style={{
                        color: "#35483A",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                      }}
                    >
                      Email address
                    </label>
                    <input
                      id="modal-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      required
                      style={{
                        width: "100%",
                        minHeight: "48px",
                        boxSizing: "border-box",
                        padding: "12px 16px",
                        border: "1px solid #DCE1DA",
                        borderRadius: "10px",
                        background: "#FFFFFF",
                        color: "#26352B",
                        fontFamily: "inherit",
                        fontSize: "0.92rem",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <label
                      htmlFor="modal-project"
                      style={{
                        color: "#35483A",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                      }}
                    >
                      Project of interest
                    </label>
                    <select
                      id="modal-project"
                      name="project"
                      required
                      defaultValue={projectName}
                      style={{
                        width: "100%",
                        minHeight: "48px",
                        boxSizing: "border-box",
                        padding: "12px 16px",
                        border: "1px solid #DCE1DA",
                        borderRadius: "10px",
                        background: "#FFFFFF",
                        color: "#26352B",
                        fontFamily: "inherit",
                        fontSize: "0.92rem",
                        outline: "none",
                        cursor: "pointer",
                      }}
                    >
                      <option value="AnantaVana">
                        Anantavana (Kabini · 35 Acres)
                      </option>
                      <option value="MadhuVana">
                        Madhuvana (Maddur · 18 Acres)
                      </option>
                      <option value="Brindavana">
                        Brindavana (Pavagada · 30 Acres)
                      </option>
                      <option value="Eeshavana">
                        Eeshavana (Cauvery Riverfront)
                      </option>
                    </select>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width: "100%",
                      minHeight: "50px",
                      marginTop: "12px",
                      padding: "12px 20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                      border: "none",
                      borderRadius: "10px",
                      background: "linear-gradient(135deg, #844329, #67301D)",
                      color: "#FFFFFF",
                      fontFamily: "inherit",
                      fontSize: "0.96rem",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {submitting ? (
                      "Preparing Download..."
                    ) : (
                      <>
                        Download Brochure <Download size={18} />
                      </>
                    )}
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
