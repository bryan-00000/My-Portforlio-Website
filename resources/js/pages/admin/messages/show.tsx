import DeleteConfirmDialog from '@/components/delete-confirm-dialog';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import messages from '@/routes/admin/messages';
import { type BreadcrumbItem, type ContactMessage } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

export default function ShowMessage({ message }: { message: ContactMessage }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Messages', href: messages.index().url },
        { title: message.subject, href: messages.show(message.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={message.subject} />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <Heading title={message.subject} />
                    <Button variant="outline" asChild>
                        <Link href={messages.index()}>
                            <ArrowLeft className="h-4 w-4" />
                            Back to messages
                        </Link>
                    </Button>
                </div>

                <Card className="max-w-2xl">
                    <CardContent className="space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-4">
                            <div>
                                <p className="font-medium">{message.name}</p>
                                <a
                                    href={`mailto:${message.email}`}
                                    className="text-sm text-muted-foreground hover:underline"
                                >
                                    {message.email}
                                </a>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {new Date(message.created_at).toLocaleString()}
                            </p>
                        </div>

                        <p className="leading-relaxed whitespace-pre-line">
                            {message.body}
                        </p>

                        <div className="flex gap-2 border-t pt-4">
                            <Button asChild>
                                <a
                                    href={`mailto:${message.email}?subject=${encodeURIComponent(
                                        `Re: ${message.subject}`,
                                    )}`}
                                >
                                    Reply by email
                                </a>
                            </Button>
                            <DeleteConfirmDialog
                                title="Delete message"
                                description={`This will permanently delete the message from "${message.name}".`}
                                action={messages.destroy.form(message.id)}
                                trigger={
                                    <Button variant="destructive">
                                        Delete
                                    </Button>
                                }
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
