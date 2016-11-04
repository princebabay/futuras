app.controller("etape1Controller", etape1);
app.controller("etape2Controller", etape2);

function etape1($scope){
	$scope.annonces = ["Annonce gratuit", "Annonce payant"];
}

function etape2($scope){
	$scope.annonces = ["Annonce gratuit", "Annonce payant"];
}