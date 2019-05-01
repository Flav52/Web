class Objet { //Classe Abstraite
    constructor(cid, cpos, cimg) {
        if (this.constructor === Objet) {
            throw "Classe abstraite \"Objet\" instanciée";
        }
        this.id = cid;
        this.pos = cpos;
        this.img = cimg;

    }
}

class Incognito extends Objet {
    constructor(cid, cpos, cimg, ccoul) {
        super(cid, cpos, cimg);
        this.coul = ccoul;
    }

    changeCouleur(ncoul) {
        this.coul = ncoul;
    }

    getCoul() {
        return this.coul;
    }
}

