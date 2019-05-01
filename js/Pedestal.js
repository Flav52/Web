class Pedestal extends THREE.Group {
    constructor(x, z, img, type) {
        super();
        this.active = true;
        this.name = type;

        var spriteMap = new THREE.TextureLoader().load(img);
        var spriteMaterial = new THREE.SpriteMaterial({
            map: spriteMap,
            color: 0xffffff
        });
        var sprite = new THREE.Sprite(spriteMaterial);
        sprite.position.set(x, 2, z);
        this.add(sprite);
        loadPedestalMesh(x,z);
    }
}

function loadPedestalMesh(x,z) {
    new THREE.MTLLoader().setPath('../model/pedestal/').load('peddestaleclean.mtl', function (materials) {
        materials.preload();
        new THREE.OBJLoader().setMaterials(materials).setPath('../model/pedestal/').load('peddestaleclean.obj', function (object) { //Object === GROUP
            object.scale.set(PedestalScale.x,PedestalScale.y,PedestalScale.z);
            object.position.set(x,1,z);
            var mesh = object.children[0];
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            var mat = mesh.material;
            mat.map = new THREE.TextureLoader().load('../model/pedestal/marbretex.png');;
            mat.color.set(0xffffff);
            scene.add(object);
        }, onProgress, onError);
    });

    var onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    };
    var onError = function (error) {
        console.log("Error : ");
        console.log(error.target);
    };


}