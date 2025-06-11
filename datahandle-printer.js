#!/usr/bin/env node

// This script prints the URL of data from a shareable Croquet Data handle

import { urlFromHandle } from './util.js';

const src = process.argv[2];
if (!src) {
    console.error('Usage: node datahandle-printer.js <datahandle>');
    process.exit(1);
}

if (!src[0] === '3') {
    console.error('Can only print shareable data handles! Aborting.');
    process.exit(1);
}

console.log(urlFromHandle(src));
