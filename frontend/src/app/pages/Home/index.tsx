import { isAuthenticated } from "../../Services/Auth/auth";
import { HomePage } from "./components/HomePage";

import { LandingPage } from './components/LadingPage';

export const Home = () => {
   return (
      isAuthenticated()
         ? <> <HomePage /> </>
         : <> <LandingPage /> </>
   );
}