document.addEventListener('DOMContentLoaded', function () {
  const cb = function (el, isIntersecting) {
    if (isIntersecting) {
      el.classList.add('visual-show');
    }
  };
  // const so = new ScrollObserver('.detail__visual', cb);
  const so = new ScrollObserver('.visual', cb);

  const els = document.querySelectorAll('.animate-title');
  const cbText = function (entries, observer) {
    entries.forEach((entry) => {
      console.log(entry.target);
      if (entry.isIntersecting) {
        const ta = new TextAnimation(entry.target);
        ta.animate();
        // entry.target.classList.add('inview');
        observer.unobserve(entry.target);
      } else {
        entry.target.classList.remove('inview');
      }
    });
    // alert('intersecting');
  };

  const io = new IntersectionObserver(cbText);
  els.forEach((el) => {
    io.observe(el);
  });
});
