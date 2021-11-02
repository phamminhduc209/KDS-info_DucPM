function fixedHeader() {
  var header = $("#header"),
    header_height = header.outerHeight(),
    lastScroll = 0;

  $(window).scroll(function () {
    var scrollTop = $(window).scrollTop();
    if (scrollTop < 300) {
      header.removeClass("is-fixed");
      $(".page-top").fadeOut();
    } else {
      header.addClass("is-fixed");
      $(".page-top").fadeIn();
    }

    if (
      scrollTop > 100 &&
      lastScroll <= scrollTop &&
      !$("body").hasClass("header-fixed")
    ) {
      header.removeClass("is-show");
    } else {
      header.addClass("is-show");
    }
    lastScroll = scrollTop;
  });
}

function zoomOutScrollPage() {
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    $(".mainvisual").css({
      backgroundSize: 100 + scroll / 50 + "%",
      top: -(scroll / 10) + "%",
    });
  });
}

$("[data-fancybox]").fancybox({
  youtube: {
    controls: 1,
    showinfo: 0,
  },
});

LightCurtains = {};
local = LightCurtains;

local.svg;
local.winWidth;
local.winHeight;
local.totalElements;
local.elementsArr = [];

local.init = function () {
  $(window).on("resize", local.onResize);

  local.winWidth = $(window).width();
  local.winHeight = $(window).height();
  local.svg = document.getElementsByTagName("svg")[0];
  local.createGradient(local.svg, "baseGrad", "linearGradient", [
    { offset: "0%", "stop-color": "#DDD", "stop-opacity": "0" },
    { offset: "50%", "stop-color": "#DDD" },
    { offset: "100%", "stop-color": "#DDD", "stop-opacity": "0" },
  ]);

  local.totalElements = 100;
  local.createElements();
};

local.createElements = function () {
  var i = 0;
  var limit = local.totalElements;
  while (i < limit) {
    var r = 255;
    var g = 255;
    var b = 255;
    var randCol =
      "rgba(" + r + "," + g + "," + b + "," + (Math.random() * 0.5 + 0.2) + ")"; //'#'+Math.floor(Math.random()*16777215).toString(16);
    local.createGradient(local.svg, "grad" + i, "linearGradient", [
      { offset: "0%", "stop-color": randCol, "stop-opacity": "0" },
      { offset: "10%", "stop-color": randCol },
      { offset: "50%", "stop-color": randCol, "stop-opacity": "0" },
      { offset: "90%", "stop-color": randCol },
      { offset: "100%", "stop-color": randCol, "stop-opacity": "0" },
    ]);

    var item = local.createRectangle(i);
    local.elementsArr.push(item);
    local.svg.appendChild(item);
    local.moveElement(item, i);
    ++i;
  }
};

local.createRectangle = function (i) {
  var elem = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  elem.style.fill = "url(#grad" + i + ")";
  elem.setAttribute("width", Math.random() * 5 + 220);
  elem.setAttribute("height", local.winHeight + 200);
  TweenMax.set(elem, { x: Math.random() * 10 + i * 30, y: -100 });
  return elem;
};

local.createGradient = function (svg, id, type, stops) {
  var svgNS = svg.namespaceURI;
  var grad = document.createElementNS(svgNS, type);
  grad.setAttribute("id", id);
  for (var i = 0; i < stops.length; i++) {
    var attrs = stops[i];
    var stop = document.createElementNS(svgNS, "stop");
    for (var attr in attrs) {
      if (attrs.hasOwnProperty(attr)) stop.setAttribute(attr, attrs[attr]);
    }
    grad.appendChild(stop);
  }
  var defs =
    svg.querySelector("defs") ||
    svg.insertBefore(document.createElementNS(svgNS, "defs"), svg.firstChild);
  return defs.appendChild(grad);
};

local.moveElement = function (elem, i) {
  var xDest = Math.random() * 310 + i * 30;
  var xDiff = $(elem).offset().left - xDest;

  // console.log(xDiff);
  TweenMax.to(elem, Math.random() * 6 + 1, {
    attr: { width: Math.random() * 250 + 100 },
    x: xDest,
    rotationZ: xDiff / 50,
    transformOrigin: "50% 20%",
    //zIndex:Math.random()*local.totalElems,
    ease: Quad.easeInOut,
    onComplete: local.moveElement,
    onCompleteParams: [elem, i],
  });
};

local.onResize = function (evt) {
  var i = 0;
  local.winHeight = $(window).height();
  var limit = local.elementsArr.length;
  while (i < limit) {
    var elem = local.elementsArr[i];
    elem.setAttribute("height", $(window).height() + 10);
    ++i;
  }
};

let didScroll = false;
let paralaxTitles = document.querySelectorAll(".js-parallax");

const scrollInProgress = () => {
  didScroll = true;
};

const raf = () => {
  if (didScroll) {
    paralaxTitles.forEach((element, index) => {
      element.style.transform = "translateX(" + window.scrollY / 0.5 + "%)";
    });
    didScroll = false;
  }
  requestAnimationFrame(raf);
};

$(document).ready(function () {
  local.init();
});

requestAnimationFrame(raf);
window.addEventListener("scroll", scrollInProgress);

ScrollOut({
  cssProps: {
    visibleY: true,
    viewportY: true,
  },
});

new WOW().init({
  boxClass: "wow", // default
  animateClass: "animated", // default
  offset: 0, // default
  mobile: true, // default
  live: true, // default
});

$(document).ready(function () {
  fixedHeader();
  zoomOutScrollPage();
});
