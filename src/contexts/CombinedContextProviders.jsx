import ContextProviderComposer from "./ContextProviderComposer";
import { ModalProvider } from "./modalContext";

const CombinedContextProviders = ({ children }) => {
  return (
    <ContextProviderComposer
      contextProviders={[<ModalProvider key={"modal_provider"} />]}
    >
      {children}
    </ContextProviderComposer>
  );
};

export default CombinedContextProviders;
