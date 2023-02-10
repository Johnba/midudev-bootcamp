//https://bundlephobia.com/package/axios@1.3.2
import axios from "axios";


export const getAllTheNotes = () => {

    //Usar promesas axios
    return axios
            .get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const {data} = response;
                return data
            })
            
}


export const createTheNote = ( {title, body, userId} ) => {

    //Usar promesas axios
    return axios
        .post('https://jsonplaceholder.typicode.com/posts', {title, body, userId})
        .then((response) => {
        const {data} = response;
        return data;
        });

}