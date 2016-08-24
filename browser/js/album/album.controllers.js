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
        PlayerFactory.toggle(...arguments);
    };

    $scope.currentSong = function() {
        return PlayerFactory.getCurrentSong();
    };

    $scope.isPlaying = function () {
        return PlayerFactory.isPlaying();
    };
});

juke.controller('AlbumsCtrl', function($scope, $rootScope, $log, StatsFactory, AlbumFactory) {
  AlbumFactory.fetchAll()
  .then(function (albums) {
    $scope.albums = albums;
  });
});
