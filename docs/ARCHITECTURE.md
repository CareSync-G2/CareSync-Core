# CareSync System Architecture

## 1. System Overview
CareSync is a secure, role-based healthcare coordination system designed to unify patient data flow across general practitioners, diagnostic laboratories, specialists, and follow-up care teams.

```
┌────────────────────────────────────────────────────────┐
│               PRESENTATION LAYER (Next.js 15)          │
│   React 19 + TypeScript + Tailwind CSS + Radix UI      │
│   Routes: (dashboard) / patients, appointments, labs   │
│   Accessibility: WCAG 2.1 AA (*:focus-visible)         │
└───────────────────────────┬────────────────────────────┘
                            │ HTTPS / REST API
┌───────────────────────────▼────────────────────────────┐
│                APPLICATION LAYER (NestJS)              │
│   Modules: Auth, Patients, Consultations, Diagnostics  │
│   Security: RBAC Guards, JWT, Argon2id, AES-256 Crypto │
│   Validation: Class-Validator DTO Validation Pipes     │
└───────────────────────────┬────────────────────────────┘
                            │ TypeORM / SQL
┌───────────────────────────▼────────────────────────────┐
│                   DATA & STORAGE LAYER                 │
│   PostgreSQL: Patient records, consultations, audit log│
│   Redis: Session tracking, 15m inactivity lock cache   │
└────────────────────────────────────────────────────────┘
```

## 2. Role-Based Access Control (RBAC) Matrix
| Resource / Action | Receptionist | Physician | Lab User | Administrator |
| :--- | :---: | :---: | :---: | :---: |
| View Patient Demographics | ✅ | ✅ | ✅ | ✅ |
| Create Appointments | ✅ | ✅ | ❌ | ✅ |
| Record Consultations & Vitals | ❌ | ✅ | ❌ | ❌ |
| Submit Diagnostic Results | ❌ | ❌ | ✅ | ❌ |
| View Audit Logs | ❌ | ❌ | ❌ | ✅ |
| Manage User Roles & Accounts | ❌ | ❌ | ❌ | ✅ |
