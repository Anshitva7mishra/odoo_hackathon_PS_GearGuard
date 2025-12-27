# ⚙️ GearGuard

**GearGuard is a smart, Odoo-native maintenance management product** that transforms how organizations track assets, assign technicians, and control maintenance workflows.

Instead of scattered spreadsheets and manual follow‑ups, GearGuard delivers a **single source of truth** where equipment health, people, and processes stay perfectly connected.

---

## 🎯 The Problem We Solve

Maintenance teams struggle with:

* No real-time visibility into asset health
* Manual task assignment and delays
* Disconnected equipment and repair history
* Poor reporting on failures and team workload

These gaps lead to **downtime, inefficiency, and costly mistakes**.

---

## 💡 Our Solution: GearGuard

GearGuard introduces an **automated maintenance workflow** designed specifically for the **Odoo ecosystem**.

It connects:

* 🏭 **Physical Assets** (Equipment)
* 👨‍🔧 **Skilled Workforce** (Maintenance Teams)
* 🛠️ **Repair Workflows** (Maintenance Requests)

Every action updates the system intelligently — reducing human error and improving operational clarity.

---

## 🧠 Product Core

### 🔹 Equipment Intelligence

* Centralized registry of all assets
* Searchable by **department, user, or responsible team**
* Tracks both static details and live maintenance status

### 🔹 Team-Based Responsibility

* Tasks assigned to **teams**, not just individuals
* Built-in access control ensures only the right people act

### 🔹 Smart Maintenance Requests

* Supports **corrective** and **preventive** maintenance
* Full lifecycle tracking from issue to resolution

---

## 🔄 How It Works

### 🔧 Reactive Maintenance (Breakdowns)

When equipment fails:

1. A maintenance request is raised
2. Selecting the equipment **auto-assigns the correct team**
3. Task moves through a visual pipeline:
   `New → In Progress → Repaired`
4. Technician logs repair duration

➡️ Faster response, zero manual routing.

---

### 🗓️ Preventive Maintenance (Planned)

For routine servicing:

* Maintenance tasks are scheduled in advance
* Managed through a **calendar-first interface**
* Managers instantly visualize monthly workload

➡️ Fewer breakdowns, better planning.

---

## 🤖 Automation That Thinks Ahead

### 🗑️ Scrap Protection Logic

If a repair is marked as **Scrap**:

* The linked equipment is automatically archived
* Prevents future usage or maintenance scheduling

➡️ Ensures safety, data integrity, and zero misuse.

---

## 🚀 Why GearGuard Wins

✔ Automated, not manual
✔ Odoo-native and scalable
✔ Reduces downtime and confusion
✔ Clear visibility for both technicians and management

**GearGuard doesn’t just manage maintenance — it prevents chaos.**

## 🛠️ Tech Stack – GearGuard
GearGuard is a full-stack maintenance management system built using modern, scalable, and industry-standard technologies.

🎨 Frontend - Responsible for user interface, user experience, and client-side interactions.

* React.js – Component-based frontend framework
* Tailwind CSS – Utility-first CSS for responsive UI
* React Beautiful DnD – Drag-and-drop Kanban workflow
* FullCalendar – Preventive maintenance scheduling
* Redux Toolkit / Zustand – State management

⚙️ Backend - Handles business logic, workflows, and API services.

* Node.js – JavaScript runtime
* Express.js – REST API framework
* JWT (JSON Web Tokens) – Authentication

🗄️ Database - Stores equipment, maintenance requests, users, and teams.

* PostgreSQL – Relational database


🔐 Authentication & Authorization - Secure access control across the application.

* Email & Password Authentication
* JWT Access & Refresh Tokens
* Role-based permissions (Admin, Manager, Technician)
* Team-based request access


---

## 🗄️ Database Schema & Tables

This section illustrates the core database structure used in **GearGuard**.  
The schema is designed to ensure **data integrity**, **clear relationships**, and **scalability** for maintenance workflows.

### 📌 Overview
GearGuard uses a **relational PostgreSQL database (Neon)** with the following core tables:

- **Users** – System users with role-based access (Admin, Manager, Technician)
- **MaintenanceTeams** – Logical grouping of maintenance staff
- **Equipment** – Physical assets owned by the organization
- **Maintenances** – Maintenance logs and work records

---

### 📊 Database Tables

#### 🧑 Users Table
Stores authentication and role information for all users.

**Fields**
- `id` (UUID, Primary Key)
- `name`
- `email`
- `password` (hashed)
- `role`
- `teamId` (Foreign Key → MaintenanceTeams)

<img width="1600" height="790" alt="image" src="https://github.com/user-attachments/assets/460af5fe-438b-40e8-87d0-59b6e80ba95a" />


---

#### 👥 MaintenanceTeams Table
Represents maintenance teams responsible for handling equipment.

**Fields**
- `id` (UUID, Primary Key)
- `name`
- `description`

<img width="1600" height="718" alt="image" src="https://github.com/user-attachments/assets/ad6a76f6-8e28-4d5e-9f93-067fd17bae35" />


---

#### 🏭 Equipment Table
Stores all company assets and their operational status.

**Fields**
- `id` (UUID, Primary Key)
- `name`
- `serialNumber`
- `location`
- `status`
- `teamId` (Foreign Key → MaintenanceTeams)

<img width="1600" height="771" alt="image" src="https://github.com/user-attachments/assets/d9d9e6e7-a2ca-4a68-8083-db5e34078d5f" />


---

#### 🛠️ Maintenances Table
Tracks all maintenance activities performed on equipment.

**Fields**
- `id` (UUID, Primary Key)
- `type` (Inspection / Repair / Replacement)
- `description`
- `hoursSpent`
- `status`
- `technicianId` (Foreign Key → Users)
- `equipmentId` (Foreign Key → Equipment)
- `teamId` (Foreign Key → MaintenanceTeams)

<img width="1600" height="544" alt="image" src="https://github.com/user-attachments/assets/a1274f62-20e1-4542-b820-b71143f8e87b" />


---

### 🔗 Relationship Summary

- One **Maintenance Team** can have many **Users**
- One **Maintenance Team** can manage many **Equipment**
- One **Equipment** can have many **Maintenance Logs**
- One **User (Technician)** can perform many **Maintenance Tasks**

This relational design enables:
- Role-based workflows
- Accurate maintenance history tracking
- Easy future extension for analytics and automation

---


