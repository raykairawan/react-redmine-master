import React from 'react';
import PropTypes from 'prop-types';
import SearchInput from '../../components/SearchInput/SearchInput';
import AddLinkButton from '../../components/AddLinkButton/AddLinkButton';

const ProjectList = () => {
  return (
    <section>
      <div className="d-flex align-items-md-center gap-4 flex-column flex-md-row">
        <SearchInput placeHolderName="cari Proyek" />
        <AddLinkButton />
      </div>
    </section>
  );
};

export default ProjectList;