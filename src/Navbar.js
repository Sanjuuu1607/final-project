import React from "react";
import { Nav, NavLink, NavMenu }
	from "./NavbarElements";

const Navbar = () => {
	return (
		<>
			<Nav>
				<NavMenu>
					<NavLink to="/customize" activeStyle>
						Customize
					</NavLink>
					<NavLink to="/video" activeStyle>
						Video
					</NavLink>
				</NavMenu>
			</Nav>
		</>
	);
};

export default Navbar;
