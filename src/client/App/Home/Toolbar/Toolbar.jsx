import React, { useState, useEffect } from "react";


const fuzzySearch = function (objects, query, key="") {
    // TODO: implement this.
    return objects;
};


const sortByKey = function (objects, key, reversed=false) {
    const comparator = function (obj1, obj2) {
        if (obj1[key] < obj2[key]) {
            return reversed ? 1 : -1;
        }
        if (obj1[key] > obj2[key]) {
            return reversed ? -1 : 1;
        }
        return 0;
    };
    const objectsList = [];
    for (let k in objects) {
        objectsList.push({...objects[k], _temp_key: k});
    }
    const result = {};
    for (let obj of objectsList.sort(comparator)) {
        const k = obj._temp_key;
        delete obj._temp_key;
        result[k] = obj;
    }
    return result;
};


const reverse = function (objects) {
    const result = {};
    for (let key of Object.keys(objects).reverse()) {
        result[key] = objects[key];
    }
    return result;
};


export default function ({ title, cached, setter, cachedSetter }) {

    const [searchQuery, setSearchQuery] = useState("");
    const [searchKey, setSearchKey] = useState("");
    const [sortKey, setSortKey] = useState("");
    const [sortReversed, setSortReversed] = useState(false);

    // Redo the search if either the cache, query or key changes.
    useEffect(function () {
        setter(fuzzySearch(cached, searchQuery, searchKey));
    }, [cached, searchQuery, searchKey]);

    // Sort the cached contents if either the sorting key or order changes.
    useEffect(function () {
        cachedSetter(sortByKey(cached, sortKey, sortReversed));
    }, [sortKey, sortReversed]);

    const handleSearch = function (event) {
        setSearchQuery(event.target.value);
    };

    const handleSearchSelect = function (event) {
        setSearchKey(event.target.value);
    };

    const handleSortSelect = function (event) {
        setSortKey(event.target.value);
    };

    const handleSortCheckbox = function () {
        setSortReversed(!sortReversed);
    }

    const selectKeys = [];
    if (Object.keys(cached).length > 0) {
        for (let key in cached[Object.keys(cached)[0]]) {
            selectKeys.push(key);
        }
    }
    return (
        <div className="toolbar">
            <h2>{title}</h2>
            <input type="text" placeholder="Search..." onChange={handleSearch} />
            by
            <select onChange={handleSearchSelect}>
                <option value="">all</option>
                {selectKeys.map(function (key) {
                    return <option key={"search_" + key} value={key}>{key}</option>;
                })}
            </select>
            <br/>
            Order by
            <select onChange={handleSortSelect}>
                {selectKeys.map(function (key) {
                    return <option key={"sort_" + key} value={key}>{key}</option>;
                })}
            </select>
            <input
                type="checkbox"
                defaultChecked={sortReversed}
                onChange={handleSortCheckbox}
            />
            Reversed
        </div>
    );
};
