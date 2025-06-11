#!/usr/bin/env node
'use strict';

// This script copies data from an old shareable Croquet handle
// to a new handle stored on a Multisynq file server.

import { Model, View, Session, Data } from '@croquet/croquet';
import { urlFromHandle } from './util.js';

const src = process.argv[2];
if (!src) {
    console.error('Usage: node datahandle-copier.js <datahandle>');
    process.exit(1);
}

if (!src[0] === '3') {
    console.error('Can only decrypt shareable data handles! Aborting.');
    process.exit(1);
}

const srcURL = new URL(urlFromHandle(src));
if (!srcURL.hostname.endsWith('croquet.io')) {
    console.log('Source URL host is', srcURL.hostname);
    console.error('This script is meant to copy data from croquet.io to multisynq.io! Aborting.');
    process.exit(1);
}

Session.join({
    apiKey: '234567_Paste_Your_Own_API_Key_Here_7654321',
    appId: 'io.multisynq.datahandle-copier',
    name: 'default',
    password: 'none',
    model: Model,
    view: View,
    step: "manual",
}).then(async session => {
    console.log('Session started', session.id);

    const srcHandle = Data.fromId(src);
    console.log('Source URL:', urlFromHandle(src));
    const data = await session.data.fetch(srcHandle);
    console.log('Data fetched:', data.length, 'bytes');

    const dstHandle = await session.data.store(data.buffer, {shareable: true});
    const dst = Data.toId(dstHandle);
    console.log('Destination URL:', urlFromHandle(dst));
    console.log('Data copied to new handle:\n')
    console.log(dst);

    process.exit(0);
});
