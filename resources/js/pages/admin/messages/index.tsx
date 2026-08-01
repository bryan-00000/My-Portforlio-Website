import DeleteConfirmDialog from '@/components/delete-confirm-dialog';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import messages from '@/routes/admin/messages';
import { type BreadcrumbItem, type ContactMessage } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Messages', href: messages.index().url },
];

export default function MessagesIndex({
    messages: messageList,
}: {
    messages: ContactMessage[];
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Messages" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <Heading
                    title="Messages"
                    description="Messages submitted through your contact form."
                />

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>From</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>Received</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {messageList.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center text-muted-foreground"
                                    >
                                        No messages yet.
                                    </TableCell>
                                </TableRow>
                            )}
                            {messageList.map((message) => (
                                <TableRow key={message.id}>
                                    <TableCell>
                                        <Link
                                            href={messages.show(message.id)}
                                            className="flex items-center gap-2 font-medium hover:underline"
                                        >
                                            {!message.read_at && (
                                                <span className="h-2 w-2 rounded-full bg-primary" />
                                            )}
                                            {message.name}
                                        </Link>
                                        <div className="text-sm text-muted-foreground">
                                            {message.email}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            href={messages.show(message.id)}
                                            className="hover:underline"
                                        >
                                            {message.subject}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {new Date(
                                            message.created_at,
                                        ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {!message.read_at && (
                                            <Badge
                                                variant="secondary"
                                                className="mr-2"
                                            >
                                                New
                                            </Badge>
                                        )}
                                        <DeleteConfirmDialog
                                            title="Delete message"
                                            description={`This will permanently delete the message from "${message.name}".`}
                                            action={messages.destroy.form(
                                                message.id,
                                            )}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
