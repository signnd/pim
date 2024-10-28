<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Requests\StorePostRequest;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Str;
use App\Http\Controllers\CategoryController;
use App\Models\Category;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with('categories')->latest()->orderBy('created_at')->get();
        return Inertia::render('Post/Index', ['posts' => $posts, 'flash' => session('message')
    ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Post/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        $post = Post::create(
            $request->validated()
        );
        if ($request->has('categories') && !empty(trim($request->categories))) {
            $categoryInput = explode(',', $request->categories); // Memecah input berdasarkan koma
            $categoryIds = [];
    
            // Cek apakah kategori ada di database, jika tidak tambahkan yang baru
            foreach ($categoryInput as $category) {
                $categories = Category::firstOrCreate(['categories' => trim($category)]);
                $categoryIds[] = $categories->id;
            }
    
            // Sinkronisasi kategori dengan post
            $post->categories()->sync($categoryIds);
        } else {
            $noCategory = Category::firstOrCreate(['categories' => 'No category']);
            $post->categories()->sync($noCategory->id);
        }
        return Redirect::route('posts.index')->with('message', 'Post berhasil disimpan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $categories = $post->categories()->get(['categories.id', 'categories.categories']);

        return Inertia::render('Post/show', [
            'post' => [
               'id' => $post->id,
               'title' => $post->title,
               'description' => $post->description,
               'created_at' => $post->created_at,
               'updated_at' => $post->updated_at,
               'categories' => $categories,
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        $categories = $post->categories()->pluck('categories.categories')->toArray();

        return Inertia::render('Post/Edit', [
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'description' => $post->description,
                'updated_at' => $post->updated_at,
                'categories' => implode(', ', $categories)
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StorePostRequest $request, Post $post)
    {
        $post->update($request->only(['title', 'description']));
        if ($request->has('categories') && !empty(trim($request->categories))) {
            $categoryInput = explode(', ', $request->categories); // Memecah input berdasarkan koma
            $categoryIds = [];
    
            // Cek apakah kategori ada di database, jika tidak tambahkan yang baru
            foreach ($categoryInput as $category) {
                $categories = Category::firstOrCreate(['categories' => trim($category)]);
                $categoryIds[] = $categories->id;
            }
    
            // Sinkronisasi kategori dengan post
            $post->categories()->sync($categoryIds);
        } else {
            $noCategory = Category::firstOrCreate(['categories' => 'No category']);
            $post->categories()->sync($noCategory->id);
        }
        return Redirect::route('posts.index')->with('message', 'Post berhasil di-edit');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();
        return Redirect::route('posts.index')->with('message', 'Post berhasil dihapus');
    }

    /**
     * Showing posts based on the category
     */
    public function postsByCategory(Category $category)
    {
        // Ambil semua post yang memiliki kategori tertentu
        $posts = $category->posts()->latest()->orderBy('created_at')->with('categories')->get();

        // Render ke view
        return Inertia::render('Post/PostsByCategory', [
            'posts' => $posts,
            'category' => $category->categories
        ]);
    }
}
