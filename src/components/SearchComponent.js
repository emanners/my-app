// src/components/SearchComponent.js

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import SearchLayout from './SearchLayout';

const SearchComponent = ({ attributeGroups }) => {
    const [criteria, setCriteria] = useState([]);
    const [activeCriteria, setActiveCriteria] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [mockProducts, setMockProducts] = useState([]);

    // Memoize attributeDefinitions to prevent re-creation on every render
    const attributeDefinitions = useMemo(() => {
        const defs = {};
        Object.values(attributeGroups).forEach((attributes) => {
            attributes.forEach((attribute) => {
                defs[attribute.name.toLowerCase()] = {
                    ...attribute,
                    name: attribute.name.toLowerCase(),
                };
            });
        });
        return defs;
    }, [attributeGroups]);

    // Initialize mock data when attributeDefinitions change
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
        console.log('Mock products initialized with count:', products.length);
    }, [attributeDefinitions]);

    // Refactor applyFilters using useCallback and debounce
    const applyFilters = useCallback(
        debounce((currentCriteria) => {
            console.log('Applying filters with activeCriteria:', currentCriteria);
            if (currentCriteria.length === 0) {
                setFilteredProducts(mockProducts);
                console.log('No active criteria. Showing all products.');
                return;
            }

            const filtered = mockProducts.filter((product) => {
                return currentCriteria.every(({ attribute, operator, value }) => {
                    const attrDef = attributeDefinitions[attribute.toLowerCase()];
                    const productValue = product[attribute.toLowerCase()];

                    if (attrDef) {
                        switch (operator) {
                            case 'equal':
                                return compareValues(attrDef.type, productValue, value);
                            case 'notEqual':
                                return !compareValues(attrDef.type, productValue, value);
                            case 'lessThan':
                                if (attrDef.type === 'number') {
                                    return productValue < value;
                                }
                                return true;
                            case 'greaterThan':
                                if (attrDef.type === 'number') {
                                    return productValue > value;
                                }
                                return true;
                            case 'contains':
                                if (typeof productValue === 'string') {
                                    return productValue.toLowerCase().includes(value.toLowerCase());
                                }
                                return true;
                            case 'notContains':
                                if (typeof productValue === 'string') {
                                    return !productValue.toLowerCase().includes(value.toLowerCase());
                                }
                                return true;
                            default:
                                return true;
                        }
                    }
                    return true;
                });
            });
            console.log('Filtered products count:', filtered.length);
            setFilteredProducts(filtered);
        }, 300),
        [attributeDefinitions, mockProducts]
    );

    // Update filteredProducts whenever activeCriteria or mockProducts change
    useEffect(() => {
        applyFilters(activeCriteria);
        // Cleanup function to cancel debounce on unmount
        return () => {
            applyFilters.cancel();
        };
    }, [activeCriteria, applyFilters]);

    // Function to compare values based on type
    const compareValues = (type, productValue, value) => {
        if (type === 'boolean') {
            return productValue === (value === true || value === 'true');
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
        // Prevent adding duplicate criteria for the same attribute
        if (criteria.some((c) => c.attribute === attributeNameLower)) {
            alert(`Criterion for "${attributeName}" already exists.`);
            return;
        }
        setCriteria([
            ...criteria,
            {
                id: Date.now(),
                attribute: attributeNameLower,
                operator: 'equal',
                value: '', // Leave value empty as per your preference
            },
        ]);
        console.log(`Added criterion for attribute: ${attributeNameLower}`);
    };

    // Function to remove a criterion
    const removeCriterion = (id) => {
        setCriteria(criteria.filter((c) => c.id !== id));
        console.log(`Removed criterion with id: ${id}`);
    };

    // Function to update a criterion
    const updateCriterion = (id, updatedCriterion) => {
        setCriteria(
            criteria.map((c) => (c.id === id ? { ...c, ...updatedCriterion } : c))
        );
        console.log(`Updated criterion with id: ${id}`, updatedCriterion);
    };

    // Function to handle search button click
    const handleSearch = () => {
        // Check if all criteria have a non-empty value
        const incompleteCriteria = criteria.filter(
            (c) => c.value === '' || c.value === null || c.value === undefined
        );
        if (incompleteCriteria.length > 0) {
            alert('Please fill in all criteria values before searching.');
            return;
        }

        console.log('Setting activeCriteria:', criteria);
        setActiveCriteria(criteria);
    };

    // Check if criteria are complete
    const isCriteriaComplete =
        criteria.length > 0 &&
        criteria.every(
            (c) => c.value !== '' && c.value !== null && c.value !== undefined
        );

    return (
        <SearchLayout
            attributeGroups={attributeGroups}
            attributeDefinitions={attributeDefinitions}
            criteria={criteria}
            filteredProducts={filteredProducts}
            addCriterion={addCriterion}
            updateCriterion={updateCriterion}
            removeCriterion={removeCriterion}
            handleSearch={handleSearch}
            isCriteriaComplete={isCriteriaComplete}
        />
    );
};

SearchComponent.propTypes = {
    attributeGroups: PropTypes.object.isRequired,
};

export default SearchComponent;
