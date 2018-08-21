import React from 'react'
import { NavLink } from 'react-router-dom'
import SvgIcon from 'react-icons-kit'
import './NavigationItem.css'

const NavigationItem = ({ to, text, icon, disabled, onClick }) => disabled
  ? (
    <div onClick={onClick} className='NavigationItem'>
      <SvgIcon size={20} icon={icon} />
      <span>{text}</span>
    </div>
  )
  : (
    <NavLink className='NavigationItem' to={to} exact>
      <SvgIcon size={20} icon={icon} />
      <span>{text}</span>
    </NavLink>
  )

export default NavigationItem
