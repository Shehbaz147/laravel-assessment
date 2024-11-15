<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        $data = Storage::disk('public')->get('products.json') ?? '[]';
        // dd($data);
        return view('welcome', ['data' => json_decode($data)]);
    }

    public function submit(ProductRequest $request)
    {

        $requestData = $request->only(['product_name', 'quantity_in_stock', 'price_per_item']);

        $data = Storage::disk('public')->get('products.json') ?? collect([]);
        if(is_string($data)) {
            $data = collect(json_decode($data));
        }
        $data->push($requestData);
        Storage::disk('public')->put('products.json', $data->toJson());
        return response()->json(['message' => 'successfully added', 'item' => $requestData]);
    }
}
