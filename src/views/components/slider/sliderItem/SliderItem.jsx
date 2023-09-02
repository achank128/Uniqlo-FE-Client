import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const SliderItem = ({ collection, collections, sliderIndex }) => {
  const { id, collectionPosts } = collection;
  return (
    <div className="slider-item" key={id}>
      <div className="slider-controls-item">
        {collections.map((slide, i) => {
          if (i === sliderIndex) {
            return <div className="item active" key={i}></div>;
          } else {
            return <div className="item" key={i}></div>;
          }
        })}
      </div>
      <div className="slider-overlay"></div>

      <Swiper
        slidesPerView={1}
        pagination={{
          dynamicBullets: true,
        }}
        navigation={true}
        loop={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {collectionPosts.map((post, indexSlide) => {
          if (post.type === 'VIDEO') {
            return (
              <SwiperSlide className="slide" key={indexSlide}>
                <div className="slide-img">
                  <video loop autoPlay muted>
                    <source src={post.imageUrl} type="video/mp4" />
                  </video>
                </div>
                <div className={indexSlide === 2 ? 'slide-info-right' : 'slide-info-left'}>
                  <div className="slide-title">{post.title}</div>
                  <p className="slide-desc">{post.description}</p>
                  <Link to="/product-list/ALL">
                    <button className="slide-btn">VIEW MORE</button>
                  </Link>
                </div>
              </SwiperSlide>
            );
          }
          return (
            <SwiperSlide className="slide" key={indexSlide}>
              <div className="slide-img">
                <img src={post.imageUrl} alt="" />
              </div>
              <div className={indexSlide === 2 ? 'slide-info-right' : 'slide-info-left'}>
                <div className="slide-title">{post.title}</div>
                <p className="slide-desc">{post.description}</p>
                <Link to={`/products?collection=${collection.id}`}>
                  <button className="slide-btn">VIEW MORE</button>
                </Link>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SliderItem;
