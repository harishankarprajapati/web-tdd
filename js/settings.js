// ===== Site Data =====
const siteData = {
    siteName: "The Detailing Den",

    // ===== 3 PHONE NUMBERS =====
    phonesit: "+91 92968 42531",
    phonesit2: "",
   

    timeopen: "",
    email: "info@thedetailingden.co.in",

    // ===== 3 ADDRESSES + LINKS =====
    address1: "NH33, Mandu, Near Hotel Shanti Sarovar, Ramgarh, 825316, Jharkhand",
    address1_link: "#",

    address2: "",
    address2_link: "#",

 
    // ===== 3 MAP EMBED CODES =====
    map1: `#`,


};


// ===== Function to apply site data =====
function applySiteData() {
    document.querySelectorAll("[data-site]").forEach(el => {
        const key = el.getAttribute("data-site");
        const value = siteData[key];
        if (!value) return;

        // PHONE (supports 3 phones)
        if (key === "phonesit" || key === "phonesit2" || key === "phonesit3") {
            el.innerHTML = `<a href="tel:${value}" class=" text-decoration-none">${value}</a>`;
        }

        // EMAIL
        else if (key === "email") {
            el.innerHTML = `<a href="mailto:${value}" class=" text-decoration-none">${value}</a>`;
        }

        // ADDRESSES (with google map clickable link)
        else if (key.startsWith("address") && !key.endsWith("_link")) {
            const linkKey = key + "_link";
            const mapLink = siteData[linkKey];

            el.innerHTML = `<a href="${mapLink}" target="_blank"  text-decoration-none">${value}</a>`;
        }

        // MAPS (auto iframe embed)
        else if (key.startsWith("map")) {
            el.innerHTML = `
                <iframe 
                    src="${value}" 
                    width="100%" 
                    height="450" 
                    style="border:0;" 
                    allowfullscreen 
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>`;
        }

        // NORMAL TEXT
        else {
            el.textContent = value;
        }
    });
}


// ===== Include HTML function =====
function includeHTML(callback) {
    const elements = document.querySelectorAll("[include-html]");
    let total = elements.length;
    if (total === 0 && callback) callback();

    elements.forEach(el => {
        const file = el.getAttribute("include-html");
        if (!file) return;

        fetch(file)
            .then(response => {
                if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
                return response.text();
            })
            .then(data => {
                el.innerHTML = data;
                applySiteData();
                if (--total === 0 && callback) callback();
            })
            .catch(err => {
                el.innerHTML = `<div class="text-danger small">Error loading ${file}: ${err}</div>`;
                if (--total === 0 && callback) callback();
            });
    });
}


// ===== Back to Top Button =====
function setupBackToTopButton() {
    const btn = document.getElementById("backToTopBtn");
    if (!btn) return;

    window.addEventListener("scroll", () => {
        btn.classList.toggle("show", window.scrollY > 300);
    });

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}


// ===== Run on page load =====
document.addEventListener("DOMContentLoaded", () => {
    applySiteData();
    includeHTML(() => {
        setupBackToTopButton();
    });
});




initSearchTyping();


//scroll progress bar daktop

function progressBarScroll() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop,
      height = document.documentElement.scrollHeight - document.documentElement.clientHeight,
      scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
}

window.onscroll = function () {
  progressBarScroll();
};



// scroll progress bar mobile


window.addEventListener("scroll", function () {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const percent = (scrollTop / scrollHeight) * 100;

  const mobileBar = document.getElementById("progressBarMobile");
  if (mobileBar) mobileBar.style.width = percent + "%";
});



