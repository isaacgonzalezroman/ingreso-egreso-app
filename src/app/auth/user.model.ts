

export class User {

    nombre: string;
    email: string;
    uid: string;

    constructor( dataObj: UserObj ) {
        this.nombre = dataObj && dataObj.nombre || null;
        this.email  = dataObj && dataObj.email || null;
        this.uid    = dataObj && dataObj.uid || null;
    }
}

interface UserObj {
    nombre: string;
    email: string;
    uid: string;
}
