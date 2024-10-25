// src/App.js

import React, { useState, useEffect } from 'react';
import yaml from 'js-yaml';
import SearchComponent from './components/SearchComponent';
import './App.css'; // Retain if necessary for global styles
import { Container } from '@mui/material';

const App = () => {
    const [attributeGroups, setAttributeGroups] = useState({});

    // Load the YAML file when the component mounts
    useEffect(() => {
        const loadAttributeGroups = async () => {
            try {
                const response = await fetch(`${process.env.PUBLIC_URL}/attribute-groups.yaml`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const yamlText = await response.text();
                const data = yaml.load(yamlText);
                console.log('Loaded attribute groups:', data.attributeGroups);
                setAttributeGroups(data.attributeGroups);
            } catch (error) {
                console.error('Error loading attribute groups:', error);
            }
        };

        loadAttributeGroups();
    }, []);

    return (
        <Container sx={{ padding: '32px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>Product Catalog Search</h1>
            <SearchComponent attributeGroups={attributeGroups} />
        </Container>
    );
};

export default App;
