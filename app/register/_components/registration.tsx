"use client"

import { useRegistrationStore } from "../store/registration-store"
import { StepIndicator } from "./step_indicator"
import { Personal_Details_Form } from "./personal_details"
import { Educational_Details_Form } from "./educational_details"
import { Review_Submit } from "./review_submit"

export const Registration = () => {
    const { currentStep } = useRegistrationStore()

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-8">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold tracking-tight">
                    Student Registration
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Complete the form below to register as a student
                </p>
            </div>

            <StepIndicator currentStep={currentStep} />

            <div className="mt-8">
                {currentStep === 0 && <Personal_Details_Form />}
                {currentStep === 1 && <Educational_Details_Form />}
                {currentStep === 2 && <Review_Submit />}
            </div>
        </div>
    )
}