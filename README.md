## Impact Easy Animation Sequence ##

#### An ImpactJS plugin which allows you to define complex animation sequences with a simple string. ####

## Installation ##
1. Put plugin here: `/lib/plugins/joncom/easy-animation-sequence/`
2. Require `'plugins.joncom.easy-animation-sequence.animation'`.

## Examples ##
```
// These two statements are equivalent:
this.addAnim('walk', 0.1, [0,1,2,3,4,5]);
this.addAnim('walk', 0.1, "0-5");

// Reverse order works too:
this.addAnim('walk', 0.1, [5,4,3,2,1,0]);
this.addAnim('walk', 0.1, "5-0");

// Seperate using commas for complex sequences:
this.addAnim('walk', 0.1, [1,2,3,4,5,0,5,4,3,2]);
this.addAnim('walk', 0.1, "1-5,0,5-2");
```

#### Special thanks to [dmen](http://impactjs.com/forums/user/dmen) who [inspired](http://impactjs.com/forums/impact-engine/little-update-to-addanim/page/1) this plugin. ####
