const slideContents = document.querySelectorAll('.slide-content');

const options = {
  root: null, // 今回はビューポートをルート要素とする
  rootMargin: '-50% 0px', // ビューポートの中心を判定基準にする
  threshold: 0, // 閾値は0
};
const observer = new IntersectionObserver(doWhenIntersect, options);
// それぞれのboxを監視する
slideContents.forEach((slideContent) => {
  observer.observe(slideContent);
});

/**
 * 交差したときに呼び出す関数
 * @param entries
 */
function doWhenIntersect(entries) {
  // 交差検知をしたもののなかで、isIntersectingがtrueのDOMを色を変える関数に渡す

  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log('inview', entry.target);
      activateIndex(entry.target);
    } else {
      console.log('out view', entry.target);
    }
  });
}

/**
 * 目次の色を変える関数
 * @param element
 */
function activateIndex(element) {
  // すでにアクティブになっている目次を選択
  const currentActiveIndex = document.querySelector('#indexList .active');
  // すでにアクティブになっているものが0個の時（=null）以外は、activeクラスを除去
  if (currentActiveIndex !== null) {
    currentActiveIndex.classList.remove('active');
  }
  // 引数で渡されたDOMが飛び先のaタグを選択し、activeクラスを付与
  const newActiveIndex = document.querySelector(`a[href='#${element.id}']`);

  newActiveIndex.classList.add('active');
}

function scrollActiveIndex() {
  const indexs = document.querySelectorAll('.index a');
  console.log(indexs);
  indexs.forEach((index) => {
    index.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = e.target.hash;
      console.log(targetId, 'hash');
      // 要素を取得する>target
      const target = document.querySelector(targetId);
      // 要素まで飛ぶ
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// スライドイベント;

const slide = (entries, observe) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let children = entry.target.childNodes[1];
      console.log(children);
      children.classList.add('fit');

      // entry.target.classList.add('fit');
      // entry.target.classList.remove('above');
      // console.log('fit', entry.target);
      // console.log(entry.rootBounds.height);
    } else {
      let children = entry.target.childNodes[1];
      console.log(children);
      children.classList.add('above');
      // entry.target.classList.add('above');
      // entry.target.classList.remove('fit');
      // console.log('remove', entry.target);
    }
  });
};
const slideRemove = (entries, observe) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log('opRemove', entry.target);
    } else {
      // entry.target.classList.add('above');
      console.log(' enter Remove', entry.target);
    }
  });
};

let op2 = {
  root: null,
  rootMargin: '0px',
  threshold: 1, //一瞬でも触れたら
};
let opRemove = {
  root: null,
  rootMargin: '0% 0px -50%',
  threshold: 0.3, //一瞬でも触れたら
};
const io = new IntersectionObserver(slide, op2);
const ioRemove = new IntersectionObserver(slideRemove, opRemove);
slideContents.forEach((slideContent) => {
  io.observe(slideContent);
});
slideContents.forEach((slideContent) => {
  ioRemove.observe(slideContent);
});

// 重なってから(true)で縮んで(false)になり、true,falseが繰り返される
