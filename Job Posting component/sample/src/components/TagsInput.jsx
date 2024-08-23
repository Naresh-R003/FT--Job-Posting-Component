import React, { useRef, useState, useEffect } from 'react';
import Icons from './Icons';

const TagsInput = ({ tags, selectedTags, onSelectedTagsChange }) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(selectedTags || []);
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef(null);

  // Update the parent component whenever the selected tags change
  useEffect(() => {
    onSelectedTagsChange(selected);
  }, [selected, onSelectedTagsChange]);

  // Synchronize the selected tags with props changes
  useEffect(() => {
    setSelected(selectedTags || []);
  }, [selectedTags]);

  // Filter the available tags based on the query
  const filteredTags = tags.filter(
    (item) =>
      item.toLowerCase().includes(query.toLowerCase().trim()) &&
      !selected.includes(item)
  );

  // Determine if the current query is disabled for addition
  const isDisable = !query.trim() || selected.includes(query.trim());

  const handleTagClick = (tag) => {
    setSelected((prevSelected) => [...prevSelected, tag]);
    setQuery("");
    inputRef.current?.focus(); // Focus back on the input field after selecting a tag
  };

  const handleRemoveTag = (tag) => {
    setSelected((prevSelected) => prevSelected.filter((item) => item !== tag));
  };

  const handleFocus = () => {
    setMenuOpen(true);
  };

  const handleBlur = () => {
    // Delay closing the menu to allow click on menu items
    setTimeout(() => setMenuOpen(false), 100);
  };

  const handleAddTag = () => {
    if (!isDisable && query.trim()) {
      setSelected((prev) => [...prev, query.trim()]);
      setQuery("");
      inputRef.current?.focus(); // Focus back on the input field after adding a tag
    }
  };

  return (
    <div className="tags-input-container">
      <div className="relative w-80 text-sm">
        {/* Display selected tags */}
        {selected?.length > 0 && (
          <div className="bg-[#eef1f8] w-80 relative text-xs flex flex-wrap gap-1 p-2 mb-2">
            {selected.map((tag) => (
              <div
                key={tag}
                className="rounded-half w-fit py-1.5 px-3 border border-gray-400 bg-gray-50 text-gray-500 flex items-center gap-2"
              >
                {tag}
                <div
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleRemoveTag(tag)}
                >
                  <Icons.Close />
                </div>
              </div>
            ))}
            <div className="w-full text-right">
              <span
                className="text-gray-400 cursor-pointer"
                onClick={() => {
                  setSelected([]);
                  setQuery("");
                  inputRef.current?.focus();
                }}
              >
                Clear all
              </span>
            </div>
          </div>
        )}

        {/* Input field for searching/adding tags */}
        <div className="card flex items-center justify-between p-3 w-80 gap-2.5">
          <Icons.Search />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value.trimStart())}
            placeholder="Search or Create tags"
            className="bg-transparent text-sm flex-1 caret-rose-600"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
          <button
            className={`text-sm ${isDisable ? 'text-gray-300 cursor-not-allowed' : 'text-rose-500'}`}
            disabled={isDisable}
            onClick={handleAddTag}
          >
            + Add
          </button>
        </div>

        {/* Dropdown menu for available tags */}
        {menuOpen && (
          <div className="card absolute w-full max-h-32 mt-2 p-1 flex overflow-y-auto scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-200">
            <ul className="w-full">
              {filteredTags?.length > 0 ? (
                filteredTags.map((tag) => (
                  <li
                    key={tag}
                    className="p-2 cursor-pointer hover:bg-rose-50 hover:text-rose-500 rounded-md w-full"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      handleTagClick(tag);
                      setMenuOpen(true); // Keep the menu open after selecting a tag
                    }}
                  >
                    {tag}
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500">No options available</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TagsInput;
//final