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

        _convertSequenceStringToArray: function(string) {
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
                    var frame = a;
                    var running = true;
                    while(running) {
                        if(frame === a && r !== 0) {
                            frame += (a < b ? 1 : -1);
                            continue;
                        }
                        if( (a < b && frame > b) || (a > b && frame < b) ) {
                            running = false;
                            continue;
                        }
                        sequence.push(frame);
                        frame += (a < b ? 1 : -1);
                    }
                }
            }
            return sequence;
        },

        _parseIntegersInArray: function(array) {
            for(var i=0; i<array.length; i++) {
                array[i] = parseInt(array[i], 10);
            }
            return array;
        }

    });

});