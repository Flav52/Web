//variables pour la tailles des pans de mur pour la structure du plateau de jeu
var WALLWIDTH = 1;
var WALLHEIGHT = 2;
var taillePlateau;
var largeurPlateau; //en case
var collision = [];
var grilleDeJeu = new THREE.Group();
var raycaster = new THREE.Raycaster();
var centre = new THREE.Vector2(0, 0);
var lumiere2;

//SON
var listener;

var idRotate = [];
var ObjectRotSpeed = 0.008;
var ObjUpcpt = 0;
var ObjUpDecay = 0.006;

//Environnement
var sunspeed = 0.0008;
var suntime = 0.20;
var skyday = 75;
var skynight = 13;
var skyHUE = 35 / 360;
var skySAT = 40 / 100;
var fogColor = new THREE.Color("rgba(192,192,192)");

var Items = [];
var Modeles = [];
var allBuilt = false;

//deplacement
var lastMoved = Date.now();
var timeToMove = .2; //s
var keyboard = {};
var topCameraflag = false;
//variable pour le rendu de la scene
var mainCamera;
var topCamera;
var scene;
var renderer;
var sky;

//fonctions

var flaques = [];
//appel des fonctions
var facteur = 1;
var nombreJoueur = 1;
var IdJoueur = $("#idUser").val();
var crtJoueur = 0;
var IdPartie = $("#idPartie").val(); //Id de la partie du joueur


init();
animate();
//initialisation
function init() {

	preload();
	//creation de la scene
	scene = new THREE.Scene();
	//65 183 234
	scene.background = new THREE.Color("hsl(198,80%,58%)");
	//////////////////////////////
	//scene.add(new Pedestal(0, -5, "./img/potionSprite.png", "Ppotion"));

	var equipe = "keke";
	var numEquipe = 0;

	$.ajax({
		method: "POST",
		async: false,
		url: "../ajax_php/ajax_launchGame.php",
		data: {
			idJ: IdJoueur,
			nomLobby: IdPartie
		},
		dataType: "html",
		success: function (infoJoueur) {
			role = JSON.parse(infoJoueur);
			equipe = role[0];
			numEquipe = role[1];
		}
	});
	console.log(equipe);
	console.log(numEquipe);

	var bob = new Joueur(IdJoueur, 0, equipe, equipe);
	// bob.speed=2;
	Joueurs.push(bob);
	//deplacement

	$.ajax({
		method: "POST",
		url: "../ajax_php/ajax_createMap.php",
		async: false,
		data: {
			idP: IdPartie
		},
		dataType: "html"
	});

	//brouillard 
	boarding(IdPartie, equipe, numEquipe);
	generateBoard();
	arena();


	//Envoi de la création du joueur dans la sauvegarde de la partie
	$.ajax({
		method: "POST",
		url: "../ajax_php/ajax_playerSave.php",
		data: {
			id: IdJoueur,
			idP: IdPartie,
			posX: bob.position.x,
			posZ: bob.position.z,
			rotY: bob.rotation.y,
			etat: bob.etat
		},
		dataType: "html",
	});

	//ajout des lumieres
	generateLights();


	// console.log(PedestalMesh);


	//Camera
	for (var i = 0; i < Joueurs.length; i++) {
		if (Joueurs[i].ident == IdJoueur) {
			crtJoueur = i;
			break;
		}
	}
	mainCamera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight - 48), 0.01, 200);
	mainCamera.position.x = Joueurs[crtJoueur].position.x;
	mainCamera.position.y = Joueurs[crtJoueur].position.y + 1.2;
	mainCamera.position.z = Joueurs[crtJoueur].position.z;
	mainCamera.rotation.y = Joueurs[crtJoueur].rotation.y;

	var ch = new THREE.CameraHelper(mainCamera);
	//scene.add(ch);



	//parametrage de la camera du haut
	var temp = 40;
	topCamera = new THREE.OrthographicCamera(window.innerWidth / -temp, window.innerWidth / temp, (window.innerHeight - 48) / temp, (window.innerHeight - 48) / -temp, 1, 100);
	topCamera.position.y = 50;
	topCamera.position.x = 0;
	topCamera.position.z = 0;
	topCamera.rotation.x = degreesToRadians(-90);

	////
	listener = new THREE.AudioListener();
	mainCamera.add(listener);
	topCamera.add(listener);



	window.addEventListener('resize', onWindowResize, false);
	//les adds scenes
	scene.fog = new THREE.Fog(fogColor, 1, 5);

	//scene.add(Camera);
	scene.add(mainCamera);
	scene.add(topCamera);
	scene.add(grilleDeJeu);

	//parametrage du rendu
	renderer = new THREE.WebGLRenderer();
	renderer.antialias = true;
	renderer.shadowMap.enabled = true;
	renderer.shadowMapWidth = 2048;
	renderer.shadowMapHeight = 2048;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	renderer.setClearColor(scene.fog.color);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, (window.innerHeight - 48));

	//assignation au contenaire de la page html
	var container = document.getElementById('container');
	container.appendChild(renderer.domElement);
	stats = new Stats();
	container.appendChild(stats.dom);

	// var loader = new THREE.TextureLoader();
	// loader.crossOrigin = '';
	// var fireTex = loader.load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/212131/Fire.png");

	// var wireframeMat = new THREE.MeshBasicMaterial({
	// 	color: new THREE.Color(0xffffff),
	// 	wireframe: true
	// });

	// fire = new THREE.Fire(fireTex);
	// var wireframe = new THREE.Mesh(fire.geometry, wireframeMat.clone());
	// fire.add(wireframe);
	// wireframe.visible = true;
	// wireframe.visible = false;
	// wireframe.position.set(-2, 2, -8);
	// scene.add(wireframe);

}

