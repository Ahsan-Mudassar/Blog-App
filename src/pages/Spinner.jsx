import React from 'react';
import loading from '../assets/loading.jpg';
export default function Spinner() {
    return (
        <div className='flex justify-center my-10'>
            <img src={loading} alt="loading" />
        </div>
    )
}