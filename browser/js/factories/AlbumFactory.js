juke.factory('AlbumFactory', function($http) {
    return {
        fetchAll: function() {
            return $http.get('/api/albums')
                .then(function(res) {
                    return res.data;
                });
        },
        fetchById: function(id) {
            return $http.get('/api/albums/' + id)
                .then(function(res) {
                    return res.data;
                });
        }
    }
})
