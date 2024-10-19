// src/components/CriterionItem.js

import React from 'react';
import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    IconButton,
    Paper,
    Autocomplete,
} from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const CriterionItem = ({
                           criterion,
                           attributeDefinition,
                           updateCriterion,
                           removeCriterion,
                       }) => {
    const renderValueInput = () => {
        if (!attributeDefinition) return null;

        const { type, options } = attributeDefinition;

        // Use Autocomplete for large enumerations
        if (type === 'select' && options.length > 20) {
            return (
                <Autocomplete
                    options={options}
                    getOptionLabel={(option) => option}
                    value={criterion.value || ''}
                    onChange={(event, newValue) => {
                        updateCriterion(criterion.id, { value: newValue || '' });
                    }}
                    onInputChange={(event, newInputValue) => {
                        updateCriterion(criterion.id, { value: newInputValue || '' });
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Value"
                            variant="outlined"
                            style={{ marginRight: '8px', minWidth: 200 }}
                        />
                    )}
                    style={{ marginRight: '8px', minWidth: 200 }}
                    freeSolo={false}
                />
            );
        } else if (type === 'select') {
            // Use Select component for smaller enumerations
            return (
                <FormControl style={{ marginRight: '8px', minWidth: 120 }}>
                    <InputLabel>Value</InputLabel>
                    <Select
                        value={criterion.value}
                        onChange={(e) =>
                            updateCriterion(criterion.id, { value: e.target.value })
                        }
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
            // Handle boolean attributes
            return (
                <FormControl style={{ marginRight: '8px', minWidth: 100 }}>
                    <InputLabel>Value</InputLabel>
                    <Select
                        value={criterion.value}
                        onChange={(e) =>
                            updateCriterion(criterion.id, { value: e.target.value })
                        }
                    >
                        <MenuItem value="true">True</MenuItem>
                        <MenuItem value="false">False</MenuItem>
                    </Select>
                </FormControl>
            );
        } else {
            // For text and number types
            return (
                <TextField
                    label="Value"
                    value={criterion.value}
                    onChange={(e) =>
                        updateCriterion(criterion.id, { value: e.target.value })
                    }
                    style={{ marginRight: '8px', minWidth: 120 }}
                />
            );
        }
    };

    return (
        <Paper style={{ padding: '8px' }}>
            <Box display="flex" alignItems="center">
                {/* Attribute Name (Read-only) */}
                <Typography style={{ marginRight: '8px', minWidth: 100 }}>
                    {attributeDefinition.name}
                </Typography>

                {/* Operator Selection */}
                <FormControl style={{ marginRight: '8px', minWidth: 100 }}>
                    <InputLabel>Operator</InputLabel>
                    <Select
                        value={criterion.operator}
                        onChange={(e) =>
                            updateCriterion(criterion.id, { operator: e.target.value })
                        }
                    >
                        <MenuItem value="equal">Equal To</MenuItem>
                        <MenuItem value="notEqual">Not Equal To</MenuItem>
                    </Select>
                </FormControl>

                {/* Value Input */}
                {renderValueInput()}

                {/* Remove Criterion Button */}
                <IconButton
                    color="secondary"
                    onClick={() => removeCriterion(criterion.id)}
                >
                    <RemoveCircleIcon />
                </IconButton>
            </Box>
        </Paper>
    );
};

export default CriterionItem;
