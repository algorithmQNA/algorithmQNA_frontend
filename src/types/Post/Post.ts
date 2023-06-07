import {b} from "msw/lib/glossary-de6278a9";

export interface PostRow{
    postId:number
    postTitle:string
    member:any
    createdAt:string
    postLikeCnt:number
    postDislikeCnt:number
    views:number
    totalCommentCnt:number
}
export interface PostList{
    posts:PostRow[]
    currentPage:number
    totalPageCount:number
    next:boolean
    prev:boolean
    size:number
}
export interface PostListParams{
    postCategory:PostCategory | ""
    postType:PostType
    sort:PostSort | ""
    page:number
    hasCommentCond?:boolean
    keyWordCond?:string
    titleCond?:string
    memberNameCond?:string
    isAcceptedCommentCond?:boolean
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
    "postKeyWords":string[],
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
    postType:PostType | ""
    postCategory:PostCategory | ""
    keyWord:string[]
    imageIds:number[]
}
export interface PostFilter{
    sort:PostSort | '',
    postCategory:PostCategory | '',
    hasCommentCond:boolean | undefined,
    keyWordCond:string,
    titleCond:string,
    memberNameCond:string,
    isAcceptedCommentCond:boolean | undefined
}