var pedestal = [1, '../model/peddestal/', 'peddestal.mtl', 'peddestal.obj', '../model/peddestal/peddestalTex.png', new THREE.Vector3(0.3, 0.17, 0.3)];
var botte = [1.6, '../model/botte/', 'boots.mtl', 'boots.obj', '../model/botte/bootsTex.png', new THREE.Vector3(0.1, 0.1, 0.1)];
var brasero = [1, '../model/brasero/', 'brasero.mtl', 'brasero.obj', '../model/brasero/braseroTex.png', new THREE.Vector3(0.3, 0.3, 0.3)];
var cape = [2, '../model/cape/', 'cape.mtl', 'cape.obj', '../model/cape/capeTex.png', new THREE.Vector3(0.13, 0.17, 0.13)];
var shield = [2, '../model/shield/', 'shield.mtl', 'shield.obj', '../model/shield/shieldText.png', new THREE.Vector3(0.05, 0.05, 0.05)];
var badger = [0, '../model/badger/', 'badger.mtl', 'badger.obj', '../model/badger/badgerTex.png', new THREE.Vector3(0.3, 0.3, 0.3)];
var keke = [0, '../model/keke/', 'keke.mtl', 'keke.obj', '../model/keke/kekeTex.png', new THREE.Vector3(0.3, 0.3, 0.3)];
var neutral = [0, '../model/neutral/', 'neutral.mtl', 'neutral.obj', '../model/neutral/neutralTex.png', new THREE.Vector3(0.3, 0.3, 0.3)];
var flaque = [1.01, '../model/flaque/', 'flaque.mtl', 'flaque.obj', '../model/flaque/flaque.png', new THREE.Vector3(0.2, 1, 0.2)];

var toLoad = [pedestal, botte, brasero, cape, shield, badger, keke, neutral, flaque];
var Modele = [];
var toBuild = [];

function preload() {
    for (var i = 0; i < toLoad.length; i++) {
        var temp = toLoad[i];
        loadObj(0, temp[0], 0, temp[1], temp[2], temp[3], temp[4], temp[5]);
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
        Items.push(this);

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
        } else
        if (this.name == "Botte") {
            this.ttb[0] = 'boots';
            this.ttb[1] = 'peddestal';
            this.getMesh();

        } else
        if (this.name == "Brasero") {
            this.ttb[0] = 'brasero';
            this.getMesh();

        } else
        if (this.name == "Cape") {
            this.ttb[0] = 'cape';
            this.getMesh();
        } else
        if (this.name == "Shield") {
            this.ttb[0] = 'shield';
            this.ttb[1] = 'peddestal';
            this.getMesh();
        } else
        if (this.name == "Flaque") {
            this.ttb[0] = 'flaque';
            this.getMesh();
        }

        if (!this.built) {
            toBuild.push(this);
        } else {

            scene.add(this);
        }

    }

    update() {
        let tmp = this;
        this.children.forEach(function (elem) {
            if (elem.name != "peddestal" && elem.name != "flaque") {
                if (tmp.active)
                    elem.visible = true;
                else
                    elem.visible = false;
            }
        });
    }

    getMesh() {
        for (var i = 0; i < this.ttb.length; i++) {
            // console.log(Modele[this.ttb[i]+5]);
            var crttype = this.ttb[i];
            if (typeof Modele[crttype] !== 'undefined') {
                var mesh = Modele[crttype].clone();
                mesh.name = crttype;
                switch (crttype) {
                    case 'peddestal':
                        mesh.position.set(this.x, pedestal[0], this.z);
                        break;
                    case 'boots':
                        idRotate.push(mesh.id);
                        mesh.position.set(this.x, botte[0], this.z);
                        break;
                    case 'brasero':
                        collision.push(mesh);
                        mesh.position.set(this.x, brasero[0], this.z);
                        break;
                    case 'cape':
                        idRotate.push(mesh.id);
                        mesh.geometry.translate(0, 0, 0.5);
                        mesh.position.set(this.x, cape[0], this.z);
                        break;
                    case 'shield':
                        idRotate.push(mesh.id);
                        mesh.position.set(this.x, shield[0], this.z);
                        break;
                    case 'flaque':
                        //idRotate.push(mesh.id);
                        mesh.material.transparent = true;
                        mesh.castShadow = false;
                        mesh.position.set(this.x, flaque[0], this.z);
                        break;
                }
                this.ttb.splice(i, 1);
                i--;
                this.add(mesh);
            }
            if (this.ttb.length == 0) {
                scene.add(this);
                this.built = true;
            }
        }
    }


}

function loadObj(x, y, z, path, mtl, obj, tex, Scale) {
    THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());
    new THREE.MTLLoader(manager).setPath(path).load(mtl, function (materials) {
        materials.preload();
        new THREE.OBJLoader(manager).setMaterials(materials).setPath(path).load(obj, function (object) { //Object === GROUP
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
            mat.map = new THREE.TextureLoader(manager).load(tex);
            var str = obj.substring(0, obj.indexOf("."));
            Modele[str] = mesh.clone();
        }, onProgress, onError);
    });
    var onProgress = function (xhr) {
        // if (xhr.lengthComputable) {
        //     var percentComplete = xhr.loaded / xhr.total * 100;
        //     console.log(Math.round(percentComplete, 2) + '% chargé');
        // }
    };
    var onError = function (error) {
        console.log("Erreur : " + error.target);
    };
    var onLoad = function () {};
}

var manager = new THREE.LoadingManager();
manager.onStart = function (url, itemsLoaded, itemsTotal) {

    console.log('Chargement de: ' + url + '.\n --' + itemsLoaded + ' sur ' + itemsTotal + '.');

};

manager.onLoad = function () {

    console.log('Chargement terminé!');

};


manager.onProgress = function (url, itemsLoaded, itemsTotal) {

    console.log('Chargement de: ' + url + '.\n --' + itemsLoaded + ' objets chargé(s) sur ' + itemsTotal + '.');

};

manager.onError = function (url) {

    console.log('Erreur lors du chargement ' + url);

};