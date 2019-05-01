class Joueur extends THREE.Mesh {

    

    constructor(cid,cmpt,pdp,dir, cEtat) {
        super(new THREE.BoxBufferGeometry(1,1,1),new THREE.MeshBasicMaterial({ color: 0x15ff00 }));
        this.name="Joueur";
        this.ident=cid;
        this.comptej = cmpt;
        this.avatar = pdp;
        this.direction = dir;
        this.etat = cEtat;
        this.speed=1;
        this.castShadow=true;
        this.receiveShadow=true;

        
    }


}