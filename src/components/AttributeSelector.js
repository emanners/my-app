// src/components/AttributeSelector.js

import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const AttributeSelector = ({ attributeGroups, addCriterion }) => {
    return (
        <div>
            <h2
                css={css`
                    margin-bottom: 16px;
                `}
            >
                Attributes
            </h2>
            {Object.entries(attributeGroups).map(([groupName, attributes]) => (
                <Accordion key={groupName}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <span>{groupName}</span>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div>
                            {attributes.map((attribute) => (
                                <div
                                    key={attribute.name}
                                    css={css`
                                        display: flex;
                                        align-items: center;
                                        justify-content: space-between;
                                        margin-bottom: 8px;
                                    `}
                                >
                                    <span>{attribute.name}</span>
                                    <IconButton
                                        color="primary"
                                        onClick={() => {
                                            console.log(`Adding criterion for:`, attribute.name);
                                            addCriterion(attribute.name);
                                        }}
                                        aria-label={`Add ${attribute.name} criterion`}
                                    >
                                        <AddCircleIcon />
                                    </IconButton>
                                </div>
                            ))}
                        </div>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

AttributeSelector.propTypes = {
    attributeGroups: PropTypes.object.isRequired,
    addCriterion: PropTypes.func.isRequired,
};

export default AttributeSelector;
