```markdown
# 🗨️ Chat Application (Dockerized)

A simple real-time chat application built with **Node.js**, **Express**, **EJS**, and **MongoDB**, fully containerized using **Docker** and **Docker Compose**.

---

## 🚀 Features
- Real-time messaging
- MongoDB for storing chat history
- EJS templates for rendering UI
- Fully containerized with Docker Compose
- Easy to set up and run locally
- Optional Mongo Express UI for database management

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express
- **Frontend:** HTML, CSS, EJS
- **Database:** MongoDB
- **Containerization:** Docker, Docker Compose
- **Optional GUI:** Mongo Express

---

## 📂 Project Structure
```

.
├── Dockerfile
├── dockercomposefile.yml
├── index.js
├── views/         # EJS templates
├── public/        # Static files (CSS, JS)
├── models/        # Mongoose models
├── package.json
└── README.md

````

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/chat-application.git
cd chat-application
````

### 2️⃣ Build & Start Containers

```bash
docker-compose -f dockercomposefile.yml up -d --build
```

This will start:

* **Backend** → `localhost:8080`
* **MongoDB** → `localhost:27017`
* **Mongo Express (optional)** → `localhost:8081`

---

## 🗄️ MongoDB Access

### CLI Access

```bash
docker exec -it chat-mongodb mongosh
```

Inside Mongo shell:

```js
show dbs
use whatsapp
show collections
db.messages.find()
```

### Mongo Express (Optional GUI)

If Mongo Express service is added to `dockercomposefile.yml`, open:

```
http://localhost:8081
```

No authentication required by default.

---

## 🛑 Stopping the Containers

```bash
docker-compose -f dockercomposefile.yml down
```

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed by **\M Hussnain Nawaz**

