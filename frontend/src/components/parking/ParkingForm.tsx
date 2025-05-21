import React, { useState } from 'react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { Parking } from '../../types/index'
import { useParking } from '../../context/ParkingContext'

interface ParkingFormProps {
    parking?: Parking
    onSuccess: () => void
    onCancel: () => void
}

const ParkingForm: React.FC<ParkingFormProps> = ({ parking, onSuccess, onCancel }) => {
    const { addParking, isLoading } = useParking()

    const [code, setCode] = useState(parking?.code?.toString() ?? '')
    const [name, setName] = useState(parking?.name ?? '')
    const [location, setLocation] = useState(parking?.location ?? '')
    const [availableSlots, setAvailableSlots] = useState(parking?.availableSlots?.toString() ?? '')
    const [pricePerHour, setPricePerHour] = useState(parking?.pricePerHour?.toString() ?? '')

    const [errors, setErrors] = useState<{ [k: string]: string }>({})

    const validate = () => {
        const errs: { [k: string]: string } = {}
        if (!code.trim() || isNaN(Number(code))) errs.code = 'Enter a valid code'
        if (!name.trim()) errs.name = 'Required field'
        if (!location.trim()) errs.location = 'Required field'
        if (!availableSlots.trim() || isNaN(Number(availableSlots)) || Number(availableSlots) < 1) errs.availableSlots = 'Enter a valid number'
        if (!pricePerHour.trim() || isNaN(Number(pricePerHour)) || Number(pricePerHour) < 0) errs.pricePerHour = 'Enter a valid price'
        setErrors(errs)
        return Object.keys(errs).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return

        const data = {
            code: Number(code),
            name,
            location,
            availableSlots: Number(availableSlots),
            pricePerHour: Number(pricePerHour),
        }

        try {
            await addParking(data)
            onSuccess()
        } catch (err) {
            console.error('Save Parking failed:', err)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Input label="Code" value={code} error={errors.code} onChange={(e) => setCode(e.target.value)} type="number" min={1} />
            <Input label="Name" value={name} error={errors.name} onChange={(e) => setName(e.target.value)} />
            <Input label="Location" value={location} error={errors.location} onChange={(e) => setLocation(e.target.value)} />
            <Input label="Available Slots" type="number" value={availableSlots} error={errors.availableSlots} onChange={(e) => setAvailableSlots(e.target.value)} min={1} />
            <Input label="Price Per Hour" type="number" value={pricePerHour} error={errors.pricePerHour} onChange={(e) => setPricePerHour(e.target.value)} min={0} />

            <div className="flex space-x-4">
                <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>Cancel</Button>
                <Button type="submit" className="flex-1" isLoading={isLoading}>{'Add Parking'}</Button>
            </div>
        </form>
    )
}

export default ParkingForm