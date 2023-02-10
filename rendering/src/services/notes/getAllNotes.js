import axios from "axios";

export const getAllNotes = () => {

    //Usar promesas axios
    return axios
            .get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const {data} = response;
                return data
            })
            
}