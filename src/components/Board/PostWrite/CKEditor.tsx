import { CKEditor } from '@ckeditor/ckeditor5-react';
import CustomEditor from 'ckeditor5-custom-build';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { PostWriteState } from '../../../storage/PostWrite/PostWrite';
import axios from 'axios';

export default function PostWriteCKEditor() {
  const setState = useSetRecoilState(PostWriteState);
  const [flag, setFlag] = useState(false);
  const link = '';

  const customUploadAdapter = (loader: any) => {
    // (2)
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const data = new FormData();
          loader.file.then((file: File) => {
            data.append('name', file.name);
            data.append('file', file);

            axios
              .post('/image', data)
              .then((res) => {
                if (!flag) {
                  setFlag(true);
                  console.log(res);
                }
                resolve({
                  default: `${link}/question.png`,
                });
              })
              .catch((err) => reject(err));
          });
        });
      },
    };
  };
  function uploadPlugin(editor: {
    plugins: {
      get: (arg0: string) => {
        (): any;
        new (): any;
        createUploadAdapter: (loader: any) => { upload(): Promise<unknown> };
      };
    };
  }) {
    // (3)
    editor.plugins.get('FileRepository').createUploadAdapter = (
      loader: any
    ) => {
      return customUploadAdapter(loader);
    };
  }
  return (
    <div>
      <CKEditor
        editor={CustomEditor}
        config={{
          extraPlugins: [uploadPlugin],
        }}
        data="<p>Hello from CKEditor 5!</p>"
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setState((prev) => ({
            ...prev,
            content: data,
          }));
        }}
        onBlur={(event, editor) => {}}
        onFocus={(event, editor) => {}}
      />
    </div>
  );
}
