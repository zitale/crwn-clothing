import React from "react";

import MenuItem from "../../components/menu-item/menu-item.component";
import {connect} from "react-redux";

import "./directory.style.scss"
import {createStructuredSelector} from "reselect";
import {selectDirectorySection} from "../../redux/directory/directory.selector";

const Directory = ({sections}) => (
  <div className='directory-menu'>
      {
          sections.map( ({id, ...otherSectionProps}) =>
              (<MenuItem key={id} {...otherSectionProps} />
              )
          )
      }
  </div>
)

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySection
})


export default connect(mapStateToProps)(Directory);