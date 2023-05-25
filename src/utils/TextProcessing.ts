/** 특정 값이 max값을 넘어가면 + 처리 */
export const setOverValue = (value:number,max:number) =>{
    return value > max ? `${max}+` : value
}
/**
 * ~분 전 처리
 * DateTime 형식 string 필요
 * */
export const setDateWritten= (value:string)=>{
    const current = new Date().getTime()
    const writeTime = new Date(value).getTime()
    const difference = current-writeTime
    if(current-writeTime < 0) return `~ 전`

    const year = Math.floor(difference / (365 * 24 * 60 * 60 * 1000));
    if(year > 0) return `${year}년 전`

    const month = Math.floor(difference / (31 * 24 * 60 * 60 * 1000));
    if(month > 0) return `${month}달 전`

    const day = Math.floor(difference / (24 * 60 * 60 * 1000))
    if(day > 0) return `${day}일 전`

    const hour = Math.floor(difference / (60 * 60 * 1000))
    if(hour > 0) return `${hour}시간 전`

    const minute = Math.floor(difference / (60 * 1000))
    if(minute > 0) return `${minute}분 전`

    const second = Math.floor(difference / 1000)
    if(second > 0) return `${second}초 전`

    return `~ 전`
}
export const setYMD = (date:string) =>{
    const [y,m,d] = date.split('-')
    return `${y}년 ${m}월 ${d}일`
}