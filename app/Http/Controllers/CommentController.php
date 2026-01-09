<?php

namespace App\Http\Controllers;


use App\Http\Resources\FeatureResource;
use App\Models\Comment;
use App\Models\Feature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CommentController extends Controller
{
  public function store(Request $request, Feature $feature)
  {
    $data = $request->validate([
      'comment' => 'required'
    ]);

    $data['feature_id'] = $feature->id;
    $data['user_id'] = Auth::id();

    Comment::create($data);

    return to_route('features.show', $feature);
  }

   public function destroy(Comment $comment)
  {
    // TODO: create a gate/policy to replace this
    if ($comment->user_id !== Auth::id()) {
      abort(403, 'Unauthorized action.');
    }

    $featureId = $comment->feature_id;
    $comment->delete();

    return to_route('features.show', $featureId);
  }
}
