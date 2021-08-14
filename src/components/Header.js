import styled from "styled-components";
import {provider, auth} from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {selectUserName, selectUserPhoto, setSignOutState, setUserLoginDetails} from "../features/users/userSlice";
import {useEffect} from "react";

const Header = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const username = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if(user) {
                setUser(user);
                history.push("/home");
            }
        });
    }, [username]);

    const handleAuth = () => {
        if (!username) {
            auth.signInWithPopup(provider).then((result) => {
                setUser(result.user);
            }).catch((error) => {
                console.log(error.message);
            })
        } else if (username) {
            auth.signOut().then(() => {
                dispatch(setSignOutState());
                history.push('/');
            }).catch((error) => {
                console.log(error.message);
            })
        }
    }

    const setUser = (user) => {
        dispatch(
            setUserLoginDetails({
                name:user.displayName,
                email:user.email,
                photo:user.photoURL,
            })
        )
    };

    return(
        <Nav>
            <Logo>
                <img src="/images/logo.svg" alt="Disney" />
            </Logo>

            {
                !username ?
                    <LoginButton onClick={handleAuth}>LOGIN</LoginButton>
                    :
                    <>

            <NavMenu>
                <a href="/home">
                    <img src="/images/home-icon.svg" alt="Home"/>
                    <span>HOME</span>
                </a>

                <a href="/search">
                    <img src="/images/search-icon.svg" alt="Search"/>
                    <span>SEARCH</span>
                </a>

                <a href="/watchlist">
                    <img src="/images/watchlist-icon.svg" alt="Watchlist"/>
                    <span>WATCHLIST</span>
                </a>

                <a href="/originals">
                    <img src="/images/original-icon.svg" alt="Originals"/>
                    <span>ORIGINALS</span>
                </a>

                <a href="/movies">
                    <img src="/images/movie-icon.svg" alt="Movies"/>
                    <span>MOVIES</span>
                </a>

                <a href="/series">
                    <img src="/images/series-icon.svg" alt="Series"/>
                    <span>SERIES</span>
                </a>

            </NavMenu>
                        <SignOut>
                            <UserImage src={userPhoto} alt={username} />
                            <Dropdown>
                                <span onClick={handleAuth}>Sign Out</span>
                            </Dropdown>
                        </SignOut>
                    </>
            }
        </Nav>
    );
};

// Styles

const Nav = styled.nav`
  position:fixed;
  top:0;
  left:0;
  right:0;
  height:70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 1.6px;
  z-index: 3;
`

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top:4px;
  max-height: 70px;
  display: inline-block;
  
  img {
    display: block;
    width: 100%;
  }
`

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0 auto 0 25px;
  padding: 0;
  position: relative;
  
  a{
    display: flex;
    align-items: center;
    padding: 0 12px;

    &:hover {
      span:before {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }
  
  img {
    height:20px;
    min-height: 20px;
    width:20px;
    z-index: auto;
  }
  
  span {
    color:rgb(249,249,249);
    font-size:14px;
    letter-spacing: 1.4px;
    line-height: 1.08;
    padding: 2px 0;
    white-space: nowrap;
    position:relative;

    &:before{
      content:'';
      background-color: rgba(249,249,249);
      border-radius:0 0 4px 4px;
      bottom:-6px;
      height: 2px;
      opacity: 0;
      position:absolute;
      right:0;
      left:0;
      transform-origin: left center;
      transform: scaleX(0);
      transition: all .3s cubic-bezier(0.25, 0.45, 0.45, 0.95) 0s;
      width: auto;
    }
  }
  
  
  
  @media (max-width: 768px) {
    display: none;
  }
  
`

const LoginButton = styled.a`
  background-color: transparent;
  border:1px solid #f9f9f9;
  color:#f9f9f9;
  padding:8px;
  border-radius: 4px;
  transition: all .3s ease-out;
  cursor: pointer;
  
  &:hover {
    background-color: #f9f9f9;
    color:#040714;
  }
`

const UserImage = styled.img`
  height:45px;
  width:45px;
  border-radius: 50%;
`

const Dropdown = styled.div`
  position:absolute;
  top:58px;
  right:11px;
  background-color: #191919;
  border:1px solid #f9f9f9;
  border-radius: 4px;
  padding:5px;
  text-transform: uppercase;
  font-size:14px;
  cursor: pointer;
  transition: all .3s ease-out;
  opacity:0;
  
  &:hover {
    background-color: #f9f9f9;
    color:#040714;
  }
`

const SignOut = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    ${Dropdown} {
      opacity: 1;
    }
  }
`
export default Header;

