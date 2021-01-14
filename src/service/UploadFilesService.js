import axios from "axios";

class UploadFilesService {
    upload(file, onUploadProgress) {
        let formData = new FormData();

        formData.append("file", file);

        return axios.post("https://quizzy-api-v1.herokuapp.com/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress
        });
    }

    getFiles() {
        return axios.get("https://quizzy-api-v1.herokuapp.com/files");
    }
}

export default new UploadFilesService();
