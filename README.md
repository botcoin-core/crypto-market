# [Cryptocurrency Market](https://crypto.kris2d.info/)

This is a simple Progressive Web App using Angular 5 that tracks real-time cryptocurrency prices. Find your top favourite coins here, like Bitcoin, Ethereum, Ripple and more. What's more, you can add this app to your iPhone and Android Home Screen now.

## Environment

[![Build Status](https://travis-ci.org/mrcotter/crypto-market.svg?branch=master)](https://travis-ci.org/mrcotter/crypto-market)
[![Angular 5.2.9](https://img.shields.io/badge/Angular-5.2.9-brightgreen.svg)](https://angular.io/)
[![Angular-Cli 1.7.4](https://img.shields.io/badge/AngularCLI-1.7.4-brightgreen.svg)](https://github.com/angular/angular-cli)
[![NG-ZORRO 0.6.15](https://img.shields.io/badge/NGZORRO-0.6.15-brightgreen.svg)](https://ng.ant.design/#/docs/angular/introduce)
[![Chart.js 2.7.2](https://img.shields.io/badge/Chart.js-2.7.2-brightgreen.svg)](http://www.chartjs.org/)

## Features

* Pure front end coding, no back end services;
* Fetch real-time price data from [CryptoCompare's public APIs](https://www.cryptocompare.com/api/) every 15 seconds;
* Colour changes to indicate real-time price change;
* Draw historical price trends using [Chart.js](http://www.chartjs.org/) with customised styles and functions;
* Integrated with [Ant Design](https://ng.ant.design/) for simple and unified visual style;
* Cross-browser compatability and mobile-friendly;
* Support Progressive Web Apps' features. Now you can add it to your iPhone and Android Home Screen, or into Chrome Apps.

![Cryptocurrency Market](https://user-images.githubusercontent.com/5259084/37133234-2f08308c-22e6-11e8-8c31-ea321f825ae6.png)

![Cryptocurrency Market](https://user-images.githubusercontent.com/5259084/37133243-383f6760-22e6-11e8-850c-863b2e912cd7.png)

![Cryptocurrency Market](https://user-images.githubusercontent.com/5259084/37133247-3e5bab72-22e6-11e8-8df3-ec6d9a82257b.jpg)

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Serving with http-server to Support Service Worker

Because `ng serve` does not work with service workers, you must use a separate HTTP server to test your project locally. You can use any HTTP server. The example below uses the http-server package from npm. To reduce the possibility of conflicts, test on a dedicated port.

```bash
ng build
ng update @angular/cli
ng update @angular/cli --migrate-only --from=1.7.4
npm install --save-dev @angular/cli@v6.1.4

cd dist
npx http-server -p 8080
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Get angular help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
