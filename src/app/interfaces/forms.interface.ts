import { User } from "../models/user.model";
import { Project } from '../models/project.model';


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

export interface TodoForm{
    
    title: string ,
    description: string ,
    completed: boolean ,
    project:  Project ,
    expirationDate: Date ,
    
}





