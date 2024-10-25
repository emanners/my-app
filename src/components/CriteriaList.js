// src/components/CriteriaList.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CriterionItem from './CriterionItem';
import { Box, Button } from '@mui/material';

const CriteriaList = ({
                          criteria,
                          attributeDefinitions,
                          updateCriterion,
                          removeCriterion,
                      }) => {
    const [showAll, setShowAll] = useState(false);

    // Determine the number of criteria to show
    const visibleCount = showAll ? criteria.length : 4; // Two rows x two columns

    return (
        <div>
            <h2 style={{ marginBottom: '16px' }}>Criteria</h2>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gridAutoRows: 'minmax(80px, auto)', // Adjust based on CriterionItem height
                    gap: '16px',
                    maxHeight: showAll ? 'none' : '180px', // Approximately two rows
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'max-height 0.3s ease',
                }}
            >
                {criteria.slice(0, visibleCount).map((criterion) => (
                    <CriterionItem
                        key={criterion.id}
                        criterion={criterion}
                        attributeDefinition={attributeDefinitions[criterion.attribute]}
                        updateCriterion={updateCriterion}
                        removeCriterion={removeCriterion}
                    />
                ))}
            </Box>

            {/* "Show More" Button */}
            {criteria.length > 4 && (
                <Box
                    sx={{
                        marginTop: '8px',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Button
                        variant="text"
                        onClick={() => setShowAll(!showAll)}
                        sx={{ textDecoration: 'underline' }}
                    >
                        {showAll ? 'Show Less' : 'Show More'}
                    </Button>
                </Box>
            )}
        </div>
    );
};

CriteriaList.propTypes = {
    criteria: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            attribute: PropTypes.string.isRequired,
            operator: PropTypes.string,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
        })
    ).isRequired,
    attributeDefinitions: PropTypes.object.isRequired,
    updateCriterion: PropTypes.func.isRequired,
    removeCriterion: PropTypes.func.isRequired,
};

export default CriteriaList;
