import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react"
import { useAppSelector } from "../../hooks/reduxHooks"
import { NavLink } from "react-router";

function HomeNavbar() {

  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);

  return (
    <>
      <Navbar>
        <NavbarBrand>
          {/* Put your logo here! */}
          <p>
            Code Together
          </p>
        </NavbarBrand>
        <NavbarContent>
          <NavbarItem>
            <Button className="bg-primary-500">
              <NavLink to={"#"} >
                Home
              </NavLink>
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button className="bg-primary-500">
              <NavLink to={"#"}>
                Why us
              </NavLink>
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button className="bg-primary-500">
              <NavLink to={"#"}>
                How It Works
              </NavLink>
            </Button>
          </NavbarItem>
          {
            isAuthenticated === true ? (
              <NavbarItem>
                <Button className="bg-primary-500">
                  <NavLink to={"#"}>
                    Dashboard
                  </NavLink>
                </Button>
              </NavbarItem>
            ) :
              (
                <>
                  <NavbarItem>
                    <Button className="bg-primary-500">
                      <NavLink to={"/login"}>
                        Login
                      </NavLink>
                    </Button>
                  </NavbarItem>
                  <NavbarItem>
                    <Button className="bg-primary-500">
                      <NavLink to={"/signup"}>
                        Sign up
                      </NavLink>
                    </Button>
                  </NavbarItem>
                </>
              )
          }
        </NavbarContent>
      </Navbar>
    </>
  )
}

export default HomeNavbar
