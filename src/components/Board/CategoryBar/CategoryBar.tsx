import React, { ChangeEvent, useEffect, useState } from 'react';
import './style.css';
interface Props {
  name: string;
  list: {
    id: string;
    name: string;
  }[];
  checkChange?: (checkedList: string[]) => void;
}
export default function CategoryBar({
  name,
  list,
  checkChange = () => {},
}: Props) {
  const [checked, setChecked] = useState<string[]>([]);
  useEffect(() => checkChange(checked), [checkChange, checked]);
  const changeStart = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.checked
      ? setChecked((prev) => [...prev, e.target.value])
      : setChecked(checked.filter((li) => li !== e.target.value));
  };

  return (
    <div className={'board-category-bar'}>
      <div className={'category-title'}>
        {name}
        <span className={'under-border'}></span>
      </div>
      <ul className={'select-filter category-ul'}>
        {list.map((li, index) => (
          <label key={index} className={'category-li'}>
            <input
              type={'checkbox'}
              value={li.id}
              className={'hidden'}
              checked={checked.includes(li.id)}
              onChange={changeStart}
            />
            <p>
              <span>{li.name}</span>
            </p>
          </label>
        ))}
      </ul>
    </div>
  );
}
