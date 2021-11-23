import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './app/pages/Home';
import { LoginPage } from './app/pages/Login';
// import { isAuthenticated } from './app/Services/Auth/auth';

import GlobalContext from '../src/context/index';
import { SiginPage } from './app/pages/Sigin';
import { ProfilePage } from './app/pages/Profile';

// const RequireAuth: React.FC<{ children: JSX.Element, redirect: string }> = ({ children, redirect }) => {
//   if(!isAuthenticated()) {
//     return <Navigate to={{ pathname: `${redirect}` }} />;
//   }
//   return children;
// };

export const App = () => {
  return (
    <GlobalContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/cadastre-se" element={ <SiginPage /> } />
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/perfil" element={ <ProfilePage /> } />
        </Routes>
      </BrowserRouter>
    </GlobalContext>
  );
}