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
            var p = string.indexOf("-");
            var startRange = parseInt(string.substring(0, p), 10);
            var endRange = parseInt(string.substr(p + 1), 10);
            for (var i = startRange; i <= endRange; i++) {
                sequence.push(i);
            }
            return sequence;
        }

    });

});