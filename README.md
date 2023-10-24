# Asset Inventory Management System
https://ecoharbor.up.railway.app/

https://ecoharbor-client.vercel.app/


## Project Overview

In every organization, managing assets efficiently is crucial. Whether it's office equipment, machinery, or IT resources, keeping track of these assets can be challenging, especially in larger organizations with multiple departments and employees. The Asset Inventory Management System is designed to streamline this process, making it easier to track, maintain, and allocate assets.

## Problem Statement

The problem we aim to solve is the manual and error-prone management of assets. In many organizations, asset data is scattered across spreadsheets, making it hard to get a clear picture of what's available and what needs attention. Additionally, allocating funds for new asset purchases or repairs can be a cumbersome process, often leading to delays and inefficiencies.

Our solution is to create a centralized system that simplifies asset management and enhances decision-making. With this system, authorized users can efficiently request new assets, report issues with existing ones, and track the status of their requests.

## Minimum Viable Product (MVP)

Our initial version of the Asset Inventory Management System will include the following core features:

- **User Authentication**:
  - Users must log in to access the system.
  - Users will be categorized as Admins, Procurement Managers, or Normal Employees.

- **Role-Based Access Control**:
  - Authorized users can add, update, or remove asset data.
  - Procurement Managers have the authority to review and approve asset requests.
  - All asset data will be securely stored in a central location.
  - The system will provide separate views for managers and normal users.

- **Asset Management**:
  - Managers can add assets, categorize them, and attach images.
  - Managers can allocate assets to employees.

- **Asset Requests**:
  - Users can submit requests for new assets or repairs using a form.
  - Request details will include reasons, quantity, and urgency.
  - Managers can view all pending requests and their urgency.
  - Managers can also track completed requests.
  - Users can monitor their active and completed requests.

## Technical Objectives

To ensure the success of our project, we've set the following technical goals:

- **Descriptive Commits**:
  - We'll use clear commit messages to track changes.
  - Each feature or bug fix will have its own branch.

- **Code Review**:
  - Before any changes are merged, they'll be reviewed by at least two team members and the project lead.

- **Testing**:
  - The project will incorporate both unit tests and UI tests.
  - Our aim is to achieve a test coverage of above 85% for both UI and unit tests.

- **Modular Code**:
  - Our code will be organized in a modular way to minimize the impact of failures in one module on others.

## Technologies Used

- **Backend**: Ruby on Rails
- **Database**: PostgreSQL
- **Frontend**: ReactJS with Redux Toolkit or React Context for state management

## Installation

To set up the Asset Inventory Management System locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install backend dependencies (Ruby on Rails):
   ```bash
   cd backend
   bundle install
   ```

3. Set up the database:
   ```bash
   rails db:create db:migrate db:seed
   ```

4. Install frontend dependencies (ReactJS):
   ```bash
   cd ../frontend
   npm install
   ```

## Usage

1. Start the backend server (Ruby on Rails):
   ```bash
   cd ../backend
   rails server
   ```

2. Start the frontend development server (ReactJS):
   ```bash
   cd ../frontend
   npm start
   ```

3. Access the application in your web browser at `http://localhost:3000`.

## Contributing

We welcome contributions from the community. If you'd like to contribute to this project, please follow these steps:

1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine.
3. Create a new branch for your feature or bug fix.
4. Make your changes and commit them with descriptive messages.
5. Push your changes to your fork on GitHub.
6. Create a pull request to the main repository's `develop` branch.

## License

This project is licensed under the MIT License 