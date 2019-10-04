import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import Moment from 'react-moment';

import { gray2, gray3, gray5, link } from "../styles";

const ListItem = styled.li`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;
    border-top: 1px solid ${gray5};
    :first-child {
        border-top: none;
    }
`;

const Img = styled.img `
    width: 5rem;
    height: 5rem;
    border-radius: 10px;
`;

const TextContainer = styled.span `
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0;
    padding: 0;
    margin-left: 1rem;
    width: 70%;
`;

const NameContainer = styled.span `
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 0;
`;

const Link = styled.a`
    text-decoration: none;
    color: ${link};
    font-size: 1.5em;
    margin-right: 0.5rem;
`;

const Name = styled.span`
    font-size: 1.5em;
`;

const Info = styled.p `
    color: ${gray3};
    i {
        margin-right: 0.5rem;
    }
    span {
        margin-left: 0.5rem;
    }
`;

const Text = styled.p `
    margin-top: 0.5rem;
    color: ${gray2};
`;

const UserItem = ({ user }) => {

    const {
        avatar_url,
        bio,
        created_at,
        email,
        followers,
        following,
        html_url,
        location,
        login,
        name,
        public_repos,
        stars
    } = user;

    return (
        <ListItem>
            <Img alt="user-image" src={avatar_url}/>

            <TextContainer>
                <NameContainer>
                    <Link target="_blank" href={html_url}>
                        {login}
                    </Link>
                    <Name>{name}</Name>
                </NameContainer>

                <Text>{bio}</Text>

                <span>
                    <Info>on the github since <Moment format='DD MMMM YYYY'>{created_at}</Moment></Info>

                    <Info>
                        <i className="fas fa-map-marker-alt"/>{location}
                        {email && <span><i className="far fa-envelope"/>{email}</span>}
                    </Info>
                </span>
            </TextContainer>

            <div>
                <Info>Followers: {followers}</Info>
                <Info>Following: {following}</Info>
                <Info>Repos: {public_repos}</Info>
                <Info>Stars: {stars}</Info>
            </div>
        </ListItem>
    );
};

UserItem.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserItem;
