<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('id');
            
            $table->string('code')->unique();
            $table->string('name')->unique();
            $table->string('short_description');
            $table->string('description');
            $table->string('selling_price');
            $table->string('cost_price');
            $table->string('stock');

            $table->integer('sub_category_id')->unsigned()->index();
            $table->integer('brand_id')->unsigned()->index();

            $table->boolean('is_active')->default(1);
            
            $table->softDeletes();

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
        Schema::dropIfExists('products');
    }
}
