import React, {useEffect} from 'react';
import PageTitle from '../../../components/PageTitle/PageTitle';
import './style.css';
import PostWriteCKEditor from '../../../components/Board/PostWrite/CKEditor';
import PostWriteSelectBlock from '../../../components/Board/PostWrite/SelectBlock';
import PostWriteBtn from '../../../components/Board/PostWrite/WriteBtn';
import PostWriteTitleBlock from "../../../components/Board/PostWrite/TitleBlock";
import PostWriteKeywordBlock from "../../../components/Board/PostWrite/KeywordBlock";
import {useSetRecoilState} from "recoil";
import {PostWriteState} from "../../../storage/PostWrite/PostWrite";

export default function PostWritePage() {
    const setState = useSetRecoilState(PostWriteState)
    useEffect(()=>{
        setState((prev)=>({
            ...prev,title:'',postCategory:'',postType:'',content:'',keyWord:[],imageIds:[]
        }))
    },[])
  return (
    <div>
      <PageTitle>글 작성</PageTitle>
      <div className={'main-content post-write-page p-4'}>
        <PostWriteTitleBlock/>
        <PostWriteSelectBlock />
        <PostWriteCKEditor />
        <PostWriteKeywordBlock/>
        <PostWriteBtn />
      </div>
    </div>
  );
}
