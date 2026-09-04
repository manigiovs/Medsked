# Medsked

Medsked is a medication-care dashboard built with Expo and React Native Web. The same source powers the mobile screens and the browser experience.

## Run the website locally

```powershell
npm install
npm run web
```

Expo will open the development website in your browser.

## Build the website

```powershell
npm run build:web
```

The production files are generated in `dist/`. Serve that folder from Apache/XAMPP or any static hosting provider.

## Included screens

- Dashboard overview
- Today's doses
- Medication list and add-medication flow
- Adherence tracking
- Dose history
- Caregiver alerts
- Clinical reports

The current app uses local in-memory sample data. A backend can be connected later for authentication, persistence, and real notifications.
