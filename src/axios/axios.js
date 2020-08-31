import axios from "axios";

const instance = axios.create({
    baseURL: "https://my-studysession.firebaseio.com/"
});

export default instance 