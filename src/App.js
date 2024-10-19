// src/App.js

import React, { useState, useEffect } from 'react';
import yaml from 'js-yaml';
import SearchComponent from './components/SearchComponent';
import './App.css';

const App = () => {
    const [attributeGroups, setAttributeGroups] = useState({});

    // Load the YAML file when the component mounts
    useEffect(() => {
        const loadAttributeGroups = async () => {
            try {
                const response = await fetch('attribute-groups.yaml');
                const yamlText = await response.text();
                const data = yaml.load(yamlText);
                setAttributeGroups(data.attributeGroups);
            } catch (error) {
                console.error('Error loading attribute groups:', error);
            }
        };

        loadAttributeGroups();
    }, []);

    return (
        <div>
            <h1>Product Catalog Search</h1>
            <SearchComponent attributeGroups={attributeGroups} />
        </div>
    );
};

export default App;
