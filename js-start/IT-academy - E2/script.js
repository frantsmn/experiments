document.body.onmousedown = function makeDraggable(e) {
    e.preventDefault();
    if (e.target.tagName !== "IMG") return;

    let startX = e.pageX;
    let startY = e.pageY;
    let distanceX = 0;
    let distanceY = 0;
    const setImagePosition = function (e) {
        distanceX = e.pageX - startX;
        distanceY = e.pageY - startY;
        this.style.transform = `translate(${+this.dataset.translateX + distanceX}px, ${+this.dataset.translateY + distanceY}px)`;
    }.bind(e.target);
    const detachEvents = function () {
        this.dataset.translateX = +this.dataset.translateX + distanceX;
        this.dataset.translateY = +this.dataset.translateY + distanceY;
        document.removeEventListener('mousemove', setImagePosition);
        this.removeEventListener('mouseup', detachEvents);
        this.classList.remove('dragging');
    }
    document.querySelectorAll('img').forEach((img) => {
        img.style.zIndex = 0;
    });
    e.target.style.zIndex = '1';
    e.target.classList.add('dragging');
    e.target.dataset.translateX = Number(e.target.dataset.translateX) ? e.target.dataset.translateX : 0;
    e.target.dataset.translateY = Number(e.target.dataset.translateY) ? e.target.dataset.translateY : 0;
    document.addEventListener('mousemove', setImagePosition, false);
    e.target.addEventListener('mouseup', detachEvents, false);
}