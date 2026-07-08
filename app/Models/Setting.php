<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'contact_email', 'contact_phone', 'contact_address',
        'operational_hours', 'recipient_email', 'brand_description',
    ];
}