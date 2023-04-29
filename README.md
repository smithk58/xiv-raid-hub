# Xiv Raid Hub

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.12. If you're interested in contributing you can find more information on the [about page.](http://www.xivraidhub.com/about)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Development also requires running [XIV Raid Hub API](https://github.com/smithk58/xiv-raid-hub-api). May also require [XIV Raid Hub Bot](https://github.com/smithk58/xiv-raid-hub-bot) if you're touching functionality that requires the bot, such as alarms.

## Docker Image

You can build a production ready docker image by running `docker build -t xiv-raid-hub .` on the root of the project.

To test an image locally you can do the following:
* Add a `.env` file under root with the following content:
```
NODE_ENV=development
PORT=4200
BACKEND_BASE_URL=http://localhost:3000
```
* Run the following command from the root of this project `docker run -p 4200:4200 --env-file .env xiv-raid-hub`.
* After executing docker run you can view the result at `http://www.localhost:4200`, but will fail to fully work unless you have the backend server running as well.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
