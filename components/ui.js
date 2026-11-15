/* Shared static-site UI components. No framework or data is embedded here. */
// Navbar
let navbarSequence = 0;

function createElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

/** Build the shared site navigation without mounting it into a page. */
export function createNavbar({
  brandText = "Thí nghiệm THPT",
  brandHref = "index.html",
  brandClassName = "brand",
  currentPage = "",
  comingSoon = false,
  periodicTable = false,
  themeToggle = false,
  onThemeToggle,
  search = null
} = {}) {
  const header = createElement("header", "ui-site-header");
  const nav = createElement("nav", "ui-navbar");
  nav.setAttribute("aria-label", "Điều hướng chính");

  const brand = createElement("a", brandClassName, brandText);
  brand.href = brandHref;
  brand.setAttribute("aria-label", "Trang chủ thí nghiệm");
  const navigationId = `ui-primary-navigation-${++navbarSequence}`;
  const menuToggle = createElement("button", "site-menu-toggle");
  menuToggle.type = "button";
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-controls", navigationId);
  menuToggle.setAttribute("aria-label", "Mở điều hướng");
  const menuGlyph = createElement("span", "", "☰");
  menuGlyph.setAttribute("aria-hidden", "true");
  menuToggle.append(menuGlyph);

  const links = createElement("div", "ui-navbar-links");
  links.id = navigationId;
  const current = currentPage || window.location.pathname.split("/").pop() || "index.html";
  const primaryLinks = [
    ["Trang chủ", "index.html"],
    ["Hóa học", "thinghiem.html"],
    ["Lớp 10", "lop10.html"],
    ["Lớp 11", "lop11.html"],
    ["Lớp 12", "lop12.html"],
    ["Tất cả thí nghiệm", "toanbo.html"]
  ];

  for (const [label, href] of primaryLinks) {
    const link = createElement("a", "nav-main", label);
    link.href = href;
    if (current === href) {
      link.classList.add("active-page");
      link.setAttribute("aria-current", "page");
    }
    links.append(link);
  }

  if (periodicTable) {
    const link = createElement("a", "nav-main");
    link.href = "periodic.html";
    link.append(document.createTextNode("Bảng tuần hoàn "));
    const tag = createElement("span", "ui-new-label", "NEW");
    link.append(tag);
    links.append(link);
  }

  if (comingSoon) {
    const link = createElement("a", "nav-main", "Coming soon");
    link.href = "#";
    link.setAttribute("aria-disabled", "true");
    links.append(link);
  }

  if (themeToggle) {
    const button = createElement("button", "theme-btn", "🌙");
    button.type = "button";
    button.setAttribute("aria-label", "Bật hoặc tắt chế độ tối");
    button.addEventListener("click", typeof onThemeToggle === "function"
      ? onThemeToggle
      : () => window.toggleDarkMode?.());
    links.append(button);
  }

  if (search) {
    const searchArea = createElement("div", "nav-search");
    const input = createElement("input");
    input.type = "text";
    input.id = search.id || `ui-search-${navbarSequence}`;
    input.placeholder = search.placeholder || "Tìm thí nghiệm...";
    input.autocomplete = "off";
    input.disabled = Boolean(search.disabled);
    input.setAttribute("aria-label", search.label || "Tìm thí nghiệm");
    if (typeof search.onInput === "function") {
      input.addEventListener("input", (event) => search.onInput(event.target.value, event));
    }
    searchArea.append(input);

    if (search.clearButton) {
      const clear = createElement("button", "clear-search", search.clearText || "Xóa");
      clear.type = "button";
      clear.hidden = true;
      clear.setAttribute("aria-label", "Xóa từ khóa tìm kiếm");
      input.addEventListener("input", () => { clear.hidden = !input.value; });
      clear.addEventListener("click", () => {
        input.value = "";
        clear.hidden = true;
        if (typeof search.onInput === "function") search.onInput("", { target: input });
        input.focus();
      });
      searchArea.append(clear);
    }
    links.append(searchArea);
  }

  nav.append(brand, menuToggle, links);
  header.append(nav);

  const closeMobileMenu = ({ restoreFocus = false } = {}) => {
    nav.dataset.mobileOpen = "false";
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Mở điều hướng");
    if (restoreFocus) menuToggle.focus();
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = nav.dataset.mobileOpen !== "true";
    nav.dataset.mobileOpen = String(isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Đóng điều hướng" : "Mở điều hướng");
    if (isOpen) links.querySelector("a")?.focus();
  });

  links.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMobileMenu();
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target)) closeMobileMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.dataset.mobileOpen === "true") {
      closeMobileMenu({ restoreFocus: true });
    }
  });

  return header;
}

