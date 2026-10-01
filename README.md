# Gestion des Conférences

Application Angular permettant de consulter une liste de conférences et de réserver des places en temps réel.
Projet illustrant la communication entre composants imbriqués avec les **Signals**, **`input()`** et **`output()`**.

---

## Architecture & Communication

Pattern **Container / Presentational** : le composant parent `Conferences` centralise l'état et orchestre les échanges entre les composants enfants frères.

```
                        ┌─────────────────────────────────────┐
                        │        Parent: Conferences          │
                        │  • conferences (signal)             │
                        │  • selectedConference (signal)      │
                        └──────────┬───────────────┬──────────┘
                                   │               │
        [conferences]="conferences()"              │ [conf]="selectedConference()"
                         (input()) │               │ (input())
                                   ▼               ▼
                   ┌───────────────────────┐   ┌───────────────────────────┐
                   │    ConferenceList     │   │     ConferenceDetails     │
                   │  (Composant Enfant 1) │   │    (Composant Enfant 2)   │
                   └───────────┬───────────┘   └─────────────┬─────────────┘
                               │                             │
        (conferenceSelected)   │                             │ (registered)
        "sélectionne l'item"   │                             │ "réserve une place"
                     (output())│                             │ (output())
                               ▼                             ▼
                        ┌─────────────────────────────────────┐
                        │  Mise à jour de l'état (Signals)    │
                        └─────────────────────────────────────┘
```

- **Data Down (`input()`)** : Le parent transmet la liste et la conférence sélectionnée aux enfants.
- **Events Up (`output()`)** : Les enfants notifient le parent lors d'une action (sélection ou réservation).

---

## Fonctionnalités

- **Navigation** : Accueil (`/home`), Conférences (`/conferences`) et page 404 (`/notfound`).
- **Liste réactive** : Sélection d'une conférence avec mise en surbrillance de l'élément actif.
- **Détails & Réservation** : Vue détaillée synchronisée, état par défaut si aucune sélection, badge dynamique (*Inscription Ouverte* / *Complet*).
- **Gestion des places** : Décrémentation instantanée à la réservation et désactivation du bouton si le quota est atteint.

---

## Démarrage rapide

```bash
# Installation des dépendances
npm install

# Lancement du serveur local
ng serve
```

L'application est accessible sur `http://localhost:4200/`.