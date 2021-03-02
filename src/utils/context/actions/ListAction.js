import axios from 'axios'
import Response from '../../helpers/Response';
import Types from './Types';
import Define from './../../helpers/Define';

class ListAction {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }
    getSource = () => {
        this.#source = axios.CancelToken.source();
        return this.#source
    }//return token to cancel the request

    //get all data
    getAll = async (url) => {
        return new Promise((resolve, reject) => {
            axios.get(`${url}`
                , {
                    cancelToken: this.#source.token
                }
            ).then(res => {
                const { error, message, response } = res.data
                if (error === false) {//no error
                    //dispatch the global state
                    this.dispatch({
                        type: Types.GET_DATA,
                        payload: response//an array
                    });
                    resolve(Response(true, "success", message, Define.BT_SUCCESS, response));
                } else {
                    reject(new Error(message));
                }
            }).catch(e => {
                if (axios.isCancel(e)) {
                    reject(new Error("canceled the request"));
                } else {
                    reject(e);
                }
            });
        });
    }//end get all(make sure you got a response (object type) )
    addData = (url, newdata) => {
        return new Promise((resolve, reject) => {
            axios.post(url, newdata).then((res) => {
                const { error, message, response } = res.data
                if (error === false) {//no error
                    //dispatch the global state
                    this.dispatch({
                        type: Types.ADD_DATA,
                        payload: response//a newly created object 
                    });
                    resolve(Response(true, "success", message, Define.BT_SUCCESS, response));
                } else {//error
                    reject(new Error(message));
                }
            }).catch((e) => {
                reject(e);
            })
        });
    }//end add data

    // updateData = (url, updateData) => {
    //     return new Promise((resolve, reject) => {
    //         axios.put(url, updateData).then((res) => {
    //             const { error, message, response } = res.data
    //             if (error === false) {
    //                 //dispatch the global state
    //                 this.dispatch({
    //                     type: Types.UPDATE_DATA,
    //                     payload: response
    //                 });
    //                 resolve(Response(true, "update succes", message, Define.BT_SUCCESS, response));
    //             } else {
    //                 reject(new Error(message));
    //             }
    //         }).catch((e) => {
    //             console.error("erroe: ", e)
    //             reject(e);
    //         })
    //     });
    // }//end update data


}


export default ListAction;