function depFlaque() {
	var rnd = Math.floor(Math.random() * flaques.length);
	console.log(flaques[rnd]);console.log(rnd);
	Joueurs[crtJoueur].position.x = flaques[rnd].children[0].position.x;
	Joueurs[crtJoueur].position.z = flaques[rnd].children[0].position.z;
	mainCamera.position.x = Joueurs[crtJoueur].position.x;
	mainCamera.position.z = Joueurs[crtJoueur].position.z;
	mainCamera.rotation.y = Joueurs[crtJoueur].rotation.y;
}

function clearPath() {
	raycaster.setFromCamera(centre, mainCamera);
	var intersects = raycaster.intersectObjects(collision);
	if (intersects.length > 0) {
		var temp = intersects[0]
		//console.log(temp);

		switch (temp.object.name) {
			case "Mur":
			case "brasero":
				if (temp.distance < Joueurs[crtJoueur].speed)
					if (Joueurs[crtJoueur].speed == 2 && temp.distance > 1)
						return 1;
					else return 0;
				break;
			case "LMur":
				if (temp.distance < Joueurs[crtJoueur].speed) {
					if (Joueurs[crtJoueur].speed == 2 && temp.distance > 1)
						return 1;
					else
						Joueurs[crtJoueur].position.set(Joueurs[crtJoueur].position.x, Joueurs[crtJoueur].position.y, -Joueurs[crtJoueur].position.z);
					return 0;
				}
				break;
			case "TMur":
				if (temp.distance < Joueurs[crtJoueur].speed) {
					if (Joueurs[crtJoueur].speed == 2 && temp.distance > 1)
						return 1;
					else
						Joueurs[crtJoueur].position.set(-Joueurs[crtJoueur].position.x, Joueurs[crtJoueur].position.y, Joueurs[crtJoueur].position.z);
					return 0;
				}
				break;
		}
	}
	return Joueurs[crtJoueur].speed;

}

