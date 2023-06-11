import { CKEditor } from '@ckeditor/ckeditor5-react';
import CustomEditor from 'ckeditor5-custom-build';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { PostWriteState } from '../../../storage/PostWrite/PostWrite';
import axios from 'axios';

export default function PostWriteCKEditor() {
  const [state, setState] = useRecoilState(PostWriteState);
  const [flag, setFlag] = useState(false);
  const link = 'http://13.54.50.218:8080';

  const customUploadAdapter = (loader: any) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const data = new FormData();
          loader.file.then((file: File) => {
            data.append('name', file.name);
            data.append('file', file);
            axios
              .post('/upload', data)
              .then((res) => {
                if (!flag) {
                  setFlag(true);
                }
                setState((prev) => ({
                  ...prev,
                  imageIds: [...prev.imageIds, res.data.ImageUploadRes.id],
                }));
                resolve({
                  default: `${link + res.data.ImageUploadRes.url}`,
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
        editor={CustomEditor as any}
        config={{
          extraPlugins: [uploadPlugin],
        }}
        data={state.content}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
        }}
        onChange={(event, editor) => {
          const _editor = editor as unknown as CustomEditor;
          const data = _editor.getData();
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
