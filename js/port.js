// $(document).ready(function () {
fetch(
  "https://script.googleusercontent.com/macros/echo?user_content_key=dX-__99YMm0TkGVmkiS55CPRRVRJPPu3qnMvgHo1-Ivv3gxMm_khBAlnbZiMmLiRzvS7gKq3Ato63nJDqhz62I-E6T-D7DScm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnOliM8oaR4zVbh_ANpuBJ5PXCdYFJDymHhHTpgcLZwARXPZvanHgFmZhD3icWRjzV5b5diqMKQi_t4KvObAYKF8ghX1EaRsG_g&lib=MDXO39r6rQqhojnhGApfwNG9v2Zxi0IEI"
) // Ganti dengan link JSON yang benar
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("gallery");

    data.forEach((item) => {
      const anchor = document.createElement("a");
      //   anchor.setAttribute("data-lg-size", "1280-720");
      anchor.classList.add(
        "gallery-item",
        "filtr-item",
        "col-lg-2",
        "col-md-6",
        "col-sm-12"
      );
      anchor.setAttribute("data-category", item.media_type);
      anchor.setAttribute(
        "data-iframe",
        item.media_type === "video" ? "true" : "false"
      );
      anchor.setAttribute("data-src", item.link_media);
      anchor.setAttribute("data-sub-html", item.keterangan);

      const img = document.createElement("img");
      img.setAttribute("alt", item.nama);
      img.classList.add("img-responsive", "border-box-shadow");
      img.setAttribute("src", item.link_thumbnail);

      anchor.appendChild(img);
      container.appendChild(anchor);
    });

    // Inisialisasi lightGallery setelah data selesai dimuat
    lightGallery(document.getElementById("gallery-mixed-content"), {
      selector: ".gallery-item",
      thumbnail: true,
      zoom: true,
      mobileSettings: {
        controls: true,
        showCloseIcon: true,
        download: false,
      },
      plugins: [lgZoom, lgThumbnail, lgVideo],
    });

    // Inisialisasi Filterizr setelah elemen dimuat
    var filterizd = $(".filtr-container").filterizr({ filter: "all" });

    // Terapkan filter "video" setelah delay
    setTimeout(() => {
      filterizd.filterizr("filter", "video");
    }, 5000);
  })
  .catch((error) => console.error("Error fetching data:", error));

// Event listener untuk tombol filter
$(".filterListItem").on("click", function () {
  $(".filterListItem").removeClass("active");
  $(this).addClass("active");
});
// });
