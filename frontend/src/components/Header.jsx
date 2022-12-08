import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faUser,faHeart } from '@fortawesome/free-regular-svg-icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import Spinner from './Spinner';
import ShoppingBag from './ShoppingBag';

import {headerItems} from '../data/headerItems';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
		const location = useLocation();
    const {user} = useSelector((state) => state.auth);
    const [isLoading,setIsLoading] = useState(false);

    const [headerList, setHeaderList] = useState(headerItems);
		const [isClicked, setIsClicked] = useState(false);

		useEffect(() => {
			let list = [...headerList];
			list.map((v) => location.pathname === v.url ? v.active = true : v.active = false);
			setHeaderList(list);

			return () => {
				setIsClicked(false);
			}
		},[isClicked])

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate('/');
        }, 500);
    }

    if(isLoading) {
        return(<Spinner />)
    }

    return (
        <header>
            <div className="container">
                <div className="row">
                    <div className="col-md-3" id="brandContainer" onClick={() => setIsClicked(true)}>
                        <Link to='/'><h1 className="brandName">All fashion</h1></Link>
                    </div>
                    <div className="col-md-6">
											<nav className="header_menu header">
												<ul>
														{
															headerList.map((value) => (
																	<li key={value.id}
																		className={`${ value.active ? "active" : "" }`}
																		onClick={() => setIsClicked(true)}>
																		<Link to={value.url}>{value.name}</Link>
																	</li>
															))
														}
												</ul>
											</nav>
                    </div>
                    <div className="col-md-3">
                        <div className="header_nav_option">
                            <span><FontAwesomeIcon icon={faSearch} /></span>
                            {user ? (<>
                                <button className='btn' onClick={onLogout}>
                                    <FontAwesomeIcon icon={faSignOutAlt} onClick={() => setIsClicked(true)}/>
                                </button>
                            </>) : (<>
                                <Link to='/login' onClick={() => setIsClicked(true)}><FontAwesomeIcon icon={faUser} /></Link>
                            </>)}
                            <span><FontAwesomeIcon icon={faHeart} /></span>
                            <div onClick={() => setIsClicked(true)}>
															<ShoppingBag />
														</div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
