import { AlarmKindType, AlarmType } from '../types/Alarm';
import { privateRequest } from './instance';

export const createPostRequest = ({}) => privateRequest.get('/alarm');

export const getAlarm = ({
  recentAlarmId,
  oldAlarmId,
}: {
  recentAlarmId?: number;
  oldAlarmId?: number;
}) =>
  privateRequest.get<{ data: { size: number; alarms: AlarmType[] } }>(
    '/alarm',
    {
      params: {
        recentAlarmId,
        oldAlarmId,
      },
    }
  );

export const checkAlarm = (alarmId: number) =>
  privateRequest.patch(`/alarm/${alarmId}`);

export const deleteAlarm = (alarmId: number) =>
  privateRequest.delete(`/alarm/${alarmId}`);
