import React, { useEffect, useState } from "react";
import { performGetAllGradebooks } from "../store/gradebooks/slice";
import { useDispatch, useSelector } from "react-redux";
import {
  gradebooksSelector,
  currentTotalGradebookCountSelector,
} from "../store/gradebooks/selectors";
import GradebooksList from "../components/gradebooks/GradebooksList";

export default function AppGradebooks() {
  const dispatch = useDispatch();

  const gradebooks = useSelector(gradebooksSelector);
  const current_and_total_gradebook_count = useSelector(
    currentTotalGradebookCountSelector
  );
  const [nextLoadCount, setNextLoadCount] = useState(10);

  useEffect(() => {
    handleGetGradebooks();
  }, []);

  const handleGetGradebooks = async () => {
    dispatch(performGetAllGradebooks(nextLoadCount));
    setNextLoadCount(nextLoadCount + 10);
  };

  const handleLoadMore = async () => {
    await handleGetGradebooks();
    console.log(current_and_total_gradebook_count);
  };

  return (
    <div className="Center">
      <GradebooksList gradebooks={gradebooks} />

      {current_and_total_gradebook_count[0] <  //proveravam da li je trenutni broj gradebook-a manji od ukupnog, na indeksu 0 je trenutni, na 1 ukupni broj
      current_and_total_gradebook_count[1] ? (
        <button onClick={handleLoadMore} className="LoadButton"> Load More </button>
      ) : (
        ""
      )}
    </div>
  );
}
