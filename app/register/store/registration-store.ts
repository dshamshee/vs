import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Student_Details_Type, Student_Educational_Type } from '../lib/zod-type/register-type'

interface RegistrationState {
    currentStep: number
    personalDetails: Student_Details_Type | null
    educationalDetails: Student_Educational_Type | null
    setStep: (step: number) => void
    setPersonalDetails: (data: Student_Details_Type) => void
    setEducationalDetails: (data: Student_Educational_Type) => void
    reset: () => void
}

const initialState = {
    currentStep: 0,
    personalDetails: null,
    educationalDetails: null,
}

export const useRegistrationStore = create<RegistrationState>()(
    persist(
        (set) => ({
            ...initialState,
            setStep: (step) => set({ currentStep: step }),
            setPersonalDetails: (data) => set({ personalDetails: data }),
            setEducationalDetails: (data) => set({ educationalDetails: data }),
            reset: () => set(initialState),
        }),
        {
            name: 'student-registration',
        }
    )
)
