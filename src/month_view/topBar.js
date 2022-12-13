/**
 * @file This file renders and handles the top bar of the calendar (navigating between months)
 * Note: All dates are moment objects
 * @author Alwyn Tan
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { COLORS, fadeIn } from './constants';

import PrevArrow from './images/prev.svg';
import NextArrow from './images/next.svg';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  > * {
    margin-bottom: 5%;
    margin-top: 3%;
  }

  > img {
    user-select: none;
    cursor: pointer;
    color: ${COLORS.gray};
    transition: 0.5s ease all;
    margin-left: 5px;
    margin-right: 5px;
	  height: 25px;
    width: 25px;
    filter: drop-shadow(1px 0 0 black) drop-shadow(0 1px 0 black) drop-shadow(0 -1px 0 black) drop-shadow(-1px 0 0 black);
    -webkit-filter: drop-shadow(1px 0 0 #000) drop-shadow(0 1px 0 #000) drop-shadow(0 -1px 0 #000) drop-shadow(-1px 0 0 #000);
  }

  > img:hover {
    filter: brightness(0);
  }

  > span {
    font-size: 1.35em;
    color: #424242;
    animation: ${fadeIn} 0.5s ease;
  }
`;

export default class TopBar extends Component {
  static propTypes = {
    date: PropTypes.instanceOf(moment).isRequired,
    onPrevClick: PropTypes.func,
    onNextClick: PropTypes.func,
    titleTextStyle: PropTypes.object,
    flag: PropTypes.string
  };

  static defaultProps = {
    onPrevClick: () => { },
    onNextClick: () => { }
  };

  render() {
    const { date, onPrevClick, onNextClick, titleTextStyle, flag } = this.props;
    return (
      <Container>
        <img src={PrevArrow} onClick={onPrevClick} alt="previous month" />
        <span key={date.format()} style={titleTextStyle}>
          <span className={flag}></span>{" "}{date.format('MMMM YYYY').toUpperCase()}{" "}
        </span>
        <img src={NextArrow} onClick={onNextClick} alt="next month" />
      </Container>
    );
  }
}
