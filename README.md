# JumboAssignment

Developed a backend for a real-time quiz game where two players compete against each other.

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#user-apis">User Apis</a></li>
      </ul>
      <ul>
        <li><a href="#task-apis">Task Apis</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a>
            <ul><li><a href="#local-database-setup">Local Database Setup</a></ul></li>
            <ul><li><a href="#npm-module-installation">NPM Module Installation</a></ul></li>
            <ul><li><a href="#env-file">ENV File</a></ul></li>
        </li>
      </ul>
    </li>
    <li><a href="#postman-collection">Postman Collection</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Developed a backend for a real-time quiz game where two players compete against each other. Each player is presented with the same 6 questions in sequence, and they answer these questions independently. The player who scores the highest out of the 6 questions wins the game. The game needs to handle user authentication, real-time question delivery, answer validation, scoring, and state management.

- Backend: Node JS
- Database: MongoDB
- Real-Time Communication: WebSockets(socket.io)
- Authentication: JWT for user authentication

## API Details

###### Loding API Contracts ...

#### POSTMAN LINK:

All the apis are version controlled.()

- #### User Apis:

  - Api to add(create) new users.
    - path: /api/v1/users/create
  - Api for user to login.
    - path: /api/v1/users/login
  - Api to fetch all the users from DB.
    - path: /api/v1/users/getAllUsers

- #### Questions Apis:

  - Api to add(create) new questions.
    - path: /api/v1/questions/create
  - Api to fetch all the questions from DB.
    - path: /api/v1/questions/getAllQuestions

- #### Game Apis:

  - Api to add(create) new game.
    - path: /api/v1/games/create
  - Api to fetch all the game from DB.
    - path: /api/v1/games/getAllGames

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

The below command move into the project floder and installs the node modules

```sh
cd jumboAssignment
npm install
```

The following commands starts the server.

```sh
npm run dev
```

### Prerequisites

- #### Local Database Setup

  #### -- Install mongoDB in your machine. [Installation Guide](https://www.mongodb.com/docs/manual/administration/install-community/)

  #### -- Install compass [installation guide](https://www.mongodb.com/try/download/compass)

  #### -- Create a DB with name "questions6" and create users, games and questions collections in the DB

- #### npm module installation

  ```sh
  npm install
  ```

- #### Env File

  You can use the below file a sample .env for getting started with the project.

  ```sh
  ENV=development
  PORT= 3090
  DB_URL=mongodb://localhost:27017/questions6
  ACCESS_TOKEN_SECRET=3a4952f095c22d3bedceb7c6c3a37b90618feae22a5db6722f04921e1975841e4befd4035231ac8b93325e78feb9562b812de98608548651186375dfae1dc62f

  ```

<!-- Postman Collection -->

## Postman Collection

Postman collection link - [@postman-link](https://djay-m.github.io/resume/)

## Contact

Dhananjaya.M - [@my_website](https://elements.getpostman.com/redirect?entityId=33121059-44362fbd-84ab-46e9-ba80-ad911b366bf7&entityType=collection)

Project Link: [https://github.com/Djay-M/taskManagementApplication/tree/main](https://github.com/Djay-M/taskManagementApplication/tree/main)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
