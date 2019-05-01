var pedestal = [1, '../model/peddestal/', 'peddestal.mtl', 'peddestal.obj', '../model/peddestal/peddestalTex.png', new THREE.Vector3(0.3, 0.17, 0.3)];
var botte = [1.6, '../model/botte/', 'boots.mtl', 'boots.obj', '../model/botte/bootsTex.png', new THREE.Vector3(0.1, 0.1, 0.1), 1];
var brasero = [1, '../model/brasero/', 'brasero.mtl', 'brasero.obj', '../model/brasero/braseroTex.png', new THREE.Vector3(0.3, 0.3, 0.3)];
var cape = [2, '../model/cape/', 'cape.mtl', 'cape.obj', '../model/cape/capeTex.png', new THREE.Vector3(0.13, 0.17, 0.13), 1, 2];
var shield = [2, '../model/shield/', 'shield.mtl', 'shield.obj', '../model/shield/shieldText.png', new THREE.Vector3(0.05, 0.05, 0.05), 1];

var toLoad = [pedestal, botte, brasero, cape, shield];
var Modele = [];
var toBuild = [];

function preload() {
    for (var i = 0; i < toLoad.length; i++) {
        var temp = toLoad[i];
        loadObj(0, temp[0], 0, temp[1], temp[2], temp[3], temp[4], temp[5], temp[6], temp[7]);
    }
}


class Pedestal extends THREE.Group {

    constructor(x, z, img, type) {
        super();
        this.x = x;
        this.z = z;
        this.ttb = [];
        this.active = true;
        this.name = type;
        this.built = false;
        if (this.name == "PIncognito") {
            var spriteMap = new THREE.TextureLoader().load(img);
            var spriteMaterial = new THREE.SpriteMaterial({
                map: spriteMap,
                color: 0xffffff
            });
            var sprite = new THREE.Sprite(spriteMaterial);
            sprite.position.set(x, 2.02, z);
            this.add(sprite);
            this.ttb[0] = 'peddestal';
            this.getMesh();
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
            this.ttb[0] = 'peddestal';
            this.getMesh();
            // loadObj(x, 1, z, '../model/peddestal/', 'peddestal.mtl', 'peddestal.obj', '../model/peddestal/peddestalTex.png', new THREE.Vector3(0.3, 0.17, 0.3));
        } else
        if (this.name == "Botte") {
            this.ttb[0] = 'boots';
            this.ttb[1] = 'peddestal';
            this.getMesh();
            // loadObj(x, 1.6, z, '../model/botte/', 'boots.mtl', 'boots.obj', '../model/botte/bootsTex.png', new THREE.Vector3(0.1, 0.1, 0.1), 1);
            // loadObj(x, 1, z, '../model/peddestal/', 'peddestal.mtl', 'peddestal.obj', '../model/peddestal/peddestalTex.png', new THREE.Vector3(0.3, 0.17, 0.3));

        } else
        if (this.name == "Brasero") {
            this.ttb[0] = 'brasero';
            this.getMesh();
            //  loadObj(x, 1, z, '../model/brasero/', 'brasero.mtl', 'brasero.obj', '../model/brasero/braseroTex.png', new THREE.Vector3(0.3, 0.3, 0.3));

        } else
        if (this.name == "Cape") {
            this.ttb[0] = 'cape';
            this.getMesh();
            //  loadObj(x, 2, z, '../model/cape/', 'cape.mtl', 'cape.obj', '../model/cape/capeTex.png', new THREE.Vector3(0.13, 0.17, 0.13), 1, 2);
        } else
        if (this.name == "Shield") {
            this.ttb[0] = 'shield';
            this.ttb[1] = 'peddestal';
            this.getMesh();
            //loadObj(x, 2, z, '../model/shield/', 'shield.mtl', 'shield.obj', '../model/shield/shieldText.png', new THREE.Vector3(0.05, 0.05, 0.05), 1);
            // loadObj(x, 1, z, '../model/peddestal/', 'peddestal.mtl', 'peddestal.obj', '../model/peddestal/peddestalTex.png', new THREE.Vector3(0.3, 0.17, 0.3));
        }

        if (!this.built) {
            toBuild.push(this);
        } else {
            scene.add(this);
        }

    }

    getMesh() {


        for (var i = 0; i < this.ttb.length; i++) {
            // console.log(Modele[this.ttb[i]+5]);
            var crttype = this.ttb[i];
            if (typeof Modele[crttype] !== 'undefined') {
                console.log("a");
                var mesh = Modele[crttype].clone();
                switch (crttype) {
                    case 'peddestal':
                        mesh.position.set(this.x, pedestal[0], this.z);
                        break;
                    case 'boots':
                        idRotate.push(mesh.id);
                        mesh.position.set(this.x, botte[0], this.z);
                        break;
                    case 'brasero':
                        mesh.position.set(this.x, brasero[0], this.z);
                        break;
                    case 'cape':
                        idRotate.push(mesh.id);
                        mesh.geometry.translate(0, 0, 2);
                        mesh.position.set(this.x, cape[0], this.z);
                        break;
                    case 'shield':
                        idRotate.push(mesh.id);
                        mesh.position.set(this.x, shield[0], this.z);
                        break;
                }
                this.ttb.splice(i, 1);
                i--;
                this.add(mesh);
                console.log(this.type);
            }
            if (this.ttb.length == 0) {
                scene.add(this);
                this.built = true;
            }
        }
    }


}

function loadObj(x, y, z, path, mtl, obj, tex, Scale, log, transl) {
    THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());
    new THREE.MTLLoader().setPath(path).load(mtl, function (materials) {
        materials.preload();
        new THREE.OBJLoader().setMaterials(materials).setPath(path).load(obj, function (object) { //Object === GROUP
            object.scale.set(Scale.x, Scale.y, Scale.z);
            var mesh = object.children[0];
            mesh.scale.set(Scale.x, Scale.y, Scale.z);
            mesh.position.set(x, y, z);


            mesh.material = new THREE.MeshPhongMaterial({
                combine: THREE.NormalBlending
            });
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            var mat = mesh.material;
            mat.map = new THREE.TextureLoader().load(tex);
            //mat.color.set(0xffffff);

            if (log) {
                //idRotate.push(mesh.id);
            }
            if (transl) {
                //mesh.geometry.translate(0, 0, transl);
            }
            var str = obj.substring(0, obj.indexOf("."));
            Modele[str] = mesh.clone();
            //scene.add(object);
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