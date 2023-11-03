import axios from "axios";
import * as events from "events";

export function registerUser(data) {
    axios.post("http://94.241.143.82:2299/users/register", data)
        .then(response => console.log(response.data.json()))
        .catch(error => console.log(error))
}