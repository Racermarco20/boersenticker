# 📈 Börsenticker – Abschlussprojekt HTL 2024/25

Ein Full-Stack-Projekt zur Visualisierung von Aktienkursen in Echtzeit. Die Anwendung besteht aus einem
Angular-Frontend, einem Express.js-Backend und einer MySQL-Datenbank – alles verpackt in Docker-Containern.

---

## 🚀 Projektübersicht

- **Backend:** Node.js + Express.js mit REST-API & WebSocket
- **Frontend:** Angular + Tailwind
- **Datenbank:** MySQL
- **Live-Kommunikation:** WebSocket (Realtime Updates)
- **Dokumentation:** SwaggerUI für API-Endpunkte
- **Deployment:** Docker & Docker Compose

---

## 🧰 Technologien

| Bereich       | Technologie             |
|---------------|-------------------------|
| Frontend      | Angular, HTML, CSS      |
| Backend       | Node.js, Express.js     |
| API Doku      | Swagger                 |
| Datenbank     | MySQL                   |
| Kommunikation | REST + WebSocket        |
| Container     | Docker + Docker Compose |

---

## ⚙️ Setup & Installation

### 🔧 Voraussetzungen

- Docker & Docker Compose installiert
- Optional: Git

### 📦 Projekt starten

```bash
git clone https://github.com/Racermarco20/boersenticker.git
cd boersenticker
```

### 📝 Umgebung konfigurieren

Es gibt 2 Envoironment-Dateien:

- `.env` für die Docker-Compose-Datei
- `./backend/.env` für das Backend

Beide Dateien sollten entsprechend angepasst werden und identisch sein.

### 🚀 Projekt starten

```bash
docker compose up --build -d
```

Die Anwendung startet dann unter:

- 📊 Frontend: [http://localhost:4200](http://localhost:4200)
- 🔗 Backend (Swagger): [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- 🐬 MySQL: `localhost:3307`

### Zusatzinformationen

Falls Änderungen an der Datenbank nötig sind und der Container nicht aktualisiert wird, kann man das Volume mit
folgenden Befehl aktualisieren:

```bash
docker compose down -v
```

Anschließend kann man den Container neu starten:

```bash
docker compose up --build -d
```

Die Option -d erlaubt die Anwendung im Hintergrund zu laufen. --build baut zuerst das Image neu und startet dann den
Container.

---

## 🔐 Authentifizierung

- Registrierung & Login über `/auth/register` & `/auth/login`
- JSON Web Token (JWT) wird bei erfolgreichem Login zurückgegeben
- Authentifizierte Endpunkte z. B. `/stocks` benötigen den Token im Header

---

## 📡 WebSocket

- WebSocket-Verbindung wird beim Laden des Frontends hergestellt
- Kursdaten werden automatisch vom Backend gesendet
- Realtime-Anzeige der aktuellen Börsenkurse

---

## 🚀 Funktionen

- Anzeige der aktuellen Börsenkurse (Random Preisänderung mit -5% bis +5%)
- Registrierung & Login
- Erstellung von Alarmen
- Visualisierung der Alarme

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
