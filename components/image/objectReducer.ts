import { ObjectAction, ObjectState } from "./objectTypes";

export function objectReducer(
  state: ObjectState,
  action: ObjectAction,
): ObjectState {
  switch (action.type) {
    case "RESET":
      return { objects: [], selectedIndex: 0 };

    case "SET_SELECTED":
      return { ...state, selectedIndex: action.index };

    case "PUSH":
      return {
        ...state,
        objects: [...state.objects, { f: action.file, meta: {} }],
      };

    case "POP":
      return {
        ...state,
        objects: state.objects.filter((_, i) => i !== action.index),
      };

    case "REORDER": {
      const items = [...state.objects];
      const [moved] = items.splice(action.from, 1);
      items.splice(action.to, 0, moved);
      return { ...state, objects: items };
    }

    case "SET_RATIO": {
      const items = [...state.objects];
      items[action.index] = {
        ...items[action.index],
        meta: {
          ...items[action.index].meta,
          ratio: action.ratio,
        },
      };
      return { ...state, objects: items };
    }

    default:
      return state;
  }
}
