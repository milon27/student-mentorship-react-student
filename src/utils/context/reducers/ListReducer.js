import Types from "../actions/Types";
export const initListState = [];

const ListReducer = (state, action) => {
  switch (action.type) {
    case Types.GET_DATA:
      return [...action.payload]; //return an array
    case Types.ADD_DATA:
      return [action.payload, ...state]; //return array with new object
    case Types.UPDATE_DATA:
      //let objIndex = state.findIndex((obj => obj.id == action.payload.id));
      //state[objIndex] = action.payload;
      // state = state.map(itm => {
      //     const id_field = action.payload.id
      //     if (itm[id_field] === action.payload.obj[id_field])
      //         return action.payload.obj;
      //     else
      //         return itm;
      // });
      // Notice Update
      return state.map((Updatedata) =>
        Updatedata.id === action.payload.id ? action.payload : state
      );
    // return state;//return array with updated object
    case Types.DELETE_DATA:
      return state.filter((Deletedata) => Deletedata.id === action.payload.id);
    default:
      return state; //default arry
  }
};
export default ListReducer;
