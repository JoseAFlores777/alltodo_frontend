import { User } from './user.model';

export class Project{

    constructor(
        public id: string,
        public name: string,
        public description: string,
        public color: string,
        public createdBy: User,
        public updatedBy: User,
        public createdAt: Date,
        public updatedAt: Date,
        public isAvailable: boolean
    ){}

}