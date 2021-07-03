const Types = {
  //auth
  AUTH_LOGIN: "AUTH_LOGIN",
  AUTH_LOGOUT: "AUTH_LOGOUT",
  AUTH_SIGNUP: "AUTH_SIGNUP",
  //app global state
  START_LOADING: "START_LOADING",
  STOP_LOADING: "STOP_LOADING",
  SET_RESPONSE: "SET_RESPONSE",
  REMOVE_RESPONSE: "REMOVE_RESPONSE",
  RELOAD: "RELOAD",
  //list & object
  GET_DATA: "GET_DATA",
  ADD_DATA: "ADD_DATA",
  UPDATE_DATA: "UPDATE_DATA",
  DELETE_DATA: "DELETE_DATA",
  // addTodo
  CREATE_TODO: "CREATE_TODO",
  GET_TODO: "GET_TODO",
  UPDATE_TODO: "UPDATE_TODO",
  GET_COMPLETE_TODO: "GET_COMPLETE_TODO",
  DELETE_TODO: "DELETE_TODO",
  //optional
  DARK_THEME: "DARK_THEME",
  //payload structure
  UPDATE_PAYLOAD: (id_field, obj) => {
    return {
      obj,
      id_field,
    };
  },
};

export default Types;
