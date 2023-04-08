import React from "react";

export default function FilterForm({fetchParams, setFetchParams, handleGetData, defaultLoadCount}) {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const fetchParamsReady = { ...fetchParams, loadCount: defaultLoadCount }; // Ovo sam dodao jer hocu da mi uvek pocinje sa 10 dnevnika kada se klikne na filter (cak i kada je input ne promenjen)
        handleGetData(fetchParamsReady);
        setFetchParams(fetchParamsReady);
      };

  return (
    <div className="Center">
      <div className="FilterGradebooksDiv">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="text"
            type="text"
            value={fetchParams.filterParameter}
            onChange={(e) => {
                setFetchParams({ ...fetchParams, filterParameter: e.target.value });
            }}
            minLength="1"
            //required
          />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}
