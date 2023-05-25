import React from 'react';

interface props extends React.HTMLAttributes<HTMLInputElement> {
  value: string;
}
/**
 * input.value = 저장 변수
 * input.event = 입력 시 이벤트
 * button 필요 시 button component와 같이 props
 **/
export default function InputComponent({
  value,
  placeholder,
  onChange,
}: props) {
  return (
    <div className={'flex gap-1 items-center'}>
      <input
        type={'text'}
        className={
          'border border-[#D9D9D9] w-full py-1 px-2 relative rounded text-sm p-0 focus:outline-none'
        }
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
