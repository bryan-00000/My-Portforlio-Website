<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class MessageController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/messages/index', [
            'messages' => ContactMessage::query()->latest()->get(),
        ]);
    }

    public function show(ContactMessage $message): Response
    {
        if (! $message->read_at) {
            $message->update(['read_at' => now()]);
        }

        return Inertia::render('admin/messages/show', [
            'message' => $message,
        ]);
    }

    public function markRead(ContactMessage $message): RedirectResponse
    {
        $message->update(['read_at' => now()]);

        return back()->with('success', 'Marked as read.');
    }

    public function destroy(ContactMessage $message): RedirectResponse
    {
        $message->delete();

        return to_route('admin.messages.index')->with('success', 'Message deleted.');
    }
}
