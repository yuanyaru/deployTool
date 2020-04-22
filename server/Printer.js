//
// Copyright (c) ZeroC, Inc. All rights reserved.
//
//
// Ice version 3.7.3
//
// <auto-generated>
//
// Generated from file `Printer.ice'
//
// Warning: do not edit this file.
//
// </auto-generated>
//

/* eslint-disable */
/* jshint ignore: start */

(function(module, require, exports)
{
    const Ice = require("ice").Ice;
    const _ModuleRegistry = Ice._ModuleRegistry;
    const Slice = Ice.Slice;

    let Demo = _ModuleRegistry.module("Demo");

    const iceC_Demo_Printer_ids = [
        "::Demo::Printer",
        "::Ice::Object"
    ];

    Demo.Printer = class extends Ice.Object
    {
    };

    Demo.PrinterPrx = class extends Ice.ObjectPrx
    {
    };

    Slice.defineOperations(Demo.Printer, Demo.PrinterPrx, iceC_Demo_Printer_ids, 0,
    {
        "printString": [, , , , , [[7]], , , , ]
    });
    exports.Demo = Demo;
}
(typeof(global) !== "undefined" && typeof(global.process) !== "undefined" ? module : undefined,
 typeof(global) !== "undefined" && typeof(global.process) !== "undefined" ? require :
 (typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope) ? self.Ice._require : window.Ice._require,
 typeof(global) !== "undefined" && typeof(global.process) !== "undefined" ? exports :
 (typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope) ? self : window));
