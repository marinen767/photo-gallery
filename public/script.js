$(document).ready(function () {
  fetch("http://localhost:3000/get-images")
      .then(response => response.json())
      .then(images => {
          const container = $("#image-gallery");

          images.forEach(image => {
              const imageElement = `
                  <div class="magnific-img">
                      <a class="image-popup-vertical-fit" href="foto/${image}" title="${image}">
                          <img src="foto/${image}" alt="${image}">
                      </a>
                  </div>
              `;
              container.append(imageElement);
          });

          // Initialize Magnific Popup AFTER adding images dynamically
          $('.image-popup-vertical-fit').magnificPopup({
              type: 'image',
              mainClass: 'mfp-with-zoom',
              gallery: { enabled: true },
              zoom: {
                  enabled: true,
                  duration: 300,
                  easing: 'ease-in-out',
                  opener: function (openerElement) {
                      return openerElement.is('img') ? openerElement : openerElement.find('img');
                  }
              }
          });
      })
      .catch(error => console.error("Error fetching images:", error));
});
