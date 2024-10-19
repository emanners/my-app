// src/components/CriteriaList.js

import React from 'react';
import { Grid, Typography } from '@mui/material';
import CriterionItem from './CriterionItem';

const CriteriaList = ({
                          criteria,
                          attributeDefinitions,
                          updateCriterion,
                          removeCriterion,
                      }) => {
    if (criteria.length === 0) {
        return <Typography>No criteria added.</Typography>;
    }

    return (
        <Grid container spacing={2}>
            {criteria.map((criterion) => (
                <Grid item xs={12} sm={6} key={criterion.id}>
                    <CriterionItem
                        criterion={criterion}
                        attributeDefinition={attributeDefinitions[criterion.attribute]}
                        updateCriterion={updateCriterion}
                        removeCriterion={removeCriterion}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default CriteriaList;

