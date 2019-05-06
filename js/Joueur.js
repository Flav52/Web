class Joueur extends THREE.Group {
    constructor(cid, cmpt, cEtat, cTeam) {
        super();
        this.position.set(100+cid,-20,cid);
        this.name = "Joueur";
        this.ident = cid;
        this.comptej = cmpt;
        this.equipe = cTeam;
        this.etat = cEtat;
        this.idMesh = null;
        this.built = false;
        this.ttb = null;
        switch (this.etat) {
            case 'keke':
                this.ttb = 'keke';
                this.getMesh();
                break;

            case 'badger':
                this.ttb = 'badger';
                this.getMesh();
                break;

            case 'neutral':
                this.ttb = 'neutral';
                this.getMesh();
                break;
        }
        this.speed = 1;
        this.castShadow = true;
        this.receiveShadow = true;
        if (!this.built) {
            toBuild.push(this);
        } else {
            scene.add(this);
        }
    }

    updateEtat(nv) {
        this.etat = nv;
        this.updateMesh();
    }

    updateMesh() {
        if (typeof Modele[this.etat] !== 'undefined') {
            var msh = Modele[this.etat].clone();
            msh.name = this.etat;
            var temp = this.getObjectById(this.idMesh);
            this.remove(temp);
            // msh.position.set(temp.position);
            //  msh.rotation.set(temp.rotation);
            this.add(msh);
            this.idMesh = msh.id;
        }
    }

    getMesh() {
        if (typeof Modele[this.ttb] !== 'undefined') {
            var mesh = Modele[this.ttb].clone();
            mesh.rotation.y += Math.PI;
            mesh.name = this.ttb;
            this.ttb = null;
            this.idMesh = mesh.id;
            this.add(mesh);
            scene.add(this);
            this.built = true;
        }
    }


}

function gong() {
    var audioLoader = new THREE.AudioLoader();
    var sound1 = new THREE.Audio(listener);
    audioLoader.load('../sound/gong-8.mp3', function (buffer) {
        sound1.setBuffer(buffer);
        sound1.play();
    });
    scene.add(sound1);
}