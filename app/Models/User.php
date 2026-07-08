<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'email', 'password','role'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */

    protected $hidden = [
    'password', 'remember_token', 'two_factor_secret', // 👈 sembunyikan secret
    ];

    protected function casts(): array
    {
        return [
        'email_verified_at'       => 'datetime',
        'two_factor_confirmed_at' => 'datetime',
        'password'                => 'hashed',
        'two_factor_secret'       => 'encrypted',
        ];
    }
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }
    public function hasTwoFactorEnabled(): bool
    {
        return ! is_null($this->two_factor_secret) && ! is_null($this->two_factor_confirmed_at);
    }
}
