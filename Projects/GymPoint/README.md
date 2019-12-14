![Image of GymPoint](https://github.com/Rocketseat/bootcamp-gostack-desafio-10/blob/master/.github/logo.png)

# GymPoint

This project is the final challenge of RocketSeat's Bootcamp.

The project consists of a gym system, where its administrator can control all the data of their students, such as weight, height, age, membership, etc., through the web application. In addition to being able to answer questions from their students straight into the system.

The student part of the system is with the mobile application, where he can check in whenever he arrives at the gym (limited to 5 times a week) and can ask questions to staff about any subject.

This project was made using NodeJs in the backend, React for the frontend and React-Native for the mobile application.

Next, there are some images from the final application.

## Gym staff side of the application

![Image1 of GymPoint](https://i.ibb.co/Hp3RMft/Screen-Shot-2019-12-14-at-4-36-39-PM.png) ![Image2 of Gympoint](https://i.ibb.co/3BZ3S9D/Screen-Shot-2019-12-14-at-4-37-40-PM.png) ![Image3 of Gympoint](https://i.ibb.co/t8J25CP/Screen-Shot-2019-12-14-at-4-37-48-PM.png)

## Student side of the application

![Image1 of GymPoint](https://i.ibb.co/jMVBbn7/Screen-Shot-2019-12-14-at-4-27-34-PM.png) ![Image2 of Gympoint](https://i.ibb.co/3rN9dpJ/Screen-Shot-2019-12-14-at-4-27-39-PM.png) ![Image3 of Gympoint](https://i.ibb.co/c2zsFTy/Screen-Shot-2019-12-14-at-4-27-50-PM.png)

# How to run the project

To run this project you'll need to have the following tools installed in your computer:

    - NPM
    - Yarn
    - Docker
    - Postgress Docker
    - Redis Docker

After all this intalled, you'll need to follow the following steps:

## Backend:

    - First, create a database named "GymPoint" on your Postgress;
    - In the project directory, you can run: `yarn dev` to start the server.
    - Run the command `yarn sequelize-cli db:migrate` to create all the application's tables and admin user

## Web Application:

    - In the project directory, you can run: `yarn start`
    - Login using the previously created admin (User: admin@gympoint.com, password: 123456)

You can use this application to create students, plans, memberships and answer students question.

## Mobile Application:

To run this application, you can follow the steps showed in the following tutorial:
https://docs.rocketseat.dev/ambiente-react-native/introducao
