import {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
} from "react";

type ModalDispatch = Dispatch<Action>;
type Action =
  | {
      type: "open";
      Component: ReactNode | null;
    }
  | { type: "close" };
type State = {
  isOpen: boolean;
  modal: ReactNode | null;
};
type ModalProviderProps = { children: ReactNode };

const ModalValueContext = createContext<State | null>(null);
const ModalDispatchContext = createContext<ModalDispatch | null>(null);

function modalReducer(state: State, action: Action) {
  switch (action.type) {
    case "open": {
      return {
        isOpen: true,
        modal: action.Component,
      };
    }
    case "close": {
      return {
        isOpen: false,
        modal: null,
      };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [state, dispatch] = useReducer(modalReducer, {
    isOpen: false,
    modal: null,
  });

  return (
    <ModalDispatchContext.Provider value={dispatch}>
      <ModalValueContext.Provider value={state}>
        {children}
      </ModalValueContext.Provider>
    </ModalDispatchContext.Provider>
  );
};

function useModalValue() {
  const value = useContext(ModalValueContext);
  if (value === undefined) {
    throw new Error("useModalValue must be used within a ModalProvider");
  }
  return value;
}

function useModalActions() {
  const value = useContext(ModalDispatchContext);
  if (value === undefined) {
    throw new Error("useModalActions must be used within a ModalProvider");
  }
  return value;
}

export { ModalProvider, useModalValue, useModalActions };
