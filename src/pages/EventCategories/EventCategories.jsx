import React from 'react';
import SearchInput from '../../components/SearchInput/SearchInput';
import AddLinkButton from '../../components/AddLinkButton/AddLinkButton';

const EventCategories = () => {
  return (
    <section>
      <div className="d-flex align-items-md-center gap-4 flex-column flex-md-row">
        <SearchInput placeHolderName="cari Kategori Event" />
        <AddLinkButton />
      </div>
    </section>
  );
};

export default EventCategories;