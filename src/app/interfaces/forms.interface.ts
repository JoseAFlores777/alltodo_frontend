import { User } from "../models/user.model";


export interface LoginForm{
    email: string,
    password: string,
}
export interface RegisterForm{
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    
}
export interface UpdateUserForm{
    firstName: string,
    lastName: string,
    gender: string,
    email: string,
}

export interface ProjectForm{
    name: string,
    description: string,
    color: string
}



