class User {

    constructor(name, gender, birth, country, email, password, photo, admin){

        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();

    }

    get id(){
        return this._id;
    }

    get register(){
        return this._register;
    }

    get name(){
        return this._name;
    }

    get gender() {
        return this._gender;
    }

    get birth() {
        return this._birth;
    }

    get country() {
        return this._country;
    }

    get email() {
        return this._email;
    }

    get photo() {
        return this._photo;
    }

    get password() {
        return this._password;
    }

    get admin() {
        return this._admin;
    }

    set photo(value){
        this._photo = value;
    }

    set id(value){
        this._id = value;
    }

    loadFromJSON(json){

        for (let name in json){
            
            switch(name){

                case '_register':
                    this[name] = new Date(json[name]);
                break;
                default:
                    this[name] = json[name];

            }
            

        }

    }

    static getUsersStorage() {

        return Fetch.get('/users');

        /*let users = [];

        if (localStorage.getItem("users")) {

            users = JSON.parse(localStorage.getItem("users"));

        }

        return users;*/

    }

    /*getNewID(){

        let usersID = parseInt(localStorage.getItem("usersID"));

        if (usersID != 0) usersID = 0;

        usersID++;

        localStorage.setItem("usersID", usersID);

        return usersID;

    }*/

    toJSON(){

        let json = {};

        Object.keys(this).forEach(key => {

            if(this[key] !== undefined){

                json[key] = this[key];

            }
        });

        return json;
    }

    save(){

        return new Promise((resolve, reject)=>{ 

            let promise;

            if(this.id){

                promise =  Fetch.put(`/users/${this.id}`, this.toJSON());

            } else {

                promise = Fetch.post(`/users/${this.id}`, this.toJSON());

            }

            promise.then(data => {

                this.loadFromJSON(data);

                resolve(this);

            }).catch(e=>{

                reject(e);

            });
            
        });

        /*let users = User.getUsersStorage();

        if (this.id > 0) {
            
            users.map(u=>{

                if (u._id == this.id) {

                    Object.assign(u, this);

                }

                return u;

            });

        } else {

            this._id = this.getNewID();

            users.push(this);

        }

        localStorage.setItem("users", JSON.stringify(users));*/

    }

    remove(){

        return Fetch.delete(`/users/${this.id}`);

        /*let users = User.getUsersStorage();

        users.forEach((userData, index)=>{

            if (this._id == userData._id) {

                users.splice(index, 1);

            }

        });

        localStorage.setItem("users", JSON.stringify(users));*/


    }

}