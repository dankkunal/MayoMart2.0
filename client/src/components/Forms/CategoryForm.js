import React from "react";

const CategoryForm = (props) => {
  return (
    <>
      <form onSubmit={props.handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Enter new Category name"
            className="form-control"
            value={props.value}
            onChange={(e) => props.setValue(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
