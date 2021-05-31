import { PullstateProvider } from "pullstate";

// CORE 3rd Party Libraries
import "./theme/shared.scss";
/* Theme variables */
import "./theme/variables.scss";

import Main from "./pages/Main/Main";
import { PullstateCore } from "./store";

const App: React.FC = () => {
  const instance = PullstateCore.instantiate({ ssr: false });
  return (
    <PullstateProvider instance={instance}>
      <Main />
    </PullstateProvider>
  );
};

export default App;
