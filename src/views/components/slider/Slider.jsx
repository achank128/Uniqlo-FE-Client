import React from 'react';
import './slider.scss';
import SliderItem from './sliderItem/SliderItem';
import { collectionApi } from '../../../api/apiCollection';
import { useQuery } from 'react-query';
import Loading from '../loading/Loading';

const Slider = () => {
  const { isLoading, data } = useQuery(['collections'], collectionApi.getCollections);

  return (
    <div id="slider">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="warpper">
          {data.map((collection, index) => {
            return (
              <SliderItem
                key={collection.id}
                collection={collection}
                collections={data}
                sliderIndex={index}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Slider;
