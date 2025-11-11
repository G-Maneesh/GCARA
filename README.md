# 🌐 GCARA – Global Crisis Anticipation and Response

**GCARA (Global Crisis Anticipation and Response)** is a real-time, multi-domain monitoring and forecasting system designed to provide situational awareness across **Climate, Finance, Health, and Energy** domains. It computes a **Crisis Severity Index (CSI)** and provides **AI-driven insights** through an interactive web dashboard.

---

## 🚀 Features

- 🔄 **Real-time analytics** using WebSocket streaming  
- 📊 **Multi-domain dashboards**: Climate, Finance, Health, and Energy  
- 🤖 **Machine learning forecasting** with Prophet  
- 🧠 **Crisis Severity Index (CSI)** computation across domains  
- 💬 **AI Insights** panel for natural language interpretation  
- ⚙️ **Modular & extensible architecture** built with Spring Boot and React  
- 🐳 **Dockerized environment** for easy deployment and consistency  

---

## 🧩 System Architecture

**Backend:** Spring Boot (REST + WebSocket)  
**Frontend:** React  
**ML Layer:** Python (Prophet)  
**Database:** H2 (development) → PostgreSQL (production)  
**Containerization:** Docker  
**Optional Integrations:** Grafana, Kafka, Kubernetes  
---

## 🧠 High-Level Flow

API -> Spring Boot Service -> Database -> Python ML/Prophet -> WebSocket -> React UI

---
## 📦 Tech Stack

| Layer         | Technology Used                 |
|----------------|--------------------------------|
| **Backend**    | Spring Boot (REST, WebSocket)  |
| **Frontend**   | React.js                       |
| **Forecasting**| Python (Prophet, ML layer)     |
| **Database**   | H2 / PostgreSQL                |
| **Container**  | Docker                         |
| **Visualization** | Grafana (optional)          |
| **Deployment** | Kubernetes (optional)          |

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository
git clone https://github.com/G-Maneesh/gcara.git
cd gcara
### 2️⃣ Backend Setup (Spring Boot)
cd backend
./mvnw clean install
./mvnw spring-boot:run
### 3️⃣ Frontend Setup (React)
cd frontend
npm install
npm start
### 4️⃣ Run with Docker
docker-compose up --build

---

## 🌍 Data Sources
Climate	- OpenWeatherMap
Finance	- Alpha Vantage
Health - WHO / disease.sh
Energy - EIA / IEA

---
## 📈 Crisis Severity Index (CSI)
CSI = wc * climate + wf * finance + wh * health + we * energy

Each domain provides standardized scores that are weighted and combined into a single Crisis Severity Index (CSI).
Users can visualize CSI trends and domain-specific analytics on the dashboard.

---
## 🧠 AI Insights

The AI Insights module analyzes multi-domain data, simplifies correlations, and generates human-readable summaries and suggestions.
It complements the CSI by providing narrative explanations behind the numbers.

---
## 🧪 Evaluation

✅ Real-time API integrations for all four domains

⏱️ CSI updates every minute

📈 Forecasting and anomaly detection using Prophet

🐳 Docker ensures reproducibility and easy deployment

☁️ Deployment & Monitoring
---
## 🧾 References

OpenWeatherMap API

Alpha Vantage API

disease.sh / WHO API

EIA / IEA APIs

Meta Prophet: Forecasting at Scale

---
## 👨‍💻 Author
Name:Maneesh Ganesula
Mail: maneesh.ganesula@yahoo.com
