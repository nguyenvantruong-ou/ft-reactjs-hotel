import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import "./Carousel.css"

export default class CarouselHome extends Component {
    render() {
        return (
            <Carousel>  
                <div className='carousel-div' >
                    <img style={{height: "1250px"}} src="https://danangfantasticity.com/wp-content/uploads/2022/06/le-khai-truong-khach-san-mikazuki-khong-gian-nghi-duong-chuan-nhat-dau-tien-tai-da-nang.jpg" />
                  
                </div>
                <div>
                    <img style={{height: "1250px"}} src="https://owa.bestprice.vn/images/articles/uploads/top-10-khach-san-vung-tau-gan-bien-gia-cuc-tot-5e8ab67a3d55a.jpg" />
                    
                </div>
                <div>
                    <img style={{height: "1250px"}} src="https://cf.bstatic.com/xdata/images/xphoto/max1440/48352050.jpg?k=dd56d49759acf4be8a6f93510e035de42fb7329234a48b06686aad08ee72841a&o=" />
                </div>
            </Carousel>
        );
    }
};