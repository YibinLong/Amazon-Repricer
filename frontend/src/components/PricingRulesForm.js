import axios from 'axios'
import React, { useState } from 'react'

const PricingRulesForm = ({ productId }) => {
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await axios.post(`http://localhost:3001/api/amazon/products/${productId}/pricing-rules`,
                { minPrice, maxPrice },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            alert('Pricing rules set successfully!')
        } catch (error) {
            alert('Failed to set pricing rules');
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