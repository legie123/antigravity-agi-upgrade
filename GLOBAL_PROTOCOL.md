# 🏗️ Antigravity Global Infrastructure & Design Protocol

This document defines the mandatory architectural and aesthetic standards for the Antigravity ecosystem.

## 📐 Project Standards

### Containerization
- **Web Applications**: Use `node:alpine`.
- **Static Sites**: Use `nginx:alpine`.
- **Port**: Always use port **8080** (Cloud Run standard).
- **Mandatory Files**: `Dockerfile`, `.dockerignore`, `.gcloudignore`.

### Nginx Configuration (Static Sites)
- **Gzip**: Enabled for all text and asset types.
- **Cache**: 7 days for static assets, 5 minutes for HTML.
- **Security Headers (Mandatory 7)**:
  - `X-Frame-Options: SAMEORIGIN`
  - `X-Content-Type-Options: nosniff`
  - `X-XSS-Protection: 1; mode=block`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains`

### Cloud Run Deployment
- **Memory**: 128Mi (Static), 256Mi (Node.js), 512Mi (Heavy Ops).
- **CPU**: 1 vCPU, throttled (idle = $0) for cost optimization.
- **Instances**: Min 0, Max 3 (Static) or 10 (Apps).
- **Flag**: Always `--allow-unauthenticated` for public sites.

---

## 🎨 Design & UI Protocol

> [!IMPORTANT]
> **FRONTEND EXCLUSIVITY**: All UI/UX development MUST be performed using the **Claude 3.5 Sonnet** (or later) model for premium aesthetics.

### Aesthetic Requirements
- **Premium Look**: Dark mode preferred, vibrant but curated colors (HSL), avoid generic browser defaults.
- **Typography**: Google Fonts (Inter, Roboto, Outfit).
- **Interactivity**: Smooth gradients, subtle micro-animations, hover effects.
- **Mobile-First**: Fully responsive layouts.
- **SEO**: Semantic HTML, proper heading hierarchy, meta descriptions.

---

## 🔒 Security Protocol
- **Secrets**: NEVER hardcode API keys. Use `.env` files (added to `.gitignore`).
- **HTTPS**: Enforce HTTPS for all public endpoints.
- **CSP**: Project-specific Content Security Policy mandatory for every deployment.
