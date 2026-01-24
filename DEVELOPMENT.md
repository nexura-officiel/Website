# Nexura Web App - Development Guide

This project is a Next.js application designed to be deployed on Netlify. It uses a **Dockerized** development environment to ensuring consistency across different team members' machines (Windows, Mac, Linux).

## 🛠️ Technology Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Framer Motion
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Netlify
- **Environment:** Docker (Node 20 Alpine)

---

## 🚀 Getting Started

### Prerequisites
1.  **Docker Desktop** (must be running)
2.  **Netlify CLI** (`npm install -g netlify-cli`)
3.  **Git**

### 1. Initial Setup
Clone the repository and navigate to the folder:
```bash
git clone https://github.com/nexura-officiel/Website.git
cd Website
```

### 2. Running the Project (Recommended)
We use `netlify dev` to orchestrate everything. This command:
1.  Fetches your environment variables (Supabase keys) from Netlify.
2.  Injects them into Docker.
3.  Starts the Docker container with Hot Reloading.

```bash
netlify dev
```

*   **App URL:** [http://localhost:3000](http://localhost:3000) (or port 8888 if proxied)
*   **Logs:** Visible in the terminal where you ran the command.

---

## 📦 Installing New Packages

Since the app runs inside a container, you should install packages **through Docker** to ensure Linux compatibility and sync `package.json` correctly.

**While the app is running (in a separate terminal):**
```bash
docker-compose exec web npm install <package_name>
```

*Example:*
```bash
docker-compose exec web npm install three @types/three
```

---

## 🐳 Docker Commands (Cheatsheet)

| Goal | Command |
| :--- | :--- |
| **Start Dev Server** | `netlify dev` (Best) or `docker-compose up` |
| **Stop Server** | `Ctrl + C` or `docker-compose stop` |
| **Rebuild Container** | `docker-compose up --build -d` |
| **Reset Everything** | `docker-compose down -v` (Clears node_modules cache) |
| **View Logs** | `docker logs -f web-app-web-1` |
| **Shell Access** | `docker-compose exec web sh` |

---

## 🔧 Troubleshooting

### "Hot Reloading isn't working"
We have configured `WATCHPACK_POLLING=true` and a custom webpack config to force polling on Windows.
*   **Fix:** Restart the container: `docker-compose restart`

### "Module not found" after git pull
Your local `node_modules` might be out of sync with the container.
*   **Fix:**
    ```bash
    docker-compose down -v
    docker-compose up --build
    ```

### "Turbopack Error"
The `Dockerfile` is explicitly set to use `next dev --webpack` to avoid conflicts with our custom polling configuration. Do **not** remove the `--webpack` flag in the Dockerfile.

---

## 📂 Key Configuration Files

*   **`Dockerfile`**: Multi-stage build. Includes a `development` stage (for local work) and a `runner` stage (standalone production build).
*   **`docker-compose.yml`**: Defines the `web` service, maps port 3000, and mounts your local folder to `/app`.
*   **`netlify.toml`**: Tells Netlify CLI to use `docker-compose up` as the dev command.
*   **`next.config.ts`**: Contains `webpack` polling config for Windows Docker support and `output: 'standalone'` for production.
