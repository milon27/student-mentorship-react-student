import axios from "axios";
import Response from "../../helpers/Response";
import Define from "./../../helpers/Define";
import Types from "./Types";

class Todo {
  constructor(dispatch) {
    this.dispatch = dispatch;
  }
  // Create To-DO 
  createTodo = (url, newTodo) => {
    console.log(newTodo);
    return new Promise(async (resolve, reject) => {
      const res = await axios.post(url, newTodo);
      console.log("res", res);
      const { error, message, response } = res.data;
      if (error === false) {
        this.dispatch({
          type: Types.CREATE_TODO,
          payload: response,
        });

        resolve(
          Response(true, "success", message, Define.BT_SUCCESS, response)
        );
      } else {
        //error
        reject(new Error(message));
      }
    });
  };
  getSource = () => {
    this.source = axios.CancelToken.source();
    return this.source;
  };
  // Get All TOdos
  getAllTodos = async (url) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}`, {
          cancelToken: this.source.token,
        })
        .then((res) => {
          const { error, message, response } = res.data;
          if (error === false) {
            //no error
            //dispatch the global state
            this.dispatch({
              type: Types.GET_TODO,
              payload: response, //an array
            });
            resolve(
              Response(true, "success", message, Define.BT_SUCCESS, response)
            );
          } else {
            reject(new Error(message));
          }
        })
        .catch((e) => {
          if (axios.isCancel(e)) {
            reject(new Error("canceled the request"));
          } else {
            reject(e);
          }
        });
    });
  };
  // Get Completed Todos
  getCompleteTodo = async (url) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}`, {
          cancelToken: this.source.token,
        })
        .then((res) => {
          const { error, message, response } = res.data;
          if (error === false) {
            //no error
            //dispatch the global state
            this.dispatch({
              type: Types.GET_COMPLETE_TODO,
              payload: response, //an array
            });
            resolve(
              Response(true, "success", message, Define.BT_SUCCESS, response)
            );
          } else {
            reject(new Error(message));
          }
        })
        .catch((e) => {
          if (axios.isCancel(e)) {
            reject(new Error("canceled the request"));
          } else {
            reject(e);
          }
        });
    });
  };
  // Update Todos
  updateTodo = (url, updateData) => {
    return new Promise((resolve, reject) => {
      axios
        .put(url, updateData)
        .then((res) => {
          const { error, message, response } = res.data;
          console.log(res);
          if (error === false) {
            //dispatch the global state
            this.dispatch({
              type: Types.UPDATE_TODO,
              payload: response,
            });
            resolve(
              Response(
                true,
                "update succes",
                message,
                Define.BT_SUCCESS,
                response
              )
            );
          } else {
            reject(new Error(message));
          }
        })
        .catch((e) => {
          console.error("erroe: ", e);
          reject(e);
        });
    });
  };
  // Delete Todo 
  deleteTodo=(url,deleteData)=> {
     return new Promise((resolve,reject)=>{
       axios 
         .delete(url,deleteData)
         .then((res)=>{
           const {error,message,response} = res.data;
           console.log(res);
           if(error===false) {
             this.dispatch({
              type:Types.DELETE_TODO,
              payload:response,
             });
             resolve(
               Response(
                 true,
                 "Deleted Success",
                 message,
                 Define.BT_SUCCESS,
                 response
               )
             );
           } else {
            reject(new Error(message));
           }
         })
         .catch((e) => {
          console.error("error: ", e);
          reject(e);
        });
     })
  };
}
export default Todo;
