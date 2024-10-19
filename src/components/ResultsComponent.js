// src/components/ResultsComponent.js

import React from 'react';

const ResultsComponent = ({ products }) => (
    <div>
        <h2>Search Results</h2>
        {products.length === 0 ? (
            <p>No products found</p>
        ) : (
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Width</th>
                    <th>In Stock</th>
                    <th>Weight</th>
                    {/* Add more columns as needed */}
                </tr>
                </thead>
                <tbody>
                {products.slice(0, 10).map((product) => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.color}</td>
                        <td>{product.size}</td>
                        <td>{product.width}</td>
                        <td>{product.inStock ? 'Yes' : 'No'}</td>
                        <td>{product.weight}</td>
                        {/* Add more data as needed */}
                    </tr>
                ))}
                </tbody>
            </table>
        )}
    </div>
);

export default ResultsComponent;
