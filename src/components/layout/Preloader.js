import React, {Fragment} from 'react';
import styled from "styled-components";

import spinner from './spinner.gif';

const Spinner = styled.img`
   width: 200px;
   margin: auto;
   display: block;
`;

const Preloader = () => {
    return (
        <Fragment>
            {/*<div>Loading...</div>*/}
            <Spinner src={spinner} alt="Loading..." />
        </Fragment>
    );
};

export default Preloader;
