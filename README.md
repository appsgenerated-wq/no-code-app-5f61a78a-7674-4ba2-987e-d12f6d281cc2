# VinoLog - Grape Tasting Note App

Welcome to VinoLog, a modern web application for grape enthusiasts to discover varieties and log personal tasting notes. This application is built with a React frontend and a powerful, auto-generated backend powered entirely by Manifest.

## Features

- **User Authentication**: Secure sign-up and login for users.
- **Grape Variety Directory**: Browse a curated list of grape varieties.
- **Personal Tasting Notes**: Create, view, and manage your own tasting notes for different wines and grapes.
- **Data Relationships**: Each note is linked to a user and a grape variety.
- **Ownership Policies**: Users can only edit or delete their own notes, ensuring data privacy.
- **Admin Panel**: A built-in admin interface to manage users and the grape variety catalog.

## Tech Stack

- **Backend**: Manifest (YAML-based schema definition)
- **Frontend**: React, Vite
- **Styling**: Tailwind CSS
- **SDK**: `@mnfst/sdk` for seamless frontend-backend communication

## Getting Started

### Prerequisites

- Node.js and npm (or yarn)

### Setup

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

### Accessing the Admin Panel

The Manifest backend automatically generates a full-featured admin panel.

- **URL**: Access it via the link on the app's UI or go directly to your deployed backend URL + `/admin`.
- **Default Admin Credentials**:
  - **Email**: `admin@manifest.build`
  - **Password**: `admin`

From the admin panel, you can manage users and populate the `GrapeVariety` entity, which is required for users to create tasting notes.