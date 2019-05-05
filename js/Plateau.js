function arena() {
	var halfSize = taillePlateau / 2;
	var value = 1;
	var texture = new THREE.TextureLoader().load('./img/door.jpg');
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(31, 1);

	for (var i = 0; i < 2; i++) {
		var arenaMesh = new THREE.BoxGeometry(taillePlateau + 2, 2, 1);
		var arenaMat = new THREE.MeshPhongMaterial({
			map: texture,
			color: 0xffffff
		});


		var murAreneGauche = new THREE.Mesh(arenaMesh, arenaMat);
		var murAreneDroite = new THREE.Mesh(arenaMesh, arenaMat);
		murAreneGauche.name = "LMur";
		murAreneDroite.name = "TMur";
		murAreneGauche.receiveShadow = true;
		murAreneGauche.castShadow = true;
		murAreneDroite.receiveShadow = true;
		murAreneDroite.castShadow = true;

		//positionnement
		murAreneDroite.position.set(halfSize * value + value / 2, WALLHEIGHT, 0);
		murAreneDroite.rotation.y = Math.PI / 2;
		grilleDeJeu.add(murAreneDroite);
		collision.push(murAreneDroite);


		murAreneGauche.position.set(0, WALLHEIGHT, halfSize * value + value / 2);
		grilleDeJeu.add(murAreneGauche);
		collision.push(murAreneGauche);
		value = -1;
	}
	var sphere = new THREE.CylinderGeometry(90, 90, 90, 50, 1, 1, 0);
	var texture = new THREE.TextureLoader().load('./img/cloud3.png');
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(3, 1);

	var mat = new THREE.MeshPhongMaterial({
		map: texture,
		opacity: 0.5,
		color: 0xffffff,
		transparent: true,
		fog: false
	});

	sky = new THREE.Mesh(sphere, mat);
	sky.material.side = THREE.BackSide;
	sky.position.set(0, 50, 0);
	scene.add(sky);


}

function generateBoard() {
	var texture = new THREE.TextureLoader().load('./img/snowcrack.jpg');

	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(taillePlateau * 1.73, taillePlateau * 1.73);


	var boardMesh = new THREE.PlaneGeometry(taillePlateau, taillePlateau);
	var boardMat = new THREE.MeshPhongMaterial({
		map: texture,
		//color:0x555555,
		side: THREE.DoubleSide,
		combine: THREE.NormalBlending
	});
	//boardMat.transparent = true;


	var board = new THREE.Mesh(boardMesh, boardMat);
	board.receiveShadow = true;
	board.position.set(0, 1, 0);
	board.rotation.x = degreesToRadians(-90);

	grilleDeJeu.add(board);

}

var Joueurs = [];

function boarding() {

	var plateau = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 5, 0, 1, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
		[0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 9, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
		[0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
		[0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
		[0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
		[0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
		[0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 9, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 10, 9, 8, 5, 6, 7, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
		[0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 11, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
		[0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
		[5, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0],
		[0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
		[0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
		[0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
		[0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
		[0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0],
		[0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 5, 0, 1, 0, 1, 1, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	];
	//brique
	var texture = new THREE.TextureLoader().load('./img/concrete1.jpg');
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(1, 1);

	var brickMesh = new THREE.BoxGeometry(WALLWIDTH, WALLHEIGHT, WALLWIDTH);
	var brickMat = new THREE.MeshPhongMaterial({
		map: texture,
		color: 0xcccccc,
		combine: THREE.NormalBlending
	});
	largeurPlateau = plateau[0].length; //donne la taille du premier pan de mur en largeur

	//mise en place des murs
	var cpt = 0;
	for (var i = 0; i < largeurPlateau; i++) {
		for (var j = 0; j < plateau[i].length; j++) {
			//correspondance des points
			switch (plateau[i][j]) {
				case 1:
					var brick = new THREE.Mesh(brickMesh, brickMat);
					brick.name = "Mur";
					brick.position.x = Math.round((j - largeurPlateau / 2));
					brick.position.y = 2;
					brick.position.z = Math.round((i - largeurPlateau / 2));
					brick.castShadow = true;
					brick.receiveShadow = true;

					grilleDeJeu.add(brick);
					collision.push(brick);
					break;

				case 3:
					Joueurs[cpt].position.x = Math.floor((j - largeurPlateau / 2));
					Joueurs[cpt].position.y = 1;
					Joueurs[cpt].position.z = Math.floor((i - largeurPlateau / 2));
					cpt++;
					break;

				case 5:
					new Pedestal(Math.floor((j - largeurPlateau / 2)) + 1, Math.floor((i - largeurPlateau / 2)) + 1, "./img/potionSpriteIncognito/potionSprite.png", "PIncognito");
					break;

				case 6:
					new Pedestal(Math.floor((j - largeurPlateau / 2)) + 1, Math.floor((i - largeurPlateau / 2)) + 1, "./img/potionSpriteView/potionSpriteView.png", "PVision");
					break;

				case 7:
					new Pedestal(Math.floor((j - largeurPlateau / 2)) + 1, Math.floor((i - largeurPlateau / 2)) + 1, "", "Botte");
					break;

				case 8:
					new Pedestal(Math.floor((j - largeurPlateau / 2)) + 1, Math.floor((i - largeurPlateau / 2)) + 1, "", "Brasero");
					break;

				case 9:
					new Pedestal(Math.floor((j - largeurPlateau / 2)) + 1, Math.floor((i - largeurPlateau / 2)) + 1, "", "Cape");
					break;

				case 10:
					new Pedestal(Math.floor((j - largeurPlateau / 2)) + 1, Math.floor((i - largeurPlateau / 2)) + 1, "", "Shield");
					break;

				case 11:
				new Pedestal(Math.floor((j - largeurPlateau / 2)) + 1, Math.floor((i - largeurPlateau / 2)) + 1, "", "Flaque");
				break;

			}
		}
	}
	// la taille du plateau sera le nombre de brique de large dans le tableau multiplié par la largeur d'une brick
	taillePlateau = largeurPlateau * WALLWIDTH;
}