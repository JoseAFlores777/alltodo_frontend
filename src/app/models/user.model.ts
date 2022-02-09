


export class User {

    constructor(
    public  id:string,
    public  firstName:string,
    public  lastName:string,
    public  gender:string,
    public  email:string,
    public  verifiedEmail:boolean,
    public  password:string,
    public  avatarImg:string,
    public  googleAvatarImg:string,
    public  googleSignIn:boolean,
    public  createdAt:Date,
    public  updatedAt:Date,
    public  isAvailable:boolean
    ) { }
    
}