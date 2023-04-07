import React from "react";

export default function FilterForm({gbFetchParams, setGbFetchParams, handleGetGradebooks}) {

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const fetchParams = { ...gbFetchParams, nextLoadCount: 10 }; // Ovo sam dodao jer hocu da mi uvek pocinje sa 10 dnevnika kada se klikne na filter (cak i kada je input ne promenjen)
        handleGetGradebooks(fetchParams);
        setGbFetchParams(fetchParams);
      };

  return (
    <div className="Center">
      <div className="FilterGradebooksDiv">
        <form onSubmit={handleSubmit}>
          <label>Filter: </label>
          <input
            placeholder="Your Filter Term"
            type="text"
            value={gbFetchParams.filterParameter}
            onChange={(e) => {
                setGbFetchParams({ ...gbFetchParams, filterParameter: e.target.value });
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
