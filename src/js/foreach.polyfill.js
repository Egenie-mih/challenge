if (!NodeList.prototype.forEach) {
    Object.defineProperty(NodeList.prototype, "forEach", {
        value: Array.prototype.forEach,
        enumerable: true, // This surprised me, but it's how it's defined on both
                          // Chrome and FireFox
        configurable: true,
        writable: true
    });
}
