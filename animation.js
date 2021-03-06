ig.module('plugins.joncom.easy-animation-sequence.animation')
.requires('impact.animation')
.defines(function(){ "use strict";

    ig.Animation.inject({

        init: function(sheet, frameTime, sequence, stop) {
            if (typeof(sequence) == "string") {
                sequence = this._createArrayOfIntegersFromString(sequence);
            }
            this.parent(sheet, frameTime, sequence, stop);
        },

        _createArrayOfIntegersFromString: function(string) {
            var sequence = [];
            var chunks = string.split(",");
            for(var i=0; i<chunks.length; i++) {
                var chunk = chunks[i];
                var subsequence = this._createArrayOfIntegersFromStringChunk(chunk);
                sequence = sequence.concat(subsequence);
            }
            return sequence;
        },

        _createArrayOfIntegersFromStringChunk: function(chunk) {
            var sequence = [];
            var index = chunk.indexOf("-");
            if(index === -1) {
                // Not a range, just a single number.
                var frame = parseInt(chunk, 10);
                sequence.push(frame);
            } else {
                var ranges = chunk.split("-");
                ranges = this._parseIntegersInArray(ranges);
                for(var i=0; i<(ranges.length-1); i++) {
                    var a = ranges[i];
                    var b = ranges[i+1];
                    if(i !== 0) {
                        // Prevent duplication of numbers between limits.
                        a += (a < b ? 1 : -1);
                    }
                    var array = this._createArrayOfIntegersFromRange(a, b);
                    sequence = sequence.concat(array);
                }
            }
            return sequence;
        },

        _createArrayOfIntegersFromRange: function(a, b) {
            var array = [];
            var integer = a;
            var running = true;
            while(running) {
                // Have we past the end of the range?
                if( (a < b && integer > b) || (a > b && integer < b) ) {
                    running = false;
                    continue;
                }
                array.push(integer);
                integer += (a < b ? 1 : -1);
            }
            return array;
        },

        _parseIntegersInArray: function(array) {
            for(var i=0; i<array.length; i++) {
                array[i] = parseInt(array[i], 10);
            }
            return array;
        }

    });

});