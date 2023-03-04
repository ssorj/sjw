const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

Element.prototype.$ = function () {
  return this.querySelector.apply(this, arguments);
};

Element.prototype.$$ = function () {
  return this.querySelectorAll.apply(this, arguments);
};

URL.prototype.$p = function $p(name, defaultValue) {
    let value = this.searchParams.get(name);

    if (value === null || value === undefined) {
        value = defaultValue;
    }

    return value;
}

const $p = function (name, defaultValue) {
    return new URL(window.location).$p(name, defaultValue);
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function nvl(value, replacement) {
    if (value === null || value === undefined) {
        return replacement;
    } else {
        return value;
    }
}

window.$ = $;
window.$$ = $$;
window.$p = $p;
window.capitalize = capitalize;
window.nvl = nvl;

function updateTabs(tabs, href) {
    let url = new URL(href);
    let selectedTabId = url.searchParams.get("tab");

    if (!selectedTabId) {
        tabs.$(":scope > nav > a").classList.add("selected");
        tabs.$(":scope > div").style.display = "inherit";
        return;
    }

    for (let link of tabs.$$(":scope > nav > a")) {
        if (link.href == href) {
            link.classList.add("selected");
        } else {
            link.classList.remove("selected");
        }
    }

    for (let pane of tabs.$$(":scope > div")) {
        if (pane.id == selectedTabId) {
            pane.style.display = "inherit";
        } else {
            pane.style.display = "none";
        }
    }
}

window.addEventListener("load", () => {
    for (let tabs of $$(".tabs")) {
        updateTabs(tabs, window.location.href);

        for (let link of tabs.$$(":scope > nav > a")) {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                window.history.replaceState(null, null, link.href);
                updateTabs(tabs, link.href);
            });
        }
    }
});


// function updateTabs(tabs, href) {
//     let url = new URL(href);
//     let selectedTabId = url.searchParams.get("tab");

//     if (!selectedTabId) {
//         tabs.$(":scope > nav > a").classList.add("selected");
//         tabs.$(":scope > div").style.display = "inherit";
//         return;
//     }

//     for (let link of tabs.$$(":scope > nav > a")) {
//         if (link.href == href) {
//             link.classList.add("selected");
//         } else {
//             link.classList.remove("selected");
//         }
//     }

//     for (let pane of tabs.$$(":scope > div")) {
//         if (pane.id == selectedTabId) {
//             pane.style.display = "inherit";
//         } else {
//             pane.style.display = "none";
//         }
//     }
// }

// window.addEventListener("load", () => {
//     for (let tabs of $$(".tabs")) {
//         updateTabs(tabs, window.location.href);
//     }
// });

// for (let tabs of $$(".tabs")) {
//     for (let link of tabs.$$(":scope > nav > a")) {
//         console.log(111);
//         link.addEventListener("click", (event) => {
//             event.preventDefault();
//             window.history.replaceState(null, null, link.href);
//             updateTabs(tabs, link.href);
//         });
//     }
// }