function touchePressee(event) {
	keyboard[event.keyCode] = true;

	if (keyboard[32]) { ///q
		console.log("Position du joueur ")
		console.log(Joueurs[crtJoueur].position);
	}
	if (keyboard[37]) { ///q
		if (topCameraflag == false) {
			Joueurs[crtJoueur].rotation.y += (Math.PI / 2);
			Joueurs[crtJoueur].rotation.y.toFixed(2);
			Joueurs[crtJoueur].rotation.y %= (Math.PI * 2);
			mainCamera.rotation.y = Joueurs[crtJoueur].rotation.y;
		}
		requestDeplacement();
		//console.debug('ArrowLeft');
	}

	if (keyboard[39]) { ///d
		if (topCameraflag == false) {
			Joueurs[crtJoueur].rotation.y -= (Math.PI / 2);
			Joueurs[crtJoueur].rotation.y %= (Math.PI * 2);
			Joueurs[crtJoueur].rotation.y.toFixed(2);
			mainCamera.rotation.y = Joueurs[crtJoueur].rotation.y

		}
		requestDeplacement();
		//console.debug('ArrowRight');
	}
	if (keyboard[38]) { ///z
		var time = Date.now();
		if (topCameraflag == false && time - lastMoved > timeToMove * 1000) {
			lastMoved = time;

			var spd = clearPath();
			Joueurs[crtJoueur].position.x -= spd * Math.round(Math.sin(Joueurs[crtJoueur].rotation.y) * 1);
			Joueurs[crtJoueur].position.z -= spd * Math.round(Math.cos(Joueurs[crtJoueur].rotation.y) * 1);
			mainCamera.position.x = Joueurs[crtJoueur].position.x;
			mainCamera.position.z = Joueurs[crtJoueur].position.z;
			mainCamera.rotation.y = Joueurs[crtJoueur].rotation.y;

		}
		/*else{
					Joueurs[crtJoueur].position.x -= Math.sin(Joueurs[crtJoueur].rotation.y) * 1;
					Joueurs[crtJoueur].position.z -= Math.cos(Joueurs[crtJoueur].rotation.y) * 1;
					
				}*/

				console.log(map(Joueurs[crtJoueur].position.z,-15,15,0,30)+" "+ map(Joueurs[crtJoueur].position.x,-15,15,0,30));
				console.log(plateau[map(Joueurs[crtJoueur].position.z,-15,15,0,30)][map(Joueurs[crtJoueur].position.x,-15,15,0,30)]);
		if (plateau[map(Joueurs[crtJoueur].position.z,-15,15,0,30)][map(Joueurs[crtJoueur].position.x,-15,15,0,30)] == 11) {
			depFlaque();
		}
		requestDeplacement();
		//console.debug('ArrowUp');

	}
	if (keyboard[40]) { ///Fleche du bas
		if (topCameraflag == false) {
			Joueurs[crtJoueur].rotation.y += Math.PI;
			mainCamera.rotation.y = Joueurs[crtJoueur].rotation.y;
		}
		/*else{
					Joueurs[crtJoueur].position.x += Math.sin(Joueurs[crtJoueur].rotation.y) * 1;
					Joueurs[crtJoueur].position.z += Math.cos(Joueurs[crtJoueur].rotation.y) * 1;	
				}*/
		requestDeplacement();
		//console.debug('ArrowDown');

	}
	if (keyboard[72]) { ///h
		if (!topCameraflag) {
			topCameraflag = true;
			console.debug('TopView');
		}
	}
	if (keyboard[89]) { ///y
		if (topCameraflag) {
			topCameraflag = false;
			console.debug('Y');
		}
	}
	if (!keyboard[123] && !keyboard[122]) {
		event.preventDefault();
	}

}

function toucheRelache(event) {
	keyboard[event.keyCode] = false;
}

