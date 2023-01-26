import './Menu.css'
import React from 'react'
import HyperButton from '../HyperButton/HyperButton'
import SearchInput from '../SearchInput/SearchInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Burger from '../Burger/Burger'
import {useGlobalState} from "../../utils/globalState";
import Hyper from "../Hyper/Hyper";

const Menu = ()=> {
    let [maxHeight, setMaxHeight] = React.useState('0px')
    const dropdownRef = React.useRef()
    const [logedin] = useGlobalState('login')
    const [burgerOpen, setBurgerOpen] = React.useState(false)
    function handleBurgerClick(){
        if(maxHeight === '0px')
        {
            setMaxHeight('100vh')
        }
        else{
            setMaxHeight('0px')
        }

    }
    function hideMenu(){
        setBurgerOpen(false)
        setMaxHeight('0px')
    }
    return(
        <nav className='menu-element'>
            <div className='top'>
                <div className="logo">
                    <HyperButton font={20} to="/" color="transparent"><span className="icon"></span>ODRABIAMY </HyperButton>
                </div>

                <SearchInput placeholder="Szukaj ..."/>
                <div className='buttons'>
                    {
                        logedin ?
                            <>
                                <HyperButton hoverEffect="true" lcolor="white" onClick={hideMenu} to="/logout" color="transparent">WYLOGUJ</HyperButton>
                                <Hyper className="userIcon" font={20} lcolor="white" onClick={hideMenu} to="/account" color="transparent"><FontAwesomeIcon icon={faUser}/></Hyper>
                            </>
                            :
                            <>
                                <HyperButton hoverEffect="true" lcolor="white" onClick={hideMenu} to="/login" color="transparent">LOGOWANIE</HyperButton>
                                <HyperButton hoverEffect="true" lcolor="white" onClick={hideMenu} to="/register" color="transparent">REJESTRACJA</HyperButton>
                            </>
                    }
                </div>
                <Burger onClick={handleBurgerClick} setOpen={setBurgerOpen} open={burgerOpen}/>
            </div>
            <div className='dropdown' ref={dropdownRef} style={{maxHeight: maxHeight}}>
               <HyperButton onClick={hideMenu} color='transparent' lcolor="white" to="/task/1" hoverEffect="true" textTransform="uppercase">Zadania</HyperButton>
               <HyperButton onClick={hideMenu} color='transparent' lcolor="white" to="/news" hoverEffect="true" textTransform="uppercase">Nowości</HyperButton>
               <HyperButton onClick={hideMenu} color='transparent' lcolor="white" to="/account" hoverEffect="true" textTransform="uppercase">Konto</HyperButton>
                {
                    logedin ?
                         <HyperButton onClick={hideMenu} color='transparent' lcolor="white" to="/logout" hoverEffect="true" textTransform="uppercase">Wyloguj</HyperButton>
                        :
                        <>
                            <HyperButton onClick={hideMenu} color='transparent' lcolor="white" to="/login/" hoverEffect="true" textTransform="uppercase">Logowanie</HyperButton>
                            <HyperButton onClick={hideMenu} color='transparent' lcolor="white" to="/register/" hoverEffect="true" textTransform="uppercase">Rejestracja</HyperButton>
                        </>
                }
            </div>
        </nav>
    )
}

export default Menu
