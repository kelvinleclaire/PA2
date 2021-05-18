import Role from "../util/UserEnum";

interface IUser {

    //username: string;
    displayname: string;
    password: string;
    username: string;
    role: Role;
    loggedIn: boolean;
}

export default IUser;
