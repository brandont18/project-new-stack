

import { useState, useRef } from "react";
import { Command, CommandInput, CommandList, CommandEmpty, CommandItem } from "@/components/ui/command";

export interface CompanySelectOption {
    label: string;
    value: string;
}

interface CompanySelectProps {
    options: CompanySelectOption[];
    loading?: boolean;
    onInputChange: (input: string) => void;
    onSelect: (nit: string, label: string) => void;
}

export function CompanySelect({ options, loading, onInputChange, onSelect }: CompanySelectProps) {
    const [input, setInput] = useState("");
    const [showOptions, setShowOptions] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);
        onInputChange(value);
        setShowOptions(true);
        const match = options.find(opt => opt.label.toLowerCase() === value.toLowerCase());
        if (match) {
            onSelect(match.value, match.label);
            setShowOptions(false);
        }

        if (value === "") {
            onSelect("", "");
            setShowOptions(false);
        }
    };

    const handleSelect = (value: string, label: string) => {
        setInput(label);
        onSelect(value, label);
        setShowOptions(false);
        inputRef.current?.blur();
    };

    return (
        <div className="relative w-full">
            <Command className="rounded-lg border shadow-sm bg-white dark:bg-slate-900">
                <div className="flex items-center border-b px-3">
                    <svg className="mr-2 h-4 w-4 shrink-0 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <CommandInput
                        ref={inputRef}
                        placeholder="Buscar empresa..."
                        value={input}
                        onChange={handleChange}
                        onFocus={() => {
                            onInputChange("");
                            setShowOptions(true);
                        }}
                        onBlur={() => setTimeout(() => setShowOptions(false), 150)}
                        className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {input && (
                        <button
                            type="button"
                            className="ml-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                            onClick={() => {
                                setInput("");
                                onInputChange("");
                                onSelect("", "");
                                setShowOptions(false);
                            }}
                            tabIndex={-1}
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            </Command>
            {showOptions && (
                <div className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-900 border rounded-lg shadow-lg">
                    <CommandList className="max-h-64">
                        {loading ? (
                            <div className="py-6 text-center text-sm text-muted-foreground">Cargando...</div>
                        ) : options.length === 0 ? (
                            <div className="py-6 text-center text-sm text-muted-foreground">No se encontraron empresas</div>
                        ) : (
                            <div className="p-1">
                                {options.map((opt) => (
                                    <div
                                        key={opt.value}
                                        onMouseDown={() => handleSelect(opt.value, opt.label)}
                                        className="cursor-pointer rounded-sm px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground flex items-center"
                                    >
                                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        {opt.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </CommandList>
                </div>
            )}
        </div>
    );
}
