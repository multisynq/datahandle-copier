// Helper functions from Croquet's data.js

export function urlFromHandle(id) {
    const key = fromBase64Url(id.slice(1, 1 + 43));
    const url = scramble(key, atob(fromBase64Url(id.slice(1 + 43))));
    return url;
}

function scramble(key, string) {
    if (!key) key = '*';
    return string.replace(/[\s\S]/g, c => String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(0)));
}

function fromBase64Url(base64url) {
    return base64url.replace(/-/g, "+").replace(/_/g, "/").padEnd((base64url.length + 3) & ~3, "=");
}
