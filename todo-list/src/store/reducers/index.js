import * as actions from '../actions';

const initialState = {
  tasks: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_TASK:
      return {
        tasks: [...state.tasks, action.payload],
      };
    case actions.REMOVE_TASK:
      state.tasks.splice(action.payload, 1);
      return {
        tasks: [...state.tasks],
      };
    case actions.MOVE_TASK:
      const { src, dest } = action.payload;
      const target = state.tasks.splice(src, 1)[0];
      state.tasks.splice(dest, 0, [target]);
      return {
        tasks: [...state.tasks],
      };
    default:
      return {
        ...state,
      }
  }
};
