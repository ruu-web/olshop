  const darkToggleCheckbox = document.getElementById('darkModeToggle');

// Load saved preference
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
  darkToggleCheckbox.checked = true;
} else {
  darkToggleCheckbox.checked = false;
}

// Listen toggle change
darkToggleCheckbox.addEventListener('change', () => {
  if (darkToggleCheckbox.checked) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');
  }
});


function toggleOffcanvas(targetId, show) {
  const offcanvas = document.getElementById(targetId);
  const overlay = document.getElementById("overlay" + targetId.replace("offcanvas", ""));
  if (offcanvas && overlay) {
    if (show) {
      offcanvas.style.transform = "translateY(0)";
      overlay.style.display = "block";
      setTimeout(() => overlay.classList.add("active"), 10);
    } else {
      offcanvas.style.transform = "translateY(100%)";
      overlay.classList.remove("active");
      setTimeout(() => {
        overlay.style.display = "none";
      }, 200);
    }
  }
}

// Toggle offcanvas on btn-toggle-offcanvas click
document.querySelectorAll(".btn-toggle-offcanvas").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-target");
    toggleOffcanvas(target, true);
  });
});

// Close offcanvas on overlay click
document.querySelectorAll(".overlay").forEach(overlay => {
  overlay.addEventListener("click", () => {
    const id = overlay.id.replace("overlay", "offcanvas");
    toggleOffcanvas(id, false);
  });
});

// Close offcanvas on scroll down inside offcanvas
document.querySelectorAll(".offcanvas").forEach(offcanvas => {
  let lastScrollTop = 0;
  offcanvas.addEventListener("scroll", () => {
    let st = offcanvas.scrollTop;
    if (st > lastScrollTop) {
      toggleOffcanvas(offcanvas.id, false);
    }
    lastScrollTop = st <= 0 ? 0 : st;
  });
});

// Nav bar indicator update (existing script, keep as is)
const navBar = document.querySelector('.nav-bar');
const navBtns = document.querySelectorAll('.nav-btn');
const indicator = document.querySelector('.nav-indicator');

function updateIndicator(button) {
  const btnRect = button.getBoundingClientRect();
  const navRect = navBar.getBoundingClientRect();
  const left = btnRect.left - navRect.left;
  const width = btnRect.width;
  indicator.style.left = left + 'px';
  indicator.style.width = width + 'px';
}

const activeBtn = document.querySelector('.nav-btn.active');
if (activeBtn) updateIndicator(activeBtn);

navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    navBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateIndicator(btn);
  });
});

window.addEventListener('resize', () => {
  const currentActive = document.querySelector('.nav-btn.active');
  if (currentActive) updateIndicator(currentActive);
});

// Toggle Saldo visibility (existing script, keep as is)
const saldoElement = document.getElementById('saldo-member');
const toggleIcon = document.getElementById('toggle-saldo');
const saldoAsli = saldoElement.getAttribute('data-saldo');
let isVisible = false;

toggleIcon.addEventListener('click', () => {
  isVisible = !isVisible;
  if (isVisible) {
    saldoElement.textContent = formatRupiah(saldoAsli);
    toggleIcon.classList.remove('fa-eye');
    toggleIcon.classList.add('fa-eye-slash');
  } else {
    saldoElement.textContent = '*****';
    toggleIcon.classList.remove('fa-eye-slash');
    toggleIcon.classList.add('fa-eye');
  }
});

function formatRupiah(angka) {
  let reverse = angka.toString().split('').reverse().join(''),
      ribuan = reverse.match(/\d{1,3}/g);
  ribuan = ribuan.join('.').split('').reverse().join('');
  return ribuan;
}    
// Loading overlay hide on window load (existing)
window.addEventListener('load', () => {
  const loading = document.getElementById('loading-overlay');
  if (loading) {
    loading.style.display = 'none';
  }
});

// Greeting function (existing)
function getUcapan() {
  const now = new Date();
  const jam = now.getHours();
  let ucapan = "";
  if (jam >= 4 && jam < 11) {
    ucapan = "Selamat Pagi";
  } else if (jam >= 11 && jam < 15) {
    ucapan = "Selamat Siang";
  } else if (jam >= 15 && jam < 18) {
    ucapan = "Selamat Sore";
  } else {
    ucapan = "Selamat Malam";
  }
  document.getElementById("ucapan").textContent = ucapan;
}
getUcapan();

// Collapse container toggle (existing)
const collapses = document.querySelectorAll('.collapse-container');
collapses.forEach(container => {
  const header = container.querySelector('.collapse-header');
  header.addEventListener('click', () => {
    collapses.forEach(c => c.classList.remove('active'));
    container.classList.add('active');
  });
});