'use strict';


// song1 = { audioUrl: 'https://learndotresources.s3.amazonaws.com/workshop/561bcd7fe305540300446092/sample1.mp3' };


juke.factory('PlayerFactory', function($rootScope) {
    // non-UI logic in here
    var audio = document.createElement('audio');
    var currentlyPlaying = false;
    var currentSong = null;
    var currentList = [];

    var playerObj = {
        pause: function() {
            audio.pause();
            currentlyPlaying = false;
        },
        start: function(song, songList) {
            playerObj.pause();
            currentList = songList;
            currentlyPlaying = true;
            currentSong = song;
            audio.src = song.audioUrl;
            audio.load();
            audio.play();
        },
        resume: function() {
            audio.play();
            currentlyPlaying = true;
        },
        isPlaying: function() {
            return currentlyPlaying;
        },
        getCurrentSong: function() {
            return currentSong;
        },
        next: function() {
            var currentIndex = currentList.indexOf(currentSong);
            if (currentIndex === currentList.length - 1) currentIndex = -1;
            playerObj.start(currentList[currentIndex + 1], currentList);
        },
        previous: function() {
            var currentIndex = currentList.indexOf(currentSong);
            if (currentIndex === 0) currentIndex = currentList.length;
            playerObj.start(currentList[currentIndex - 1], currentList);
        },
        getProgress: function() {
            // $rootScope.$digest();
            if (!audio.src) return 0;
            return progress;
        },
        setProgress: function(decimal) {
            var newTime = decimal * audio.duration;
            audio.currentTime = newTime;
            progress = decimal;
        },
        toggle: function(song, songList) {
            if (playerObj.isPlaying() && song === playerObj.getCurrentSong()) {
                playerObj.pause();
            } else if (!playerObj.isPlaying() && song === playerObj.getCurrentSong()) {
                playerObj.resume();
            } else {
                playerObj.start(song, songList);
            }
        }
    };
    var progress = 0;
    audio.addEventListener('timeupdate', function () {
        progress = audio.currentTime / audio.duration;
        $rootScope.$evalAsync();
    });
    audio.addEventListener('ended', function () {
        playerObj.next();
        $rootScope.$evalAsync();
    });
    return playerObj;
});
