import {createSelector} from "reselect";
import directoryReducer from "./directory.reducer";

const selectDirectory = state => state.directory;

export const selectDirectorySection = createSelector(
  [selectDirectory],
  directory => directory.sections
);

