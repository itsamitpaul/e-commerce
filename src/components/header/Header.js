import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faList } from "@fortawesome/free-solid-svg-icons";
import './Header.css';

const Header = (props) =>{

    return (
        <div className='header_container'>
            <Link to='/' className='header_company'> 
                <img src={`${process.env.PUBLIC_URL}/pentair_logo.png`} alt="company-logo" className='header_logo'/>
            </Link>
            {props.userLoggedIn ?
            <div className='header_links'>
                <Link to="/add_product" className="header_link_item">
                    <FontAwesomeIcon
                        icon={faPlusSquare}
                        className="header_link_item_icon"
                    />
                    Add Product
                </Link>
                <Link to="/" className="header_link_item">
                    <FontAwesomeIcon
                        icon={faList}
                        className="header_link_item_icon"
                    />
                    Product List
                </Link>
                <div className='header_link_item' id='header_link_logout' onClick={()=>props.onAdminLogout()}>Log Out</div>
            </div> : ''}
        </div>
    );
}

export default Header;