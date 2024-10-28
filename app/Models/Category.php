<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Category extends Model
{

    protected $table = 'categories';

    protected $fillable = [
        'categories', 'created_at', 'updated_at'
    ];

    public function posts(): BelongsToMany {
        return $this->belongsToMany(Post::class, 'post_category');
    }
    
    use HasFactory;
}