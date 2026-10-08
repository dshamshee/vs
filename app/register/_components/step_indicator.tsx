"use client"

import { cn } from "cn"
import { Check } from "lucide-react"

const steps = [
    { label: "Personal Details", description: "Basic information" },
    { label: "Educational Details", description: "Academic background" },
    { label: "Review & Submit", description: "Confirm and submit" },
]

export const StepIndicator = ({ currentStep }: { currentStep: number }) => {
    return (
        <div className="w-full py-6">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <div key={step.label} className="flex flex-1 items-center">
                        {/* Step circle + label */}
                        <div className="flex flex-col items-center gap-2">
                            <div
                                className={cn(
                                    "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300",
                                    index < currentStep
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : index === currentStep
                                          ? "border-primary bg-primary/10 text-primary ring-4 ring-primary/20"
                                          : "border-muted-foreground/30 bg-muted text-muted-foreground"
                                )}
                            >
                                {index < currentStep ? (
                                    <Check className="h-5 w-5" />
                                ) : (
                                    index + 1
                                )}
                            </div>
                            <div className="flex flex-col items-center">
                                <span
                                    className={cn(
                                        "text-sm font-medium transition-colors duration-300",
                                        index <= currentStep
                                            ? "text-foreground"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    {step.label}
                                </span>
                                <span className="text-xs text-muted-foreground hidden sm:block">
                                    {step.description}
                                </span>
                            </div>
                        </div>

                        {/* Connector line */}
                        {index < steps.length - 1 && (
                            <div className="mx-4 mb-8 h-0.5 flex-1">
                                <div
                                    className={cn(
                                        "h-full rounded-full transition-all duration-500",
                                        index < currentStep
                                            ? "bg-primary"
                                            : "bg-muted-foreground/20"
                                    )}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
