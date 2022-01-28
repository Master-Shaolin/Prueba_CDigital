import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <header>
            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <nav className="header_menu header">
                            <ul>
                                <li><a href="#" className="enlace">Home</a></li>
                                <li><a href="#" className="enlace">Shop</a></li>
                                <li><a href="#" className="enlace">Contact</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-md-3">
                        <div className="header_nav_option">
                            <a href=""><FontAwesomeIcon icon={faSearch} /></a>
                            <a href=""></a>
                            <a href=""></a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
