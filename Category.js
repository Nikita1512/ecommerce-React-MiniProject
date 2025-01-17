import React from 'react';

export default function Category({ finalCategory, setCatname }) {
  // Check if finalCategory is an array
  if (!Array.isArray(finalCategory)) {
    return <div>Loading categories...</div>;
  }

  // Map through the category array and render the list
  const categories = finalCategory.map((category, index) => (
    <li
      key={index}
      className="bg-[#ccc] p-[7px] cursor-pointer text-[20px] font-serif font-[500] mb-2"
      onClick={() => setCatname(category.slug)} // Pass the correct category slug for filtering
    >
      {category.name} {/* Use category.name if your category object has this structure */}
    </li>
  ));

  return (
    <div>
      <h3 className="text-[25px] font-[500] p-[10px]">Product Category</h3>
      <ul>{categories}</ul>
    </div>
  );
}
