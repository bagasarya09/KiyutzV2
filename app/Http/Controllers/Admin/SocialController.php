<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Social;
use Illuminate\Http\Request;

class SocialController extends Controller
{
    public function store(Request $request)
    {
        Social::create($this->validated($request));
        return back()->with('success', 'Media sosial ditambahkan.');
    }

    public function update(Request $request, Social $social)
    {
        $social->update($this->validated($request));
        return back()->with('success', 'Media sosial diperbarui.');
    }

    public function destroy(Social $social)
    {
        $social->delete();
        return back()->with('success', 'Media sosial dihapus.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'platform'   => ['required', 'string', 'max:50'],
            'url'        => ['required', 'url', 'max:255'],
            'sort_order' => ['nullable', 'integer'],
            'status'     => ['required', 'in:aktif,inaktif'],
        ]);
    }
}