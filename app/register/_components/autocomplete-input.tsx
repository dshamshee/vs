"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "cn"
import { Loader2, ChevronDown, PenLine, PlusCircle } from "lucide-react"

interface AutocompleteInputProps {
    value: string
    onChange: (value: string) => void
    onBlur?: () => void
    fetchSuggestions: (query: string) => Promise<string[]>
    placeholder?: string
    manualPlaceholder?: string
    className?: string
    debounceMs?: number
    minChars?: number
    allowManualEntry?: boolean
    manualLabel?: string
    defaultManual?: boolean
}

export function AutocompleteInput({
    value,
    onChange,
    onBlur,
    fetchSuggestions,
    placeholder,
    manualPlaceholder,
    className,
    debounceMs = 300,
    minChars = 2,
    allowManualEntry = true,
    manualLabel = "Not listed? Enter manually",
    defaultManual = false,
}: AutocompleteInputProps) {
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [hasSearched, setHasSearched] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState(-1)
    const [isManual, setIsManual] = useState(defaultManual)

    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const listRef = useRef<HTMLDivElement | HTMLUListElement | null>(null)
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const fetchData = useCallback(
        async (query: string) => {
            if (isManual) return

            if (query.trim().length < minChars) {
                setSuggestions([])
                setIsOpen(false)
                setHasSearched(false)
                return
            }

            setIsLoading(true)
            setHasSearched(true)
            try {
                const results = await fetchSuggestions(query.trim())
                setSuggestions(results)
                setIsOpen(true)
                setHighlightedIndex(-1)
            } catch {
                setSuggestions([])
                setIsOpen(false)
            } finally {
                setIsLoading(false)
            }
        },
        [fetchSuggestions, minChars, isManual]
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value.toUpperCase()
        onChange(newValue)

        if (isManual) {
            return
        }

        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => {
            fetchData(newValue)
        }, debounceMs)
    }

    const handleSelect = (item: string) => {
        onChange(item)
        setIsOpen(false)
        setSuggestions([])
        setHasSearched(false)
        inputRef.current?.focus()
    }

    const handleEnableManual = () => {
        setIsManual(true)
        setIsOpen(false)
        setSuggestions([])
        setHasSearched(false)
        inputRef.current?.focus()
    }

    const handleToggleManual = (checked: boolean) => {
        setIsManual(checked)
        if (checked) {
            setIsOpen(false)
            setSuggestions([])
            setHasSearched(false)
        } else {
            if (value.trim().length >= minChars) {
                fetchData(value.trim())
            }
        }
        inputRef.current?.focus()
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) return

        const hasManualOption = allowManualEntry
        const totalItems =
            suggestions.length > 0
                ? suggestions.length + (hasManualOption ? 1 : 0)
                : hasManualOption
                  ? 1
                  : 0

        if (totalItems === 0) return

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault()
                setHighlightedIndex((prev) =>
                    prev < totalItems - 1 ? prev + 1 : 0
                )
                break
            case "ArrowUp":
                e.preventDefault()
                setHighlightedIndex((prev) =>
                    prev > 0 ? prev - 1 : totalItems - 1
                )
                break
            case "Enter":
                e.preventDefault()
                if (suggestions.length > 0) {
                    if (
                        highlightedIndex >= 0 &&
                        highlightedIndex < suggestions.length
                    ) {
                        handleSelect(suggestions[highlightedIndex])
                    } else if (
                        hasManualOption &&
                        highlightedIndex === suggestions.length
                    ) {
                        handleEnableManual()
                    }
                } else if (hasManualOption && highlightedIndex === 0) {
                    handleEnableManual()
                }
                break
            case "Escape":
                setIsOpen(false)
                break
        }
    }

    // Scroll highlighted item into view
    useEffect(() => {
        if (highlightedIndex >= 0 && listRef.current) {
            const item = listRef.current.children[
                highlightedIndex
            ] as HTMLElement
            item?.scrollIntoView({ block: "nearest" })
        }
    }, [highlightedIndex])

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () =>
            document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Cleanup debounce on unmount
    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current)
        }
    }, [])

    const activePlaceholder = isManual
        ? manualPlaceholder || "Enter name manually (not listed)"
        : placeholder

    return (
        <div ref={containerRef} className="relative w-full">
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onBlur={onBlur}
                    placeholder={activePlaceholder}
                    className={cn(
                        "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 pr-8 text-base shadow-xs transition-all outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
                        isManual &&
                            "border-primary/50 bg-primary/[0.02] focus-visible:border-primary focus-visible:ring-primary/20",
                        className
                    )}
                    autoComplete="off"
                />
                <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2">
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    ) : isManual ? (
                        <PenLine className="h-3.5 w-3.5 text-primary" />
                    ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
                    )}
                </div>
            </div>

            {/* Suggestions Dropdown */}
            {isOpen && !isManual && (
                <>
                    {suggestions.length > 0 ? (
                        <ul
                            ref={listRef as React.RefObject<HTMLUListElement>}
                            className="absolute z-50 mt-1 max-h-56 w-full overflow-y-auto rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg"
                        >
                            {suggestions.map((item, index) => (
                                <li
                                    key={item}
                                    onMouseDown={(e) => {
                                        e.preventDefault()
                                        handleSelect(item)
                                    }}
                                    onMouseEnter={() =>
                                        setHighlightedIndex(index)
                                    }
                                    className={cn(
                                        "cursor-pointer rounded-sm px-2.5 py-1.5 text-sm select-none transition-colors",
                                        index === highlightedIndex &&
                                            "bg-accent text-accent-foreground"
                                    )}
                                >
                                    {item}
                                </li>
                            ))}

                            {allowManualEntry && (
                                <li
                                    onMouseDown={(e) => {
                                        e.preventDefault()
                                        handleEnableManual()
                                    }}
                                    onMouseEnter={() =>
                                        setHighlightedIndex(suggestions.length)
                                    }
                                    className={cn(
                                        "mt-1 cursor-pointer border-t border-border/60 pt-2 pb-1.5 px-2.5 text-xs select-none rounded-sm transition-colors flex items-center justify-between",
                                        highlightedIndex === suggestions.length
                                            ? "bg-primary/10 text-primary font-medium"
                                            : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                                    )}
                                >
                                    <span className="flex items-center gap-1.5">
                                        <PlusCircle className="h-3.5 w-3.5 text-primary shrink-0" />
                                        <span>Not listed? Enter manually</span>
                                    </span>
                                    {value.trim() && (
                                        <span className="text-[11px] opacity-75 truncate max-w-[150px]">
                                            Use &ldquo;{value}&rdquo;
                                        </span>
                                    )}
                                </li>
                            )}
                        </ul>
                    ) : (
                        hasSearched &&
                        !isLoading && (
                            <div
                                ref={listRef as React.RefObject<HTMLDivElement>}
                                className="absolute z-50 mt-1 w-full rounded-md border border-border bg-popover p-3 text-popover-foreground shadow-lg"
                            >
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <p className="text-xs text-muted-foreground">
                                        No matching institutions found
                                    </p>
                                    {allowManualEntry && (
                                        <button
                                            type="button"
                                            onMouseDown={(e) => {
                                                e.preventDefault()
                                                handleEnableManual()
                                            }}
                                            onMouseEnter={() =>
                                                setHighlightedIndex(0)
                                            }
                                            className={cn(
                                                "w-full inline-flex items-center justify-center gap-1.5 rounded-md bg-primary/10 hover:bg-primary/20 px-2.5 py-1.5 text-xs font-medium text-primary transition-colors cursor-pointer border border-primary/20",
                                                highlightedIndex === 0 &&
                                                    "bg-primary/20 ring-1 ring-primary/30"
                                            )}
                                        >
                                            <PlusCircle className="h-3.5 w-3.5 shrink-0" />
                                            <span>
                                                {value.trim()
                                                    ? `Use "${value}" & enter manually`
                                                    : "Not listed? Enter manually"}
                                            </span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        )
                    )}
                </>
            )}

            {/* Manual entry toggle / indicator */}
            {allowManualEntry && (
                <div className="mt-1 flex items-center justify-between px-0.5 min-h-[20px]">
                    <label className="group inline-flex items-center gap-1.5 cursor-pointer text-xs text-muted-foreground hover:text-foreground transition-colors select-none">
                        <input
                            type="checkbox"
                            checked={isManual}
                            onChange={(e) =>
                                handleToggleManual(e.target.checked)
                            }
                            className="h-3.5 w-3.5 rounded border-input bg-transparent text-primary accent-primary focus:ring-1 focus:ring-primary cursor-pointer"
                        />
                        <span className="group-hover:text-foreground transition-colors">
                            {manualLabel}
                        </span>
                    </label>
                    {isManual && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary border border-primary/20">
                            <PenLine className="h-3 w-3" />
                            Manual Entry
                        </span>
                    )}
                </div>
            )}
        </div>
    )
}