//lumieres
function generateLights() {
	//creation positionnement et ajout des lumieres
	var lumiere1 = new THREE.AmbientLight(0xfaffbf, .5);
	lumiere2 = new THREE.DirectionalLight(0xfaffbf, 1);
	lumiere2.name = "l1";
	//lumiere1.position.set(1,1,1);

	lumiere2.castShadow = true;

	lumiere2.target.position.set(1, 1, 4);
	lumiere2.target.updateMatrixWorld();

	var lumsize = 30;

	lumiere2.shadow.camera.left = -lumsize;
	lumiere2.shadow.camera.right = lumsize;
	lumiere2.shadow.camera.top = -lumsize;
	lumiere2.shadow.camera.bottom = lumsize;

	var helperr2 = new THREE.CameraHelper(lumiere2.shadow.camera);
	//scene.add(helperr2);

	lumiere2.shadow.mapSize.width = 2048;
	lumiere2.shadow.mapSize.height = 2048;


	lumiere2.position.set(-10, 100, 20);
	scene.add(lumiere1);
	scene.add(lumiere2);
}
//ajustement de l'image en fonction de la taille de la fenetre
function onWindowResize() {
	if (!topCameraflag) {
		mainCamera.aspect = window.innerWidth / (window.innerHeight - 48);
		mainCamera.updateProjectionMatrix();
	} else {
		//topCamera.aspect = window.innerWidth / window.innerHeight;
		var temp = 40;
		topCamera = new THREE.OrthographicCamera(window.innerWidth / -temp, window.innerWidth / temp, (window.innerHeight - 48) / temp, (window.innerHeight - 48) / -temp, 1, 100);
		topCamera.position.y = 50;
		topCamera.position.x = 0;
		topCamera.position.z = 0;
		topCamera.rotation.x = degreesToRadians(-90);
		topCamera.updateProjectionMatrix();
	}
	renderer.setSize(window.innerWidth, (window.innerHeight - 48));

}

//deplacement
document.addEventListener('keydown', touchePressee);
document.addEventListener('keyup', toucheRelache);
document.addEventListener('resize', onWindowResize);

function map(variable, d1, d2, a1, a2) {
	if (variable < d1)
		return a1;
	else if (variable > d2)
		return a2;

	var res = (variable - d1)
	res *= a2 - a1
	res /= d2 - d1
	res += a1;
	return res;
}

function newlight() {
	if (lumiere2.position.y < 0)
		lumiere2.intensity = 0;
	else
		lumiere2.intensity = (lumiere2.position.y / 100);


	var temp = map(lumiere2.intensity, 0, 1, skynight, skyday) / 100;

	scene.background.setHSL(skyHUE, skySAT, temp);
	fogColor.setHSL(skyHUE, skySAT, temp);
	sky.material.color.setHSL(skyHUE, skySAT, temp);
}


//mise a jour du jeu en permanence
function animate() {
	//console.debug(lumiere2.intensity);
	sky.rotation.y += 0.00015;
	lumiere2.position.y = 100 * Math.sin(suntime);
	lumiere2.position.z = 20 * Math.cos(suntime);

	try {
		for (var i = 0; i < idRotate.length; i++) {
			var obj = scene.getObjectById(idRotate[i]);
			obj.rotation.y += ObjectRotSpeed;
			obj.position.y += Math.sin(ObjUpcpt += ObjUpDecay) / 500;
		}
	} catch (error) {
		console.log("Erreur non critique: Rotation");
	}

	suntime += sunspeed;
	newlight();

	stats.update();
	render();
	requestAnimationFrame(animate);
}

function render() {

	if (toBuild.length > 0) {
		//console.log(toBuild);
		for (var i = 0; i < toBuild.length; i++) {
			if (toBuild[i].built) {
				toBuild.splice(i, 1);
				i--;
				continue;
			}
			toBuild[i].getMesh();
		}
	}

	if (topCameraflag) {
		scene.fog = new THREE.Fog(fogColor, 1);
		renderer.render(scene, topCamera);

	} else {
		scene.fog = new THREE.FogExp2(fogColor, 0.5);
		renderer.render(scene, mainCamera);
	}


}

function degreesToRadians(degrees) {
	return degrees * Math.PI / 180;
}

function radiansToDegrees(radians) {
	return radians * 180 / Math.PI;
}


