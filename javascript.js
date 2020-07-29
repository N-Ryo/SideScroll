setTimeout(function() {
  // 縦スクロールを横スクロールに
  const mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
  let count = 0;
  let left = window.pageXOffset + 30;
  getRuleBySelector('.flip-cartoon').style.left = `${left}px`;

  let pageOffsetWidth = window.pageXOffset;
  const windowWidth = window.innerWidth;
  inview(pageOffsetWidth, windowWidth);
  window.addEventListener(mousewheelevent,function(e){
    let delta = 0
    e.preventDefault();
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      delta = e.deltaY ? -(e.deltaY) : e.wheelDelta ? e.wheelDelta : -(e.originalEvent.detail);
    } else {
      delta = e.deltaX ? (e.deltaX) : e.wheelDelta ? -e.wheelDelta : (e.originalEvent.detail);
    }
    window.scrollBy(delta, 0);
    if (left + delta > 30 && left + window.innerWidth - 30 + delta < document.querySelector("body").offsetWidth){
      left = left + delta;
      getRuleBySelector('.flip-cartoon').style.left = `${left}px`;
    }
    if (count % 20 === 0) {
      const currentImgUrl = document.querySelector(".flip-cartoon img").src;
      const nextImgUrl = currentImgUrl.replace(
        /[1-4]\.png/,
        `${parseInt(
          currentImgUrl.substring(
            currentImgUrl.search(/[1-4]\.png/),
            currentImgUrl.search(/[1-4]\.png/)+ 1
          )
        ) % 4 + 1}.png`
      );
      document.querySelector(".flip-cartoon img").src = nextImgUrl;
    }
    pageOffsetWidth = window.pageXOffset;
    inview(pageOffsetWidth, windowWidth);
    count++
  },  { passive: false });

  function getRuleBySelector(sele){
    var i, j, sheets, rules, rule = null;

    // stylesheetのリストを取得
    sheets = document.styleSheets;
    for(i=0; i<sheets.length; i++){
        // そのstylesheetが持つCSSルールのリストを取得
        rules = sheets[i].cssRules;
        for(j=0; j<rules.length; j++){
            // セレクタが一致するか調べる
            if(sele === rules[j].selectorText){
                rule = rules[j];
                break;
            }
        }
    }
    return rule;
  }

  function inview(pageOffsetWidth, windowWidth) {
    const inviewElements = document.querySelectorAll(".inview");
    for (var i=0; i<inviewElements.length; i++) {
      let isInview =
        inviewElements[i].getBoundingClientRect().left >= 0 &&
        inviewElements[i].getBoundingClientRect().left < windowWidth;
      if (isInview) {
        inviewElements[i].classList.add(`inviewed`);
      }
    }
  }
}, 100)