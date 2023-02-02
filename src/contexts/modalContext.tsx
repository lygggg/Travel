import {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
} from "react";

export interface ModalProps {
  onClose?: () => void;
}

type Component = (props: ModalProps) => JSX.Element;
type ModalDispatch = Dispatch<Action>;
type Action =
  | {
      type: "open";
      component: Component;
      onConfirm?: () => void;
      onClose?: () => void;
    }
  | { type: "close" };
type State = {
  isOpen: boolean;
  ModalComponent: Component | null;
  onConfirm?: () => void;
  onClose?: () => void;
};
type ModalProviderProps = { children: ReactNode };

const ModalValueContext = createContext<State | undefined>(undefined);
const ModalDispatchContext = createContext<ModalDispatch | undefined>(
  undefined,
);

function modalReducer(state: State, action: Action): State {
  switch (action.type) {
    case "open": {
      return {
        ...state,
        isOpen: true,
        ModalComponent: action.component,
        onConfirm: action.onConfirm,
        onClose: action.onClose,
      };
    }
    case "close": {
      return {
        ...state,
        isOpen: false,
        ModalComponent: null,
        onConfirm: undefined,
        onClose: undefined,
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
    ModalComponent: null,
  });

  return (
    <ModalValueContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
      </ModalDispatchContext.Provider>
    </ModalValueContext.Provider>
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
