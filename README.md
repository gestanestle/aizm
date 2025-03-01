# AIZM Control and Monitoring System

Main paper: AIZM_IEEE.pdf

The web application must run alongside the AIZM hardware machine whose source code and schematic are provided inside the `/firmware` directory.


 Website preview           |   Website preview
:-------------------------:|:-------------------------:
![image](public/screenshot-1.png)  |  ![image](public/screenshot-2.png)



This app uses the following libraries:
- [Clerk](https://clerk.com/)
- [daisyUI](https://daisyui.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [MQTT.js](https://github.com/mqttjs/MQTT.js)
- [Recharts](https://recharts.org)

## Development

Run a local instance of [ngrok](https://ngrok.com/) to expose the Next.js app running on http://localhost:3000 to auth webhooks.

<img src="public/ngrok.png" width="70%" height="70%">

<br>

Create a [Clerk](https://clerk.com/) application. Add the public host provided by `ngrok` and append the `api/users` endpoint. 

<img src="public/clerk-1.png" width="70%" height="70%"> 

<br>

Tick the events related to `user` to receive user events.

<img src="public/clerk-2.png" width="70%" height="70%">

<br>

Copy the API Keys to `.env.local`. Refer to `.env.example` for the required environment variables.

## Go Server

A dedicated Go server is needed for this project to continuously monitor the status updates broadcasted by ESP32 devices through an MQTT broker. This server operates non-stop and is housed in the repository found  [here](https://github.com/gestanestle/aizm-go-server.git).

## Database

This application uses [Timescaledb](https://www.timescale.com/). Run a local or docker instance of timescaledb with the schema provided in `./sql/schema.sql`. 

If you want to initialize a seeded dockerized database to see the UI in action, run the following command:

`docker-compose up -d ` 

_Note: Make sure to have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed in your system._


## Get started

Install the dependencies:

`pnpm install` 

Run in dev mode:

`pnpm dev`

Open the app in browser:

`http://localhost:3000`

