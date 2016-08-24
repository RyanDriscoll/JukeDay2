/* global juke */
'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {



  // main toggle
  $scope.toggle = function (song) {
    PlayerFactory.toggle(song);
  };

  $scope.getCurrentSong = function() {
    return PlayerFactory.getCurrentSong();
  };

  $scope.isPlaying = function() {
    return PlayerFactory.isPlaying();
  };

  $scope.getProgress = function() {
    return PlayerFactory.getProgress() * 100;
  };
  // outgoing events (to Album… or potentially other characters)
  $scope.next = () => PlayerFactory.next();
  $scope.prev = () => PlayerFactory.previous();

  function seek (decimal) {
    audio.currentTime = audio.duration * decimal;
  }

  $scope.handleProgressClick = function (evt) {
    PlayerFactory.setProgress(evt.offsetX / evt.currentTarget.scrollWidth);
  };

});
