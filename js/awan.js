/*hamburger*/
$(document).ready(function () {
  $(".first-button").on("click", function () {
    $(".animated-icon1").toggleClass("open");
  });
  $(".second-button").on("click", function () {
    $(".animated-icon2").toggleClass("open");
  });
  $(".third-button").on("click", function () {
    $(".animated-icon3").toggleClass("open");
  });
});
/*hamburger*/

/*Scroll ilang*/
$(function () {
  var documentEl = $(document),
    fadeElem = $(".scroll-ilang");

  documentEl.on("scroll", function () {
    var currScrollPos = documentEl.scrollTop();

    fadeElem.each(function () {
      var $this = $(this),
        elemOffsetTop = $this.offset().top;
      if (currScrollPos > elemOffsetTop)
        $this.css("opacity", 1 - (currScrollPos - elemOffsetTop) / 800);
    });
  });
});
/*Scroll ilang*/

/*smoth scroll*/
$(".page-scroll").on("click", function (e) {
  var tujuan = $(this).attr("href");

  var elemenTujuan = $(tujuan);

  $("html,body").animate(
    {
      scrollTop: elemenTujuan.offset().top - 0,
    },
    1250,
    "easeInOutExpo"
  );

  e.preventDefault();
});
/*END smoth scroll*/

//filterizr call
$(document).ready(function () {
  // Initialize Filterizr with no filter applied
  var filterizd = $(".filtr-container").filterizr({
    filter: "all",
  });

  // Apply 'page1' filter after a short delay to ensure 'all' is active first
  setTimeout(function () {
    filterizd.filterizr("filter", "page1");
  }, 5000);

  $(".filterListItem").on("click", function () {
    $(".filterListItem").removeClass("active");
    $(this).addClass("active");
  });
});

// awan.js

// Fungsi untuk memperbarui gambar
function updateImages() {
  const images = document.querySelectorAll(".gdrive-image");
  images.forEach(function (img) {
    const imageId = img.getAttribute("idLink");
    img.src = `https://drive.google.com/thumbnail?id=${imageId}&sz=s1080`;
  });
}

// Event listener untuk memanggil fungsi updateImages saat window load
window.addEventListener("load", updateImages);

// //Fungsi untuk lightgallery
// document.addEventListener("DOMContentLoaded", function () {
//   lightGallery(document.getElementById("animated-thumbnails-gallery"), {
//     selector: ".gallery-item",
//     thumbnail: true, // Enable thumbnail support
//     zoom: true, // Enable zoom feature
//     plugins: [lgZoom, lgThumbnail], // Make sure the plugins are listed here
//   });
// });
