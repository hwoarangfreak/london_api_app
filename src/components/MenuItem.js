import React from 'react';
import '../css/menu.css'
import { Dropdown } from './Dropdown'

export const MenuItem = ({ tail_or_head, isSelected, title, onChooseDropdown, listDropdown, defaultDropdown }) => {
    return (
        <div className={`menu-item ${tail_or_head} ${isSelected ? 'red' : 'green'}`}>
            <div className='menu-item__title'>{title}</div>
            <Dropdown onChoose={onChooseDropdown} list={listDropdown} default={defaultDropdown}/>
        </div>
    )
};