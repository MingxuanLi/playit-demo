angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  
  $scope.fbLogin = function() {
    openFB.login(
        function(response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded');
                $scope.closeLogin();
            } else {
                alert('Facebook login failed');
            }
        },
        {scope: 'email,publish_actions'});
  };
})

.controller('ProfileCtrl', function($scope) {
    openFB.api({
        path: '/me',
        params: {fields: 'id,name'},
        success: function(user) {
            $scope.$apply(function() {
                $scope.user = user;
            });
        },
        error: function(error) {
            alert('Facebook error: ' + error.error_description);
        }
    });
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});

angular.module('ionicApp', [])

.controller('CricketsCtrl', function($scope, $http, $cordovaSQLite) {
 $http.get('http://cricket.api.playitgame.com/v1/?category=tournament&action=get-future-tournaments&page=0&limit=10').then(function(resp) {
        $scope.crickets = resp.data.data.tournament_list;
    }, function(err) {
    	console.error(err);
    	// err.status will contain the status code
    })
	
    
    $scope.insert = function() {
    	console.log("the number of crickets will be saved : #" + $scope.crickets.length);
        var query = "INSERT INTO cricket (tournament_id, tournament_name, status, tournament_type, date_start, date_end, total_teams) VALUES (?,?,?,?,?,?,?)";
        
        angular.forEach($scope.crickets, function(value, key) {
  			console.log("iterate to tournament_id: #" + value.tournament_id);
  			$cordovaSQLite.execute(db, query, [value.tournament_id, value.tournament_name, value.status, value.tournament_type, value.date_start, value.date_end, value.total_teams]).then(function(res) {
        		console.log("INSERT ID -> " + value.tournament_id);
            	//console.log("INSERT ID -> " + res.insertId);
        	}, function (err) {
            	console.error(err);
        	});
		});
    }
    
    $scope.select = function() {
    	//var db = $cordovaSQLite.openDB({name: "playit.demo"});
        var query = "SELECT tournament_id, tournament_name, status, tournament_type, date_start, date_end, total_teams FROM cricket";
        $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length > 0) {
            	console.log("Total #" + res.rows.length + " selected");
            	$scope.crickets = [];
            	console.log("$scope.crickets cleaned " + $scope.crickets);
            	for(var i=0; i<res.rows.length; i++){
            		var thisrow = {"tournament_id":res.rows.item(i).tournament_id, "tournament_name":res.rows.item(i).tournament_name, "status":res.rows.item(i).status, "tournament_type":res.rows.item(i).tournament_type, "date_start":res.rows.item(i).date_start, "date_end":res.rows.item(i).date_end, "total_teams":res.rows.item(i).total_teams};
            		//console.log(thisrow);
            		$scope.crickets.push(thisrow);
            		console.log("pushing " + thisrow.tournament_id + " into this crickets var");
            	}
            	console.log("the load result: "+ $scope.crickets);
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
    }
    
    $scope.delete = function() {
    	var query = "DELETE FROM cricket";
   		$cordovaSQLite.execute(db, query).then(function(res) {
            console.log("All entries deleted, now number rows in DB: #" + res.rows.length);
        }, function (err) {
            console.error(err);
        });
    }
})

.controller('CricketCtrl', function($scope, $http, $stateParams, $filter) {
    $http.get('http://cricket.api.playitgame.com/v1/?category=tournament&action=get-future-tournaments&page=0&limit=10').then(function(resp) {
        $scope.crickets = resp.data.data.tournament_list;
        $scope.cricket = $filter('filter')($scope.crickets, {tournament_id: $stateParams.cricketId}, false)[0];
    }, function(err) {
    	console.error(err);
    	// err.status will contain the status code
    })
});

/*
.controller('CricketsCtrl', function($scope, $http)){
    $http.get('http://cricket.api.playitgame.com/v1/?category=tournament&action=get-future-tournaments&page=0&limit=10').
    success(function(data) {
            $scope.crickets = data;
            });
})
 */
