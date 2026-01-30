import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectOption } from "@/components/ui/select";

export interface FormField {
    name: string;
    label: string;
    type?: string;
    required?: boolean;
    options?: Array<{ value: string; label: string }>;
    value?: string;
    onChange?: (value: string) => void;
}

interface FormModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (values: Record<string, any>) => void;
    fields: FormField[];
    title?: string;
    submitText?: string;
    loading?: boolean;
}

export function FormModal({ open, onClose, onSubmit, fields, title = "Crear", submitText = "Crear", loading: externalLoading }: FormModalProps) {
    const [values, setValues] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await onSubmit(values);
        setLoading(false);
        onClose();
    };

    const isLoading = loading || externalLoading;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <Dialog.Content>
                <div className="sm:max-w-md">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <h2 className="text-xl font-bold text-primary">{title}</h2>
                            <p className="text-xs text-muted-foreground">Completa la información requerida</p>
                        </div>
                        <div className="space-y-4">
                            {fields.map((field) => (
                                <div key={field.name} className="space-y-2">
                                    <Label htmlFor={field.name} className="text-sm font-medium text-foreground">
                                        {field.label}
                                        {field.required && <span className="text-destructive ml-1">*</span>}
                                    </Label>
                                    {field.type === "select" && field.options ? (
                                        <Select
                                            id={field.name}
                                            name={field.name}
                                            required={field.required}
                                            value={field.value || values[field.name] || ""}
                                            onChange={(e) => {
                                                handleChange(e);
                                                field.onChange?.(e.target.value);
                                            }}
                                        >
                                            <SelectOption value="">Seleccionar...</SelectOption>
                                            {field.options.map((opt) => (
                                                <SelectOption key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </SelectOption>
                                            ))}
                                        </Select>
                                    ) : (
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type={field.type || "text"}
                                            required={field.required}
                                            value={values[field.name] || ""}
                                            onChange={handleChange}
                                            placeholder={`Ingresa ${field.label.toLowerCase()}`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <Button type="button" variant="outline" onClick={onClose} className="min-w-[80px]">
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="min-w-[80px] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Guardando...</span>
                                    </div>
                                ) : (
                                    submitText
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </Dialog.Content>
        </Dialog>
    );
}

export function CreateButton({ onClick, children = "Crear" }: { onClick: () => void; children?: React.ReactNode }) {
    return (
        <Button
            onClick={onClick}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
        >
            {children}
        </Button>
    );
}
