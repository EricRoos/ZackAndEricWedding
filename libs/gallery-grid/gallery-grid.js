/**
"Portfolio Gallery with filtering category"
Bootstrap 3.3.0 Snippet by meetshah3795 
Url: https://bootsnipp.com/snippets/GzKKE

Snippets License (MIT license)
Copyright (c) 2013 Bootsnipp.com
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

**/

function buildGalleryImageSection(imgData){
  let classes = imgData.categories.map(function(category){
    return "gallery-"+category;
  }).join(" ");
  var out = ""
  out += '<div class="gallery_product col-lg-4 col-md-4 col-sm-4 col-xs-6 filter '+ classes +'">'
  out += '<a href="img/gallery/gallery-image-01.jpg" class="mfp-image" title="Gallery image title">'
  out += '<img src="img/gallery/gallery-image-01.jpg" class="img-responsive" alt="Gallery image">'
  out += '</a></div>'
  console.log(out);
  return out;
}
$(document).ready(function(){
  $.get("/gallery.json", function(data){
    data.forEach(function(imgData){
      console.log(imgData);
      $(".gallery-popup").append(buildGalleryImageSection(imgData));
      $(".filter-button").click(function(){
        var value = $(this).attr('data-filter');
        if(value == "all"){
          //$('.filter').removeClass('hidden');
          $('.filter').show('1000');
        }else{
          // $('.filter[filter-item="'+value+'"]').removeClass('hidden');
          // $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
          $(".filter").not('.'+value).hide('3000');
          $('.filter').filter('.'+value).show('3000');
        }
        $(".filter-button").removeClass("active");
        $(this).addClass("active");
      });
    });
  });
});
