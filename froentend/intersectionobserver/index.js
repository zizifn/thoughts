// index.js
const items = document.querySelectorAll('.item');
console.log(items);

const observerOptions = {
  root: null, // Use the viewport as the root
  rootMargin: '0px',
  threshold: 0.5 // Trigger when 50% of the item is visible
};
const visibleItems = [];
const showVisibleItems = debounce(()=>{
    console.log(visibleItems);
}, 100)
const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
        visibleItems.push(entry.target);
    //   console.log('Item in viewport:', entry.target);
    }else{
        const index = visibleItems.indexOf(entry.target);
        if (index > -1) {
            visibleItems.splice(index, 1);
        }
    }
    showVisibleItems();
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

items.forEach(item => observer.observe(item));

// setInterval(() => {
//     console.log(visibleItems);
// }, 1000);

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}