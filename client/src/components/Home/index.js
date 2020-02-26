import React, { useEffect } from "react";
import HomeSlider from './home_slider';
import HomePromotion from "./home_promotion";
import CardBlock from '../utils/card_block';

import {connect, useDispatch} from 'react-redux';
import {getProductsByArrival, getProductsBySell} from '../../actions/products_actions';

function Home({products}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsBySell());
    dispatch(getProductsByArrival());
  },[]);

  return (
    <div>
      <HomeSlider/>
      <CardBlock 
      list={ products.bySell }
      title="best selling guitars"
      />
      <HomePromotion/>
  </div>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Home);
