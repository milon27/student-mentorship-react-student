
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
                if (itm.id === action.payload.id)
                    return action.payload;
                else
                    return itm;
            });
            return state;//return array with updated object
        default:
            return state;//default arry
    }

}
export default ListReducer;