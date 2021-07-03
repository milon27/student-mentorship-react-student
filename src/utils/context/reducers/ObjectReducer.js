import Types from '../actions/Types';
export const initObjectState = {};

const ObjectReducer = (state, action) => {
    switch (action.type) {
        case Types.GET_DATA:
            return { ...action.payload };//return an object
        case Types.ADD_DATA:
            return { ...action.payload };//return new object
        case Types.UPDATE_DATA:
            state = {
                ...state,//old object
                ...action.payload//updated object
            };
            return state;//return updated object
        case Types.DELETE_DATA:
            return {};//return empty object
        default:
            return state;//default arry
    }

}
export default ObjectReducer;