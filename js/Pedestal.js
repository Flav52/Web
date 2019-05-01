class Pedestal extends THREE.Group {
    constructor(x, z, img, type) {
        super();
        this.active = true;
        this.name = type;

        if (this.name == "PIncognito") {
            var spriteMap = new THREE.TextureLoader().load(img);
            var spriteMaterial = new THREE.SpriteMaterial({
                map: spriteMap,
                color: 0xffffff
            });
            var sprite = new THREE.Sprite(spriteMaterial);
            sprite.position.set(x, 2.02, z);
            this.add(sprite);
            loadObj(x, 1, z, '../model/peddestal/', 'peddestal.mtl', 'peddestal.obj', '../model/peddestal/peddestalTex.png', new THREE.Vector3(0.3, 0.17, 0.3));
        } else
        if (this.name == "PVision") {
            var spriteMap = new THREE.TextureLoader().load(img);
            var spriteMaterial = new THREE.SpriteMaterial({
                map: spriteMap,
                color: 0xffffff
            });
            var sprite = new THREE.Sprite(spriteMaterial);
            sprite.position.set(x, 2.02, z);
            this.add(sprite);
            loadObj(x, 1, z, '../model/peddestal/', 'peddestal.mtl', 'peddestal.obj', '../model/peddestal/peddestalTex.png', new THREE.Vector3(0.3, 0.17, 0.3));
        } else
        if (this.name == "Botte") {
            loadObj(x, 1.6, z, '../model/botte/', 'boots.mtl', 'boots.obj', '../model/botte/bootsTex.png', new THREE.Vector3(0.1, 0.1, 0.1));
            loadObj(x, 1, z, '../model/peddestal/', 'peddestal.mtl', 'peddestal.obj', '../model/peddestal/peddestalTex.png', new THREE.Vector3(0.3, 0.17, 0.3));

        } else
        if (this.name == "Brasero") {
            loadObj(x, 1, z, '../model/brasero/', 'brasero.mtl', 'brasero.obj', '../model/brasero/braseroTex.png', new THREE.Vector3(0.3, 0.3, 0.3));

        } else
        if (this.name == "Cape") {
            loadObj(x, 2, z, '../model/cape/', 'cape.mtl', 'cape.obj', '../model/cape/capeTex.png', new THREE.Vector3(0.13, 0.17, 0.13), Math.PI / 2);
        } else
        if (this.name == "Shield") {
            loadObj(x, 2, z, '../model/shield/', 'shield.mtl', 'shield.obj', '../model/shield/shieldText.png', new THREE.Vector3(0.05, 0.05, 0.05));
            loadObj(x, 1, z, '../model/peddestal/', 'peddestal.mtl', 'peddestal.obj', '../model/peddestal/peddestalTex.png', new THREE.Vector3(0.3, 0.17, 0.3));
        }
    }
}

function loadObj(x, y, z, path, mtl, obj, tex, Scale, rot) {
    THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
    new THREE.MTLLoader().setPath(path).load(mtl, function (materials) {
        materials.preload();
        new THREE.OBJLoader().setMaterials(materials).setPath(path).load(obj, function (object) { //Object === GROUP
            object.scale.set(Scale.x, Scale.y, Scale.z);
            object.position.set(x, y, z);
            var mesh = object.children[0];
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.material= new THREE.MeshPhongMaterial({
               combine: THREE.NormalBlending
            });
            var mat = mesh.material;
            mat.map = new THREE.TextureLoader().load(tex);
            //mat.color.set(0xffffff);
            if (!typeof rot === 'undefined')
                object.rotation.z += rot;
            scene.add(object);
        }, onProgress, onError);
    });
    var onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% chargé');
        }
    };
    var onError = function (error) {
        console.log("Erreur : " + error.target);
    };
}