ig.module('plugins.joncom.easy-animation-sequence.animation')
.requires('impact.animation')
.defines(function(){ "use strict";

    ig.Animation.inject({

        init: function(sheet, frameTime, sequence, stop) {
            if (typeof(sequence) == "string") {
                sequence = this._convertSequenceStringToArray(sequence);
            }
            this.parent(sheet, frameTime, sequence, stop);
        },

        // AUTHOR: dmen
        // URL: http://impactjs.com/forums/impact-engine/little-update-to-addanim/page/1
        _convertSequenceStringToArray: function(string) {
            var sequence = [];
            var parts = string.split(",");
            for(var i=0; i<parts.length; i++) {
                var part = parts[i];
                var index = part.indexOf("-");
                if(index === -1) {
                    var frame = parseInt(part, 10);
                    sequence.push(frame);
                } else {
                    var a = parseInt(part.substring(0, index), 10);
                    var b = parseInt(part.substr(index + 1), 10);
                    if(a < b) {
                        for (var frame = a; frame <= b; frame++) {
                            sequence.push(frame);
                        }
                    } else {
                        for (var frame = a; frame >= b; frame--) {
                            sequence.push(frame);
                        }
                    }
                }
            }
            return sequence;
        }

    });

});