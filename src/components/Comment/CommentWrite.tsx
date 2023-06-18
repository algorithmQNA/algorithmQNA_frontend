import React, { useRef, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import CustomEditor from 'ckeditor5-custom-build';
import ButtonComponent from '../Button/ButtonComponent';
import { useMutation, useQueryClient } from 'react-query';
import { createCommentRequest } from '../../apis/commentApi';
import useGetParams from '../../hooks/useGetParams';
import { useParams } from 'react-router-dom';

function CommentWrite() {
  const queryClient = useQueryClient();
  const { mutate: writeComment } = useMutation(createCommentRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment', +pid, +page] });
      editorRef.current?.editor?.data.set('');
    },
    onError(error, variables, context) {
      //TODO :: validation해주기
      console.log(error);
    },
  });

  const [content, setContent] = useState('');
  const editorRef = useRef<CKEditor<any>>(null);
  const { pid = -1 } = useParams();
  const page = useGetParams('page') || 0;

  const handleSubmitBtnClick = () => {
    if (pid)
      writeComment({ postId: +pid, content: content, parentCommentId: null });
  };

  const handleEditorChange: (event: Object, editor: any) => void = (
    _,
    editor
  ) => {
    const _editor = editor as unknown as CustomEditor;
    const data = _editor.getData();
    setContent(data);
  };

  return (
    <div className="border p-0 m-0">
      <div className="comment-editor">
        <CKEditor
          ref={editorRef}
          editor={CustomEditor as any}
          onChange={handleEditorChange}
        />
      </div>
      <div className="p-2 text-right">
        <ButtonComponent onClick={handleSubmitBtnClick}>작성</ButtonComponent>
      </div>
    </div>
  );
}

export default CommentWrite;
