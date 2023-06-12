import React, { ChangeEvent } from 'react';
import './style.css';
import {PostFilterState} from "../../../storage/Post/Post";
import {useRecoilState} from "recoil";
import {PostCategory} from "../../../types/Post/Post";

export default function CategoryBar() {
  const [state,setState] = useRecoilState(PostFilterState)

  const category = [
      {name:'Brute Force',value:'BRUTE_FORCE'},
      {name:'Two Pointer',value:'TWO_POINTER'},
      {name:'DP',value:'DP'},
      {name:'Queue / Stack / Hash',value:'QUEUE_STACK_HASH'},
      {name:'Graph',value:'GRAPH'},
      {name:'Greedy',value:'GREEDY'},
      {name:'Binary Search',value:'BINARY_SEARCH'},
      {name:'Sort',value:'SORT'},
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
