import React from 'react';
import { DataItem } from './DataItem'
import '../css/data.css';

export const Data = ({schedule}) => {
    const sortedItem = schedule.sort((a, b)=>{
        return a.timeToStation - b.timeToStation;
    });
    const itemsArray = sortedItem.map((dataHash, index) => {
        return (
            <DataItem key={index} item={dataHash}/>
        )
    });
    return (
        <div className='data'>
            {itemsArray}
        </div>
    )
}