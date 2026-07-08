<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Social extends Model
{
    protected $fillable = ['platform', 'url', 'sort_order', 'status'];
}