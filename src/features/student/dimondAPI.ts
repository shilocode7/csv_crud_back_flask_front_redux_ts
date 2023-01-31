import { Dimonds } from "../../models/Dimond";
import axios from "axios";
const MY_SERVER = "http://127.0.0.1:5000/diamonds"

export function getDimonds() {
    return new Promise<{ data: Dimonds[] }>((resolve) =>
        axios.get(MY_SERVER).then(res => resolve({ data: res.data }))
    );
}


export function addDimond(new_dimond:Dimonds) {
    return new Promise<{ data: Dimonds }>((resolve) =>
        axios.post(MY_SERVER ,new_dimond).then(res => resolve({ data: res.data }))
    );
}


export function updDimond(new_dimond:Dimonds) {
    return new Promise<{ data: Dimonds }>((resolve) =>
        axios.post(MY_SERVER +"<int:id>",new_dimond).then(res => resolve({ data: res.data }))
    );
}
