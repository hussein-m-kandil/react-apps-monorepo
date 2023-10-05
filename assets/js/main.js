function setTopSpace() {
  // Center the content vertically
  const body = document.getElementsByTagName("body")?.[0];
  const bodyHeight = body?.offsetHeight ?? 0;
  if (bodyHeight > 0) {
    const topSpace = Math.trunc((window.innerHeight - bodyHeight) / 2);
    body.style.paddingTop = "" + topSpace + "px";
  }
}

window.addEventListener("load", setTopSpace);
window.addEventListener("resize", setTopSpace);
screen.orientation.addEventListener("change", setTopSpace);
