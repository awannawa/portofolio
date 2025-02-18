var loading = document.getElementById("loading"); // Loading spinner element

let currentPage = 0;
const itemsPerPage = 10;
let allData = [];

function loadItems(page) {
  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dataToShow = allData.slice(startIndex, endIndex);

  const container = document.getElementById("gallery");
  container.innerHTML = "";

  dataToShow.forEach((item) => {
    if (item.nama !== "") {
      const anchor = document.createElement("a");
      anchor.classList.add(
        "gallery-item",
        "filtr-item",
        "col-lg-3",
        "col-md-6",
        "col-sm-12"
      );
      anchor.setAttribute("data-category", item.media_type);
      if (item.media_type === "Video") {
        anchor.setAttribute("data-iframe", "true");
        anchor.setAttribute(
          "data-src",
          "https://drive.google.com/file/d/" + item.id_media + "/preview"
        );
      } else {
        anchor.setAttribute(
          "data-src",
          "https://drive.google.com/thumbnail?id=" + item.id_media + "&sz=s1080"
        );
      }

      anchor.setAttribute("data-sub-html", item.keterangan);

      const img = document.createElement("img");
      img.setAttribute("alt", item.nama);
      img.classList.add("img-responsive", "border-box-shadow");
      img.setAttribute(
        "src",
        "https://lh3.googleusercontent.com/d/" + item.id_thumbnail + "=s512-rw"
      );

      const span = document.createElement("span");
      span.classList.add("item-desc");
      span.innerHTML = "<b>" + item.media_type + "</b>";

      const span2 = document.createElement("span");
      span2.classList.add("item-desc2");
      span2.innerHTML =
        "<b>" + item.nama + "</b>\n<i>Update : " + item.date + "</i>";

      anchor.appendChild(img);
      anchor.appendChild(span);
      anchor.appendChild(span2);
      container.appendChild(anchor);
    }
  });

  const nextPageButton = document.getElementById("nextPageButton");
  const pageIndicator = document.getElementById("pageIndicator");
  const prevPageButton = document.getElementById("prevPageButton");
  if (endIndex >= allData.length) {
    nextPageButton.style.display = "none";
  } else {
    nextPageButton.style.display = "block";
  }

  if (startIndex === 0) {
    prevPageButton.style.display = "none";
  } else {
    prevPageButton.style.display = "block";
  }
  // Update page number indicator
  updatePageIndicator();

  // Inisialisasi LightGallery setelah elemen dimuat
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
  $(".filtr-container").filterizr({ filter: "all" });
}

function updatePageIndicator() {
  const pageIndicator = document.getElementById("pageIndicator");
  const totalPages = Math.ceil(allData.length / itemsPerPage);
  let pageNumbersHtml = "";

  // Function to generate page numbers HTML
  function generatePageNumbers(start, end) {
    for (let i = start; i < end; i++) {
      pageNumbersHtml += `<span class="page-number ${
        i === currentPage ? "active" : ""
      }" data-page="${i}">${i + 1}</span>`;
    }
  }

  if (totalPages <= 6) {
    // If total pages are 6 or less, show all page numbers
    generatePageNumbers(0, totalPages);
  } else {
    // Display first 3 pages and last 3 pages
    if (currentPage < 2) {
      generatePageNumbers(0, 6);
    } else if (currentPage >= 2 && currentPage < totalPages - 2) {
      generatePageNumbers(0, 2);
      pageNumbersHtml += "<span>...</span>";
      generatePageNumbers(currentPage - 1, currentPage + 2);
      pageNumbersHtml += "<span>...</span>";
      generatePageNumbers(totalPages - 2, totalPages);
    } else {
      generatePageNumbers(0, 2);
      pageNumbersHtml += "<span>...</span>";
      generatePageNumbers(totalPages - 6, totalPages);
    }
    pageNumbersHtml += "<span>....</span>";
  }

  pageIndicator.innerHTML = pageNumbersHtml;

  // Add click event listeners for page numbers
  const pageNumbers = document.querySelectorAll(".page-number");
  pageNumbers.forEach((pageNumber) => {
    pageNumber.addEventListener("click", (e) => {
      currentPage = parseInt(e.target.getAttribute("data-page"));
      loadItems(currentPage);
      updatePageIndicator(); // Update the page indicator after changing the page
    });
  });

  if (currentPage >= 2) {
    const ellipses = document.querySelectorAll("#pageIndicator span");
    ellipses.forEach((ellipsis) => {
      if (ellipsis.textContent === "....") {
        ellipsis.style.display = "none";
      }
    });
  }
}

function fetchData() {
  loading.style.display = "block"; // Show loading spinner
  fetch(
    "https://script.googleusercontent.com/macros/echo?user_content_key=dX-__99YMm0TkGVmkiS55CPRRVRJPPu3qnMvgHo1-Ivv3gxMm_khBAlnbZiMmLiRzvS7gKq3Ato63nJDqhz62I-E6T-D7DScm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnOliM8oaR4zVbh_ANpuBJ5PXCdYFJDymHhHTpgcLZwARXPZvanHgFmZhD3icWRjzV5b5diqMKQi_t4KvObAYKF8ghX1EaRsG_g&lib=MDXO39r6rQqhojnhGApfwNG9v2Zxi0IEI"
  )
    .then((response) => response.json())
    .then((data) => {
      allData = data;
      loadItems(currentPage);
    })

    .then(() => {
      // Hide loading spinner
      loading.style.display = "none";
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      loading.style.display = "none";
      let errorMessage = document.createElement("p");
      errorMessage.innerHTML =
        'Error fetching data. Please refresh the page. If the content does not load again, please <a href="https://wa.me/6285161601550">contact me</a>.';
      errorMessage.style.color = "red";
      errorMessage.style.paddingTop = "2rem";
      document.getElementById("gallery").appendChild(errorMessage);
    });
}

document.getElementById("nextPageButton").addEventListener("click", () => {
  currentPage++;
  loadItems(currentPage);
});

document.getElementById("prevPageButton").addEventListener("click", () => {
  currentPage--;
  loadItems(currentPage);
});

// Call the fetchData function to start loading the items
fetchData();

// Event listener untuk tombol filter
$(".filterListItem").on("click", function () {
  $(".filterListItem").removeClass("active");
  $(this).addClass("active");
});
