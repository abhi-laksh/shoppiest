<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->bigIncrements('id');

            // By Payment
            $table->string('transaction_id')->unique();

            $table->string('status')->default('pending');

            $table->bigInteger('payment_option_id')->unsigned()->index();

            $table->bigInteger('user_id')->unsigned()->index();

            $table->dateTime('payment_date')->nullable();

            $table->dateTime('amount')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payments');
    }
}
