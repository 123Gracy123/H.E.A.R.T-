# H.E.A.R.T* — iOS Prototype (Expo)

Native iPhone prototype based on [heart-app-chi.vercel.app](https://heart-app-chi.vercel.app/login).

## Run the app

```bash
cd mobile
npm install
npx expo start
```

- Press **`i`** for iOS Simulator
- Press **`w`** for web browser
- Or scan the QR code with **Expo Go** on your iPhone (same Wi‑Fi as your Mac)

## Demo sign-in

| Email | Password |
|-------|----------|
| patient@test.com | password123 |
| patient2@test.com | password123 |
| doctor@test.com | password123 |

## Features

- Onboarding (3 slides)
- Login / register
- Bottom tabs: Home, Health, Learn, Chat, Profile
- Settings (dark mode, notifications toggles)
- Mock data — no live API required
- iOS-style UI, animations, glass cards, heart brand colors

## App Store preview assets

See `assets/store-preview/README.md` for screenshot sizes and capture tips.

## Project structure

```
app/           Expo Router screens
components/ui/ Reusable UI
constants/     Theme tokens
context/       Auth + theme
data/          Mock data
assets/        Icon, splash, heart image
```
