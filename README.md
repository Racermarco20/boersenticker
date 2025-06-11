# 📈 Börsenticker – Abschlussprojekt HTL 2024/25

Ein Full-Stack-Projekt zur Visualisierung von Aktienkursen in Echtzeit. Die Anwendung besteht aus einem Angular-Frontend, einem Express.js-Backend und einer MySQL-Datenbank – alles verpackt in Docker-Containern.

---

## 🚀 Projektübersicht

- **Backend:** Node.js + Express.js mit REST-API & WebSocket
- **Frontend:** Angular 17
- **Datenbank:** MySQL 8
- **Live-Kommunikation:** WebSocket (Realtime Updates)
- **Dokumentation:** SwaggerUI für API-Endpunkte
- **Deployment:** Docker & Docker Compose

---

## 🧰 Technologien

| Bereich        | Technologie           |
|----------------|-----------------------|
| Frontend       | Angular, HTML, SCSS   |
| Backend        | Node.js, Express.js   |
| API Doku       | Swagger               |
| Datenbank      | MySQL                 |
| Kommunikation  | REST + WebSocket      |
| Container      | Docker + Docker Compose |

---

## ⚙️ Setup & Installation

### 🔧 Voraussetzungen

- Docker & Docker Compose installiert
- Optional: Git

### 📦 Projekt starten

```bash
git clone <REPO-URL>
cd <projektordner>
docker compose up --build
```

Die Anwendung startet dann unter:

- 📊 Frontend: [http://localhost:4200](http://localhost:4200)
- 🔗 Backend (Swagger): [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- 🐬 MySQL: `localhost:3307` (falls Port angepasst wurde)

### 🧪 Standard-Datenbankzugang

- Benutzer: `root`
- Passwort: `!7bRl1a2tuNLdiPL`
- Datenbank: `boersenticker`

---

## 🔐 Authentifizierung

- Registrierung & Login über `/auth/register` & `/auth/login`
- JSON Web Token (JWT) wird bei erfolgreichem Login zurückgegeben
- Authentifizierte Endpunkte z. B. `/stocks` benötigen den Token im Header

---

## 📡 WebSocket

- WebSocket-Verbindung wird beim Laden des Frontends hergestellt
- Kursdaten werden automatisch vom Backend gesendet
- Realtime-Anzeige der aktuellen Börsenkurse

---

## 📘 API-Dokumentation

SwaggerUI erreichbar unter: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 🧪 Beispiel-Test-User

```json
{
  "username": "testuser",
  "password": "testpass"
}
```

---

## 📋 ToDos

- [x] Docker für alle Komponenten
- [x] Login & Registrierung
- [x] WebSocket-Updates
- [x] Swagger Dokumentation
- [ ] CRUD-Funktionen im Frontend für Kurse (optional)
- [ ] Demo-Video (optional)

---

## 🎓 Abgabehinweise

- Projekt läuft lokal über Docker
- Swagger + WebSocket implementiert
- readme.md vorhanden ✅
