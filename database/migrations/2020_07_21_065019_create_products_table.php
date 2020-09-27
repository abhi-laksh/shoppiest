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
            /* 
                Prefix1 - BRAND
                Prefix2 - CAT
                Prefix3 - SUBCAT
                Number - 00000
                Suffix[] - Attirbutes (Color, Size)

                Brand- Mufti
                E.g - MFT-MEN-TSH-00000-XL-YLW,
                E.g - MFT-MEN-SHR-00000-M-BLK,

                will be generated afterwards
            */

            $table->string('code');

            $table->string('sku');

            $table->string('name')->unique();
            
            $table->string('short_description');
            $table->string('description');
            
            // for admin personal usage
            $table->string('private_description')->nullable();

            $table->integer('sub_category_id')->unsigned()->index();

            $table->integer('brand_id')->unsigned()->index();
            
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
