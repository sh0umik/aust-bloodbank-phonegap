angular.module('app.services', [])

.factory('UserService', [ '$q', 'Loki', function($q, Loki){

	var _db;
    var _users;

    function initDB() {
        var fsAdapter = new LokiCordovaFSAdapter({"prefix": "loki"});  
        _db = new Loki('usersDB',
                {
                    autosave: true,
                    autosaveInterval: 1000, // 1 second
                    adapter: fsAdapter
                });

        _users = _db.getCollection('users');

        if (!_users) {
            _users = _db.addCollection('users');
        }

        console.log("data init");

    };

    function getdata(){
    	console.log(_users.data);
    }

    function adduser(user) {
        _users.insert(user);
        var mydv = _users.addDynamicView('user');
        console.log( "data : " + mydv.data());
    };

    function updateuser(user) {            
        _users.update(user);
    };

    function deleteuser(user) {
        _users.remove(user);
    };

    return {
        initDB: initDB,
        getdata : getdata,
        adduser: adduser,
        updateuser: updateuser,
        deleteuser: deleteuser
    };

}])

.service('BlankService', [function(){

}]);