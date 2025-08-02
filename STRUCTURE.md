# Directory Overview

## 1. `app/`

Core business logic folder, containing the following subdirectories:

- `controllers/`: Handles the specific logic for processing requests.
- `routes/`: Defines routes and their corresponding controllers.
- `routes/index.js` :This will serve as the centralized router that combines and organizes all other routes.
- `services/`: Implements the core business logic and reusable functionalities. It encapsulates complex operations and workflows, isolating them from controllers.

## 2. `public/`

Stores static files, served using the `express.static` middleware.

```
public/
├── css/
├── js/
└── images/
```

## 3. `views/`

Stores template files for dynamically generating HTML pages ( EJS).

```
views/
├── index.ejs
├── about.ejs
└── partials/
    ├── header.ejs
    └── footer.ejs
```

## 4. `config/`

Manages environment-related configuration information (e.g., database connections, API keys).

```
config/
└── dbConfig.js
```

## 5. `middlewares/`

Custom middleware logic, such as authentication, checkSessionExpiry etc.

## 7. `utils/`

General-purpose utility functions, such as date formatting, multer storage.

## 8. `app.js`

The entry point of the project, includes:

- Initialization of the Express application.
- Middleware setup.
- Route setup.
- Server startup.
