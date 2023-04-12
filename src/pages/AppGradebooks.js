import React, { useEffect, useState } from "react";
import { performGetAllGradebooks } from "../store/gradebooks/slice";
import { useDispatch, useSelector } from "react-redux";
import {
  gradebooksSelector,
  currentTotalGradebookCountSelector,
} from "../store/gradebooks/selectors";
import GradebooksList from "../components/gradebooks/GradebooksList";
import FilterForm from "../components/FilterForm";

export default function AppGradebooks() {
  const dispatch = useDispatch();
  const [gbFetchParams, setGbFetchParams] = useState({
    loadCount: 10,
    filterParameter: "",
  });
  const gradebooks = useSelector(gradebooksSelector);
  const current_and_total_gradebook_count = useSelector(
    currentTotalGradebookCountSelector
  );

  useEffect(() => {
    handleGetGradebooks();
  }, []);

  const handleGetGradebooks = async (fetchParams = gbFetchParams) => {
    dispatch(performGetAllGradebooks(fetchParams));
  };

  const handleLoadMore = async () => {
    const fetchParams = {
      ...gbFetchParams,
      loadCount: gbFetchParams.loadCount + 10,
    };
    await handleGetGradebooks(fetchParams);
    setGbFetchParams(fetchParams);
  };

  return (
    <div className="Center">
      <h1>Gradebooks</h1>
      <br />
      <label>Filter By Term In Gradebook Name: </label>
      <FilterForm
        fetchParams={gbFetchParams}
        setFetchParams={setGbFetchParams}
        handleGetData={handleGetGradebooks}
        defaultLoadCount={10}
      />

      {!(gradebooks.length === 0) ? (
        <GradebooksList gradebooks={gradebooks} />
      ) : (
        <p className="redLabel">No Available Gradebooks</p>
      )}

      {current_and_total_gradebook_count[0] < //proveravam da li je trenutni broj gradebook-a manji od ukupnog, na indeksu 0 je trenutni, na 1 ukupni broj
      current_and_total_gradebook_count[1] ? (
        <button onClick={handleLoadMore} className="LoadButton">
          Load More
        </button>
      ) : (
        <div className="TotalNumGradebooks">
          Total Gradebooks: {current_and_total_gradebook_count[1]}
        </div>
      )}
    </div>
  );
}
