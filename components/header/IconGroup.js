import React,{useState} from "react";

import Bag from "../icons/Bag";
import Heart from "../icons/Heart";
import Link from "../../helpers/Link";
import Menu from '../icons/Menu'
import MenuCart from "./sub-components/MenuCart";
import Profile from "../icons/Profile";
import PropTypes from "prop-types";
import SvgComponent from "../icons/Search";
import { useRouter } from "next/router";

// import { DESTROY_SESSION } from "../../redux/reducers/rootReducer";







// import { connect } from "react-redux";
// import { deleteFromCart } from "../../redux/actions/cartActions";


const IconGroup = ({
  cartData,
  wishlistData,
  destroySession,
  deleteFromCart,
  iconWhiteClass,
  isLogged
}) => {
  
  const handleClick = e => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
    const offcanvaswrap=document.querySelector('.customnb');
    offcanvaswrap.classList.remove('acnavbar');
  };
  const [search, setSearch] = useState("close")
  const triggerSearch=()=>{
   if(search=='search'){
     setSearch('close');
   }
   else{
     setSearch('search');
   }
  }

  const router = useRouter();

  const logout = () => {
    destroySession();
    fetch('/api/logout').then(() => {
      router.push('/');
    }).catch(console.log);
  }

  return (
    <div
      className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""}`}
    >
       <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          {/* <i className="pe-7s-menu" /> */}
          <Menu className='icon-white'/>
        </button>
      </div>
      <div className="same-style hsearch pr-2 ">
        {/* <button className="search-active" onClick={e => handleClick(e)}> */}
          {/* <i className="pe-7s-search" /> */}
        {/* </button> */}
          <form action="/search" className='d-none d-lg-flex fsearch'>
            <input className='sinput mr-3' type="text" name="SearchKey" placeholder="Search Anything..." />
            <button type="submit" className="sbtn">
            <SvgComponent className='icon-white'/>
            </button>
          </form>
          <form action="/search" className={`d-lg-none  fsearch ${search=='search'?'d-flex':'d-none'}`}>
            <input className='sinput mr-3' type="text" name="SearchKey" placeholder="Search Anything..." />
            <button type="submit" className="sbtn">
            <SvgComponent className='icon-white' />
            </button>
          </form>
          <SvgComponent className={`icon-white d-lg-none  ${search=='search'?'d-none':'d-block'}`} onClick={() => triggerSearch()}/>
      </div>
      {!isLogged
        ?
        (
          <div className="same-style account-setting d-none d-lg-block mt-2">
            <Link href={"/login"}
              className="account-setting-active"
              onClick={e => handleClick(e)}
            >
              {/* <i className="pe-7s-user-female" /> */}
              <Profile className='icon-white'/>
            </Link>
          </div>
        ) :
        (
          <div className="same-style account-setting d-none d-lg-block mt-2">
            <button
              className="account-setting-active"
              onClick={e => handleClick(e)}
            >
              {/* <i className="pe-7s-user-female" /> */}
              <Profile/>
            </button>
            <div className="account-dropdown">
              <ul>
                <li>
                  <Link href={"/my-account"}>
                    my account
                  </Link>
                </li>
                <li>
                  <Link href={"/my-orders"}>
                    my orders
                  </Link>
                </li>
                <li>
                  <button onClick={logout} style={{ border: 'none', background: 'none' }}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        )
      }

      
      <div className="same-style header-wishlist d-none d-lg-block mt-2">
        <Link href={"/wishlist"}>
          <>
            {/* <i className="pe-7s-like" /> */}
            <Heart className='icon-white'/>
            {/* <span className="count-style">
              {wishlistData && wishlistData.length ? wishlistData.length : 0}
            </span> */}
          </>
        </Link>
      </div>

      <div className="same-style cart-wrap d-none d-lg-block mt-2">
        <button className="icon-cart" onClick={e => handleClick(e)}>
          {/* <i className="pe-7s-shopbag" /> */}
          <Bag className='icon-white'/>
          {/* <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span> */}
        </button>
        {/* menu cart */}
        <MenuCart
          cartData={cartData}
          deleteFromCart={deleteFromCart}
        />

      </div>
      <div className="same-style cart-wrap  d-none">
        <Link className="icon-cart" href={"/cart"}>
          <>
            {/* <i className="pe-7s-shopbag" /> */}
            <Bag/>
            {/* <span className="count-style">
              {cartData && cartData.length ? cartData.length : 0}
            </span> */}
          </>
        </Link>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  cartData: PropTypes.array,
  compareData: PropTypes.array,
  iconWhiteClass: PropTypes.string,
  deleteFromCart: PropTypes.func,
  wishlistData: PropTypes.array
};

const mapStateToProps = state => {
  return {
    cartData: state.cartData,
    wishlistData: state.wishlistData,
    compareData: state.compareData,
    isLogged: state.isLogged
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
    destroySession: () => {
      dispatch({ type: DESTROY_SESSION });
    }
  };
};

export default (IconGroup);
