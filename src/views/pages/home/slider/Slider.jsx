import React from 'react';
import './slider.scss';
import { useQuery } from 'react-query';
import SliderItem from './sliderItem/SliderItem';
import collectionApi from '../../../../api/apiCollection';
import Loading from '../../../components/loading/Loading';

const Slider = () => {
  const { isLoading, data } = useQuery(['collections'], collectionApi.getCollections);

  return (
    <div id="slider">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="warpper">
          {data?.map((collection, index) => {
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
