const { NextResponse } = require("next/server");

function log(){
    return new NextResponse({message: 'lol'})
}

log()