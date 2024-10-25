// src/components/CriterionItem.js

import React from 'react';
import PropTypes from 'prop-types';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    IconButton,
    Paper,
    Autocomplete,
    Box,
} from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const operatorOptions = {
    select: [
        { value: 'equal', label: '=' },
        { value: 'notEqual', label: '!=' },
    ],
    boolean: [
        { value: 'equal', label: '=' },
        { value: 'notEqual', label: '!=' },
    ],
    number: [
        { value: 'equal', label: 'Equal To' },
        { value: 'notEqual', label: 'Not Equal To' },
        { value: 'lessThan', label: 'Less Than' },
        { value: 'greaterThan', label: 'Greater Than' },
    ],
    text: [
        { value: 'contains', label: 'Contains' },
        { value: 'notContains', label: 'Does Not Contain' },
        { value: 'equal', label: 'Equal To' },
        { value: 'notEqual', label: 'Not Equal To' },
    ],
};

const CriterionItem = ({
                           criterion,
                           attributeDefinition,
                           updateCriterion,
                           removeCriterion,
                       }) => {
    if (!attributeDefinition) {
        return (
            <Paper
                sx={{
                    padding: '12px',
                    border: '1px solid #f44336',
                    borderRadius: '8px',
                    backgroundColor: '#ffebee',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <span>Error: Attribute not found</span>
                    <IconButton
                        color="secondary"
                        onClick={() => removeCriterion(criterion.id)}
                        aria-label="Remove criterion"
                    >
                        <RemoveCircleIcon />
                    </IconButton>
                </Box>
            </Paper>
        );
    }

    const availableOperators = operatorOptions[attributeDefinition.type] || [];

    const renderValueInput = () => {
        const { type, options } = attributeDefinition;

        if (type === 'select' && options.length > 20) {
            return (
                <Autocomplete
                    options={options}
                    getOptionLabel={(option) => option}
                    value={criterion.value || null}
                    onChange={(event, newValue) => {
                        updateCriterion(criterion.id, { value: newValue || '' });
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Value"
                            variant="outlined"
                            sx={{
                                minWidth: '200px',
                            }}
                        />
                    )}
                    sx={{
                        minWidth: '200px',
                    }}
                />
            );
        } else if (type === 'select') {
            return (
                <FormControl
                    sx={{
                        minWidth: '120px',
                        flex: 1,
                    }}
                >
                    <InputLabel id={`value-label-${criterion.id}`}>Value</InputLabel>
                    <Select
                        labelId={`value-label-${criterion.id}`}
                        value={criterion.value || ''}
                        onChange={(e) => {
                            updateCriterion(criterion.id, { value: e.target.value });
                        }}
                        label="Value"
                    >
                        {options.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            );
        } else if (type === 'boolean') {
            return (
                <FormControl
                    sx={{
                        minWidth: '100px',
                        flex: 1,
                    }}
                >
                    <InputLabel id={`value-label-${criterion.id}`}>Value</InputLabel>
                    <Select
                        labelId={`value-label-${criterion.id}`}
                        value={criterion.value !== undefined ? criterion.value.toString() : ''}
                        onChange={(e) => {
                            updateCriterion(criterion.id, { value: e.target.value === 'true' });
                        }}
                        label="Value"
                    >
                        <MenuItem value="true">True</MenuItem>
                        <MenuItem value="false">False</MenuItem>
                    </Select>
                </FormControl>
            );
        } else if (type === 'number') {
            return (
                <TextField
                    label="Value"
                    type="number"
                    value={criterion.value || ''}
                    onChange={(e) => {
                        updateCriterion(criterion.id, {
                            value: e.target.value !== '' ? Number(e.target.value) : '',
                        });
                    }}
                    sx={{
                        minWidth: '120px',
                        flex: 1,
                    }}
                />
            );
        } else {
            return (
                <TextField
                    label="Value"
                    value={criterion.value || ''}
                    onChange={(e) => {
                        updateCriterion(criterion.id, { value: e.target.value });
                    }}
                    sx={{
                        minWidth: '120px',
                        flex: 1,
                    }}
                />
            );
        }
    };

    return (
        <Paper
            sx={{
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    flexWrap: 'wrap', // Allows wrapping on smaller screens
                }}
            >
                {/* Attribute Name */}
                <Box
                    sx={{
                        marginRight: '12px',
                        minWidth: '80px',
                        fontWeight: 'bold',
                    }}
                >
                    {attributeDefinition.name}
                </Box>

                {/* Operator Selection */}
                <FormControl
                    sx={{
                        marginRight: '12px',
                        minWidth: '80px',
                        maxWidth: '120px',
                        flex: 1,
                    }}
                >
                    <InputLabel id={`operator-label-${criterion.id}`}>Operator</InputLabel>
                    <Select
                        labelId={`operator-label-${criterion.id}`}
                        value={criterion.operator || ''}
                        onChange={(e) => {
                            updateCriterion(criterion.id, { operator: e.target.value });
                        }}
                        label="Operator"
                    >
                        {availableOperators.map((op) => (
                            <MenuItem key={op.value} value={op.value}>
                                {op.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Value Input */}
                <Box
                    sx={{
                        flex: 2,
                        marginRight: '12px',
                        minWidth: '120px',
                    }}
                >
                    {renderValueInput()}
                </Box>

                {/* Remove Criterion Button */}
                <IconButton
                    color="secondary"
                    onClick={() => {
                        removeCriterion(criterion.id);
                    }}
                    aria-label={`Remove ${attributeDefinition.name} criterion`}
                >
                    <RemoveCircleIcon />
                </IconButton>
            </Box>
        </Paper>
    );
};

CriterionItem.propTypes = {
    criterion: PropTypes.shape({
        id: PropTypes.number.isRequired,
        attribute: PropTypes.string.isRequired,
        operator: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool,
        ]),
    }).isRequired,
    attributeDefinition: PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['select', 'number', 'text', 'boolean']).isRequired,
        options: PropTypes.arrayOf(PropTypes.string),
    }),
    updateCriterion: PropTypes.func.isRequired,
    removeCriterion: PropTypes.func.isRequired,
};

export default CriterionItem;
