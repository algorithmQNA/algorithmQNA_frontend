import React, { ChangeEvent } from 'react';
import './style.css';
import {PostFilterState} from "../../../storage/Post/Post";
import {useRecoilState} from "recoil";
import {PostCategory} from "../../../types/Post/Post";

export default function CategoryBar() {
  const [state,setState] = useRecoilState(PostFilterState)

  const category = [
      {name:'브루트포스',value:'BRUTE_FORCE'},
      {name:'투포인터',value:'TWO_POINTER'},
      {name:'동적 프로그래밍',value:'DP'},
      {name:'큐/스택/해시',value:'QUEUE_STACK_HASH'},
      {name:'그래프',value:'GRAPH'},
      {name:'그리디',value:'GREEDY'},
      {name:'이진 탐색',value:'BINARY_SEARCH'},
      {name:'정렬',value:'SORT'},
      {name:'DFS / BFS',value:'DFS_BFS'},
  ]

  const changeStart = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as PostCategory;
    if(e.target.checked){
        setState((prev)=>({
            ...prev,postCategory:value
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
          {
              category.map((li)=>(
                  <label key={li.value} className={'side-block-li'}>
                      <input
                          type={'radio'}
                          value={li.value}
                          className={'hidden'}
                          checked={state.postCategory === li.value}
                          onChange={changeStart}
                      />
                      <p>
                          <span>{li.name}</span>
                      </p>
                  </label>
              ))
          }
      </ul>
    </div>
  );
}
