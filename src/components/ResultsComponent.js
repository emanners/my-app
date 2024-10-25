// src/components/ResultsComponent.js

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import { css } from '@emotion/react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const ResultsComponent = ({ products }) => {
    const columns = useMemo(
        () => [
            { headerName: 'ID', field: 'id', sortable: true, filter: true, flex: 1 },
            { headerName: 'Name', field: 'name', sortable: true, filter: true, flex: 2 },
            { headerName: 'Color', field: 'color', sortable: true, filter: true, flex: 1 },
            { headerName: 'Size', field: 'size', sortable: true, filter: true, flex: 1 },
            { headerName: 'Width', field: 'width', sortable: true, filter: 'agNumberColumnFilter', flex: 1 },
            {
                headerName: 'In Stock',
                field: 'instock',
                sortable: true,
                filter: true,
                flex: 1,
                cellRenderer: (params) => (params.value ? 'Yes' : 'No')
            },
            { headerName: 'Weight', field: 'weight', sortable: true, filter: 'agNumberColumnFilter', flex: 1 },
            { headerName: 'Brand', field: 'brand', sortable: true, filter: true, flex: 1 },
            { headerName: 'Material', field: 'material', sortable: true, filter: true, flex: 1 },
            { headerName: 'Warranty', field: 'warranty', sortable: true, filter: true, flex: 1 },
            { headerName: 'Made In', field: 'madein', sortable: true, filter: true, flex: 1 },
            { headerName: 'Price', field: 'price', sortable: true, filter: 'agNumberColumnFilter', flex: 1 },
            { headerName: 'Product Code', field: 'productcode', sortable: true, filter: true, flex: 1 },
            // Add more columns as needed
        ],
        []
    );

    console.log('Rendering ResultsComponent with products count:', products.length);

    return (
        <div
            css={css`
                height: 500px;
                width: 100%;
            `}
        >
            {products.length === 0 ? (
                <p
                    css={css`
                        font-style: italic;
                    `}
                >
                    No products found.
                </p>
            ) : (
                <div
                    className="ag-theme-alpine"
                    css={css`
                        height: 100%;
                        width: 100%;
                    `}
                >
                    <AgGridReact
                        rowData={products}
                        columnDefs={columns}
                        defaultColDef={{
                            flex: 1,
                            minWidth: 100,
                            resizable: true,
                        }}
                        pagination={true}
                        paginationPageSize={10}
                        domLayout="autoHeight"
                    />
                </div>
            )}
        </div>
    );
};

ResultsComponent.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            color: PropTypes.string.isRequired,
            size: PropTypes.string.isRequired,
            width: PropTypes.number.isRequired,
            instock: PropTypes.bool.isRequired,
            weight: PropTypes.number.isRequired,
            brand: PropTypes.string.isRequired,
            material: PropTypes.string.isRequired,
            warranty: PropTypes.string.isRequired,
            madein: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            productcode: PropTypes.string.isRequired,
            // ... other attributes
        })
    ).isRequired,
};

export default ResultsComponent;
