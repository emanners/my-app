// src/components/SearchComponent.js

import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import AttributeSelector from './AttributeSelector';
import CriteriaList from './CriteriaList';
import ResultsComponent from './ResultsComponent';

const SearchComponent = ({ attributeGroups }) => {
    const [criteria, setCriteria] = useState([]);
    const [activeCriteria, setActiveCriteria] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [mockProducts, setMockProducts] = useState([]);

    // Build attribute definitions mapping with lowercase attribute names
    const attributeDefinitions = {};
    Object.values(attributeGroups).forEach((attributes) => {
        attributes.forEach((attribute) => {
            attributeDefinitions[attribute.name.toLowerCase()] = {
                ...attribute,
                name: attribute.name.toLowerCase(),
            };
        });
    });

    // Initialize mock data
    useEffect(() => {
        // Extract productCode options from attributeDefinitions
        const productCodeOptions =
            attributeDefinitions['productcode']?.options || [];

        const products = Array.from({ length: 100 }, (_, index) => ({
            id: index + 1,
            name: `Product ${index + 1}`,
            color: ['Red', 'Blue', 'Green'][index % 3],
            size: ['Small', 'Medium', 'Large'][index % 3],
            width: (index % 5) + 1, // number
            instock: index % 2 === 0,
            weight: (index % 10) + 1, // number
            brand: ['Brand A', 'Brand B', 'Brand C'][index % 3],
            material: ['Cotton', 'Polyester', 'Wool'][index % 3],
            warranty: `${(index % 3) + 1} years`,
            madein: ['USA', 'China', 'Germany'][index % 3],
            price: (index % 100) + 20, // number
            productcode:
                productCodeOptions[index % productCodeOptions.length] || 'Unknown',
            // ... add other attributes as needed
        }));

        setMockProducts(products);
        setFilteredProducts(products);
    }, [attributeDefinitions]); // Add attributeDefinitions as a dependency

    // Update filtered products whenever activeCriteria change
    useEffect(() => {
        const filtered = mockProducts.filter((product) => {
            return activeCriteria.every(({ attribute, operator, value }) => {
                const attrDef = attributeDefinitions[attribute.toLowerCase()];
                const productValue = product[attribute.toLowerCase()];

                if (attrDef) {
                    switch (operator) {
                        case 'equal':
                            return compareValues(attrDef.type, productValue, value);
                        case 'notEqual':
                            return !compareValues(attrDef.type, productValue, value);
                        default:
                            return true;
                    }
                }
                return true;
            });
        });
        setFilteredProducts(filtered);
    }, [activeCriteria, mockProducts]);

    // Function to compare values based on type
    const compareValues = (type, productValue, value) => {
        if (type === 'boolean') {
            return productValue === (value === 'true');
        } else if (type === 'number') {
            return Number(productValue) === Number(value);
        } else {
            return (
                productValue &&
                productValue.toString().toLowerCase() === value.toString().toLowerCase()
            );
        }
    };

    // Function to add a new criterion
    const addCriterion = (attributeName) => {
        const attributeNameLower = attributeName.toLowerCase();
        setCriteria([
            ...criteria,
            {
                id: Date.now(),
                attribute: attributeNameLower,
                operator: 'equal',
                value: '', // Leave value empty as per your preference
            },
        ]);
    };

    // Function to remove a criterion
    const removeCriterion = (id) => {
        setCriteria(criteria.filter((c) => c.id !== id));
    };

    // Function to update a criterion
    const updateCriterion = (id, updatedCriterion) => {
        setCriteria(
            criteria.map((c) => (c.id === id ? { ...c, ...updatedCriterion } : c))
        );
    };

    // Function to handle search button click
    const handleSearch = () => {
        // Check if all criteria have a non-empty value
        const incompleteCriteria = criteria.filter((c) => c.value === '');
        if (incompleteCriteria.length > 0) {
            alert('Please fill in all criteria values before searching.');
            return;
        }

        setActiveCriteria(criteria);
    };

    // Check if criteria are complete
    const isCriteriaComplete = criteria.every((c) => c.value !== '');

    return (
        <div>
            <Grid container spacing={2}>
                {/* Left Column: Attribute Selection */}
                <Grid item xs={4}>
                    <AttributeSelector
                        attributeGroups={attributeGroups}
                        addCriterion={addCriterion}
                    />
                </Grid>

                {/* Right Column: Criteria List and Results */}
                <Grid item xs={8}>
                    <Typography variant="h6">Criteria</Typography>
                    <div
                        style={{
                            maxHeight: '300px',
                            overflowY: 'auto',
                            marginBottom: '16px',
                        }}
                    >
                        <CriteriaList
                            criteria={criteria}
                            attributeDefinitions={attributeDefinitions}
                            updateCriterion={updateCriterion}
                            removeCriterion={removeCriterion}
                        />
                    </div>

                    {/* Search Button and Results Header */}
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        marginBottom="16px"
                    >
                        <Typography variant="h6">Search Results</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSearch}
                            disabled={!isCriteriaComplete}
                        >
                            Search
                        </Button>
                    </Box>

                    {/* Results */}
                    <ResultsComponent products={filteredProducts} />
                </Grid>
            </Grid>
        </div>
    );
};

export default SearchComponent;
