<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ServiceRequest;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/services/index', [
            'services' => Service::query()->orderBy('sort_order')->get(),
        ]);
    }

    public function store(ServiceRequest $request): RedirectResponse
    {
        Service::query()->create($request->validated());

        return to_route('admin.services.index')->with('success', 'Service added.');
    }

    public function update(ServiceRequest $request, Service $service): RedirectResponse
    {
        $service->update($request->validated());

        return to_route('admin.services.index')->with('success', 'Service updated.');
    }

    public function destroy(Service $service): RedirectResponse
    {
        $service->delete();

        return to_route('admin.services.index')->with('success', 'Service deleted.');
    }
}
