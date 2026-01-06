<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{

  protected $fillable = ['comment', 'feature_id', 'user_id']; 
  public function user(): BelongsTo
  {
    return $this->BelongsTo(User::class);
  }

  public function feature(): BelongsTo
  {
    return $this->BelongsTo(Feature::class);
  }
}
