import {CKEditor} from "@ckeditor/ckeditor5-react";
import CustomEditor from "ckeditor5-custom-build";
import React from "react";

export default function PostWriteCKEditor(){
    return(
        <div>
            <CKEditor
                editor={ CustomEditor }
                data="<p>Hello from CKEditor 5!</p>"
                onReady={ editor => {
                    // You can store the "editor" and use when it is needed.

                } }
                onChange={ ( event, editor ) => {
                    const data = editor.getData();

                } }
                onBlur={ ( event, editor ) => {

                } }
                onFocus={ ( event, editor ) => {

                } }
            />
        </div>
    )
}