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
