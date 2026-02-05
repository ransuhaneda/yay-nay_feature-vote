import InputError from './input-error';
import { Input } from './ui/input';
import { Label } from './ui/label';

type ReadOnlyField = {
    label: string;
    value: string;
    error?: string;
};

export function ReadOnlyField({ label, value, error }: ReadOnlyField) {
    return (
        <div className="grid gap-2">
            <Label htmlFor={label}>{label}</Label>
            <Input
                id={label}
                name={label}
                type="text"
                defaultValue={value}
                autoComplete="off"
                disabled
                className="pointer-events-none mt-1 block w-full border-neutral-300"
                readOnly
            />
            {error && <InputError message={error} />}
        </div>
    );
}
