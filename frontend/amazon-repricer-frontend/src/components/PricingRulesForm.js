import React, { useState } from 'react'

const PricingRulesForm = ({ productID }) => {
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
}

export default PricingRulesForm