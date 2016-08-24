/* global juke */
'use strict';

juke.controller('AlbumCtrl', function($scope, $rootScope, $log, StatsFactory, AlbumFactory, PlayerFactory) {
    AlbumFactory.fetchById(2)
        .then(function(album) {
            album.imageUrl = '/api/albums/' + album.id + '/image';
            album.songs.forEach(function(song, i) {
                song.audioUrl = '/api/songs/' + song.id + '/audio';
                song.albumIndex = i;
            });
            $scope.album = album;
            StatsFactory.totalTime(album)
                .then(function(albumDuration) {
                    $scope.fullDuration = albumDuration;
                });
        })
        .catch($log.error); // $log service can be turned on and off; also, pre-bound

    // main toggle
    $scope.toggle = function(song, songList) {
        // if ($scope.playing && song === $scope.currentSong) {
        //     $rootScope.$broadcast('pause');
        // } else {
        //     $rootScope.$broadcast('play', song);
        // }
        if (PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
            PlayerFactory.pause();
        } else if (!PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
            PlayerFactory.resume();
        } else {
            PlayerFactory.start(song, songList);
        }
    };

    $scope.currentSong = function() {
        return PlayerFactory.getCurrentSong();
    }

    $scope.isPlaying = function () {
        return PlayerFactory.isPlaying();
    }
    // a "true" modulo that wraps negative to the top of the range
    function mod(num, m) {
        return ((num % m) + m) % m; }

    // jump `interval` spots in album (negative to go back, default +1)
    function skip(interval) {
        if (!$scope.currentSong) return;
        var index = $scope.currentSong.albumIndex;
        index = mod((index + (interval || 1)), $scope.album.songs.length);
        $scope.currentSong = $scope.album.songs[index];
        if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
    }

    function next() { skip(1); }

    function prev() { skip(-1); }

});

juke.controller('AlbumsCtrl', function($scope, $rootScope, $log, StatsFactory, AlbumFactory) {
  AlbumFactory.fetchAll()
  .then(function (albums) {
    $scope.albums = albums;
  });
});
