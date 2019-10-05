import React from 'react';
import styled from "styled-components";

import { error } from "../styles";

const Error = styled.div`
    color: ${error};
    font-size: 2rem;
`;

const Alerts = ({ error: { message } }) => {
    return (
        <Error>
            <i className='fas fa-info-circle' /> {message}
        </Error>
    );
};

export default Alerts;
