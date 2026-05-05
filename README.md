# Fenix Modbus

> This application is embedded and used inside **FenixModbusS7** — it is served by the FenixModbusS7 built-in web server and provides the browser-based UI for the system.

A real-time React dashboard for monitoring and controlling Modbus devices via the Fenix backend.

## Features

- **Tags table** — live view of all process tags with inline value editing
- **Chart** — real-time time-series chart with flicker-free updates
- **Connections table** — status of all Modbus connections
- **Events log** — server event history
- **Dark / light theme** toggle
- **Single-file build** — entire app compiles to one self-contained `dist/index.html` (no CDN, no external assets)

## Requirements

- Node.js 18+
- Fenix backend running on `http://localhost:80`

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (proxies API calls to localhost:80)
npm run dev

# Build for production (outputs dist/index.html)
npm run build
```

Open `dist/index.html` in a browser on the same host as the backend, or serve it through the Fenix web server.

## Project Structure

```
src/
  api.js                  # All fetch calls to the backend
  App.jsx                 # Root component — state, polling, layout
  App.css                 # Global styles and design tokens
  main.jsx                # React entry point
  components/
    HeaderPanel.jsx       # Navbar, stats, controls bar
    TagsTable.jsx         # Tags data table with set-value inputs
    ChartView.jsx         # Real-time Chart.js line chart
    ConnectionsTable.jsx  # Modbus connections status
    EventsTable.jsx       # Event log table
```

## API Endpoints

All requests are `POST` to the Fenix backend:

| Endpoint            | Description              |
|---------------------|--------------------------|
| `Tags/All/All`      | All process tags         |
| `Connections/All/All` | Modbus connection list |
| `Events/All/All`    | Event log                |
| `Graph/All/All`     | Chart time-series data   |
| `Timer/tm/Value`    | Server time              |
| `User/usr/Value`    | Current user             |
| `Machine/mach/Value`| Machine name             |
| `Tag/<name>/<val>`  | Set tag value            |
| `Server/buffor/Value` | Chart buffer window    |
