<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class Post extends Model
{
    const EXCERPT_LENGTH = 300;

    protected $fillable = [
        'title', 'description', 'categories', 'created_at', 'updated_at', 'published_at'
    ];

    public function excerpt() {
        return Str::limit($this->description, Post::EXCERPT_LENGTH);
    }
    
    public function categories(): BelongsToMany {
        return $this->belongsToMany(Category::class, 'post_category');
    }

    // disuruh nambahin sama microsoft copilot
    
    // protected static function boot() { 
    //     parent::boot();
    //     static::creating(function ($post) { 
    //         if (is_null($post->published_at)) { 
    //             $post->published_at = now(); 
    //         } 
    //     }); 
    // }

    use HasFactory;
}
