# 🚖 FareShare — One-Page Progress Update
**coNStruCT 2.0 Product × AI Hackathon Checkpoint**  
**Team EnderMen** · *Prachi Vats, Kaashvi Saini, Ashwin Anand, Swapnil Pradhan, Akshat Kumar*

---

### 1. Executive Summary & Problem
University and college students frequently overpay for solo cabs (up to ₹1,400 to IGI Airport T3, ₹900 to NDLS Railway) or spam chaotic student WhatsApp groups trying to find co-riders. Dragging luggage through 2 metro line transfers is exhausting, while unverified group chats leak personal phone numbers. 

**FareShare** matches verified college peers traveling along identical departure corridors, dividing cab fares 4 ways to deliver **door-to-door AC cab comfort at metro prices (up to 75% savings)** with zero data leakage.

---

### 2. What We Have Built & Shipped (Live MVP)

| Module | Implementation Status | Technical Highlights |
|---|:---:|---|
| **Conversational Travel Omnibox** | ✅ **Live** | Web Speech API voice input (`hi-IN` / `en-IN`) + Bilingual Indic NLP parsing (understands natural Hindi, Hinglish, & English queries like *"Kal shaam 4 baje airport jaana hai 1 trolley ke sath"*). |
| **Deterministic Transit Matrix** | ✅ **Live** | Pre-calibrated Delhi-NCR commercial rate cards providing real-time multi-modal comparisons (Uber Go, Ola Mini, Delhi Metro DMRC, and FareShare 4-way split). |
| **🌸 Girls-Only Safe Circles** | ✅ **Live** | One-tap safety filter strictly matching verified female college students for airport and late-night station transfers. |
| **Ephemeral Chat Drawer** | ✅ **Live** | 4-stage lifecycle (`Upcoming` ➔ `In Transit` ➔ `Grace Period` ➔ `Expired`) with **4-hour cryptographic auto-purge** of student chat logs post-trip. |
| **Zero-Fee UPI Settlement** | ✅ **Live** | In-app one-tap UPI deep-links (`upi://pay`) for direct peer-to-peer fare settlement with zero gateway cuts. |
| **Design System & Micro-Interactions** | ✅ **Live** | Warm Linen (`#FAF8F5`) + Forest Olive (`#1A3D34`) aesthetic, Elliot Eriksson curtain-wipe preloader, and React Bits animations. |

---

### 3. Key Impact Metrics & Unit Economics

- **Per-Student Cost Reduction**: Drops IGI T3 fare from **₹1,400 solo ➔ ₹350 / student** (matching ₹60 Metro + ₹100 auto feeder cost).
- **Privacy Protection**: **0** public phone numbers displayed; **100%** of coordination messages automatically wiped 4 hours post-ride.
- **Luggage Boot Space Guarantee**: Enforces 1 trolley / rider cap on standard cabs to eliminate trunk overflow surprises.

---

### 4. Tech Stack & Repository Links

- **Frontend & Runtime**: React 19, Vite 6, Tailwind CSS 3, Lucide React, Canvas Confetti.
- **Audio & NLP**: Web Audio API Sound Synthesis, Web Speech API (`hi-IN`), Indic semantic token parsing.
- **GitHub Repository**: [https://github.com/Prachivats-21/fareshare](https://github.com/Prachivats-21/fareshare) *(Zero-config Replit `.replit` & Vercel `vercel.json` included)*.
- **Live Deployment Link**: `https://prachivats-21.github.io/fareshare/` *(and Replit deployment link below)*.

---

### 5. Final Presentation Roadmap (Next 12–24 Hours)

1. **Enterprise API Integration**: Plug in live Uber Developer API tokens for dynamic real-time surge pricing.
2. **Automated Settlement Webhooks**: Connect NPCI Bharat QR webhooks for instant split verification.
3. **Cross-Campus Expansion**: Add automated corridor onboarding for additional university campuses across Delhi-NCR.
