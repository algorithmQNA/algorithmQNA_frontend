import React, { useRef, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import CustomEditor from 'ckeditor5-custom-build';
import ButtonComponent from '../Button/ButtonComponent';
import { useMutation, useQueryClient } from 'react-query';
import { createCommentRequest } from '../../apis/commentApi';
import { useParams } from 'react-router-dom';

function CommentWrite() {
  const queryClient = useQueryClient();
  const editorRef = useRef<CKEditor<CustomEditor>>(null);
  const { mutate: writeComment } = useMutation(createCommentRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post', postId]);
      editorRef.current?.editor?.data.set('');
    },
  });
  const [data, setData] = useState('');
  const { postId } = useParams();

  const handleSubmitBtnClick = () => {
    if (postId)
      writeComment({ postId: +postId, content: data, parentCommentId: null });
  };
  const handleEditorChange: (event: Object, editor: CustomEditor) => void = (
    _,
    editor
  ) => {
    const data = editor?.getData();
    setData(data);
  };
  return (
    <div className="border p-0 m-0">
      <div className="comment-editor">
        <CKEditor
          ref={editorRef}
          editor={CustomEditor}
          onChange={handleEditorChange}
        />
      </div>
      <div className="flex p-2 flex-row justify-between">
        <div>
          <span>{data.length}</span>
          <span>/300</span>
        </div>
        <ButtonComponent onClick={handleSubmitBtnClick}>작성</ButtonComponent>
      </div>
    </div>
  );
}

export default CommentWrite;
