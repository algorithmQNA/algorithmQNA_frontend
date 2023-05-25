import React from 'react';

interface Props extends React.HTMLAttributes<HTMLInputElement> {}
export default function InputText({
  defaultValue,
  placeholder,
  onChange,
}: Props) {
  return (
    <input
      type={'text'}
      value={defaultValue}
      placeholder={placeholder}
      onChange={onChange}
      className={
        'w-full flex items-center justify-between text-sm px-2 py-2 border rounded z-10 hover:cursor-pointer bg-[#F5F5F5] transition duration-300 hover:bg-white focus:bg-white text-[#739093]'
      }
    />
  );
}
