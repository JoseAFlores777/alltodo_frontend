import { Project } from './project.model';
import { User } from './user.model';

export class Todo{

    constructor(
        public id: string ,
        public title: string ,
        public description: string ,
        public completed: boolean ,
        public project:  Project ,
        public createdBy: User ,
        public updatedBy: User ,
        public expirationDate: Date ,
        public createdAt: Date ,
        public updatedAt: Date ,
        public isAvailable: boolean ,
        
    ){}
}