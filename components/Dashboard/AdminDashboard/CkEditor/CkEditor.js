import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
const CkEditor = ({ ckData, setCkData }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={ckData}
      onReady={(editor) => {
        // You can store the "editor" and use when it is needed.
        // console.log("Editor is ready to use!", editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        setCkData(data);
        // console.log({ event, editor, data });
      }}
      onBlur={(event, editor) => {
        // console.log("Blur.", editor);
      }}
      onFocus={(event, editor) => {
        // console.log("Focus.", editor);
      }}
    />
  );
};

export default CkEditor;
