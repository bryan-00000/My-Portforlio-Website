import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { type Method } from '@inertiajs/core';
import { Form } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { type ReactNode } from 'react';

interface DeleteConfirmDialogProps {
    title: string;
    description: string;
    action: { action: string; method: Method };
    trigger?: ReactNode;
}

export default function DeleteConfirmDialog({
    title,
    description,
    action,
    trigger,
}: DeleteConfirmDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger ?? (
                    <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                        <span className="sr-only">Delete</span>
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
                <Form {...action} options={{ preserveScroll: true }}>
                    {({ processing }) => (
                        <DialogFooter className="gap-2">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                variant="destructive"
                                disabled={processing}
                            >
                                Delete
                            </Button>
                        </DialogFooter>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
