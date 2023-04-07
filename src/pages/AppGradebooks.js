import React, { useEffect } from "react";
import { performGetAllGradebooks } from "../store/gradebooks/slice";
import { useDispatch, useSelector } from "react-redux";
import { gradebooksSelector } from "../store/gradebooks/selectors";

export default function AppGradebooks() {
  const dispatch = useDispatch();

  const gradebooks = useSelector(gradebooksSelector);

  useEffect(() => {
    handleGetGradebooks();
  }, []);

  const handleGetGradebooks = async () => {
    dispatch(performGetAllGradebooks());
  };

  const selectorTest = () => {
    console.log(gradebooks);
  };

  return (
    <div>
      <p>AppGradebooksPageTest</p>
      <button onClick={selectorTest}>Selector Test</button>
    </div>
  );
}
