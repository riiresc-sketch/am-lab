<div align="center">

# ⚡ AM Labs — by Shinka

**alight motion auth lab — research & interoperability**

*educational firebase auth flow study, cli + web*

<img src="https://img.shields.io/badge/by-shinka-ff0055" alt="">
<img src="https://img.shields.io/badge/status-research-blue" alt="">
<img src="https://img.shields.io/badge/node-18%2B-black" alt="">
<img src="https://img.shields.io/badge/license-MIT-white" alt="">

**built by iyan**

</div>

> **DISCLAIMER:** This project is an independent research implementation of Firebase Email Link Authentication flow used by many Android apps. It does NOT provide, bypass, or generate premium entitlements. You must own a legitimate license/subscription from Alight Creative to access premium features. This is for educational purposes only.

---

### what is this?

Gw bedah gimana Alight Motion handle Firebase Auth di Android — dari `x-android-package` header sampe `verify` flow-nya.

Project ini gw bikin ulang flow-nya jadi versi web & CLI biar gampang dipelajari, bukan buat ngebobol. Intinya buat belajar:
- gimana email link auth bekerja di production app
- gimana client android ngomong sama Firebase
- gimana manage session & token dengan benar

### features

- **email link auth lab** — implementasi clean firebase `sendOobCode` & `signInWithEmailLink`
- **session manager** — simpan & refresh token dengan aman (local only)
- **web ui** — clean ui buat testing flow
- **cli mode** — buat yang suka terminal
- **open source** — 100% readable, no obfuscation

### tech stack

`Node.js / Express / Firebase Auth REST API / Vanilla JS`

### how to run (lab mode)

```bash
git clone https://github.com/shinka/am-lab
cd am-labs
npm install
node server.js