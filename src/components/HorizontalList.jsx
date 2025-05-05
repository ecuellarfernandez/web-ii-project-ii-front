// src/components/HorizontalList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import GeneralCard from './GeneralCard';

const HorizontalList = ({ items = [], getTitle, getImage, getSubtitle, getLink }) => {

  return (
    <div className="relative">
      <div className="flex gap-4 overflow-x-auto pb-2 pr-4">
        {items.map((item, i) => {
          const title = getTitle?.(item);
          const image = getImage?.(item);
          const link = getLink?.(item);
          const subtitle = getSubtitle?.(item);

          return (
            <div key={i} className="min-w-[240px]">
              <Link to={link || '#'}>
                <GeneralCard
                  image={image}
                  title={title}
                  subtitle={subtitle}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalList;