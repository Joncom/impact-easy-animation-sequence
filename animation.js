ig.module('plugins.joncom.easy-animation-sequence.animation')
.requires('impact.animation')
.defines(function(){ "use strict";

    ig.Animation.inject({

        init: function(sheet, frameTime, sequence, stop) {
            if (typeof(sequence) == "string") {
                sequence = this._buildSequenceFromString(sequence);
            }
            this.parent(sheet, frameTime, sequence, stop);
        },

        _buildSequenceFromString: function(string) {
            var sequence = [];
            var chunks = string.split(",");
            for(var i=0; i<chunks.length; i++) {
                var chunk = chunks[i];
                var subsequence = this._createSequenceArrayFromChunk(chunk);
                sequence = sequence.concat(subsequence);
            }
            return sequence;
        },

        _createSequenceArrayFromChunk: function(chunk) {
            var sequence = [];
            var index = chunk.indexOf("-");
            if(index === -1) {
                var frame = parseInt(chunk, 10);
                sequence.push(frame);
            } else {
                var ranges = chunk.split("-");
                ranges = this._parseIntegersInArray(ranges);
                for(var r=0; r<(ranges.length-1); r++) {
                    var a = ranges[r];
                    var b = ranges[r+1];
                    if(r !== 0) {
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