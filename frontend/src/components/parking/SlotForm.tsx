import React, { useState } from 'react'
import type { ParkingSlot } from '../../types'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { useParking } from '../../context/ParkingContext'
import { useLoc } from '../../context/LocContext'

interface SlotFormProps {
    onSuccess: () => void
    onCancel: () => void
}

const sizes = ['small', 'medium', 'large'] as const

const SlotForm: React.FC<SlotFormProps> = ({ onSuccess, onCancel }) => {
    const { addSlot, isLoading } = useParking()
    const { locs } = useLoc()
    
    const [name, setName] = useState('')
    const [location, setLocation] = useState(0)
    const [pricePerHour, setPricePerHour] = useState<number>(500)
    const [size, setSize] = useState<ParkingSlot['size']>('medium')
    const [status, setStatus] = useState('available' as ParkingSlot['status'])
    
    const [formError, setFormError] = useState<string>('')
    const [errors, setErrors] = useState<{ [k: string]: string }>({})

    const validate = () => {
        const errs: Record<string, string> = {}
        if (!name.trim()) errs.name = 'Slot name is required'
        if (!location) errs.location = 'Location is required'
        if (pricePerHour < 500) errs.pricePerHour = 'Price must be > 500'
        if (!status.trim()) errs.status = 'Status is required'
        setErrors(errs)
        return Object.keys(errs).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormError('')

        if (!validate()) return

        try {
            const data = { name, location, pricePerHour, size, status }
            await addSlot(data)
            onSuccess()
        } catch (err) {
            console.error('Save slot failed:', err)
            setFormError(err?.message || 'Failed to save parking slot. Please try again.')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {formError && (
                <div className="p-3 bg-red-800 text-red-100 rounded">
                    {formError}
                </div>
            )}
            <Input label="Slot Name" value={name} error={errors.name} onChange={(e) => setName(e.target.value)} />

            <div>
                <label className="block text-gray-200 text-sm font-medium mb-1">Location</label>
                <select className="w-full rounded bg-gray-800 border border-gray-600 p-2" value={location}
                    onChange={(e) => setLocation(Number(e.target.value))}>
                    <option value={''}>Select a location</option>
                    {locs.map((loc) => (
                        <option key={loc.id} value={loc.id}>{`${loc.name} - ${loc.address}`}</option>
                    ))}
                </select>
            </div>

            <Input type="number" label="RWF per Hour" value={pricePerHour} error={errors.pricePerHour}
                onChange={(e) => setPricePerHour(Number(e.target.value))} min={500} step={500} />

            <div>
                <label className="block text-gray-200 text-sm font-medium mb-1">Size</label>
                <select className="w-full rounded bg-gray-800 border border-gray-600 p-2" value={size}
                    onChange={(e) => setSize(e.target.value as ParkingSlot['size'])}>
                    {sizes.map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>

            <div className="flex space-x-4">
                <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>Cancel</Button>
                <Button type="submit" className="flex-1" isLoading={isLoading}>Create Slot</Button>
            </div>
        </form>
    )
}

export default SlotForm