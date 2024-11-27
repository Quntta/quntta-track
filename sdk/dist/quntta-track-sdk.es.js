(function() {
  const s = history.pushState, t = history.replaceState;
  history.pushState = function() {
    const e = document.location.href;
    s.apply(history, arguments);
    const n = new CustomEvent("historychange", { detail: { previousURL: e, currentURL: document.location.href } });
    window.dispatchEvent(n);
  }, history.replaceState = function() {
    const e = document.location.href;
    t.apply(history, arguments);
    const n = new CustomEvent("historychange", { detail: { previousURL: e, currentURL: document.location.href } });
    window.dispatchEvent(n);
  };
})();
const r = (s) => s ? s.split("&").reduce((t, e) => {
  const [n, o] = e.split("=");
  return t[n] = o, t;
}, {}) : {};
class i {
  constructor() {
    this.events = {}, this.previousURL = document.location.href;
  }
  listener() {
    window.addEventListener("error", (t) => {
      console.log("error", t);
    }), document.addEventListener(
      "error",
      (t) => {
        console.log("document error", t);
      },
      !0
    ), document.addEventListener(
      "click",
      (t) => {
        var e, n;
        if ((n = (e = t.target) == null ? void 0 : e.dataset) != null && n.track) {
          const o = r(t.target.dataset.track);
          console.log("track", t.target.dataset.track, o), this.emit("click", o);
        }
      },
      !0
    ), window.addEventListener("historychange", (t) => {
      const { previousURL: e, currentURL: n } = t.detail;
      console.log(
        "History changed from: " + e + " to: " + n
      );
    }), window.addEventListener("hashchange", () => {
      const t = document.location.href;
      console.log(
        "Hash changed from: " + this.previousURL + " to: " + t
      ), this.previousURL = t;
    });
  }
  on(t, e) {
    this.events[t] || (this.events[t] = []), this.events[t].push(e);
  }
  emit(t, ...e) {
    this.events[t] && this.events[t].forEach((n) => {
      n(...e);
    });
  }
}
class c {
  click(t) {
    console.log("click", t);
  }
}
class a {
  constructor() {
    this.eventListener = new i(), this.pusher = new c(), this.eventListener.on("click", this.pusher.click.bind(this.pusher));
  }
  init() {
    this.eventListener.listener();
  }
}
const h = new a();
h.init();
