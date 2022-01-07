import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap";

import { isAuthenticated, logout } from '../../Services/Auth/auth';

export const NavBarComponent = () => {

   function handleLogout() {
      logout();
      window.location.href = "/";
   }

   return (
      <Navbar bg="light" expand="lg">
         <Container fluid>
            <Navbar.Brand href="/">DevBook</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
               <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: '100px' }}
                  navbarScroll
               >
               </Nav>
               <Form className="d-flex">
                  <FormControl
                     type="search"
                     placeholder="Search"
                     className="me-2"
                     aria-label="Search"
                  />
                  <Button variant="outline-success">Buscar</Button>
               </Form>
               <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: '100px' }}
                  navbarScroll
               >
               </Nav>
               <Nav
                  className="my-5 my-lg-2"
                  style={{ marginRight: '30px' }}
               >
                  {
                     isAuthenticated()
                        ? <>
                           <NavDropdown title="Configuraçãoes" id="collasible-nav-dropdown">
                              <NavDropdown.Item href="/perfil">Perfil</NavDropdown.Item>
                              <NavDropdown.Item href="#">Another action</NavDropdown.Item>
                              <NavDropdown.Item href="central-ajuda">Central de ajudas</NavDropdown.Item>
                              <NavDropdown.Divider />
                              <NavDropdown.Item onClick={() => handleLogout()} >Sair</NavDropdown.Item>
                           </NavDropdown>
                        </>
                        : <>
                           <Nav className="me-0 ">
                              <Nav.Link type="button" href="/login">Entrar</Nav.Link>
                              <Nav.Link href="/cadastre-se">Cadastre-se</Nav.Link>
                           </Nav>
                        </>
                  }
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
}