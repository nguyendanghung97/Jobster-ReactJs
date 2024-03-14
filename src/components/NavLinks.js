import { NavLink } from "react-router-dom";
import links from "../utils/links";

const NavLinks = ({toggleSidebar}) => {
  return (
    <div className='nav-links'>
        {links.map((link) => {
            const { id, text, path, icon} = link;
            return (
            //  Khi liên kết đó được kích hoạt (tức là khi nó trỏ tới đúng URL hiện tại), isActive sẽ có giá trị true, ngược lại sẽ là false.
            <NavLink
                to={path}
                className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
                }
                key={id}
                onClick={toggleSidebar}
            >
                <span className="icon">{icon}</span>
                {text}
            </NavLink>
            );
        })}
    </div>
  )
}

export default NavLinks