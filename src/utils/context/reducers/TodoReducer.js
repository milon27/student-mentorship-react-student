import Types from "../actions/Types";
export const initTodoState = [];

const TodoReducer = (state, action) => {
  switch (action.type) {
    case Types.CREATE_TODO:
      return [action.payload, ...state];
    case Types.GET_TODO:
      return [...action.payload];
    case Types.UPDATE_TODO:
      return state.filter((todo) => todo.is_done === action.payload.is_done);
    case Types.GET_COMPLETE_TODO:
      return [...action.payload];
    case Types.DELETE_TODO:
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
};
export default TodoReducer;
