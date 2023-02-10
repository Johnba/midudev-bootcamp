import axios from "axios";

export const createNote = ( {title, body, userId} ) => {

    //Usar promesas axios
    return axios
        .post('https://jsonplaceholder.typicode.com/posts', {title, body, userId})
        .then((response) => {
        const {data} = response;
        return data;
        });

}