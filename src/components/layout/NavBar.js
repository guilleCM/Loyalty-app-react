import React from 'react';

import { Toolbar, BackButton } from 'react-onsenui';

const NavApp = ({ title, navigator, backButton }) => (
    <Toolbar modifier='custom'>
        <div className='left'>
            {backButton ? 
                <BackButton modifier="material custom-back-btn" onClick={() => navigator.popPage()}>
                    Back
                </BackButton> 
            : 
            null}
        </div>
        <div className='center'>
            <strong className="navbar-title">
                {title}
            </strong>
        </div>
    </Toolbar>
);

export default NavApp;