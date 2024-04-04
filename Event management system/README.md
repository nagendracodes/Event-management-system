# Event Review and Rating System

## Overview

The Event Review and Rating System is a comprehensive REST API project designed to facilitate the review and rating process for events. It offers user-friendly functionalities for users and organizers alike, ensuring a smooth experience and secure access to the system.

## Features

### User and Organizer Authentication

- **User and Organizer Sign Up:** Full validation and secure password hashing with bcrypt ensure safe registration for both users and organizers.
- **User and Organizer Login:** JWT tokens are issued upon successful login, providing secure authentication for accessing the system.

### Secure Access Control

- **Middleware Implementation:** Custom middlewares enforce authorization for accessing various APIs, ensuring secure accessibility for both users and organizers.

### Organizer Management

- **Event Creation:** Organizers can create and schedule events seamlessly within the system.
- **Event Management:** Full CRUD operations allow organizers to display, update, reschedule, and delete events as needed.

### User Review and Rating

- **Review Viewing:** After signing up or logging in, users can view all reviews for a specific event.
- **Review Submission:** Users can submit reviews for events, providing valuable feedback for organizers and other users.
- **Review Interaction:** Users can like reviews, enhancing engagement and interaction within the system.
- **Review Reporting:** If a review's report count reaches five or more, it is automatically flagged for review by administrators.

### Organizer Response

- **Response Functionality:** Organizers have the ability to respond to specific reviews, fostering communication and addressing user feedback directly.

### Pagination

- **Efficient Data Handling:** Pagination features are implemented to facilitate browsing through ratings and reviews, ensuring efficient handling of large datasets without compromising system performance.

## Technology Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcrypt

## Try it Out

To experience the functionalities of the Event Review and Rating System, clone the GitHub repository and follow the provided instructions for running the project locally. Detailed API documentation is available via the provided Postman collection link for testing and exploration.


## Tech Stack

**Backend:** Node.js, Express.js.

**Database:** MongoDB.

**Backend APIs Testing Tool:** Postman.

## Run Locally

**Step:1-** Clone the project

```bash
  git clone https://github.com/ajit1028/EventReviewSystem.git
```

**Step:2-** Go to the project directory

```bash
  cd EventReviewSystem
```

**Step:3-** Install all the dependencies in Backend folder.

- Installl dependencies for backend

```bash
  npm install
```

**Step:4-** Create .env file in your Backend folder which will contain all your development environment private keys(variables) and their values

```bash
  PORT =
  MONGO_URL =
  SALT_ROUNDS =
  JWT_EXPIRES_IN =
  JWT_SECRETE_KEY =
```

**Step:5-** Start the Backend server / app

```bash
  //open new terminal
  npm run dev
```

**Step:6-** Now Review and Rating System App is running in your local system.

## GitHub Repo Link:

```bash
 https://github.com/ajit1028/EventReviewSystem
```

<!-- ## Deployed backend URL:

```bash
#   Deployed Backend URL will go here later
``` -->

## To Access All the APIs tested on POSTMAN use below URL:

```bash
   https://blue-zodiac-726723.postman.co/workspace/New-Team-Workspace~daa0d704-2d2b-40f1-8506-59f05f8a5df9/collection/33407386-ca65c906-93a0-40d7-b927-1c064c9c70a4?action=share&creator=33407386
```
