<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Feature extends Model
{
    public function upvotes(): HasMany
    {
      return $this->HasMany(Upvote::class);
    }

    public function comments(): HasMany
    {
      return $this->HasMany(Comment::class);
    }

    public function user(): BelongsTo
    {
      return $this->BelongsTo(User::class);
    }
}
