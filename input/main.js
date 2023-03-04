const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

Element.prototype.$ = function () {
  return this.querySelector.apply(this, arguments);
};

Element.prototype.$$ = function () {
  return this.querySelectorAll.apply(this, arguments);
};

window.$ = $;
window.$$ = $$;

function updateTabs(tabs, href) {
    const url = new URL(href);
    const selectedTabId = url.searchParams.get("tab");

    if (!selectedTabId) {
        tabs.$(":scope > nav > a").classList.add("selected");
        tabs.$(":scope > div").style.display = "inherit";
        return;
    }

    for (const link of tabs.$$(":scope > nav > a")) {
        if (link.href == href) {
            link.classList.add("selected");
        } else {
            link.classList.remove("selected");
        }
    }

    for (const pane of tabs.$$(":scope > div")) {
        if (pane.id == selectedTabId) {
            pane.style.display = "inherit";
        } else {
            pane.style.display = "none";
        }
    }
}

window.addEventListener("load", () => {
    for (const tabs of $$(".tabs")) {
        updateTabs(tabs, window.location.href);

        for (const link of tabs.$$(":scope > nav > a")) {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                window.history.replaceState(null, null, link.href);
                updateTabs(tabs, link.href);
            });
        }
    }
});
