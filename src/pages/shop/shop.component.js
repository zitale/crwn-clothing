import React from "react";

import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import { useLocation, Route, Routes} from "react-router-dom";
import CollectionPage from "../collection/collection.component";

const ShopPage = () => {
  return (
    <div className='shop-page'>
      <Routes>
        <Route exact path={``} element={<CollectionOverview/>}/>
        <Route path={`:collectionId`} element={<CollectionPage/>}/>
      </Routes>
    </div>
  )
}
export default ShopPage;