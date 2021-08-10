<template>
  <div>
    <div class="wrapper">
      <div class="content-page">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
                <div class="d-flex flex-wrap align-items-center justify-content-between my-schedule mb-4">
                   <div class="d-flex align-items-center justify-content-between">
                        <h4 class="font-weight-bold">申请列表</h4>
                    </div>  
                    <div class="create-workform">
                        <div class="d-flex flex-wrap align-items-center justify-content-between">
                            <div class="modal-product-search d-flex">
                                <form class="mr-3 position-relative">
                                    <div class="form-group mb-0">
                                    <input type="text" class="form-control" id="exampleInputText"  placeholder="搜索">
                                    <a class="search-link" href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </a>
                                    </div>
                                </form>
                                <a href="order-new.html" class="btn btn-primary position-relative d-flex align-items-center justify-content-between">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    添加申请
                                </a>
                            </div>
                        </div>
                    </div>                    
                </div>
                
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card card-block card-stretch">
                            <div class="card-body p-0">
                                <div class="d-flex justify-content-between align-items-center p-3">
                                    <h5 class="font-weight-bold">申请列表</h5>
                                    <button class="btn btn-secondary btn-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-1" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        导 出
                                    </button>
                                </div>
                                <div class="table-responsive">
                                    <table class="table data-table mb-0">
                                        <thead class="table-color-heading">
                                            <tr class="text-light">                                                
                                                <th scope="col" class="w-01 pr-0">
                                                    <div class="d-flex justify-content-start align-items-end mb-1">
                                                        <div class="custom-control custom-checkbox custom-control-inline">
                                                        <input type="checkbox" class="custom-control-input m-0" id="customCheck">
                                                        <label class="custom-control-label" for="customCheck"></label>
                                                        </div>
                                                    </div>                                                    
                                                </th>
                                                <th scope="col">
                                                    <label class="text-muted m-0" >ID</label>
                                                </th>
                                                <th scope="col">
                                                    <label class="text-muted mb-0" >申请单编号</label>
                                                </th>
                                                <th scope="col" class="dates">
                                                    <label class="text-muted mb-0" >申请事由</label>
                                                </th>
                                                <th scope="col">
                                                    <label class="text-muted mb-0">申请金额</label>
                                                </th>
                                                <th scope="col" class="text-right">
                                                    <label class="text-muted mb-0">付款名称</label>
                                                </th>
                                                <th scope="col">
                                                    <label class="text-muted mb-0" >付款账号</label>
                                                </th>
                                                <th scope="col" class="text-right">
                                                    <span class="text-muted" >操作</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="white-space-no-wrap">
                                                <td class="pr-0">
                                                    <div class="custom-control custom-checkbox custom-control-inline">
                                                    <input type="checkbox" class="custom-control-input m-0" id="customCheck1">
                                                    <label class="custom-control-label" for="customCheck1"></label>
                                                    </div>                                    
                                                </td>
                                                <td>
                                                    OR-325548
                                                </td>
                                                <td>
                                                    OR-325548
                                                </td>
                                                <td>01 Jan 2021</td>
                                                <td>
                                                    Jack Ryan
                                                </td>
                                                <td class="text-right">
                                                    $104.98
                                                </td>
                                                <td>
                                                    <p class="mb-0 text-success font-weight-bold d-flex justify-content-start align-items-center">
                                                        <small><svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">                                                
                                                        <circle cx="12" cy="12" r="8" fill="#3cb72c"></circle></svg>
                                                        </small>Completed
                                                    </p>
                                                </td>
                                                <td>
                                                    <div class="d-flex justify-content-end align-items-center">
                                                       <a class="" data-toggle="tooltip" data-placement="top" title="" data-original-title="View" href="order-details.html">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="text-secondary mx-4" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </a>
                                                        <a class="" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit" href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="text-secondary" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr class="white-space-no-wrap">
                                                <td class="pr-0">
                                                    <div class="custom-control custom-checkbox custom-control-inline">
                                                    <input type="checkbox" class="custom-control-input m-0" id="customCheck2">
                                                    <label class="custom-control-label" for="customCheck2"></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    OR-325548
                                                </td>
                                                <td class="">
                                                    OR-223544
                                                </td>
                                                <td>02 Jan 2021</td>
                                                <td>
                                                    Matt Damon
                                                </td>
                                                <td class="text-right">
                                                    $99.00
                                                </td>
                                                <td>
                                                    <p class="mb-0 text-success font-weight-bold d-flex justify-content-start align-items-center">
                                                        <small><svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">                                                
                                                        <circle cx="12" cy="12" r="8" fill="#3cb72c"></circle></svg>
                                                        </small>Completed
                                                    </p>
                                                </td>
                                                <td>
                                                    <div class="d-flex justify-content-end align-items-center">
                                                       <a class="" data-toggle="tooltip" data-placement="top" title="" data-original-title="View" href="order-details.html">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="text-secondary mx-4" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </a>
                                                        <a class="" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit" href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="text-secondary" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr class="white-space-no-wrap">
                                                <td class="pr-0">
                                                    <div class="custom-control custom-checkbox custom-control-inline">
                                                    <input type="checkbox" class="custom-control-input m-0" id="customCheck3">
                                                    <label class="custom-control-label" for="customCheck3"></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    OR-325548
                                                </td>
                                                <td>
                                                     OR-125623
                                                </td>
                                                <td>02 Jan 2021</td>
                                                <td>
                                                    Caitriona Balfe
                                                </td>
                                                <td class="text-right">
                                                    $249.49
                                                </td>
                                                <td>
                                                    <p class="mb-0 text-warning font-weight-bold d-flex justify-content-start align-items-center">
                                                        <small><svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">                                                
                                                        <circle cx="12" cy="12" r="8" fill="#db7e06"></circle></svg>
                                                        </small>Pending
                                                    </p>
                                                </td>
                                                <td>
                                                    <div class="d-flex justify-content-end align-items-center">
                                                       <a class="" data-toggle="tooltip" data-placement="top" title="" data-original-title="View" href="order-details.html">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="text-secondary mx-4" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </a>
                                                        <a class="" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit" href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="text-secondary" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr class="white-space-no-wrap">
                                                <td class="pr-0">
                                                    <div class="custom-control custom-checkbox custom-control-inline">
                                                    <input type="checkbox" class="custom-control-input m-0" id="customCheck4">
                                                    <label class="custom-control-label" for="customCheck4"></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    OR-325548
                                                </td>
                                                <td>
                                                    OR-662210
                                                </td>
                                                <td>02 Jan 2021</td>
                                                <td>
                                                    Josh Lucas
                                                </td>
                                                <td class="text-right">
                                                    $9.99
                                                </td>
                                                <td>
                                                    <p class="mb-0 text-success font-weight-bold d-flex justify-content-start align-items-center">
                                                        <small><svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">                                                
                                                        <circle cx="12" cy="12" r="8" fill="#3cb72c"></circle></svg>
                                                        </small>Completed
                                                    </p>
                                                </td>
                                                <td>
                                                    <div class="d-flex justify-content-end align-items-center">
                                                       <a class="" data-toggle="tooltip" data-placement="top" title="" data-original-title="View" href="order-details.html">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="text-secondary mx-4" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </a>
                                                        <a class="" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit" href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="text-secondary" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr class="white-space-no-wrap">
                                                <td class="pr-0">
                                                    <div class="custom-control custom-checkbox custom-control-inline">
                                                    <input type="checkbox" class="custom-control-input m-0" id="customCheck5">
                                                    <label class="custom-control-label" for="customCheck5"></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    OR-325548
                                                </td>
                                                <td>
                                                    OR-901020
                                                </td>
                                                <td>03 Jan 2021</td>
                                                <td>
                                                    Jon Bernthal
                                                </td>
                                                <td class="text-right">
                                                    $90.49
                                                </td>
                                                <td>
                                                    <p class="mb-0 text-danger font-weight-bold d-flex justify-content-start align-items-center">
                                                        <small><svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">                                                
                                                        <circle cx="12" cy="12" r="8" fill="#F42B3D"></circle></svg>
                                                        </small>Cancelled
                                                    </p>
                                                </td>
                                                <td>
                                                    <div class="d-flex justify-content-end align-items-center">
                                                       <a class="" data-toggle="tooltip" data-placement="top" title="" data-original-title="View" href="order-details.html">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="text-secondary mx-4" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </a>
                                                        <a class="" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit" href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="text-secondary" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="iq-footer">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-6">
            <ul class="list-inline mb-0">
            </ul>
          </div>
          <div class="col-lg-6 text-right">
            <span class="mr-1">Copyright © 2021.</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
// import "@/utils/assets/js/demo.js";
// import "@/utils/js/backend-bundle.min.js";
// import "@/utils/js/sidebar.js";
// import "@/utils/js/flex-tree.min.js";
// import "@/utils/js/tree.js";
// import "@/utils/js/table-treeview.js";
// import "@/utils/js/slider.js";
// import "@/utils/js/app.js";

export default {
  data() {
    return {
      showUser: false
    }
  }
}
</script>
