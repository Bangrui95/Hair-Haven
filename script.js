/* ============================================================
   Hair Haven — 交互脚本
   ============================================================ */
(function () {
  'use strict';

  var BOOKING_URL = 'https://www.sumupbookings.com/haven-hair';

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
  var sizeLegend = document.querySelector('.lead-sizes');
  function activateCat(id) {
    chips.forEach(function (c) { c.classList.toggle('active', c.dataset.cat === id); });
    cats.forEach(function (cat) { cat.classList.toggle('active', cat.id === id); });
    // 把长短图例移动到当前分类标题的正下方
    var activeCat = document.getElementById(id);
    var title = activeCat && activeCat.querySelector('.cat__title');
    if (sizeLegend && title) title.insertAdjacentElement('afterend', sizeLegend);
    // 只有自然高度超过阈值（约 6 项）的分类才启用固定高度内部滚动；
    // 其余分类保持正常流，不做滚动容器，避免拦截整页滑动
    var menu = document.querySelector('#' + id + ' .menu');
    if (menu) {
      menu.classList.remove('menu--scroll');        // 先还原，测量自然高度
      if (menu.scrollHeight > 340) {                // 需要滚动
        menu.classList.add('menu--scroll');
        menu.scrollTop = 0;
      }
    }
  }
  if (chips.length) {
    chips.forEach(function (c) {
      c.addEventListener('click', function () { activateCat(c.dataset.cat); });
    });
    activateCat(chips[0].dataset.cat);   // 默认显示第一类（Haircuts）
  }

  /* ---------- 分类条横向滑动：左右箭头引导 ---------- */
  var chipsScroller = document.getElementById('chips');
  var chipsWrap = document.querySelector('.chips-wrap');
  function updateChipArrows() {
    if (!chipsScroller || !chipsWrap) return;
    var max = chipsScroller.scrollWidth - chipsScroller.clientWidth;
    chipsWrap.classList.toggle('more-left', chipsScroller.scrollLeft > 4);
    chipsWrap.classList.toggle('more-right', chipsScroller.scrollLeft < max - 4);
  }
  if (chipsScroller) {
    chipsScroller.addEventListener('scroll', updateChipArrows, { passive: true });
    window.addEventListener('resize', updateChipArrows);
    updateChipArrows();
    // 点击箭头 → 横向翻一页
    function scrollChips(dir) {
      chipsScroller.scrollBy({ left: dir * chipsScroller.clientWidth * 0.8, behavior: 'smooth' });
    }
    var arrowL = document.querySelector('.chips-arrow--left');
    var arrowR = document.querySelector('.chips-arrow--right');
    if (arrowL) arrowL.addEventListener('click', function () { scrollChips(-1); });
    if (arrowR) arrowR.addEventListener('click', function () { scrollChips(1); });
  }

  /* ---------- 预订：预加载 SumUp iframe，点击秒开（无转圈） ----------
     页面加载完成后延迟预热预订 iframe 并常驻；点击任意 data-hh-book
     按钮时直接显示已加载好的浮层，关闭时保留 iframe，下次开也是秒开。
     若浮层结构缺失则回退到新标签打开预订页。 */
  var BOOKING_EMBED = 'https://www.sumupbookings.com/haven-hair/embed?utm_source=widget';
  var bookingModal = document.getElementById('bookingModal');
  var bookingFrameHost = document.getElementById('bookingFrame');
  var bookingIframe = null;

  function preloadBooking() {
    if (bookingIframe || !bookingFrameHost) return;
    bookingIframe = document.createElement('iframe');
    bookingIframe.src = BOOKING_EMBED;
    bookingIframe.title = 'Book an appointment';
    bookingIframe.setAttribute('allow', 'payment; clipboard-write');
    bookingFrameHost.appendChild(bookingIframe);
  }
  function openBooking() {
    if (!bookingModal) { window.open(BOOKING_URL, '_blank', 'noopener'); return; }
    preloadBooking();                       // 幂等：确保已加载
    bookingModal.classList.add('open');
    bookingModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeBooking() {
    if (!bookingModal) return;
    bookingModal.classList.remove('open');
    bookingModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  // 页面加载完成后延迟预热（不与首屏关键内容抢带宽）
  if (document.readyState === 'complete') setTimeout(preloadBooking, 1200);
  else window.addEventListener('load', function () { setTimeout(preloadBooking, 1200); });

  document.querySelectorAll('[data-hh-book]').forEach(function (btn) {
    btn.addEventListener('click', openBooking);
  });
  document.querySelectorAll('[data-hh-close]').forEach(function (btn) {
    btn.addEventListener('click', closeBooking);
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeBooking(); });

  /* ---------- 优惠券弹层：点券 → 显示详情 + 邮箱表单 ---------- */
  var couponModal = document.getElementById('couponModal');
  var couponForm = document.getElementById('couponForm');
  var couponSuccess = document.getElementById('couponSuccess');
  function openCoupon(t) {
    if (!couponModal) return;
    document.getElementById('cvTag').textContent = t.dataset.tag || '';
    document.getElementById('cvValue').textContent = ((t.dataset.value || '') + ' ' + (t.dataset.unit || '')).trim();
    document.getElementById('cvTitle').textContent = t.dataset.title || '';
    document.getElementById('cvTerms').textContent = t.dataset.terms || '';
    document.getElementById('cvExpiry').textContent = t.dataset.expiry || '';
    if (couponForm) { couponForm.hidden = false; couponForm.reset(); }
    if (couponSuccess) couponSuccess.hidden = true;
    couponModal.classList.add('open');
    couponModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeCoupon() {
    if (!couponModal) return;
    couponModal.classList.remove('open');
    couponModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  document.querySelectorAll('[data-coupon]').forEach(function (t) {
    t.addEventListener('click', function () { openCoupon(t); });
  });
  document.querySelectorAll('[data-coupon-close]').forEach(function (b) {
    b.addEventListener('click', closeCoupon);
  });
  if (couponForm) {
    couponForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = document.getElementById('couponEmail');
      if (!email.value || email.value.indexOf('@') === -1) { email.focus(); return; }
      /* TODO 接入真实服务：把 email + 当前券信息 POST 到 Tally/Formspree/Make，
         由自动化生成唯一码、发邮件、写入 Airtable 台账。当前为前端演示，直接显示成功。 */
      couponForm.hidden = true;
      if (couponSuccess) couponSuccess.hidden = false;
    });
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeCoupon(); });
})();
