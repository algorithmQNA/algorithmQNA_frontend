import React, { useRef } from 'react';

import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import { checkAlarm, deleteAlarm, getAlarm } from '../../apis/alarmApi';
import MessageBox from '../../components/MessageBox';

import { BsFillTrashFill } from 'react-icons/bs';
import { AiOutlineCheck } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

function Alarm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: alarmsPage,
    fetchNextPage,
    fetchPreviousPage,
    isFetchingPreviousPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['alarms'],
    async ({ pageParam = {} }) => {
      const res = await getAlarm(pageParam);
      return res;
    },
    {
      getNextPageParam: (lastPage) => {
        const size = lastPage.data.data.size;
        if (!size) return undefined;
        const oldestAlarmId = lastPage.data.data.alarms[size - 1].alarmId;
        return { oldAlarmId: oldestAlarmId };
      },
      getPreviousPageParam: (firstPage) => {
        const size = firstPage.data.data.size;
        if (!size) return {};
        const latestAlarmId = firstPage.data.data.alarms[0].alarmId;
        if (!latestAlarmId) return undefined;
        return { recentAlarmId: latestAlarmId };
      },
    }
  );

  const deleteAlarmMutation = useMutation(deleteAlarm, {
    onSuccess: () => {
      alert('알람을 삭제했습니다.');
      queryClient.invalidateQueries(['alarms']);
    },
  });
  const checkAlarmMutation = useMutation(checkAlarm, {
    onSuccess: () => {
      alert('알람을 확인했습니다.');
    },
  });

  const topPrevState = useRef<boolean>(true);
  const bottomPrevState = useRef<boolean>(false);
  const topRef = useIntersectionObserver<HTMLDivElement>((isIntersecting) => {
    if (!topPrevState.current && isIntersecting) fetchPreviousPage();
    topPrevState.current = isIntersecting;
  });
  const bottomRef = useIntersectionObserver<HTMLDivElement>(
    (isIntersecting) => {
      if (!bottomPrevState.current && isIntersecting) {
        fetchNextPage();
      }
      bottomPrevState.current = isIntersecting;
    }
  );

  return (
    <div className="">
      <div className="w-full h-[30px] bg-transparent" ref={topRef}></div>
      {isFetchingPreviousPage && <MessageBox msg="최신 알람 불러오는 중..." />}
      {alarmsPage?.pages.map((page) =>
        page.data.data.alarms.map((alarm) => (
          <div
            className={`border-t border-b p-2 border-border rounded-sm ${
              alarm.checked && 'text-gray-400 line-through'
            }`}
            key={alarm.alarmId}
          >
            <p
              onClick={() =>
                navigate(alarm.eventURL, {
                  state: { highlighting: true, commentId: +alarm.commentId },
                })
              }
              className="hover:text-primary transition-colors cursor-pointer"
            >
              {alarm.msg}
            </p>
            <p className="text-sm text-gray-500 font-light">
              {new Date(alarm.createdAt).toLocaleString()}
            </p>
            <div className="flex gap-2 justify-end">
              <span
                onClick={() => checkAlarmMutation.mutate(alarm.alarmId)}
                className="cursor-pointer"
              >
                <AiOutlineCheck size={14} />
              </span>
              <span
                onClick={() => deleteAlarmMutation.mutate(alarm.alarmId)}
                className="cursor-pointer"
              >
                <BsFillTrashFill size={14} />
              </span>
            </div>
          </div>
        ))
      )}

      {isFetchingNextPage && <MessageBox msg="오래된 알람 불러오는 중..." />}
      <div className="w-full h-[30px] bg-transparent " ref={bottomRef}></div>
    </div>
  );
}

export default Alarm;
