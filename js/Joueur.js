class Joueur extends THREE.Group {



    constructor(cid, cmpt, pdp, dir, cEtat) {
        super();
        this.name = "Joueur";
        this.ident = cid;
        this.comptej = cmpt;
        this.avatar = pdp;
        this.direction = dir;
        this.etat = cEtat;
        this.built = false;
        this.ttb = [];
        switch (this.etat) {
            case 'keke':
                this.ttb[0] = 'keke';
                this.getMesh();
                break;

            case 'badger':
                this.ttb[0] = 'badger';
                this.getMesh();
                break;

            case 'neutral':
                this.ttb[0] = 'neutral';
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

    getMesh() {
        if (typeof Modele[this.ttb] !== 'undefined') {
            var mesh = Modele[this.ttb].clone();
            mesh.rotation.y += Math.PI;
            switch (this.ttb) {
                case 'keke':
                    mesh.position.set(this.x, keke[0], this.z);
                    break;
                case 'badger':
                    mesh.position.set(this.x, badger[0], this.z);
                    break;
                case 'neutral':
                    mesh.position.set(this.x, neutral[0], this.z);
                    break;

            }
            this.ttb = null;
            this.add(mesh);
        }
        if (this.ttb == null) {
            scene.add(this);
            this.built = true;
        }
    }


}