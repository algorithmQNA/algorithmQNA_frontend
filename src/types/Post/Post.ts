
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
export type PostType = 'QNA' | 'TIP' | 'NOTICE'
export type PostCategory = 'BRUTE_FORCE' | 'TWO_POINTER' | 'DP' | 'QUEUE_STACK_HASH' | 'GRAPH' | 'GREEDY' | 'BINARY_SEARCH' | 'SORT' | 'DFS_BFS'
export type PostSort = 'latestDesc' | 'latestAsc' | 'commentCntAsc' | 'commentCntDesc' | 'likeAsc' | 'likeCntAsc' | 'viewCntAsc' | 'viewCntDesc' | 'popular'
export interface PostViewMember{
    "memberId": number,
    "memberName": string,
    "memberRole": string,
    "memberCommentBadge": number,
    "memberPostBadge": number,
    "memberLikeBadge": number,
    "memberProfileUrl": string
}
export interface PostViewChildComment{
    "commentId": number,
    "memberId": number,
    "memberName": string,
    "content": string,
    "createdAt": string,
    "updatedAt": string,
    "likeCnt": number,
    "dislikeCnt": number,
    "depth" : number,
    "hasChild" : boolean
}
export interface PostViewComment{
    "commentId": number,
    "member": PostViewMember,
    "content": string,
    "createdAt": string,
    "updatedAt": string,
    "likeCnt": number,
    "dislikeCnt": number,
    "depth" : number,
    "hasChild" : boolean,
    "childCommentList":PostViewChildComment[]
    "childSize":number
}
export interface PostView{
    "postId": number
    "postTitle":string,
    "postContent": string
    "createdAt": string
    "postLikeCnt": number,
    "postDislikeCnt": number,
    "isLiked": boolean,
    "totalCommentCnt": number
    "totalPageSize": number,
    "member":PostViewMember
    "commentList":PostViewComment[]
    "page": number,
    "next": boolean,
    "prev": boolean,
    "size": number
}
export interface PostWrite{
    title:string
    content:string
    postType:null | number
    postCategory:null | number
    keyWord:string[]
}