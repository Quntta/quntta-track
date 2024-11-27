// 重写history.pushState和history.replaceState方法，使其在调用时触发自定义事件historychange
(function () {
  const pushState = history.pushState;
  const replaceState = history.replaceState;
  history.pushState = function() {
    const previousURL = document.location.href;
    pushState.apply(history, arguments as any);
    const event = new CustomEvent('historychange', { detail: { previousURL, currentURL: document.location.href } });
    window.dispatchEvent(event);
  };

  history.replaceState = function() {
    const previousURL = document.location.href;
    replaceState.apply(history,arguments as any);
    const event = new CustomEvent('historychange', { detail: { previousURL, currentURL: document.location.href } });
    window.dispatchEvent(event);
  };
})();