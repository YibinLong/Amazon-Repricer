import React, { useState } from 'react'

const PricingRulesForm = ({ productId }) => {
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(`/api/amazon/products/${productId}/pricing-rules`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ minPrice, maxPrice })
        })

        if (response.ok) {
            alert('Pricing rules set successfully!')
        } else {
            alert('Failed to set pricing rules')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Set Pricing Rules</h3>
            <input
                type='number'
                placeholder='Min Price'
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                required
            />
            <input 
                type='number'
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                required
            />
            <button type='submit'>Save</button>  
        </form>
    )
}

export default PricingRulesForm