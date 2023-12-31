import React from 'react'
import ReactLoading from 'react-loading';
import './Style.scss';
import Container from '../Container/Container';

const Spinner = () => {
    return (
        <div className='loader'>
            <ReactLoading type='spin' color='darkBlue' />
            <h2>Working on it...</h2>
        </div>

    )
}

export default Spinner
