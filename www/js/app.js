// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
define(['controllers/controllers'], function () {
  'use strict';

  var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova']);

  app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })
    .config(function ($stateProvider, $urlRouterProvider, $controllerProvider, $ionicConfigProvider, $httpProvider) {
      // $ionicConfigProvider.platform.ios.tabs.style('standard');
      // $ionicConfigProvider.platform.ios.tabs.position('bottom');
      $ionicConfigProvider.platform.android.tabs.style('standard');
      $ionicConfigProvider.platform.android.tabs.position('standard');

      $ionicConfigProvider.platform.android.navBar.alignTitle('center');

      $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
      $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

      $ionicConfigProvider.platform.ios.views.transition('ios');
      $ionicConfigProvider.platform.android.views.transition('android');
      $httpProvider.defaults.xsrfCookieName = 'csrftoken';
      $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

      app.registerController = $controllerProvider.register;
      app.loadControllerJs = function (controllerJs) {
        return function ($rootScope, $q) {
          var def = $q.defer(), deps = [];
          angular.isArray(controllerJs) ? (deps = controllerJs) : deps.push(controllerJs);
          require(deps, function () {
            $rootScope.$apply(function () {
              def.resolve();
            });
          });
          return def.promise;
        };
      };
      $stateProvider

        .state('tabs', {
          url: '/tabs',
          abstract: true,
          templateUrl: 'templates/tabs.html',
          controller: 'AppCtrl',
          resolve: {
            deps: app.loadControllerJs('./controllers/AppCtrl')
          }
        })
        .state('tabs.orders', {
          url: '/orders',
          views: {
            'orders': {
              templateUrl: 'templates/orders.html',
              controller: 'OrdersCtrl',
              resolve: {
                deps: app.loadControllerJs('./controllers/OrdersCtrl')
              }
            }
          }
        })
        .state('tabs.orderDtail', {
          url: '/orders/:orderId',
          views: {
            'orders': {
              templateUrl: 'templates/order-detail.html',
              controller: 'OrdersDetailCtrl',
              resolve: {
                deps: app.loadControllerJs('./controllers/OrdersDetailCtrl')
              }
            }
          }
        })
        .state('tabs.orderInProgress', {
          url: '/order/orderInProgress',
          params: {'orderid': null},
          views: {
            'orders': {
              templateUrl: 'templates/orderInProgress.html',
              controller: 'OrderInProgressCtrl',
              resolve: {
                deps: app.loadControllerJs('./controllers/OrderInProgressCtrl')
              }
            }
          }
        })

        .state('tabs.place', {
          url: '/callCar/place/:place',
          views: {
            'callCar': {
              templateUrl: 'templates/place.html',
              controller: 'PlaceCtrl',
              resolve: {
                deps: app.loadControllerJs('./controllers/PlaceCtrl')
              }
            }
          }
        })


        .state('tabs.orderFinishedList', {
          url: '/orderFinishedList',
          views: {
            'order': {
              templateUrl: 'templates/orderFinishedList.html',
              controller: 'OrderCtrl',
              resolve: {
                deps: app.loadControllerJs('./controllers/OrderCtrl')
              }
            }
          }
        })
        .state('tabs.orderFinished', {
          url: '/orderFinishedList/:orderId',
          views: {
            'order': {
              templateUrl: 'templates/orderFinished.html',
              controller: 'OrderFinishedCtrl',
              resolve: {
                deps: app.loadControllerJs('./controllers/OrderFinishedCtrl')
              }
            }
          }
        })

        .state('tabs.me', {
          url: '/me',
          views: {
            'me': {
              templateUrl: 'templates/me.html',
              controller: 'AppCtrl',
              resolve: {
                deps: app.loadControllerJs('./controllers/AppCtrl')
              }
            }
          }
        })


        .state('tabs.renZheng', {
          url: '/me/renZheng',
          views: {
            'me': {
              templateUrl: 'templates/authentication.html',
              controller: 'AuthenticationCtrl',
              resolve: {
                deps: app.loadControllerJs('./controllers/AuthenticationCtrl')
              }

            }
          }
        });
      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/tabs/orders');
    });

  return app;
});
