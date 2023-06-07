import PageTitle from "../../../components/PageTitle/PageTitle";
import PostWriteTitleBlock from "../../../components/Board/PostWrite/TitleBlock";
import PostWriteSelectBlock from "../../../components/Board/PostWrite/SelectBlock";
import PostWriteCKEditor from "../../../components/Board/PostWrite/CKEditor";
import PostWriteKeywordBlock from "../../../components/Board/PostWrite/KeywordBlock";
import PostWriteBtn from "../../../components/Board/PostWrite/WriteBtn";
import React from "react";

export default function PostUpdatePage() {

    return (
        <div>
            <PageTitle>글 작성</PageTitle>
            <div className={'main-content post-write-page'}>
                <PostWriteTitleBlock/>
                <PostWriteSelectBlock />
                <PostWriteCKEditor />
                <PostWriteKeywordBlock/>
                <PostWriteBtn />
            </div>
        </div>
    );
}