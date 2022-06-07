# safeanzeigen-backend - Kleinanzeigenplattform

Safeanzeigen ist eine moderne Kleinanzeigenplattform für den Austausch von Waren, Dienstleistungen und digitalen Assets mit besonderem Fokus auf Usability und Sicherheit. Dieses Projekt als Backend ist Teil meiner Bachelorarbeit und verwendet Technologien wie Node.js, Express.js, Knex.JS und Socket.IO.

🌐 [LIVE API](https://safeanzeigen-backend.herokuapp.com)

🖥️ [BACKEND REPOSITORY](https://github.com/SafeAnzeigen/safeanzeigen-backend)

🎨 [FRONTEND REPOSITORY](https://github.com/SafeAnzeigen/safeanzeigen-frontend)

![Alt Text](https://res.cloudinary.com/dbldlm9vw/image/upload/v1654598213/backend-dateistruktur_skagr5.png)

## ✨ Features

- Bietet ein Node.js Backend mit RESTful API mit hoher Kohäsion und loser Kopplung
- Implementierung aller funktionalen Anforderungen für die 7 Ressourcen Advertisements, Categories, Chats, Favorites, Messages, Subcategories und Users in einer 3-Schichten-Architektur aus Router-, Controller- und Service-Layer
- Autorisierungs-Middleware zur Absicherung von API-Endpunkten durch eine Verifizierung der Signatur des JSON Web Token (JWT). Sie gewährleistet, dass nur eingeloggte Benutzer Aktionen ausüben können.
- Validierungs-Middlware zum Absichern von API-Endpunkten durch eine Validierung übergebener User Ids im Parameter oder Body eines Requests gegenüber der User ID im Authentifikations JSON Web Token (JWT). Sie gewährleistet, dass Nutzer nur ihre eigenen Ressourcen manipulieren dürfen.
- Verbindung zur Heroku PostgreSQL-Datenbank
- Datenbankmigrationsdateien und Beispiele als Seeding-Daten
- Versenden von Kontakt-E-Mails mit Nodemailer

## 🤖 Technologien

- [Express.js](https://expressjs.com) Node-Backend-Server, der eine schnelle und minimalistische REST-API bereitstellt
- [Knex.js](http://knexjs.org) Query Builder für Migrationen, Seeding und Verbindung zur Datenbank
- [PostgreSQL](https://www.postgresql.org) als relationale Datenbank, die mit Hilfe des kostenlosen Hostings über [Heroku](https://heroku.com) auf Amazon AWS betrieben wird
- Continuous Integration / Continuous Deployment Pipeline über [Heroku](https://heroku.com)
- Nutzt zur Abbildung der Echtzeitkommunikation [Socket.IO](https://socket.io)
- User Management und SMS-One Time Password für Authentifizierung durch [Clerk](https://clerk.dev)
- [jsQR](https://github.com/cozmo/jsQR) als Möglichkeit hochgeladene Nutzerbilder auf das Vorhandensein eines QR-Codes zu prüfen und diesen anschließend zu extrahieren
- Emailversand mittels [Nodemailer](https://nodemailer.com) und [Mailjet](https://app.mailjet.com)

## 💡 Entwicklungen & Umgesetzte Ideen

- Gesamtarchitektur des Softwaresystems
  ![Architektur](https://res.cloudinary.com/dbldlm9vw/image/upload/v1654597759/safeanzeigen-architektur_qdaoq2.png)

- Datenbankschema
  ![Datenbankschema](https://res.cloudinary.com/dbldlm9vw/image/upload/v1654592075/safeanzeigen-database-schema-v4_brnejv.png)

- Aufteilung der REST-API in drei voneinander getrennte Schichten. Die Router-Ebene weißt einkommenden Requests die richtigen Funktionsaufruf und gegebenenfalls einen Check durch die Middleware zu. Der Controller kümmer sich um die Validierung der einkommenden Daten und um die korrekte Antwort an den Anfragenden. Das Service-Layer kümmert sich um die Verarbeitung und Extraktion der Daten aus der Datenbank. Somit ist eine Austauschbarkeit einzelner Ebenen gewährleistet, sofern die Schnittstellenübergaben unverändert bleiben.
  ![3-Schichte-Architektur](https://res.cloudinary.com/dbldlm9vw/image/upload/v1654597767/safeanzeigen-backend-routing_l9toc1.png)

- Funktionsumfang anhand eines Usecase-Diagramms
  ![Funktionsumfang](https://res.cloudinary.com/dbldlm9vw/image/upload/v1654597803/safeanzeigen-usecase-diagramm_mbd0te.png)

- Ablauf der Validierung und Tokenvergabe für die Artikelverifikation mittels vom Nutzer hochgeladenen QR-Codes neben seinem Inserat
  ![Qr-Code-Tokens](https://res.cloudinary.com/dbldlm9vw/image/upload/v1654597783/qr-code-validation_yybcnf.png)

### 📁 Dateistruktur

- /api
  - Enthält alle Dateien, die die vom Frontend zu verwendende API behandeln
  - /middlewares
    - Enthält Middleware-Funktionen zur Autorisierung von Benutzern validieren von Anfragen
  - /Ressourcen
    - Enthält für jede Ressource des Systems die Router-Logik, die Controller-Logik und die Service-Schicht-Logik. Jede Abstraktionsschicht kümmert sich nur um ihre spezielle Aufgabe kümmern.
- /database
  - Enthält verschiedene Dateien, um eine Verbindung zur Datenbank herzustellen und ihre Konfiguration zu speichern
  - /migrations
    - Enthält Dateien, die für die Migration des Datenbankschemas verwendet werden
  - /seeds
    - Enthält Dateien, die für das Einfügen von Dummy-Daten in die Datenbank verwendet werden

### 📫 API Architektur

Alle Ressourcen des Systems sind in drei Abstraktionen von Trennungen aufgeteilt:

- Router
  - Legt fest, welche eingehende HTTP-Anfrage über ihre HTTP-Methode und Route an welche Controller-Funktion weitergeleitet wird
  - Bietet eine klare Übersicht über alle verfügbaren Routen einer bestimmten Ressource
- Controller
  - Handhabt die Prüfung der eingehenden und ausgehenden HTTP-Anfrage- und Antwortdaten für einen API-Aufruf
  - Kümmert sich nicht darum, wie das Ergebnis berechnet oder abgerufen wird, sondern nur um den Datenverkehr
- Services
  - Ist die tiefgreifende Geschäftslogik, die davon ausgeht, dass alle Daten bereits von der Controller-Ebene geprüft und analysiert wurden.
  - Übernimmt die Arbeit der Algorithmen und Datenbankverbindungen, um die gewünschten Daten für die HTTP-Anfrage bereitzustellen

### 📏 Konventionen & Guidelines

- Dateinamen sollten in "Kleinbuchstaben" geschrieben werden, d.h. mit einem Bindestrich verbunden.
- Alle Mediendateien wie z.B. Bilder müssen optimiert und so klein wie verlustfrei möglich gemacht werden, bevor sie dem Projekt hinzugefügt werden
- Prettier.js mit Team-Einstellungen sollte für die Formatierung aller Dateien mit der gleichen Struktur verwendet werden
- Die Einrückung der Dateien sollte 2 Leerzeichen betragen
- Die Benennung von Variablen sollte aussagekräftig und englisch sein
- Kommentare sollten nur dort verwendet werden, wo sie notwendig sind, um übergeordnete Ideen des Codes zu erklären, da sie schnell veralten

### 🐛 Bekannte Bugs

- Die Seeds sind inzwischen veraltet und wurde nicht den aktuellen Stand des Datenbankschemas angepasst.

## 🏠 Selber Starten

### ⏹️ Voraussetzungen

Die folgenden Anwendungen sollten vor der Ausführung dieser Software installiert werden.

```bash
Git
Node
Gegegebenfalls PostgreSQL
```

### 🔒 APIs

- Folgende APIs und Fremddienste sollten eingerichtet werden, bevor das System genutzt wird:
  - Clerk

### 🔧 Umgebungsvariablen

Es gibt einige Umgebungsvariablen, die benötigt werden, egal ob die Anwendung lokal oder im Deployment ausgeführt werden soll.

```bash
DATABASE_URL=<PostgreSQL URL String hier>

DEPLOYMENT="DEVELOPMENT"
PORT=5000
SERVER_URL=<Server URL mit Port hier>

Folgend muss der CLERK JWT VERIFICATION KEY entsprechend aufbereitet werden
Die erste Umgebungsvariable muss wie angegeben benannt werden
Die folgenden Umgebungsvariablen müssen jeweils eine Aufteilung des Schlüssels auf exakt 64 Zeichen sein
Die letzte Umgebungsvariable muss wie angegeben benannt werden
Sollte die gesamte Schlüssellänge unerwartet abweichen müssen mehr oder weniger Umgebungsvariablen erzeugt werden. Auch im Code sind diese dann zu verändern.


CLERK_JWT_SIGNATURE_PUBLIC_KEY_LINE_1=-----BEGIN PUBLIC KEY-----
CLERK_JWT_SIGNATURE_PUBLIC_KEY_LINE_2=<CLERK JWT_VERIFICATION_API_KEY_FIRST_64_CHARS>
CLERK_JWT_SIGNATURE_PUBLIC_KEY_LINE_3=<CLERK JWT_VERIFICATION_API_KEY_NEXT_64_CHARS>
CLERK_JWT_SIGNATURE_PUBLIC_KEY_LINE_4=<CLERK JWT_VERIFICATION_API_KEY_NEXT_64_CHARS>
CLERK_JWT_SIGNATURE_PUBLIC_KEY_LINE_5=<CLERK JWT_VERIFICATION_API_KEY_NEXT_64_CHARS>
CLERK_JWT_SIGNATURE_PUBLIC_KEY_LINE_6=<CLERK JWT_VERIFICATION_API_KEY_NEXT_64_CHARS>
CLERK_JWT_SIGNATURE_PUBLIC_KEY_LINE_7=<CLERK JWT_VERIFICATION_API_KEY_NEXT_64_CHARS>
CLERK_JWT_SIGNATURE_PUBLIC_KEY_LINE_8=<CLERK JWT_VERIFICATION_API_KEY_NEXT_CHARS>
CLERK_JWT_SIGNATURE_PUBLIC_KEY_LINE_9=-----END PUBLIC KEY-----

VERIFICATION_IMAGE_SECRET=<Eigenes geheimes Passwort hier>
VERIFICATION_SUCCESSFUL_SECRET=<Weiteres eigenes geheimes Passwort hier>

EMAIL_SERVER_USER=<E-Mail SMTP User>
EMAIL_SERVER_PASSWORD=<E-Mail SMTP Passwort>
EMAIL_SERVER_HOST=<E-Mail SMTP Host>
EMAIL_SERVER_PORT=<E-Mail SMTP Port>
EMAIL_FROM=<E-Mail-Absender>
```

Wenn das Backend von neu eingerichtet wird, muss das Datenbankschema eingerichtet werden. Um die Dinge einfach zu machen und unleserlich lange Datenbank-Dump-Dateien zu vermeiden, wurden Migrationsdateien verwendet. Um zu testen, ob alles funktioniert, können die Seed-Dateien ausgeführt werden, um Dummy-Daten einzufügen und auf Fehler zu prüfen.

## KNEX.JS Funktionen

### Anlage neuer Migrationsdateien

```bash
npx knex migrate:make init --migrations-directory db/migrations
```

### Ausführen bestehender Migrationsdateien

```bash
npx knex migrate:latest --knexfile db/knexfile.js
```

### Seed Dateien ausführen

```bash
npx knex seed:run --knexfile db/knexfile.js
```

### Ausführen des Backends in Entwicklungsumgebung

Die Entwicklungsumgebung und der Startbefehl verwenden die Abhängigkeit [Nodemon](https://www.npmjs.com/package/nodemon), die den Backend-Server bei jeder Dateiänderung neu startet, um das Testen zu erleichtern.

```bash
git clone <Backend GitHub URL>
cd into project
npm install //Abhängigkeiten installieren
npm run dev //Server starten
visit http://localhost:5000 im Browser nutzen oder das Frontend verbinden, um den Erfolg zu prüfen
```

### Ausführen des Backends in Produktionsungsumgebung

```bash
git clone <Backend GitHub URL>
cd into project
npm install //Abhängigkeiten installieren
npm start //Server Starten
visit http://localhost:5000 im Browser nutzen oder das Frontend verbinden, um den Erfolg zu prüfen
```

## 🌊 Git Flow

![Startseite Lighthouse Result](https://res.cloudinary.com/dbldlm9vw/image/upload/v1654590112/safeanzeigen-git-flow_npx565.png)

Es wurde Git Flow mit dem Main Branch, dem Develop Branch und verschiedenen Feature Branchen je User Story genutzt

- main branch (Produktionsumgebung)
- develop branch (Entwicklungsumgebung)

## 🔑 Lizenz

[MIT License](https://github.com/SafeAnzeigen/safeanzeigen-backend/blob/main/LICENSE)
