<?php

use App\User;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// Route::post('/abc','API\Admin\CNTR@index');


Route::post('/login', 'API\AuthController@login');

Route::any('/user', function () {
    return response()->json([
        "user" => User::find(1)->role
    ], 200);
});

Route::any('/products', 'API\ProductController@index')->name('product.index');
Route::any('/categories', 'API\CategoryController@index')->name('category.index');
Route::any('/subcategories', 'API\SubCategoryController@index')->name('subcategory.index');
Route::any('/brands', 'API\BrandController@index')->name('brand.index');

Route::group(['middleware' => ['auth:api', 'role']], function () {

    Route::any('/user', 'API\UserController@index');


    // Admin Route
    Route::group(['middleware' => ['scope:admin'], 'prefix' => 'admin'], function () {

        Route::any('/users', 'API\Admin\AdminUserController@index');

        Route::group(['prefix' => 'category'], function () {

            Route::post('/create', 'API\Admin\AdminCategoryController@create')->name('admin.category.create');

            Route::get('/getcode', 'API\Admin\AdminCategoryController@getNewCode')->name('admin.category.getNewCode');

            Route::put('/update/{id}', 'API\Admin\AdminCategoryController@update')->name('admin.category.update');

            Route::delete('/delete/{id}', 'API\Admin\AdminCategoryController@delete')->name('admin.category.delete');
        });

        Route::group(['prefix' => 'subcategory'], function () {

            Route::post('/create', 'API\Admin\AdminSubCategoryController@create')->name('admin.subcategory.create');

            Route::get('/getcode', 'API\Admin\AdminSubCategoryController@getNewCode')->name('admin.subcategory.getNewCode');

            Route::put('/update/{id}', 'API\Admin\AdminSubCategoryController@update')->name('admin.subcategory.update');

            Route::delete('/delete/{id}', 'API\Admin\AdminSubCategoryController@delete')->name('admin.subcategory.delete');
        });

        Route::group(['prefix' => 'brand'], function () {

            Route::post('/create', 'API\Admin\AdminBrandController@create')->name('admin.brand.create');

            Route::get('/getcode', 'API\Admin\AdminBrandController@getNewCode')->name('admin.brand.getNewCode');

            Route::put('/update/{id}', 'API\Admin\AdminBrandController@update')->name('admin.brand.update');

            Route::delete('/delete/{id}', 'API\Admin\AdminBrandController@delete')->name('admin.brand.delete');
        });

        Route::group(['prefix' => 'product'], function () {
            
            Route::post('/create', 'API\Admin\AdminProductController@create')->name('admin.product.create');

            Route::get('/getcode', 'API\Admin\AdminProductController@getNewCode')->name('admin.product.getNewCode');

            Route::put('/update/{id}', 'API\Admin\AdminProductController@update')->name('admin.product.update');

            Route::delete('/{id}/image/{image_id}/remove', 'API\Admin\AdminProductController@removeImage')->name('admin.product.remove.image');

            Route::delete('/{id}/images/remove', 'API\Admin\AdminProductController@removeAllImages')->name('admin.product.remove.images');

            Route::delete('/delete/{id}', 'API\Admin\AdminProductController@delete')->name('admin.product.delete');
        });
    });
});
