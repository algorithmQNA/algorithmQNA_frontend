export interface PostRow{
    title:string
    memberId:number
    memberName:string
    memberProfileUrl:string
    memberRole:string
    createdAt:string
    viewCount:number
    commentCount:number
}
export interface PostList{
    posts:PostRow[]
    currentPage:number
    totalPageCount:number
    next:boolean
    prev:boolean
    size:number
}
export interface  PostDetail{
    "postId": number
    "memberId": number
    "memberName":string
    "memberCommentBadge": number
    "memberPostBadge": number
    "memberLikeBadge": number
    "title":string
    "content":string
    "createdSt":string
    "likeCount": number
    "dislikeCount": number
    "commentTotalCount": number
    "commentCurrentPage": number
    "commentTotalPageCount": number
    "commentNext": boolean
    "commentPrev": boolean
    "commentSize": number
    comments:PostComment[]
}
export interface PostComment{
    "commentId": number
    "parentId": number
    "memberId": number
    "memberName": string
    "memberProfile": string
    "memberCommentBadge": number
    "memberPostBadge": number
    "memberLikeBadge": number
    "content":string
    "likeCount": number
    "dislikeCount": number
    "createdAt": string
    "depth": number
    "isPinned": boolean
    "isLiked": boolean
}
export interface PostWrite{
    title:string
    content:string
    kind:null | number
    category:null | number
}