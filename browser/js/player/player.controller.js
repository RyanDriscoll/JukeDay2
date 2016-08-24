/* global juke */
'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {


  // main toggle
  $scope.toggle = function (song) {
    if (PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
            PlayerFactory.pause();
        } else if (!PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
            PlayerFactory.resume();
        } else {
            PlayerFactory.start(song);
        }
  };

  $scope.getCurrentSong = function() {
    return PlayerFactory.getCurrentSong();
  };

  $scope.isPlaying = function() {
    return PlayerFactory.isPlaying();
  }


  // outgoing events (to Album… or potentially other characters)
  $scope.next = () => PlayerFactory.next();
  $scope.prev = () => PlayerFactory.previous();

  function seek (decimal) {
    audio.currentTime = audio.duration * decimal;
  }

  $scope.handleProgressClick = function (evt) {
    seek(evt.offsetX / evt.currentTarget.scrollWidth);
  };

});
