<template>
  <div>
    <FileUpload accept="image/*" :maxFileSize="1000000" :multiple="true" :customUpload="true" @uploader="myUploader"
                chooseLabel="파일 찾기" uploadLabel="업로드" cancelLabel="전체 취소">
      <template #empty>
        <p>파일을 업로드하려면 이곳에 끌어다 놓으세요.</p>
      </template>
    </FileUpload>
  </div>
</template>

<script>
import axios from "axios";

export default {

  methods: {

    myUploader(e){

      const formData = new FormData()

      for(let i = 0; i < e.files.length; i++){

        formData.append('files', e.files[i], e.files[i].name);

      }

      axios.post("http://localhost:8082/triplus/api/util/fileupload", formData, { // 서버 로컬 저장소에 업로드
      // axios.post("http://localhost:8082/triplus/api/util/blobupload", formData, { // DB에 blob으로 업로드

        headers:{

          'Access-Control-Allow-Origin' : '*',
          'Content-Type' : 'multipart/form-data'

        }

      }).then(function (resp) {

        if (resp.data.result === "success") {

          alert("파일 업로드 성공");

        } else {

          alert("파일 업로드 실패");

        }

      }.bind(this));

    },

  }

}
</script>