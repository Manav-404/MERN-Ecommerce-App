import React, { Fragment } from 'react'
import {Link , withRouter} from 'react-router-dom';
import{signout, isAuthenticated} from '../auth/helper/index'

const currentTab = (history , path)=>{
    if(history.location.pathname===path){
        return {color : "#2ecc72"}
    }else{
        return {color : "#000000"}
    }
}
const Menu = ({history}) =>(

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <h4 className="navbar-brand">Dez</h4>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ">
            <li className="nav-item">
                <Link style={currentTab(history , "/")} className="nav-link" to="/">
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab(history , "/cart")} className="nav-link" to="/cart">
                    Cart
                </Link>
            </li>
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                <Link style={currentTab(history , "/user/dashboard")}  className="nav-link" to="/user/dashboard">
                    Dashboard
                </Link>
            </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                <Link style={currentTab(history , "/admin/dashboard")} className="nav-link" to="/admin/dashboard">
                    Dashboard
                </Link>
            </li>
            )}
            {!isAuthenticated() && (
                <Fragment>
                <li className="nav-item">
                <Link style={currentTab(history , "/signup")} className="nav-link" to="/signup">
                    Signup
                </Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab(history , "/signin")} className="nav-link" to="/signin">
                    SignIn
                </Link>
            </li>
                </Fragment>
            )}
           {isAuthenticated() && (
                <li className="nav-item">
                <Link className="nav-link" onClick={()=>{
                    signout(()=>{
                        history.push("/")
                    })
                }}>
                    Signout
                </Link>
            </li>
           )}
        </ul>
    </div>
    </nav>
)

export default withRouter(Menu);