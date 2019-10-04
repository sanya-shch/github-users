import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import UserItem from './UserItem';
import Preloader from '../layout/Preloader';
import { getUsers } from '../../actions/userActions';
import { fontFamily, fontSize, gray2, accent1 } from '../styles';

const Container = styled.div`
  width: 50rem;
  margin: 1rem auto;
  font-family: ${fontFamily};
  font-size: ${fontSize};
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

const Users = ({ user: { users, loading }, getUsers }) => {

    useEffect(() => {
        getUsers();
    }, []);

    if (loading || users === null) {
        return <Preloader/>;
    }

    return (
        <Container>
            <h1>Top Github Users</h1>
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
