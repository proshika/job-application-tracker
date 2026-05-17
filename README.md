# 💼 JobTracker - Full Stack Application Tracker

JobTracker is a production-ready, full-stack MERN application built to help developers seamlessly manage, categorize, and keep logs of their career applications. Featuring a dynamic Kanban board layout, users can drag and organize roles through custom application pipelines.

🚀 **[Live Demo Link](https://job-application-tracker-frontend-beryl.vercel.app/)**

---

## 🛠️ Tech Stack & Cloud Architecture

### Frontend
* **React.js** (Vite Preset for ultra-fast bundling)
* **Tailwind CSS** (Modern utility-first responsive layout)
* **Axios** (Asynchronous API state management)

### Backend & Database
* **Node.js & Express.js** (RESTful API architecture)
* **MongoDB Atlas** (Cloud database clustering)
* **Mongoose** (Object Data Modeling & structural schema validation)

### DevOps & Deployment
* **Vercel** (Continuous Integration / Continuous Deployment pipeline)
* **Serverless Architecture** (Express API mapped dynamically to secure serverless runtimes)

---

## 🏗️ System Architecture & Data Flow

The application follows a decoupled client-server architecture deployed on cloud infrastructure:

```text
[ React Frontend ] (Vercel Client Edge)
       │
       ▼ (Secure HTTPS Request with CORS validation)
[ Express API Server ] (Vercel Serverless Function Runtime)
       │
       ▼ (Mongoose Connection String Layer)
[ MongoDB Atlas Cloud Cluster ] (Distributed NoSQL Database Layer)
