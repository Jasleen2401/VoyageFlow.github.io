
    // ---- Page switching ----
    function showPage(pageId) {
      const pages = document.querySelectorAll(".page");
      pages.forEach((p) => p.classList.remove("active"));
      document.getElementById(pageId).classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function scrollToForm() {
      const form = document.getElementById("registrationFormBlock");
      form.scrollIntoView({ behavior: "smooth" });
    }

    // ---- Registration Validation ----
    const registrationForm = document.getElementById("registrationForm");

    registrationForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const pin = document.getElementById("pin").value.trim();

      let isValid = true;

      function showError(id, show) {
        const el = document.getElementById(id);
        el.style.display = show ? "block" : "none";
      }

      // Name
      if (!name) {
        isValid = false;
        showError("errorName", true);
      } else {
        showError("errorName", false);
      }

      // Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        isValid = false;
        showError("errorEmail", true);
      } else {
        showError("errorEmail", false);
      }

      // Phone – exactly 10 digits
      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(phone)) {
        isValid = false;
        showError("errorPhone", true);
      } else {
        showError("errorPhone", false);
      }

      // PIN – exactly 6 digits
      const pinPattern = /^\d{6}$/;
      if (!pinPattern.test(pin)) {
        isValid = false;
        showError("errorPin", true);
      } else {
        showError("errorPin", false);
      }

      if (!isValid) return;

      // Success: modal then go to Page 2
      openModal({
        icon: "✅",
        title: "Registration complete",
        message: "You’re all set. Let’s explore a few destinations next.",
        onClose: function () {
          showPage("page2");
        },
      });
    });

    // ---- Price Calculator ----
    const options = document.querySelectorAll(".price-option");
    const summaryTotal = document.getElementById("summaryTotal");
    const summaryItemsCount = document.getElementById("summaryItemsCount");

    function updateTotal() {
      let total = 0;
      let count = 0;

      options.forEach((opt) => {
        if (opt.checked) {
          const price = Number(opt.dataset.price || 0);
          total += price;
          count++;
        }
      });

      summaryTotal.textContent = "₹" + total.toLocaleString("en-IN");
      summaryItemsCount.textContent = count;
    }

    options.forEach((opt) => {
      opt.addEventListener("change", updateTotal);
    });

    // ---- Shared Modal Logic ----
    const modalBackdrop = document.getElementById("modalBackdrop");
    const modalButton = document.getElementById("modalButton");
    const modalIconEl = document.getElementById("modalIcon");
    const modalTitleEl = document.getElementById("modalTitle");
    const modalMessageEl = document.getElementById("modalMessage");

    let modalCloseHandler = null;

    function openModal({ icon, title, message, onClose }) {
      modalIconEl.textContent = icon || "ℹ️";
      modalTitleEl.textContent = title || "Notice";
      modalMessageEl.textContent = message || "";
      modalBackdrop.classList.add("active");
      modalCloseHandler = typeof onClose === "function" ? onClose : null;
    }

    modalButton.addEventListener("click", () => {
      modalBackdrop.classList.remove("active");
      if (modalCloseHandler) modalCloseHandler();
    });

    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove("active");
        if (modalCloseHandler) modalCloseHandler();
      }
    });

    // Confirm Journey modal
    function openConfirmationModal() {
      openModal({
        icon: "✈️",
        title: "Journey confirmed",
        message:
          "Your simulated itinerary has been locked in. Let’s wrap things up on the final screen.",
        onClose: function () {
          showPage("page4");
        },
      });
    }
