import React from 'react';
import location from '../img/location.png'

export const DataItem = ({item}) => {
    const timeToStation = Math.ceil(item.timeToStation/60);
    return (
        <div className='data__item'>
            <div className='data__item__time'>
                <div className='data__item__time__num'>{item.timeToStation / 60 < 1 ? '<' : ''}{timeToStation}</div>
                <div className='data__item__time__min'>{item.timeToStation / 60 <= 1 ? 'min' : 'mins'}</div>
            </div>
            <div className='data__item__text'>
                <p className='data__item__text__title'>{item.towards}</p>
                <p className='data__item__text__description'>{item.direction}</p>
                <p className='data__item__text__prop'>Platform: {item.platformName}</p>
                <p className='data__item__text__prop'><img src={location} alt='location'/>{item.currentLocation}</p>
                <p className='data__item__text__prop'>Arrival: {item.expectedArrival.slice(11, -1)}</p>
            </div>
        </div>
    )
};