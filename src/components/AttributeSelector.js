// src/components/AttributeSelector.js

import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Typography,
    IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const AttributeSelector = ({ attributeGroups, addCriterion }) => {
    return (
        <div>
            <Typography variant="h6">Attributes</Typography>
            {Object.entries(attributeGroups).map(([groupName, attributes]) => (
                <Accordion key={groupName}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{groupName}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box display="flex" flexDirection="column">
                            {attributes.map((attribute) => (
                                <Box
                                    key={attribute.name}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    marginBottom="8px"
                                >
                                    <Typography>{attribute.name}</Typography>
                                    <IconButton
                                        color="primary"
                                        onClick={() => addCriterion(attribute.name)}
                                    >
                                        <AddCircleIcon />
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default AttributeSelector;
