# Task Management System

A simple, feature-rich Task Management System built with Node.js, Express, and React. This application allows users to create, manage, and track tasks, offering an intuitive interface with authentication and role-based access control.

## Features.

- **User Authentication**: Users can sign up, log in, and manage their profiles.
- **Task Management**: Users can create, update, delete, and track tasks.
- **Role-Based Access Control**: Different roles (Admin, User) with access restrictions.
- **Task Status Tracking**: Tasks can be marked as 'To Do', 'In Progress', or 'Completed'.
- **Due Date and Prioritization**: Assign due dates and priority levels to tasks.
- **Search and Filter**: Search tasks by name, due date, or status.
- **Notifications**: Receive updates when tasks are completed or overdue.

## Tech Stack.

- **Backend**: Node.js, Express, MongoDB
- **Frontend**: React, Material-UI
- **Authentication**: JWT, Passport.js
- **Database**: MongoDB with Mongoose
- **State Management**: React Context API / Redux
- **Styling**: CSS, Material-UI

## Installation.

### 1. Clone the Repository.

```bash
git clone https://github.com/yourusername/task-management.git
cd task-management
```
### 2. Set Up the Backend.
Install Dependencies.
```bash
cd backend
npm install
```
### Configure Environment Variables.
Create a .env file in the backend folder with the following environment variables:
```bash
MONGODB_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```
### Start the Backend Server.
```bash
npm start
```
### 3. Set Up the Frontend.
Install Dependencies.

```bash
cd frontend
npm install
```
### Start the Frontend Server.

```bash
npm run dev

```
### 4. Access the Application.
Once both servers are running, you can access the application in your browser:
- **Frontend**: http://localhost:5173
- **Backend API**:: http://localhost:5000
### Usage
- **Sign Up / Log In**: Users can create an account or log in to manage tasks.
- **Dashboard**: Users will see a list of tasks on the dashboard, with options to filter by status or due date.
- **Create Task**: Users can create new tasks by providing a title, description, due date, and priority.
- **Update Task**: Users can update the task status or other details.
- **Delete Task**: Users can delete tasks they no longer need.
- **Role Management**: Admins can manage user roles and access permissions.
### API Endpoints.
Auth Endpoints.
- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in an existing user.
- **GET /api/auth/logout**: Log out the current user.
### Task Endpoints.
- **GET /api/tasks**: Get all tasks for the logged-in user.
- **POST /api/tasks**: Create a new task.
- **PUT /api/tasks/:id:** Update an existing task.
- **DELETE /api/tasks/:id:** Delete a task.
### User Management (Admin).
- **GET /api/users**: Get a list of all users (Admin only).
- **GET /api/users/:id:** Get details of a user (Admin only).
- **PUT /api/users/:id:** Update user information (Admin only).
- **DELETE /api/users/:id:** Delete a user (Admin only).

