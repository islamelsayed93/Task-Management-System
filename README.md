# Angular Task Management System

This is a Task Management System built with Angular (version 18), Bootstrap, NgRx state management, and lazy-loaded routes. It includes various features like task listing, creation, editing, viewing, filtering, searching, and task status updates.

## Features

- **Dashboard View**: Displays a list of tasks in a responsive table with columns for task name, priority, status, assigned user, due date, and actions (View/Edit/Delete).
- **Add/Edit Task**: A form for adding or editing tasks, with validation for task name, description, priority, status, assigned user, and due date.
- **View Task**: Displays detailed information of a task in a read-only format.
- **Delete Task**: Prompts a confirmation modal before task deletion.
- **Search and Filter**: Allows searching tasks by name or description and filtering tasks by priority, status, or assigned user.
- **Task Status Update**: Tasks can be moved between different columns (Pending → In Progress → Completed) using drag-and-drop functionality.
- **Responsive Design**: Built with Bootstrap to ensure the app is responsive and works on all devices.

## Technologies Used

- **Angular 18**: Core framework.
- **Bootstrap**: CSS framework for responsive and modern UI.
- **RxJS**: For handling asynchronous operations and observables.
- **TypeScript**: For type safety and better code structure.
- **Jasmine & Karma**: For unit testing.

## Setup Instructions

### Prerequisites

- **Node.js** (version 16 or later) is required to run the project.
- **Angular CLI** for running and building the project.

### Installation

1. **Clone the repository:**

  ```bash
  git clone https://github.com/your-username/task-management-system.git
  cd task-management-system
  
Install dependencies:
  npm install

Run the development server:
  ng serve

Running Unit Tests:
  ng test

