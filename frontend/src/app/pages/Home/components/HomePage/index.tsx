import { NavBarComponent } from "../../../../components/Navbar";
import './styles.css';

export const HomePage = () => {
   return (
      <>
         <NavBarComponent />
         <div className="container-grid-home">
            <div className="area1">
               <div className="left"></div>
            </div>
            <div className="area2">
               <div className="center">
                  <div className="boas-vindas">Bem-vindo, Fábio Ericle</div>
               </div>
            </div>
            <div className="area3">
               <div className="right"></div>
            </div>
         </div>
      </>
   );
}