// Experiment/video card
const YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

function validYoutubeId(value) {
  return typeof value === "string" && YOUTUBE_ID_PATTERN.test(value);
}

/**
 * Render one experiment or one resolved repository page occurrence.
 * All user-supplied strings, including chemical titles, are inserted as text.
 */
export function createExperimentCard(item) {
  if (!item || typeof item !== "object") {
    throw new TypeError("Experiment card requires an experiment object.");
  }

  const experiment = item.experiment || item;
  const video = item.video || {};
  const youtubeId = experiment.youtubeId || video.youtubeId || item.youtubeId || "";
  const ytLink = item.ytLink || (validYoutubeId(youtubeId)
    ? `https://www.youtube.com/watch?v=${youtubeId}`
    : "");
  const thumbnail = item.thumbnail || (validYoutubeId(youtubeId)
    ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
    : "");
  const title = item.title ?? item.titleOverride ?? experiment.title ?? "Video thí nghiệm";
  const grade = experiment.grade ?? item.grade;
  const badgeText = item.badge || (grade ? `Lớp ${grade}` : "Không rõ lớp");

  const article = document.createElement("article");
  article.className = "ui-experiment-card";
  if (experiment.id) article.dataset.experimentId = experiment.id;

  if (thumbnail) {
    const imageLink = document.createElement(ytLink ? "a" : "div");
    imageLink.className = "ui-experiment-card-media";
    if (ytLink) {
      imageLink.href = ytLink;
      imageLink.target = "_blank";
      imageLink.rel = "noopener noreferrer";
      imageLink.setAttribute("aria-label", `Xem video: ${title}`);
    }
    const image = document.createElement("img");
    image.src = thumbnail;
    image.alt = `Thumbnail: ${title}`;
    image.loading = "lazy";
    image.decoding = "async";
    imageLink.append(image);
    article.append(imageLink);
  }

  const content = document.createElement("div");
  content.className = "ui-experiment-card-content";

  const badge = document.createElement("span");
  badge.className = "ui-experiment-card-badge";
  badge.textContent = badgeText;

  const heading = document.createElement("h3");
  heading.className = "ui-experiment-card-title";
  heading.textContent = title;

  content.append(badge, heading);

  if (ytLink) {
    const action = document.createElement("a");
    action.className = "ui-experiment-card-action";
    action.href = ytLink;
    action.target = "_blank";
    action.rel = "noopener noreferrer";
    action.textContent = "Xem video";
    content.append(action);
  }

  article.append(content);
  return article;
}

// Loading, empty, and error states
function renderMessage(container, { className, message, role }) {
  if (!(container instanceof Element)) {
    throw new TypeError("State renderer requires a DOM container.");
  }
  const node = document.createElement("p");
  node.className = className;
  node.setAttribute("role", role);
  node.textContent = message;
  container.replaceChildren(node);
  return node;
}

export function renderLoading(container, message = "Đang tải dữ liệu…") {
  return renderMessage(container, {
    className: "ui-state ui-state-loading",
    message,
    role: "status"
  });
}

export function renderEmpty(container, message = "Chưa có nội dung.") {
  return renderMessage(container, {
    className: "ui-state ui-state-empty",
    message,
    role: "status"
  });
}

export function renderError(container, message = "Không thể tải nội dung.") {
  return renderMessage(container, {
    className: "ui-state ui-state-error",
    message,
    role: "alert"
  });
}

// Footer
const DEFAULT_FOOTER_TEXT = "© 2026 – Website thí nghiệm Hóa học | Sinh viên thực hiện";

export function createFooter(text = DEFAULT_FOOTER_TEXT) {
  const footer = document.createElement("footer");
  footer.className = "ui-site-footer";
  footer.textContent = text;
  return footer;
}
