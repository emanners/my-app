// src/components/SearchLayout.js

import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import AttributeSelector from './AttributeSelector';
import CriteriaList from './CriteriaList';
import ResultsComponent from './ResultsComponent';
import { Button } from '@mui/material';

const SearchLayout = ({
                          attributeGroups,
                          attributeDefinitions,
                          criteria,
                          filteredProducts,
                          addCriterion,
                          updateCriterion,
                          removeCriterion,
                          handleSearch,
                          isCriteriaComplete,
                      }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: '24px',
                padding: '24px',
            }}
        >
            {/* Attribute Selector on the Left */}
            <Box
                sx={{
                    flex: { md: '0 0 250px' },
                    width: { xs: '100%', md: 'auto' },
                }}
            >
                <AttributeSelector attributeGroups={attributeGroups} addCriterion={addCriterion} />
            </Box>

            {/* Main Content: Criteria and Results */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                }}
            >
                {/* Criteria Section */}
                <CriteriaList
                    criteria={criteria}
                    attributeDefinitions={attributeDefinitions}
                    updateCriterion={updateCriterion}
                    removeCriterion={removeCriterion}
                />

                {/* Search Button and Results */}
                <div>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            marginBottom: '16px',
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSearch}
                            disabled={!isCriteriaComplete}
                        >
                            Search
                        </Button>
                    </Box>

                    {/* Results Section */}
                    <ResultsComponent products={filteredProducts} />
                </div>
            </Box>
        </Box>
    );
};

SearchLayout.propTypes = {
    attributeGroups: PropTypes.object.isRequired,
    attributeDefinitions: PropTypes.object.isRequired,
    criteria: PropTypes.array.isRequired,
    filteredProducts: PropTypes.array.isRequired,
    addCriterion: PropTypes.func.isRequired,
    updateCriterion: PropTypes.func.isRequired,
    removeCriterion: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
    isCriteriaComplete: PropTypes.bool.isRequired,
};

export default SearchLayout;
