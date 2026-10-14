import React, { useEffect, useState } from "react";

interface DoctorAnimationProps {
  focusedField: "none" | "username" | "password" | "submitting";
  isSuccess?: boolean;
}

export const DoctorBriefcaseAnimation: React.FC<DoctorAnimationProps> = ({
  focusedField,
  isSuccess = false,
}) => {
  const [isBriefcaseOpen, setIsBriefcaseOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);

  // Auto-trigger briefcase opening animation smoothly on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBriefcaseOpen(true);
      setHasOpenedOnce(true);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        maxWidth: 420,
        margin: "0 auto",
        position: "relative",
        userSelect: "none",
      }}
    >
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.08); }
        }

        @keyframes sparkleTwinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.6) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.2) rotate(45deg); }
        }

        @keyframes ecgLine {
          0% { stroke-dashoffset: 120; }
          100% { stroke-dashoffset: 0; }
        }

        @keyframes floatItem1 {
          0%, 100% { transform: translate(0px, 0px) rotate(-3deg); }
          50% { transform: translate(-4px, -10px) rotate(4deg); }
        }

        @keyframes floatItem2 {
          0%, 100% { transform: translate(0px, 0px) rotate(2deg); }
          50% { transform: translate(6px, -12px) rotate(-3deg); }
        }

        @keyframes floatItem3 {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(0px, -14px); }
        }

        @keyframes lidOpenTransform {
          0% { transform: rotate(0deg) translateY(0px); }
          100% { transform: rotate(-55deg) translateY(-25px); }
        }

        .doctor-eyes-looking {
          transition: transform 0.25s ease-out;
        }

        .briefcase-lid-trans {
          transition: transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease;
          transform-origin: 130px 240px;
        }

        .floating-item {
          transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>

      {/* SVG Canvas */}
      <svg
        viewBox="0 0 400 360"
        style={{
          width: "100%",
          height: "auto",
          maxHeight: 330,
          filter: "drop-shadow(0 14px 28px rgba(5, 150, 105, 0.16))",
        }}
      >
        <defs>
          {/* Background Radial Glow */}
          <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#059669" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0" />
          </radialGradient>

          {/* Golden Glow for Open Briefcase */}
          <radialGradient id="caseGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#34d399" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>

          {/* Doctor Coat Gradients */}
          <linearGradient id="coatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>

          <linearGradient id="scrubGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          {/* Briefcase Gradients */}
          <linearGradient id="caseBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f766e" />
            <stop offset="100%" stopColor="#115e59" />
          </linearGradient>

          <linearGradient id="caseLidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>

          <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          {/* Pill Capsule Gradient */}
          <linearGradient id="capsuleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>

        {/* Ambient Glow behind Character & Case */}
        <ellipse
          cx="200"
          cy="200"
          rx="170"
          ry="130"
          fill="url(#bgGlow)"
          style={{ animation: "pulseGlow 4s infinite ease-in-out" }}
        />

        {/* ========================================================
            DOKTER CHARACTER (dr. Hendra - Dokter K3)
            ======================================================== */}
        <g id="doctor" style={{ animation: "floatSlow 4s ease-in-out infinite" }}>
          {/* Doctor Body & Coat */}
          {/* Shoulders / Coat */}
          <path
            d="M 120 185 C 120 145, 150 135, 200 135 C 250 135, 280 145, 280 185 L 290 270 L 110 270 Z"
            fill="url(#coatGrad)"
            stroke="#cbd5e1"
            strokeWidth="2.5"
          />

          {/* Inner Scrubs (K3 Green) */}
          <path
            d="M 175 145 L 225 145 L 215 200 L 185 200 Z"
            fill="url(#scrubGrad)"
          />

          {/* Coat Lapels */}
          <path
            d="M 170 140 L 155 190 L 175 190 Z"
            fill="#e2e8f0"
          />
          <path
            d="M 230 140 L 245 190 L 225 190 Z"
            fill="#e2e8f0"
          />

          {/* K3 ID Badge on Coat */}
          <g transform="translate(138, 160)">
            <rect x="0" y="0" width="22" height="28" rx="3" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
            <rect x="3" y="4" width="16" height="10" rx="2" fill="#059669" />
            <rect x="9.5" y="6" width="3" height="6" fill="#ffffff" />
            <rect x="8" y="7.5" width="6" height="3" fill="#ffffff" />
            <line x1="3" y1="18" x2="19" y2="18" stroke="#64748b" strokeWidth="1.5" />
            <line x1="3" y1="22" x2="15" y2="22" stroke="#94a3b8" strokeWidth="1" />
          </g>

          {/* Stethoscope around Neck */}
          <path
            d="M 165 145 C 165 185, 180 205, 200 205 C 220 205, 235 185, 235 145"
            fill="none"
            stroke="#334155"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M 195 205 L 195 220"
            fill="none"
            stroke="#334155"
            strokeWidth="4"
          />
          {/* Stethoscope Chest Piece */}
          <circle cx="195" cy="226" r="9" fill="url(#metalGrad)" stroke="#475569" strokeWidth="2" />
          <circle cx="195" cy="226" r="5" fill="#38bdf8" />

          {/* Neck */}
          <rect x="186" y="120" width="28" height="24" rx="4" fill="#fed7aa" />

          {/* Doctor Head */}
          <circle cx="200" cy="98" r="42" fill="#fde68a" />
          {/* Cheek Blush */}
          <ellipse cx="176" cy="112" rx="7" ry="4" fill="#fca5a5" opacity="0.6" />
          <ellipse cx="224" cy="112" rx="7" ry="4" fill="#fca5a5" opacity="0.6" />

          {/* Doctor Hair (Neat Professional Style) */}
          <path
            d="M 158 92 C 158 55, 242 55, 242 92 C 242 82, 230 68, 200 68 C 170 68, 158 80, 158 92 Z"
            fill="#1e293b"
          />
          <path
            d="M 160 88 C 165 72, 195 72, 202 85 C 208 72, 238 74, 240 88"
            fill="#1e293b"
          />

          {/* Doctor Medical Head Cap / Headband (Optional accent - clean stethoscope earpieces) */}
          <path
            d="M 166 110 C 162 120, 162 135, 168 145"
            fill="none"
            stroke="#475569"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="166" cy="110" r="3" fill="#cbd5e1" />
          <path
            d="M 234 110 C 238 120, 238 135, 232 145"
            fill="none"
            stroke="#475569"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="234" cy="110" r="3" fill="#cbd5e1" />

          {/* Doctor Eyebrows */}
          <path
            d={focusedField === "password" ? "M 172 86 Q 183 90 190 88" : "M 172 86 Q 183 82 190 86"}
            fill="none"
            stroke="#1e293b"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d={focusedField === "password" ? "M 210 88 Q 217 90 228 86" : "M 210 86 Q 217 82 228 86"}
            fill="none"
            stroke="#1e293b"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Doctor Eyes & Expression Behavior */}
          {focusedField === "password" ? (
            /* Peeking / shy eyes when typing password */
            <g id="eyes-peeking">
              {/* Left Eye Peeking */}
              <ellipse cx="182" cy="99" rx="5" ry="3" fill="#1e293b" />
              <circle cx="183" cy="98" r="1.5" fill="#ffffff" />
              {/* Right Eye Wink / Blink */}
              <path
                d="M 213 100 Q 220 95 227 100"
                fill="none"
                stroke="#1e293b"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>
          ) : focusedField === "username" ? (
            /* Looking down-right at the input field attentively */
            <g id="eyes-username" className="doctor-eyes-looking" style={{ transform: "translate(2px, 3px)" }}>
              <ellipse cx="180" cy="97" rx="5" ry="6" fill="#1e293b" />
              <circle cx="181" cy="96" r="2" fill="#ffffff" />
              <ellipse cx="220" cy="97" rx="5" ry="6" fill="#1e293b" />
              <circle cx="221" cy="96" r="2" fill="#ffffff" />
            </g>
          ) : isSuccess ? (
            /* Joyful happy curved eyes */
            <g id="eyes-happy">
              <path
                d="M 174 100 Q 182 92 190 100"
                fill="none"
                stroke="#047857"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M 210 100 Q 218 92 226 100"
                fill="none"
                stroke="#047857"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
          ) : (
            /* Normal friendly attentive eyes */
            <g id="eyes-normal">
              <ellipse cx="181" cy="98" rx="4.5" ry="5.5" fill="#1e293b" />
              <circle cx="182.5" cy="96.5" r="1.8" fill="#ffffff" />
              <ellipse cx="219" cy="98" rx="4.5" ry="5.5" fill="#1e293b" />
              <circle cx="220.5" cy="96.5" r="1.8" fill="#ffffff" />
            </g>
          )}

          {/* Glasses Frame (Modern Stylish Doctor Glasses) */}
          <g stroke="#0284c7" strokeWidth="2" fill="none" opacity="0.85">
            <rect x="168" y="90" width="24" height="17" rx="4" />
            <rect x="208" y="90" width="24" height="17" rx="4" />
            <line x1="192" y1="97" x2="208" y2="97" />
          </g>

          {/* Doctor Nose */}
          <path
            d="M 200 103 Q 203 107 199 108"
            fill="none"
            stroke="#d97706"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Doctor Smile */}
          <path
            d={isSuccess ? "M 189 114 Q 200 124 211 114" : "M 191 115 Q 200 121 209 115"}
            fill={isSuccess ? "#ef4444" : "none"}
            stroke="#1e293b"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Hands holding or gesturing */}
          {focusedField === "password" ? (
            /* Hands playfully peeking next to eyes */
            <g id="hands-peeking">
              <circle cx="160" cy="104" r="10" fill="#fed7aa" stroke="#cbd5e1" strokeWidth="2" />
              <circle cx="240" cy="104" r="10" fill="#fed7aa" stroke="#cbd5e1" strokeWidth="2" />
            </g>
          ) : (
            /* Hands resting on the desk / holding briefcase handle */
            <g id="hands-holding">
              <ellipse cx="140" cy="245" rx="12" ry="9" fill="#fed7aa" stroke="#cbd5e1" strokeWidth="2" />
              <ellipse cx="260" cy="245" rx="12" ry="9" fill="#fed7aa" stroke="#cbd5e1" strokeWidth="2" />
            </g>
          )}
        </g>

        {/* ========================================================
            FLOATING MEDICAL INSTRUMENTS FROM OPENED BRIEFCASE
            ======================================================== */}
        <g
          id="floating-medical-items"
          className="floating-item"
          style={{
            opacity: isBriefcaseOpen ? 1 : 0,
            transform: isBriefcaseOpen ? "translateY(0)" : "translateY(25px)",
            pointerEvents: "none",
          }}
        >
          {/* Light Rays & Golden Burst */}
          <ellipse
            cx="200"
            cy="235"
            rx="65"
            ry="25"
            fill="url(#caseGlow)"
            style={{ animation: "pulseGlow 2.5s infinite" }}
          />

          {/* Sparkles */}
          <path
            d="M 130 180 L 133 186 L 139 189 L 133 192 L 130 198 L 127 192 L 121 189 L 127 186 Z"
            fill="#fbbf24"
            style={{ animation: "sparkleTwinkle 2s infinite" }}
          />
          <path
            d="M 270 175 L 272 180 L 277 182 L 272 184 L 270 189 L 268 184 L 263 182 L 268 180 Z"
            fill="#34d399"
            style={{ animation: "sparkleTwinkle 2.4s 0.6s infinite" }}
          />
          <path
            d="M 200 160 L 202 165 L 207 167 L 202 169 L 200 174 L 198 169 L 193 167 L 198 165 Z"
            fill="#38bdf8"
            style={{ animation: "sparkleTwinkle 1.8s 1.2s infinite" }}
          />

          {/* 1. Floating First-Aid Shield / Palang Merah-Hijau K3 (Left) */}
          <g
            id="item-k3-cross"
            style={{ animation: "floatItem1 3s ease-in-out infinite" }}
          >
            <circle cx="115" cy="205" r="19" fill="#ffffff" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.12))" />
            <circle cx="115" cy="205" r="18" fill="#10b981" />
            {/* White Cross */}
            <rect x="112" y="193" width="6" height="24" rx="2" fill="#ffffff" />
            <rect x="103" y="202" width="24" height="6" rx="2" fill="#ffffff" />
          </g>

          {/* 2. Floating ECG Pulse Rhythm / Detak Jantung (Center Top) */}
          <g
            id="item-ecg"
            style={{ animation: "floatItem3 3.5s 0.4s ease-in-out infinite" }}
          >
            <rect
              x="160"
              y="165"
              width="80"
              height="26"
              rx="13"
              fill="rgba(15, 23, 42, 0.85)"
              stroke="#10b981"
              strokeWidth="1.5"
            />
            {/* Animated ECG Line */}
            <path
              d="M 168 178 L 180 178 L 185 171 L 191 185 L 196 173 L 201 178 L 232 178"
              fill="none"
              stroke="#34d399"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="120"
              style={{ animation: "ecgLine 2s linear infinite" }}
            />
          </g>

          {/* 3. Floating Medical Capsule / Obat K3 (Right) */}
          <g
            id="item-capsule"
            style={{ animation: "floatItem2 3.2s 0.8s ease-in-out infinite" }}
          >
            <g transform="translate(285, 205) rotate(35)">
              <rect
                x="-8"
                y="-18"
                width="16"
                height="36"
                rx="8"
                fill="url(#capsuleGrad)"
                filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))"
              />
              <line x1="-8" y1="0" x2="8" y2="0" stroke="#ffffff" strokeWidth="1.5" />
            </g>
          </g>
        </g>

        {/* ========================================================
            KOPER MEDIS SIAGA K3 (MEDICAL BRIEFCASE)
            ======================================================== */}
        <g id="briefcase-assembly">
          {/* Shadow beneath briefcase */}
          <ellipse cx="200" cy="335" rx="100" ry="12" fill="#0f172a" opacity="0.16" />

          {/* Briefcase Back Interior (Visible when opened) */}
          {isBriefcaseOpen && (
            <g id="briefcase-interior">
              <path
                d="M 115 250 L 285 250 L 290 320 L 110 320 Z"
                fill="#042f2e"
                stroke="#134e4a"
                strokeWidth="2"
              />
              {/* Internal compartments & instruments */}
              <rect x="125" y="260" width="35" height="48" rx="4" fill="#115e59" stroke="#14b8a6" strokeWidth="1" />
              <rect x="170" y="260" width="60" height="48" rx="4" fill="#0f766e" stroke="#14b8a6" strokeWidth="1" />
              <rect x="240" y="260" width="35" height="48" rx="4" fill="#115e59" stroke="#14b8a6" strokeWidth="1" />
              {/* Syringe / vials inside pocket */}
              <line x1="135" y1="266" x2="135" y2="298" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
              <line x1="145" y1="266" x2="145" y2="298" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
            </g>
          )}

          {/* Briefcase Base Container (Bottom Half) */}
          <rect
            x="110"
            y="265"
            width="180"
            height="62"
            rx="12"
            fill="url(#caseBodyGrad)"
            stroke="#0d9488"
            strokeWidth="3"
            filter="drop-shadow(0 6px 12px rgba(0,0,0,0.2))"
          />

          {/* Chrome Corner Guards & Rim */}
          <path d="M 110 275 L 122 275 L 122 265" stroke="url(#metalGrad)" strokeWidth="3" fill="none" />
          <path d="M 290 275 L 278 275 L 278 265" stroke="url(#metalGrad)" strokeWidth="3" fill="none" />
          <path d="M 110 315 L 122 315 L 122 327" stroke="url(#metalGrad)" strokeWidth="3" fill="none" />
          <path d="M 290 315 L 278 315 L 278 327" stroke="url(#metalGrad)" strokeWidth="3" fill="none" />

          {/* Briefcase Badge on Base: "K3 MEDIKA" */}
          <rect x="160" y="284" width="80" height="24" rx="6" fill="#134e4a" stroke="url(#metalGrad)" strokeWidth="1.5" />
          <text
            x="200"
            y="300"
            textAnchor="middle"
            fill="#5eead4"
            fontSize="10"
            fontWeight="bold"
            letterSpacing="1"
          >
            PRIMA K3
          </text>

          {/* Dual Chrome Latches / Locks */}
          <rect x="138" y="260" width="16" height="18" rx="3" fill="url(#metalGrad)" stroke="#475569" strokeWidth="1" />
          <circle cx="146" cy="271" r="2" fill="#0f172a" />
          <rect x="246" y="260" width="16" height="18" rx="3" fill="url(#metalGrad)" stroke="#475569" strokeWidth="1" />
          <circle cx="254" cy="271" r="2" fill="#0f172a" />

          {/* ========================================================
              ANIMATED BRIEFCASE TOP LID (Opens up smoothly)
              ======================================================== */}
          <g
            id="briefcase-lid"
            className="briefcase-lid-trans"
            style={{
              transform: isBriefcaseOpen
                ? "perspective(600px) rotateX(115deg) translateY(-26px) scale(0.96)"
                : "perspective(600px) rotateX(0deg) translateY(0px)",
              transformOrigin: "200px 265px",
            }}
          >
            {/* Top Lid Shell */}
            <path
              d="M 110 268 C 110 252, 116 238, 130 238 L 270 238 C 284 238, 290 252, 290 268 Z"
              fill="url(#caseLidGrad)"
              stroke="#0f766e"
              strokeWidth="3"
            />

            {/* Handle on the Lid */}
            <path
              d="M 172 238 L 172 222 C 172 216, 178 212, 184 212 L 216 212 C 222 212, 228 216, 228 222 L 228 238"
              fill="none"
              stroke="#042f2e"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M 180 212 L 220 212"
              stroke="url(#metalGrad)"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Medical Cross on the Lid (Palang Merah / Hijau K3) */}
            <circle cx="200" cy="253" r="10" fill="#ffffff" stroke="#0f766e" strokeWidth="1.5" />
            <rect x="198" y="247" width="4" height="12" rx="1" fill="#059669" />
            <rect x="194" y="251" width="12" height="4" rx="1" fill="#059669" />
          </g>
        </g>
      </svg>

      {/* Interactive Status & Quick Briefcase Action */}
      <div
        style={{
          marginTop: -6,
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(8px)",
          padding: "6px 14px",
          borderRadius: 20,
          border: "1px solid rgba(5, 150, 105, 0.2)",
          boxShadow: "0 4px 12px rgba(5, 150, 105, 0.08)",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: isBriefcaseOpen ? "#10b981" : "#f59e0b",
            boxShadow: isBriefcaseOpen
              ? "0 0 8px #10b981"
              : "0 0 6px #f59e0b",
          }}
        />
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#0f766e",
            letterSpacing: 0.2,
          }}
        >
          {isSuccess
            ? "Verifikasi Sukses! Membuka Portal..."
            : isBriefcaseOpen
            ? "Koper Medis K3 Terbuka & Siap Digunakan"
            : "Dokter sedang menyiapkan koper medis..."}
        </span>
        <button
          type="button"
          onClick={() => setIsBriefcaseOpen(!isBriefcaseOpen)}
          title={isBriefcaseOpen ? "Tutup Koper" : "Buka Koper"}
          style={{
            border: "none",
            background: isBriefcaseOpen ? "#e0f2fe" : "#d1fae5",
            color: isBriefcaseOpen ? "#0369a1" : "#047857",
            padding: "2px 8px",
            borderRadius: 10,
            fontSize: 10,
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          {isBriefcaseOpen ? "🔄 Tutup" : "✨ Buka Koper"}
        </button>
      </div>
    </div>
  );
};
