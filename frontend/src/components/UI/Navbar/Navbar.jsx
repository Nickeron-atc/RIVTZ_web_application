import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='navbar__links'>
                <Link to='/login'>[Login\Logout]</Link>
            </div>
        </div>
    );
};

export default Navbar;