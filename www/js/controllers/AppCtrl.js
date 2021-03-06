/**
 * Created by 黄炳乾 on 2017/2/25.
 */
define(['app', 'jquery'], function (app) {
  'use strict';

  function ctrl($scope, $ionicModal, $http, $rootScope, $state, Tool) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    var userStr = localStorage.getItem('user');

    $scope.loginData = {};
    $scope.msg2 = '完善个人信息 >';
    if(userStr == null){
      $scope.tell = '登录';
    }else {
      $rootScope.user = JSON.parse(userStr);
      if($rootScope.user.status == '已认证'){
        $scope.msg2 = '';
      }
    }
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      if (userStr == null) {
        $scope.modal.show();
      }else {
        $state.go('tabs.renZheng');
      }
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      var loginData = {
        "tell": $scope.loginData.tell,
        "pass": $scope.loginData.pass
      };

      $http.post(Tool.getLoginUrl(), loginData, Tool.getPostCfg()).success(function (data) {
        if (data.msg != 'success') {
          $scope.msg = data.msg;
        }else {
          data.user.headPortrait = Tool.getStaticFilesURL() + data.user.headPortrait;
          data.user.driversLicence = Tool.getStaticFilesURL()+ data.user.driversLicence;
          data.user.drivingLicence = Tool.getStaticFilesURL()+ data.user.drivingLicence;
          var ob = JSON.stringify(data.user);
          localStorage.setItem('user', ob);
          $rootScope.user = data.user;
          $scope.tell = data.user.tell;
          userStr = localStorage.getItem('user');
          $scope.modal.hide();

        }
      });
    };

    $scope.logout = function () {
      localStorage.removeItem('user');
      $rootScope.user = null;
      userStr = null;
      $scope.tell = '登录';
    }
  }

  ctrl.$inject = ['$scope', '$ionicModal', '$http', '$rootScope', '$state', 'Tool'];
  app.registerController('AppCtrl', ctrl);
  // return ctrl;
});
