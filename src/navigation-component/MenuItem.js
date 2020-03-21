import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Item = styled.li`
  margin-left: 2rem;

  &.disabled {
    & > a {
      user-select: none;
      pointer-events: none;
      color: #d6d6d6;
    }
  }
`;

const ItemLink = styled(Link)`
  text-decoration: none;
  color: #2b2b2b;
  transition: all .1s ease-in-out;

  &:hover,
  &:active,
  &:focus,
  &.current {
    color: #706fd3;
    outline: none;
  }
`;

const MenuItem = ({ href, title, rel, handleClick, status, name, disabled }) => {
  return (
    <Item className={disabled ? 'disabled' : ''}>
      <ItemLink className={status === rel ? 'current' : ''} to={href} title={title} rel={rel} onClick={handleClick}>{name}</ItemLink>
    </Item>
  );
}

export default MenuItem;