import axios from "axios";

export const getNewAlarm = async ({pageParam=undefined,direction='next'})=>{
    if(pageParam === undefined) return []
    const url = `/alarm?recentAlarmId=${pageParam}`
    const result = await axios.get(url)
    return result.data
}

export const getOldAlarm = async ({pageParam = {page:undefined,direction:'next'}}) =>{
    const {page,direction} = pageParam
    let url = '/alarm'
    if(pageParam === undefined){

    }
    else if(direction === 'next'){
        url = url + `?oldAlarmId=${page}`;
    }
    else if(direction === 'prev'){
        url = url + `?recentAlarmId=${page}`;
    }
    const result = await axios.get(url)
    return result.data
}