# 🎬 Lensentic AI

<p align="center">
  <strong>The Autonomous AI Movie Studio</strong>
</p>

<p align="center">
Transform ideas, prompts, scripts, novels, and stories into cinematic productions using AI-powered creative workflows.
</p>

---

## 🌟 Overview

Lensentic AI is an AI-powered movie studio designed to help creators transform raw ideas into structured cinematic productions.

Instead of using separate tools for writing, planning, visualizing, editing, and producing content, Lensentic AI brings the entire filmmaking workflow into a unified platform.

Whether you're a filmmaker, writer, content creator, game developer, marketer, educator, or storyteller, Lensentic AI acts as an autonomous production team capable of assisting throughout the creative process.

The platform combines intelligent story planning, screenplay generation, scene breakdowns, visual direction, continuity management, storyboard generation, media generation, and production orchestration into a single experience.

---

## 🚀 Key Features

### ✍️ Story-to-Screen Pipeline

Convert:

* Text prompts
* Story ideas
* Novels
* Books
* Scripts
* Screenplays
* Lore documents

Into structured cinematic productions.

### 🎬 Autonomous AI Film Crew

Lensentic AI utilizes specialized AI agents that simulate a production team:

* Producer Agent
* Director Agent
* Screenwriter Agent
* Cinematographer Agent
* Continuity Agent
* Soundtrack Agent
* Editor Agent

Each agent contributes to a specific stage of production.

### 🎨 Cinematic Planning

Generate:

* Story structures
* Screenplays
* Scene breakdowns
* Shot lists
* Storyboards
* Character references
* Production plans

### 🎞️ Video Production Pipeline

Support for:

* Image generation
* Video generation
* Audio generation
* Voice generation
* Sound design
* Editing workflows
* Final render orchestration

### 🔑 User-Pays AI Infrastructure

Users can connect their own provider APIs for premium generation.

Supported provider categories include:

* Language Models
* Image Models
* Video Models
* Audio Models
* Voice Models

### 📡 Real-Time Production Monitoring

Track:

* Agent activity
* Render status
* Generation progress
* Provider usage
* Production workflow state

---

## 🏗️ Architecture

Lensentic AI follows a modular production-grade architecture.

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Axios
* React Router

### Backend

* Python
* FastAPI
* JWT Authentication
* WebSockets
* Celery
* Redis

### Database & Storage

* Supabase
* PostgreSQL
* Supabase Storage

### AI Orchestration

* LangChain
* Multi-Agent Workflows
* Prompt Management
* Provider Routing
* Continuity Engine

### AI Providers

Examples include:

* Google Gemini
* OpenRouter
* FLUX
* Runway
* Kling
* LTX Studio
* ElevenLabs

---

## 🧠 Workflow

A typical production workflow:

1. User creates a project.
2. User submits a prompt, script, or story.
3. Producer Agent analyzes narrative structure.
4. Director Agent establishes visual direction.
5. Screenwriter Agent generates screenplay.
6. Cinematographer Agent plans shots.
7. Continuity Agent validates consistency.
8. Soundtrack Agent designs audio direction.
9. Editor Agent assembles production output.
10. Generation providers create media assets.
11. Final project enters rendering pipeline.

---

## 📂 Project Structure

```text
lensenticai/
├── backend/
├── frontend/
├── docs/
├── docker/
├── scripts/
├── ai_models/
├── nginx/
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Prerequisites

Before running Lensentic AI, install:

### Backend

* Python 3.11+
* Redis
* Git

### Frontend

* Node.js 20+
* npm

### Services

* Supabase Project
* Gemini API Key

Optional:

* OpenRouter API Key
* Runway API Key
* Kling API Key
* ElevenLabs API Key

---

# 🛠️ Local Installation

## Step 1 — Clone Repository

```bash
git clone https://github.com/yourusername/lensenticai.git

cd lensenticai
```

---

## Step 2 — Configure Backend

Navigate:

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate:

### Windows

```bash
venv\Scripts\activate
```

### Linux / Mac

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

## Step 3 — Configure Environment Variables

Create:

```text
backend/.env
```

Example:

```env
SUPABASE_URL=YOUR_SUPABASE_URL
SUPABASE_KEY=YOUR_SUPABASE_KEY

JWT_SECRET_KEY=CHANGE_ME

GEMINI_API_KEY=YOUR_GEMINI_API_KEY

REDIS_URL=redis://localhost:6379
```

---

## Step 4 — Start Redis

Windows:

```bash
redis-server.exe
```

Linux:

```bash
redis-server
```

---

## Step 5 — Start Backend

```bash
uvicorn app.main:app --reload
```

Backend available at:

```text
http://127.0.0.1:8000
```

Swagger UI:

```text
http://127.0.0.1:8000/docs
```

---

## Step 6 — Configure Frontend

Navigate:

```bash
cd frontend
```

Install packages:

```bash
npm install
```

Create:

```text
.env
```

Example:

```env
VITE_API_URL=http://127.0.0.1:8000
```

---

## Step 7 — Start Frontend

```bash
npm run dev
```

Frontend available at:

```text
http://localhost:5173
```

---

## Step 8 — Verify Installation

Open:

```text
http://localhost:5173
```

You should be able to:

* Access landing page
* Register
* Login
* Access dashboard
* Connect providers
* Create projects

---

## 🔒 Security

Lensentic AI follows several security practices:

* JWT Authentication
* Password Hashing
* API Key Encryption
* Protected Routes
* Provider Isolation
* Environment-Based Secrets

Users maintain ownership and control of their connected AI providers.

---

## 🎯 Current Roadmap

### Phase 1

* Core backend
* Authentication
* Project system

### Phase 2

* Agent orchestration
* Story generation
* Continuity engine

### Phase 3

* Dashboard
* Studio workspace
* Timeline editor

### Phase 4

* Full video generation pipeline
* Rendering workflows
* Advanced production monitoring

### Phase 5

* Multi-user collaboration
* Team workspaces
* Production management

---

## 🤝 Contributing

Contributions are welcome.

Areas of interest:

* AI orchestration
* Video generation
* Frontend UX
* Agent systems
* Performance optimization
* Documentation

Please create an issue before submitting major changes.

---

## 📜 License

This project is licensed under the MIT License.

---

## 🌍 Vision

Our mission is simple:

**Give every creator access to a complete AI-powered movie studio.**

Lensentic AI aims to make cinematic storytelling accessible to anyone with an idea, regardless of budget, technical expertise, or production resources.

The future of filmmaking is collaborative, intelligent, and accessible to all.
