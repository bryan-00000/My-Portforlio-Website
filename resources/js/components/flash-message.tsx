import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { AlertCircleIcon, CheckCircle2Icon } from 'lucide-react';

export default function FlashMessage({ className }: { className?: string }) {
    const { flash } = usePage<SharedData>().props;

    if (!flash?.success && !flash?.error) {
        return null;
    }

    return (
        <div className={cn('space-y-3', className)}>
            {flash.success && (
                <Alert className="border-emerald-600/30 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
                    <CheckCircle2Icon className="text-emerald-600 dark:text-emerald-400" />
                    <AlertDescription className="text-emerald-900 dark:text-emerald-200">
                        {flash.success}
                    </AlertDescription>
                </Alert>
            )}
            {flash.error && (
                <Alert variant="destructive">
                    <AlertCircleIcon />
                    <AlertDescription>{flash.error}</AlertDescription>
                </Alert>
            )}
        </div>
    );
}
