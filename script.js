/* ============================================================
   Hair Haven — 交互脚本
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 移动端菜单 ---------- */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      links.classList.toggle('open');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') links.classList.remove('open');
    });
    // 点击菜单/按钮以外任意位置 → 自动关闭
    document.addEventListener('click', function (e) {
      if (!links.classList.contains('open')) return;
      if (links.contains(e.target) || toggle.contains(e.target)) return;
      links.classList.remove('open');
    });
  }

  /* ---------- 导航栏双态：hero 上=透明黑金，滚过后=白色 ---------- */
  var nav = document.querySelector('.nav');
  var hero = document.querySelector('.hero');
  function updateNav() {
    if (!nav) return;
    // 一旦离开最顶部（位移 >4px）就切成白色；回到顶部恢复透明
    nav.classList.toggle('nav--scrolled', window.scrollY > 4);
    if (links && links.classList.contains('open')) links.classList.remove('open');  // 滚动时收起菜单
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  window.addEventListener('resize', updateNav);
  updateNav();

  /* ---------- 服务分类切换：一次只显示一类 ---------- */
  var chips = document.querySelectorAll('.chip[data-cat]');
  var cats = document.querySelectorAll('.cat');
  var activeCategoryTitle = document.getElementById('activeCategoryTitle');
  function fitCategoryTitle() {
    if (!activeCategoryTitle) return;
    activeCategoryTitle.style.fontSize = '';
    var fontSize = parseFloat(window.getComputedStyle(activeCategoryTitle).fontSize);
    while (activeCategoryTitle.scrollWidth > activeCategoryTitle.clientWidth && fontSize > 13) {
      fontSize -= 0.5;
      activeCategoryTitle.style.fontSize = fontSize + 'px';
    }
  }
  function activateCat(id) {
    chips.forEach(function (c) { c.classList.toggle('active', c.dataset.cat === id); });
    cats.forEach(function (cat) { cat.classList.toggle('active', cat.id === id); });
    var categoryTitle = document.querySelector('#' + id + ' .cat__title');
    if (activeCategoryTitle && categoryTitle) {
      activeCategoryTitle.textContent = categoryTitle.textContent.trim();
      fitCategoryTitle();
    }
    // 所有分类共用固定服务列表高度；内容超出时在列表内滚动。
    var menu = document.querySelector('#' + id + ' .menu');
    if (menu) {
      menu.scrollTop = 0;
    }
  }
  if (chips.length) {
    chips.forEach(function (c) {
      c.addEventListener('click', function () { activateCat(c.dataset.cat); });
    });
    activateCat(chips[0].dataset.cat);   // 默认显示第一类（Haircuts）
  }

  function updateChipScrollState(row) {
    var scroller = row.querySelector('.chips');
    if (!scroller) return;
    var maxScroll = scroller.scrollWidth - scroller.clientWidth;
    row.classList.toggle('chips-row--has-left', scroller.scrollLeft > 1);
    row.classList.toggle('chips-row--has-right', maxScroll > 1 && scroller.scrollLeft < maxScroll - 1);
  }
  var chipRows = document.querySelectorAll('.chips-row');
  chipRows.forEach(function (row) {
    var scroller = row.querySelector('.chips');
    if (!scroller) return;
    scroller.addEventListener('scroll', function () { updateChipScrollState(row); }, { passive: true });
    updateChipScrollState(row);
  });
  window.addEventListener('resize', function () {
    fitCategoryTitle();
    chipRows.forEach(updateChipScrollState);
  });
  window.addEventListener('load', fitCategoryTitle);

  /* ---------- Booking ---------- */
  var bookingModal = document.getElementById('bookingModal');
  var bookingIframe = document.getElementById('treatwellBookingFrame');
  var bookingFallback = document.getElementById('bookingFallback');
  var bookingRetry = document.getElementById('bookingRetry');
  var bookingTimer = null;
  var bookingStatus = bookingIframe ? 'loading' : 'failed';
  var bookingTimeout = 3000;

  function clearBookingTimer() {
    if (bookingTimer) window.clearTimeout(bookingTimer);
    bookingTimer = null;
  }

  function setBookingFallback(visible) {
    if (!bookingModal || !bookingFallback) return;
    bookingFallback.hidden = !visible;
    bookingModal.classList.toggle('booking-modal--fallback', visible);
  }

  function showBookingFallback() {
    if (!bookingModal || !bookingModal.classList.contains('open')) return;
    clearBookingTimer();
    setBookingFallback(true);
  }

  function waitForBooking() {
    clearBookingTimer();
    if (bookingStatus === 'loaded') return;
    bookingTimer = window.setTimeout(function () {
      if (bookingStatus !== 'loaded') showBookingFallback();
    }, bookingTimeout);
  }

  function bookingLoaded() {
    bookingStatus = 'loaded';
    bookingIframe.setAttribute('aria-busy', 'false');
    clearBookingTimer();
    setBookingFallback(false);
  }

  function reloadBooking() {
    var bookingUrl = bookingIframe && bookingIframe.dataset.bookingUrl;
    if (!bookingUrl) {
      bookingStatus = 'failed';
      showBookingFallback();
      return;
    }

    bookingStatus = 'loading';
    bookingIframe.setAttribute('aria-busy', 'true');
    setBookingFallback(false);
    bookingIframe.src = bookingUrl;
    waitForBooking();
  }

  if (bookingIframe) {
    bookingIframe.addEventListener('load', bookingLoaded);
    bookingIframe.addEventListener('error', function () {
      bookingStatus = 'failed';
      showBookingFallback();
    });
  }

  if (bookingRetry) bookingRetry.addEventListener('click', reloadBooking);

  function openBooking() {
    if (!bookingModal) return;
    bookingModal.classList.add('open');
    bookingModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setBookingFallback(false);
    if (bookingStatus === 'failed') showBookingFallback();
    else waitForBooking();
  }

  function closeBooking() {
    if (!bookingModal) return;
    bookingModal.classList.remove('open');
    bookingModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    clearBookingTimer();
    setBookingFallback(false);
  }
  document.querySelectorAll('[data-hh-book]').forEach(function (btn) {
    btn.addEventListener('click', openBooking);
  });
  document.querySelectorAll('.menu .item').forEach(function (item) {
    var serviceName = item.querySelector('.item__name');
    item.classList.add('item--bookable');
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    if (serviceName) item.setAttribute('aria-label', 'Book ' + serviceName.textContent.trim());
    item.addEventListener('click', openBooking);
    item.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      openBooking();
    });
  });
  document.querySelectorAll('[data-hh-close]').forEach(function (btn) {
    btn.addEventListener('click', closeBooking);
  });

  var callModal = document.getElementById('callModal');
  var callModalTitle = document.getElementById('callModalTitle');
  var callModalMessage = document.getElementById('callModalMessage');
  var callBookButton = document.getElementById('callBookButton');
  var callOfferNote = document.getElementById('callOfferNote');

  function openCall(showOfferMessage) {
    if (!callModal) return;
    callModal.classList.add('open');
    callModal.setAttribute('aria-hidden', 'false');
    if (callModalTitle) callModalTitle.textContent = showOfferMessage ? 'Ask about this offer' : 'Call us';
    if (callModalMessage) {
      callModalMessage.hidden = !showOfferMessage;
      callModalMessage.textContent = showOfferMessage ? 'Contact the salon to confirm the current offer and price.' : '';
    }
    if (callBookButton) callBookButton.hidden = !showOfferMessage;
    if (callOfferNote) callOfferNote.hidden = !showOfferMessage;
    document.body.style.overflow = 'hidden';
  }

  function closeCall() {
    if (!callModal) return;
    callModal.classList.remove('open');
    callModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-hh-call]').forEach(function (btn) {
    btn.addEventListener('click', function () { openCall(false); });
  });
  document.querySelectorAll('[data-hh-call-close]').forEach(function (btn) {
    btn.addEventListener('click', closeCall);
  });
  if (callBookButton) callBookButton.addEventListener('click', function () {
    closeCall();
    openBooking();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    closeBooking();
    closeCall();
  });

  document.querySelectorAll('[data-coupon]').forEach(function (t) {
    t.addEventListener('click', function () { openCall(true); });
  });
})();