//Envoi du déplacement au serveur
function requestDeplacement() {
	$.ajax({
		method: "POST",
		url: "../ajax_php/ajax_deplacement.php",
		data: {
			id: Joueurs[crtJoueur].ident,
			idP: IdPartie,
			posX: Joueurs[crtJoueur].position.x,
			posZ: Joueurs[crtJoueur].position.z,
			rotY: Joueurs[crtJoueur].rotation.y,
		},
		dataType: "html",
	});
}


//Actualisation des position des autres joueurs avec intervalle
var rfrsh = setInterval(function () {
	$.ajax({
		method: "POST",
		url: "../ajax_php/ajax_playerRefresh.php",
		data: {
			id: IdJoueur,
			idP: IdPartie
		},
		dataType: "html",
		success: function (playersData) {
			var data = JSON.parse(playersData);
			var indFind = -1;
			data = data["Joueurs"];

			//console.log(data);

			data.forEach(function (element) {
				if (element["id"] == IdJoueur) {
					$("#team").text(" [" + element["etat"] + "]");
					if (!element["alive"]) {
						document.removeEventListener('keydown', touchePressee);
						document.removeEventListener('keyup', toucheRelache);
						topCameraflag = true;
						scene.remove(Joueurs[0]);
					}
				} else {
					Joueurs.forEach(function (_joueur) {
						if (_joueur.ident == element["id"]) {
							indFind = Joueurs.indexOf(_joueur);
						}
					});

					if (indFind >= 0) {
						var _player = Joueurs[indFind];
						if (element["alive"]) {
							_player.position.x = element["positionX"];
							_player.position.z = element["positionZ"];
							_player.rotation.y = parseFloat(element["rotationY"]);
							_player.etat = element["avatar"];
							_player.equipe = element["etat"];
							_player.updateMesh();
						} else {
							scene.remove(_player);
							var indexRem = Joueurs.indexOf(_player);
							Joueurs.splice(indexRem, 1);
						}
					} else {

						if (element["alive"]) {
							var newJ = new Joueur(element["id"], 2, element["avatar"], element["etat"]);

							newJ.position.x = element["positionX"];
							newJ.position.z = element["positionZ"];
							newJ.position.y = 1;
							newJ.rotation.y = element["rotationY"];
							newJ.updateMesh();

							Joueurs.push(newJ);
							scene.add(newJ);
						}
					}
				}
				render();
			});
		}
	});
}, 300);

var tempsPartie = 80000;
var tempsEcoule = 0;
var timerPartieAff = setInterval(function () {
	tempsEcoule += 1000;
	if ((tempsPartie - tempsEcoule) >= 0) {
		var temps = (tempsPartie - tempsEcoule) / 1000;
		$("#chrono").text("Fin dans " + temps + " secondes");
	} else {
		$("#chrono").text("Partie terminée");
	}
}, 1000);

var timerGong = setInterval(function () {
	gong();

	if (Joueurs[0].equipe == "keke") {
		Joueurs[0].equipe = "badger";
		Joueurs[0].etat = "badger";
	} else {
		Joueurs[0].equipe = "keke";
		Joueurs[0].etat = "keke";
	}

	Joueurs[0].updateMesh();

	$.ajax({
		method: "POST",
		url: "../ajax_php/ajax_gong.php",
		data: {
			id: IdJoueur,
			idP: IdPartie,
			equipe: Joueurs[0].equipe
		},
		dataType: "html"
	});

}, 15000);

var timerPartie = setTimeout(function () {
	timerGong = null;

	var nbkeke = 0;
	var nb = 0;

	Joueurs.forEach(function (elem) {
		if (elem.etat == "keke") {
			nbkeke++;
		}
		nb++
	});

	$("#container").empty();
	if (nbkeke * 2 >= nb) {
		$("#container").append("<br/><br/><br/><h1 align='center'>Les kekes ont gagnés.</h1>");
	} else {
		$("#container").append("<br/><br/><br/><h1 align='center'>Les blaireaux ont gagnés.</h1>");
	}
}, tempsPartie);