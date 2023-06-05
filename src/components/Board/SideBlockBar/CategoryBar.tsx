import React, { ChangeEvent } from 'react';
import './style.css';
import {PostFilterState} from "../../../storage/Post/Post";
import {useRecoilState} from "recoil";
import {PostCategory} from "../../../types/Post/Post";

export default function CategoryBar() {
  const [state,setState] = useRecoilState(PostFilterState)
  const list = ['Brute Force','TWO_POINTER','DP','Queue / Hash / Stack','Graph','Greedy','BINARY_SEARCH','Sort','BFS / DFS'];

  const changeStart = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as PostCategory;
    if(e.target.checked){
        setState((prev)=>({
            ...prev,postCategory:value
        }))
    }
    else{
        setState((prev)=>({
            ...prev,postCategory:''
        }))
    }
  };

  return (
    <div className={'board-side-bar'}>
      <div className={'side-block-title'}>
        <p>
            알고리즘
            <span className={'under-border'}></span>
        </p>
      </div>
      <ul className={'select-filter side-block-ul'}>
        {list.map((li) => (
          <label key={li} className={'side-block-li'}>
            <input
              type={'checkbox'}
              value={li}
              className={'hidden'}
              checked={state.postCategory === li}
              onChange={changeStart}
            />
            <p>
              <span>{li}</span>
            </p>
          </label>
        ))}
      </ul>
    </div>
  );
}
