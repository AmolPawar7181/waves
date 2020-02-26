import React,{useEffect} from "react";
import Header from "../components/Header_Footer/Header";
import Footer from "../components/Header_Footer/Footer";

import {connect, useDispatch} from 'react-redux';
import {getSiteData} from '../actions/site_actions';

function Layout({ children, site }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if(Object.keys(site).length === 0){
      dispatch(getSiteData());
    }

  },[]);

  return (
    <div>
      <Header></Header>
      <div className="page_container">{children}</div>
      <Footer data={site}></Footer>
    </div>
  );
}

function mapStateToProps(state) {
  return { site: state.site };
} 
export default connect(mapStateToProps)(Layout);
