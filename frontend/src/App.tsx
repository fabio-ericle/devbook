import Router from "./Routes";
import { AuthProvider } from './context/AuthContext';

const App = () => {
   return(
      <AuthProvider>
         <Router />
      </AuthProvider>
   );
}

export default App;