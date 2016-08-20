angular.module('app.services', [])

.factory('UserService', [ '$q', function($q){

	var _db;
	var _users;

	function initDB() {
        // Creates the database or opens if it already exists
        _db = new PouchDB('users', {adapter: 'websql', location:'default'});

        //_db = new PouchDB('users', { location:'default'});

        console.log(_db.adapter);
    };

    function search(string) {

		// create a design doc
		var ddoc = {
		  _id: '_design/index',
		  views: {
		    index: {
		      map: function mapFun(doc) {
		        if (doc.name) {
		          emit(doc.name);
		        }
		      }.toString()
		    }
		  }
		}

		// save the design doc
		_db.put(ddoc).catch(function (err) {
		  if (err.name !== 'conflict') {
		    throw err;
		  }
		  // ignore if doc already exists
		}).then(function () {
		  // find docs where title === 'Lisa Says'
		  return db.query('index', {
		    key: string,
		    include_docs: true
		  });
		}).then(function (result) {
		  console.log(result)
		}).catch(function (err) {
		  console.log(err);
		});

    }

    function getdata(){

              if (!_users) {
                return $q.when(_db.allDocs({ include_docs: true}))
                          .then(function(docs) {

                            // Each row has a .doc object and we just want to send an 
                            // array of user objects back to the calling controller,
                            // so let's map the array to contain just the .doc objects.
                            _users = docs.rows.map(function(row) {
                                // Dates are not automatically converted from a string.
                                //row.doc.Date = new Date(row.doc.Date);
                                return row.doc;
                            });

                            // Listen for changes on the database.
                            _db.changes({ live: true, since: 'now', include_docs: true})
                               .on('change', onDatabaseChange);

                           return _users;
                         });
            } else {
                // Return cached data as a promise
                return $q.when(_users);
            }
    }

    function getuser(_id){
    	return $q.when(_db.get(_id));
    }

    function adduser(user) {
    	console.log("adding user " + user)
        return $q.when(_db.post(user));
    };

    function updateuser(user) {            
         return $q.when(_db.put(user));
    };

    function deleteuser(user) {
        return $q.when(_db.remove(user));
    };

    function onDatabaseChange(change) {
	    var index = findIndex(_users, change.id);
	    var user = _users[index];

	    if (change.deleted) {
	        if (user) {
	            _users.splice(index, 1); // delete
	        }
	    } else {
	        if (user && user._id === change.id) {
	            _users[index] = change.doc; // update
	        } else {
	            _users.splice(index, 0, change.doc) // insert
	        }
	    }
	}

	function findIndex(array, id) {
		var low = 0, high = array.length, mid;
		while (low < high) {
			mid = (low + high) >>> 1;
			array[mid]._id < id ? low = mid + 1 : high = mid
		}
		return low;
	}

    return {
        initDB: initDB,
        search : search,
        getdata : getdata,
        getuser : getuser,
        adduser: adduser,
        updateuser: updateuser,
        deleteuser: deleteuser
    };

}])

.factory('FeedbackService', [ '$q', function($q){

	var _db;
	var _feedbacks;

	function initDB() {
        // Creates the database or opens if it already exists
        _db = new PouchDB('users', {adapter: 'websql', location:'default'});

        //_db = new PouchDB('feedback', { location:'default'});

        console.log(_db.adapter);
    };

    function getdata(){

              if (!_feedbacks) {
                return $q.when(_db.allDocs({ include_docs: true}))
                          .then(function(docs) {

                            // Each row has a .doc object and we just want to send an 
                            // array of user objects back to the calling controller,
                            // so let's map the array to contain just the .doc objects.
                            _feedbacks = docs.rows.map(function(row) {
                                // Dates are not automatically converted from a string.
                                //row.doc.Date = new Date(row.doc.Date);
                                return row.doc;
                            });

                            // Listen for changes on the database.
                            _db.changes({ live: true, since: 'now', include_docs: true})
                               .on('change', onDatabaseChange);

                           return _feedbacks;
                         });
            } else {
                // Return cached data as a promise
                return $q.when(_feedbacks);
            }
    }

    function getfeedback(id){
    	return $q.when(_db.get(_id));
    }

    function addfeedback(feedback) {
        return $q.when(_db.post(feedback));
    };

    function onDatabaseChange(change) {
	    var index = findIndex(_feedbacks, change.id);
	    var user = _feedbacks[index];

	    if (change.deleted) {
	        if (user) {
	            _feedbacks.splice(index, 1); // delete
	        }
	    } else {
	        if (user && user._id === change.id) {
	            _feedbacks[index] = change.doc; // update
	        } else {
	            _feedbacks.splice(index, 0, change.doc) // insert
	        }
	    }
	}

	function findIndex(array, id) {
		var low = 0, high = array.length, mid;
		while (low < high) {
			mid = (low + high) >>> 1;
			array[mid]._id < id ? low = mid + 1 : high = mid
		}
		return low;
	}

    return {
        initDB: initDB,
        getdata : getdata,
        getuser : getuser,
        adduser: adduser,
        updateuser: updateuser,
        deleteuser: deleteuser
    };

}])

.service('BlankService', [function(){

}]);