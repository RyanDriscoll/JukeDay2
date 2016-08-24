'use strict';


// song1 = { audioUrl: 'https://learndotresources.s3.amazonaws.com/workshop/561bcd7fe305540300446092/sample1.mp3' };


juke.factory('PlayerFactory', function() {
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
            if (!audio.src) return 0;
            return audio.currentTime / audio.duration;
        }
    }
    return playerObj;
});
