export type AlarmKindType = "COMMENT_WRITE" | "COMMENT_LIKE" | "COMMENT_DISLIKE" | "POST_LIKE" | "POST_DISLIKE" | "PINNED" | "DELETE_COMMENT" | "DELETE_POST" | "BADGE_UPGRADE" | "BADGE_DOWNGRADE"

export interface AlarmType {
    alarmId:number
    subjectMemberName:string
    eventURL:string
    checked:boolean
    alarmType:AlarmKindType
    commentId:number
    msg:string
    createdAt:string
}