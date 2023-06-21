import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { COLORS, fadeIn } from './constants';

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
    const PrevArrow =
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="25" height="25" x="0" y="0" viewBox="0 0 55.752 55.752" xmlSpace="preserve" onClick={onPrevClick} alt="previous month" className='cal_button clicky'>
        <g transform="matrix(-1,0,0,1.0000000000000002,55.752359390258775,1.4210854715202004e-14)">
          <g xmlns="http://www.w3.org/2000/svg">
            <path d="M43.006,23.916c-0.28-0.282-0.59-0.52-0.912-0.727L20.485,1.581c-2.109-2.107-5.527-2.108-7.637,0.001   c-2.109,2.108-2.109,5.527,0,7.637l18.611,18.609L12.754,46.535c-2.11,2.107-2.11,5.527,0,7.637c1.055,1.053,2.436,1.58,3.817,1.58   s2.765-0.527,3.817-1.582l21.706-21.703c0.322-0.207,0.631-0.444,0.912-0.727c1.08-1.08,1.598-2.498,1.574-3.912   C44.605,26.413,44.086,24.993,43.006,23.916z" fill="#ffffff" data-original="#000000" />
          </g>
        </g>
      </svg>

      const NextArrow =
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="25" height="25" x="0" y="0" viewBox="0 0 55.752 55.752" xmlSpace="preserve" onClick={onNextClick} alt="next month" className='cal_button clicky'>
        <g transform="matrix(1,0,0,1.0000000000000002,-1.0658141036401503e-14,1.4210854715202004e-14)">
          <g xmlns="http://www.w3.org/2000/svg">
            <path d="M43.006,23.916c-0.28-0.282-0.59-0.52-0.912-0.727L20.485,1.581c-2.109-2.107-5.527-2.108-7.637,0.001   c-2.109,2.108-2.109,5.527,0,7.637l18.611,18.609L12.754,46.535c-2.11,2.107-2.11,5.527,0,7.637c1.055,1.053,2.436,1.58,3.817,1.58   s2.765-0.527,3.817-1.582l21.706-21.703c0.322-0.207,0.631-0.444,0.912-0.727c1.08-1.08,1.598-2.498,1.574-3.912   C44.605,26.413,44.086,24.993,43.006,23.916z" fill="#ffffff" data-original="#000000"/>
          </g>
        </g>
      </svg>
    return (
      <>
      <Container>
        {PrevArrow}
        <span key={date.format()} style={titleTextStyle}>
          <span className={flag}></span>{" "}{date.format('MMMM YYYY').toUpperCase()}{" "}
        </span>
        {NextArrow}
      </Container>
      </>
    );
  }
}
