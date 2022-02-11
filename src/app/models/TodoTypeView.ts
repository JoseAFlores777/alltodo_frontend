

  
export const TypeView_Enum = Object.freeze(
    {
        INBOX : 'INBOX',
        TODAY : 'TODAY',
        UPCOMING : 'UPCOMING',
        PROJECTS : 'PROJECTS',
    })



export class TodoTypeView {

    constructor(
        public TypeView : string,
        public Title_forTodo: string,
        public Title_completed: string,
    ){}

}