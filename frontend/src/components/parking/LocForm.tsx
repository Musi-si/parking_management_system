import React, { useState } from 'react'
import type { Loc } from '../../types'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { useLoc } from '../../context/LocContext'

interface LocFormProps {
    loc?: Loc
    onSuccess: () => void
    onCancel: () => void
}

const LocForm: React.FC<LocFormProps> = ({ loc, onSuccess, onCancel }) => {
    const { addLoc, isLoading } = useLoc()

    const [name, setName] = useState(loc?.name ?? '')
    const [address, setAddress] = useState(loc?.address ?? '')

    const [errors, setErrors] = useState<{ [k: string]: string }>({})

    const validate = () => {
        const errs: { [k: string]: string } = {}
        if (!name.trim()) errs.name = 'Required field'
        if (!address.trim()) errs.name = 'Required field'
        setErrors(errs)
        return Object.keys(errs).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return

        const data = { name, address }

        try {
            await addLoc(data)
            onSuccess()
        } catch (err) {
            console.error('Save Loc failed:', err)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Input label="Name" value={name} error={errors.name} onChange={(e) => setName(e.target.value)} />

            <Input label="Address" value={address} error={errors.address} onChange={(e) => setAddress(e.target.value)} />

            <div className="flex space-x-4">
                <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>Cancel</Button>
                <Button type="submit" className="flex-1" isLoading={isLoading}>{'Add Loccation'}</Button>
            </div>
        </form>
    )
}

export default LocForm