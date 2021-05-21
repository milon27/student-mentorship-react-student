
import Types from '../actions/Types';
export const initListState = [];

const ListReducer = (state, action) => {
    switch (action.type) {
        case Types.GET_DATA:
            return [...action.payload];//return an array
        case Types.ADD_DATA:
            return [action.payload, ...state];//return array with new object
        case Types.UPDATE_DATA:
            //let objIndex = state.findIndex((obj => obj.id == action.payload.id));
            //state[objIndex] = action.payload;
            state = state.map(itm => {
                const id_field = action.payload.id_field
                if (itm[id_field] === action.payload.obj[id_field])
                    return action.payload.obj;
                else
                    return itm;
            });
            return state;//return array with updated object
        default:
            return state;//default arry
    }

}
export default ListReducer;