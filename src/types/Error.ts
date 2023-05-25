export interface ErrorType{
    status:{
        code:number
        message:string
        validateError:boolean
    },
    data:{
        field:string
        message:String
    }[]
}