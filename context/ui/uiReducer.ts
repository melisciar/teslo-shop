import { UiState } from ".";

type UiActionType = { type: "UI - ToggleMenu" };

//Recibe un estado o acción y produce un nuevo estado
export const uiReducer = (state: UiState, action: UiActionType): UiState => {
  switch (action.type) {
    case "UI - ToggleMenu":
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };

    default:
      return state;
  }
};
