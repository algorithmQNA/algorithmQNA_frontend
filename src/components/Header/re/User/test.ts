import {privateRequest} from "../../../../apis/instance";

export const getOldAlarm = async ({pageParam = {page:undefined,direction:'next'}}) =>{
    const {page,direction} = pageParam
    let url = '/alarm'
    if(page === undefined){
    }
    else if(direction === 'next'){
        url = url + `?oldAlarmId=${page}`;
    }
    else if(direction === 'prev'){
        url = url + `?recentAlarmId=${page}`;
    }
    const result = await privateRequest.get(url)
    return result.data
}