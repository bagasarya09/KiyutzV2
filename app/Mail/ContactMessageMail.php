<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactMessageMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $senderName,
        public string $senderEmail,
        public string $messageBody,
    ) {}

    public function build()
    {
        return $this->subject('Pesan Baru dari Website Kiyutz')
            ->replyTo($this->senderEmail, $this->senderName) // owner tinggal "Reply"
            ->view('emails.contact-message');
    }
}