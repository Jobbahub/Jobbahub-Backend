# Jobbahub Backend API

De backend service voor het Jobbahub platform. Deze API faciliteert de matching tussen studenten en keuzemodules op basis van een vragenlijst, beheert gebruikersauthenticatie en slaat voorkeuren op in MongoDB.

## 🚀 Snel aan de slag

### 1. Vereisten
Zorg dat je de volgende zaken geïnstalleerd hebt:
- [Node.js](https://nodejs.org/) (v16 of hoger)
- [MongoDB](https://www.mongodb.com/try/download/community) (Lokaal of Atlas)
- [Git](https://git-scm.com/)

### 2. Installatie
Clone de repository en installeer de benodigde pakketten:
```bash
git clone [https://github.com/Jobbahub/Jobbahub-Backend.git](https://github.com/Jobbahub/Jobbahub-Backend.git)
cd Jobbahub-Backend
npm install

### 3. Configuratie
Maak een .env bestand aan in de root van je project:
PORT=3000
MONGO_URI=mongodb://localhost:27017/jobbahub
JWT_SECRET=verander_dit_naar_een_veilig_wachtwoord

### 4. API Overzicht
Register
Methode: POST
URL: /api/auth/register
Response: 201 Created
Body:
{
  "naam": "Tester",
  "email": "Tester@example.com",
  "wachtwoord": "wachtwoord123"
}

Login
Methode: POST
URL: /api/auth/login
Response: 200 OK
Body:
{
  "email": "Tester@example.com",
  "wachtwoord": "wachtwoord123"
}

Change Credentials
Methode: PATCH
URL: /api/auth/change-credentials
Response: 200 OK
Body:
{
  "currentPassword": "wachtwoord123",
  "newPassword": "Wachtwoord123"
}

Modules ophalen
Methode: GET
URL: /api/modules
Response: 200 OK
Body:
Leeg

Enkele Module ophalen
Methode: GET
URL: /api/modules/:id
Response: 200 OK
Body:
Leeg

Specifieke modules ophalen
Methode: GET
URL: /api/modules/batch?ids=:id
Response: 200 OK
Body:
Leeg

Favorieten ophalen
Methode: GET
URL: /api/favorites
Response: 200 OK
Body:
Leeg

Favorieten toevoegen
Methode: POST
URL: /api/favorites
Response: 200 OK
Body:
{
  "module_id": "12345"
}

Favorieten verwijderen
Methode: DELETE
URL: /api/favorites/:moduleId
Response: 200 OK
Body:
Leeg

AI aanbevelingen ophalen
Methode: POST
URL: /api/ai/recommend
Response: 200 OK
Body:
{
  "antwoorden": {
    "keuze_taal": null,
    "keuze_locatie": null,
    "keuze_punten": null,
    "open_antwoord": "",
    "knoppen_input": {
      "q_tech": {
        "score": 0,
        "weight": 2
      },
      "q_health": {
        "score": 0,
        "weight": 1
      },
      "q_law": {
        "score": 0,
        "weight": 2
      },
      "q_edu": {
        "score": 0,
        "weight": 1
      },
      "q_econ": {
        "score": 0,
        "weight": 1
      },
      "q_comm": {
        "score": 0,
        "weight": 1
      },
      "q_eng": {
        "score": 0,
        "weight": 1
      },
      "q_sport": {
        "score": 0,
        "weight": 1
      },
      "q_creative": {
        "score": 1,
        "weight": 1
      },
      "q_biz": {
        "score": 0,
        "weight": 1
      },
      "q_social": {
        "score": 0,
        "weight": 1
      },
      "q_sustain": {
        "score": 1,
        "weight": 1
      },
      "q_intl": {
        "score": 0,
        "weight": 1
      },
      "q_research": {
        "score": 0,
        "weight": 1
      },
      "q_personal": {
        "score": 0,
        "weight": 1
      },
      "q_broadening": {
        "score": 0,
        "weight": 1
      }
    }
  }
}

AI Resultaten opslaan
Methode: POST
URL: /api/auth/questionnaire
Response: 200 OK
Body:
{
  "antwoorden": {
    "keuze_taal": null,
    "keuze_locatie": null,
    "keuze_punten": null,
    "open_antwoord": "",
    "knoppen_input": {
      "q_tech": {
        "score": 0,
        "weight": 2
      },
      "q_health": {
        "score": 0,
        "weight": 1
      },
      "q_law": {
        "score": 0,
        "weight": 2
      },
      "q_edu": {
        "score": 0,
        "weight": 1
      },
      "q_econ": {
        "score": 0,
        "weight": 1
      },
      "q_comm": {
        "score": 0,
        "weight": 1
      },
      "q_eng": {
        "score": 0,
        "weight": 1
      },
      "q_sport": {
        "score": 0,
        "weight": 1
      },
      "q_creative": {
        "score": 1,
        "weight": 1
      },
      "q_biz": {
        "score": 0,
        "weight": 1
      },
      "q_social": {
        "score": 0,
        "weight": 1
      },
      "q_sustain": {
        "score": 1,
        "weight": 1
      },
      "q_intl": {
        "score": 0,
        "weight": 1
      },
      "q_research": {
        "score": 0,
        "weight": 1
      },
      "q_personal": {
        "score": 0,
        "weight": 1
      },
      "q_broadening": {
        "score": 0,
        "weight": 1
      }
    }
  }
}

Vragenlijst resetten
Methode: DELETE
URL: /api/auth/questionnaire
Response: 200 OK
Body:
Leeg

### 5. Project Structuur
├── src
│   ├── controllers    # Route handlers
│   ├── middleware     # Joi validatie & JWT checks
│   ├── models         # Mongoose Schema's (Student, Module)
│   ├── routes         # Express Route definities
│   ├── services       # Database logica (authService.ts)
│   └── app.ts         # Server configuratie
└── .env               # Omgevingsvariabelen (niet in git!)

### 6. Licentie
Dit project is ontwikkeld voor Jobbahub.








