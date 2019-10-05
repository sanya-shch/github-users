import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import UserItem from './UserItem';
import Preloader from '../layout/Preloader';
import { getUsers } from '../../actions/userActions';
import { fontFamily, gray2, accent1 } from '../styles';

const Container = styled.div`
  width: 50rem;
  margin: 1rem auto;
  font-family: ${fontFamily};
  color: ${gray2};
`;

const List = styled.ul`
  list-style: none;
  padding: 1rem;
  background-color: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top: 3px solid ${accent1};
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
`;

const Input = styled.input`
    background: transparent;
    border: 0;
    border-bottom: solid 2px ${gray2};
    margin-right: 1rem;
    letter-spacing: 2px;
    width: 10rem;
    font-size:30px;
    outline: none;
`;

const Button = styled.button`
    border: solid 2px ${gray2};
    background: transparent;
    padding: 0.4rem;
    margin: 0;
    border-radius: 1px;
    font-size: 1rem;
    text-transform: uppercase;
    :focus {
        outline: none;
    }
`;

const Users = ({ user: { users, loading }, getUsers }) => {

    const [city, setCity] = useState('Kyiv');
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        getUsers(city);
    }, []);

    if (loading || users === null) {
        return <Preloader/>;
    }

    const onClickBtn = () => {
        setOpen(false);
        getUsers(city);
    };

    return (
        <Container>
            <h1>
                Top Github Users in
                {
                    isOpen
                        ? <span>
                            {' '}
                            <Input type='text' onChange={e => setCity(e.target.value)} placeholder={city}/>
                            <Button onClick={onClickBtn}>Submit</Button>
                        </span>
                        : <span onClick={() => setOpen(true)}>{` ${city}`}</span>
                }
            </h1>

            <List>
                {!loading && users.length === 0 ? (
                    <p>No users to show...</p>
                ) : (
                    users.map(user => <UserItem user={user} key={user.id} />)
                )}
            </List>
        </Container>
    );
};

Users.propTypes = {
    user: PropTypes.object.isRequired,
    getUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(
    mapStateToProps,
    { getUsers }
)(Users);
