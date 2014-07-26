var subject = require('../parser');
var sinon = require('sinon');
var assert = require('assert');

var line1 = 'Id,Tz,From,To,Sched,Hours,Rating,Comment,Framerate,Snore,Noise,Cycles,DeepSleep,LenAdjust,Geo,"2:40","2:44","2:47","2:50","2:54","2:57","3:00","3:04","3:07","3:10","3:14","3:17","3:20","3:24","3:27","3:30","3:34","3:37","3:40","3:44","3:47","3:50","3:54","3:57","4:00","4:04","4:07","4:10","4:14","4:17","4:20","4:24","4:27","4:30","4:34","4:37","4:40","4:44","4:47","4:50","4:54","4:57","5:00","5:04","5:07","5:10","5:14","5:17","5:21","5:24","5:27","5:31","5:34","5:37","5:41","5:44","5:47","5:51","5:54","5:57","6:01","6:04","6:07","6:11","6:14","6:17","6:21","6:24","6:27","6:31","6:34","6:37","6:41","6:44","6:47","6:51","6:54","6:57","7:01","7:04","7:07","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event","Event"';
var line2 = '"1406367447010","America/Los_Angeles","26. 07. 2014 2:37","26. 07. 2014 7:07","07. 08. 2014 3:17","4.510","3.5"," #home #early ","10000","0","0.2737098","5","0.8148148","0","","1.7019926","0.29956794","0.27947846","0.2592457","0.29145876","0.26944992","0.27359548","0.29962385","0.3029902","0.2856252","0.31056795","0.26258627","0.27254656","0.2828097","0.30299032","0.2669466","0.3073135","0.31468654","0.25924557","0.39228058","0.39228064","0.2789349","0.27893493","0.27010056","0.31051558","0.31051645","0.8598852","0.86054164","0.6504931","0.6533142","2.29201","2.0996964","0.5540514","0.26944995","0.30299","0.29145876","0.2625861","0.30731282","0.307313","0.3073132","0.36041322","0.4259029","0.28562468","0.25534377","0.29956827","0.2553437","0.28280938","0.28280944","0.30731285","0.30731305","0.28280932","0.42253086","0.29956818","0.2735957","0.28280962","0.29501337","0.2914592","0.3199313","0.29956815","0.35628584","0.34401515","0.5038168","0.28562492","0.3029904","0.6708068","0.3177428","0.3294771","0.3359201","0.2828101","0.28781503","0.30731326","0.35098282","0.35758412","0.38216153","0.28280964","0.29145914","0.3249409","0.35517806","0.363077","0.32027382","1.7145246","LIGHT_START-1406367447010","LIGHT_END-1406367647276","DEEP_START-1406367647276","REM_START-1406371453926","REM_END-1406372653926","LIGHT_START-1406372653926","DEEP_END-1406372653926","LIGHT_END-1406374055788","DEEP_START-1406374055788","LIGHT_START-1406375657916","DEEP_END-1406375657916","LIGHT_END-1406375858182","DEEP_START-1406375858182","LIGHT_START-1406377660576","DEEP_END-1406377660576","LIGHT_END-1406377860842","DEEP_START-1406377860842","LIGHT_START-1406379663236","DEEP_END-1406379663236","LIGHT_END-1406380464300","DEEP_START-1406380464300","REM_START-1406382468563","TRACKING_STOPPED_BY_USER-1406383668515","REM_END-1406383668563","DEEP_END-1406383668563"';
var line3 = ',,,,,,,,,,,,,"20643.813","20733.506","4314.405","446.9163","425.9386","443.99234","557.84314","554.77057","4259.033","4278.44","885.9585","639.7414","660.9701","2118.4678","2312.229","2313.6267","2319.1794","2319.0525","2309.7002","2309.448","2392.7588","2373.205","2373.003","1470.6777","472.65518","483.45752","1675.9434","536.37463","803.35986","811.39795","5680.9004","5682.2495","1789.5466","4607.03","4606.9053","29770.81","29773.521","27592.824","566.9559","381.41763","393.43604","402.29706","323.94064","335.87048","454.12872","465.91785","379.78726","407.48013","388.34134","451.84985","386.01178","526.6788","608.9271","388.156","427.59433","380.87344","367.50653","451.73172","420.1178","587.3663","816.9205","14983.483","14983.402","16493.697","16493.693","16324.945","16324.878","16642.494","16803.664","16803.684","16858.477","16858.465","16925.238","16925.234","23966.395","20642.33","20643.129","20642.477","20642.457","20641.99","20641.98","20642.025","20641.953","20641.957","20642.693","20642.742","20642.043","20642.033","20642.033","20641.955","20642.059","20662.545","20662.545","26007.271"';

var overnightLine1 = 'Id,Tz,From,To,Sched,Hours,Rating,Comment,Framerate,Snore,Noise,Cycles,DeepSleep,LenAdjust,Geo,"23:37","23:43","23:49","23:55","0:01","0:07","0:12","0:18","0:24","0:30","0:36","0:42","0:48","0:54","0:59","1:05","1:11","1:17","1:23","1:29","1:35","1:40","1:46","1:52","1:58","2:04","2:10","2:16","2:22","2:27","2:33","2:39","2:45","2:51","2:57","3:03","3:09","3:14","3:20","3:26","3:32","3:38","3:44","3:50","3:55","4:01","4:07","4:13","4:19","4:25","4:31","4:37","4:42","4:48","4:54","5:00","5:06","5:12","5:18","5:23","5:29","5:35","5:41","5:47","5:53","5:59","6:05","6:10","6:16","6:22","6:28","6:34","6:40","6:46","6:51","6:57","7:03","7:09","7:15","7:21","7:27","7:33","7:38","7:44","7:50","Event","Event"';
var overnightLine2 = '"1395210713631","America/Los_Angeles","18. 03. 2014 23:31","19. 03. 2014 7:50","19. 03. 2014 7:50","8.310","0.0","","10000","-1","0.26911244","2","0.11764706","0","","2.837721","3.8810692","3.722345","2.4417877","3.7596788","3.7477372","2.8071752","2.6072369","2.3236742","2.2556205","2.4493315","3.651782","3.6335676","3.6222618","1.9030962","4.4604826","4.4407907","4.564775","4.4621797","4.4772997","3.6347775","4.560817","4.4046116","2.6431065","2.9593112","3.6246283","4.426334","2.7440562","3.7977426","3.727876","3.7821412","3.9577427","3.6879077","3.7121367","3.7702034","3.749238","4.4790573","2.3233352","2.6682293","3.6999586","3.568512","2.4773598","2.5640512","2.4578893","3.520675","5.0365515","5.0848656","3.7389572","2.5344021","3.6417813","3.8521202","3.614078","2.2685912","3.8934886","2.5780344","2.9479215","4.370961","3.5919266","3.5623708","4.421139","3.6867554","2.326244","2.70228","2.8350942","2.447168","2.6566992","3.8201668","3.619549","2.7465024","4.553015","2.4568307","2.3456075","1.6856976","4.4869766","3.619433","2.4292436","2.4901438","3.8736258","3.9160943","3.5983818","3.722015","5.0761557","3.6267576","3.6822891","4.553717","ALARM_LATEST-1395240600000","ALARM_STARTED-1395240600217"';
var overnightLine3 = ',,,,,,,,,,,,,"20762.854","878.0702","372.69757","484.53345","744.97485","1080.917","790.7833","411.52438","754.7422","763.69855","381.64767","408.7333","399.72327","357.27954","389.46527","365.29282","336.39706","319.96252","317.17487","371.231","406.72934","15171.37","15171.396","275.75385","745.5374","15340.201","15340.204","15332.647","593.00684","20641.95","20641.992","20642.459","20642.0","20641.947","20641.97","20641.97","20641.941","20641.973","20641.941","20641.94","20641.941","20641.941","20641.941","20641.947","20641.947","20641.969","20641.945","23249.18","23249.176","20641.97","20641.98","20641.957","20641.957","20641.955","26012.518","29855.033","26007.639","580.1291","529.4289","1065.461","1157.3073","410.5069","469.7923","473.24844","430.24734","537.47577","605.31104","602.0204","558.1354","487.50388","1809.542","2196.624","2361.0903","2328.1892","1892.6652","1523.779","1673.7897","1652.7262","1961.7566","2031.2522","2044.6368","2005.689","1892.4402","1885.2858","2156.9263"';

describe('parser', function() {
  it('should validate the file format', function() {
    assert.throws(function() {
      subject('BAD');
    }, /invalid file/);
  });

  describe('with valid data', function() {
    var result;

    beforeEach(function() {
      result = subject(line1, line2, line3);
    });

    it('parses the tags', function() {
      assert.deepEqual(result.tags, ['home', 'early']);
    });

    it('parses the events', function() {
      assert.deepEqual(result.events, [
        { time: '2014-07-26T09:37:27.010Z', event: 'LIGHT_START' },
        { time: '2014-07-26T09:40:47.276Z', event: 'LIGHT_END' },
        { time: '2014-07-26T09:40:47.276Z', event: 'DEEP_START' },
        { time: '2014-07-26T10:44:13.926Z', event: 'REM_START' },
        { time: '2014-07-26T11:04:13.926Z', event: 'REM_END' },
        { time: '2014-07-26T11:04:13.926Z', event: 'LIGHT_START' },
        { time: '2014-07-26T11:04:13.926Z', event: 'DEEP_END' },
        { time: '2014-07-26T11:27:35.788Z', event: 'LIGHT_END' },
        { time: '2014-07-26T11:27:35.788Z', event: 'DEEP_START' },
        { time: '2014-07-26T11:54:17.916Z', event: 'LIGHT_START' },
        { time: '2014-07-26T11:54:17.916Z', event: 'DEEP_END' },
        { time: '2014-07-26T11:57:38.182Z', event: 'LIGHT_END' },
        { time: '2014-07-26T11:57:38.182Z', event: 'DEEP_START' },
        { time: '2014-07-26T12:27:40.576Z', event: 'LIGHT_START' },
        { time: '2014-07-26T12:27:40.576Z', event: 'DEEP_END' },
        { time: '2014-07-26T12:31:00.842Z', event: 'LIGHT_END' },
        { time: '2014-07-26T12:31:00.842Z', event: 'DEEP_START' },
        { time: '2014-07-26T01:01:03.236Z', event: 'LIGHT_START' },
        { time: '2014-07-26T01:01:03.236Z', event: 'DEEP_END' },
        { time: '2014-07-26T01:14:24.300Z', event: 'LIGHT_END' },
        { time: '2014-07-26T01:14:24.300Z', event: 'DEEP_START' },
        { time: '2014-07-26T01:47:48.563Z', event: 'REM_START' },
        { time: '2014-07-26T02:07:48.515Z', event: 'TRACKING_STOPPED_BY_USER' },
        { time: '2014-07-26T02:07:48.563Z', event: 'REM_END' },
        { time: '2014-07-26T02:07:48.563Z', event: 'DEEP_END' }
      ]);
    });

    it('parses movement', function() {
      assert.deepEqual(result.data, [
        { time: '2014-07-26T02:40-0700', movement: 1.7019926 },
        { time: '2014-07-26T02:44-0700', movement: 0.29956794 },
        { time: '2014-07-26T02:47-0700', movement: 0.27947846 },
        { time: '2014-07-26T02:50-0700', movement: 0.2592457 },
        { time: '2014-07-26T02:54-0700', movement: 0.29145876 },
        { time: '2014-07-26T02:57-0700', movement: 0.26944992 },
        { time: '2014-07-26T03:00-0700', movement: 0.27359548 },
        { time: '2014-07-26T03:04-0700', movement: 0.29962385 },
        { time: '2014-07-26T03:07-0700', movement: 0.3029902 },
        { time: '2014-07-26T03:10-0700', movement: 0.2856252 },
        { time: '2014-07-26T03:14-0700', movement: 0.31056795 },
        { time: '2014-07-26T03:17-0700', movement: 0.26258627 },
        { time: '2014-07-26T03:20-0700', movement: 0.27254656 },
        { time: '2014-07-26T03:24-0700', movement: 0.2828097 },
        { time: '2014-07-26T03:27-0700', movement: 0.30299032 },
        { time: '2014-07-26T03:30-0700', movement: 0.2669466 },
        { time: '2014-07-26T03:34-0700', movement: 0.3073135 },
        { time: '2014-07-26T03:37-0700', movement: 0.31468654 },
        { time: '2014-07-26T03:40-0700', movement: 0.25924557 },
        { time: '2014-07-26T03:44-0700', movement: 0.39228058 },
        { time: '2014-07-26T03:47-0700', movement: 0.39228064 },
        { time: '2014-07-26T03:50-0700', movement: 0.2789349 },
        { time: '2014-07-26T03:54-0700', movement: 0.27893493 },
        { time: '2014-07-26T03:57-0700', movement: 0.27010056 },
        { time: '2014-07-26T04:00-0700', movement: 0.31051558 },
        { time: '2014-07-26T04:04-0700', movement: 0.31051645 },
        { time: '2014-07-26T04:07-0700', movement: 0.8598852 },
        { time: '2014-07-26T04:10-0700', movement: 0.86054164 },
        { time: '2014-07-26T04:14-0700', movement: 0.6504931 },
        { time: '2014-07-26T04:17-0700', movement: 0.6533142 },
        { time: '2014-07-26T04:20-0700', movement: 2.29201 },
        { time: '2014-07-26T04:24-0700', movement: 2.0996964 },
        { time: '2014-07-26T04:27-0700', movement: 0.5540514 },
        { time: '2014-07-26T04:30-0700', movement: 0.26944995 },
        { time: '2014-07-26T04:34-0700', movement: 0.30299 },
        { time: '2014-07-26T04:37-0700', movement: 0.29145876 },
        { time: '2014-07-26T04:40-0700', movement: 0.2625861 },
        { time: '2014-07-26T04:44-0700', movement: 0.30731282 },
        { time: '2014-07-26T04:47-0700', movement: 0.307313 },
        { time: '2014-07-26T04:50-0700', movement: 0.3073132 },
        { time: '2014-07-26T04:54-0700', movement: 0.36041322 },
        { time: '2014-07-26T04:57-0700', movement: 0.4259029 },
        { time: '2014-07-26T05:00-0700', movement: 0.28562468 },
        { time: '2014-07-26T05:04-0700', movement: 0.25534377 },
        { time: '2014-07-26T05:07-0700', movement: 0.29956827 },
        { time: '2014-07-26T05:10-0700', movement: 0.2553437 },
        { time: '2014-07-26T05:14-0700', movement: 0.28280938 },
        { time: '2014-07-26T05:17-0700', movement: 0.28280944 },
        { time: '2014-07-26T05:21-0700', movement: 0.30731285 },
        { time: '2014-07-26T05:24-0700', movement: 0.30731305 },
        { time: '2014-07-26T05:27-0700', movement: 0.28280932 },
        { time: '2014-07-26T05:31-0700', movement: 0.42253086 },
        { time: '2014-07-26T05:34-0700', movement: 0.29956818 },
        { time: '2014-07-26T05:37-0700', movement: 0.2735957 },
        { time: '2014-07-26T05:41-0700', movement: 0.28280962 },
        { time: '2014-07-26T05:44-0700', movement: 0.29501337 },
        { time: '2014-07-26T05:47-0700', movement: 0.2914592 },
        { time: '2014-07-26T05:51-0700', movement: 0.3199313 },
        { time: '2014-07-26T05:54-0700', movement: 0.29956815 },
        { time: '2014-07-26T05:57-0700', movement: 0.35628584 },
        { time: '2014-07-26T06:01-0700', movement: 0.34401515 },
        { time: '2014-07-26T06:04-0700', movement: 0.5038168 },
        { time: '2014-07-26T06:07-0700', movement: 0.28562492 },
        { time: '2014-07-26T06:11-0700', movement: 0.3029904 },
        { time: '2014-07-26T06:14-0700', movement: 0.6708068 },
        { time: '2014-07-26T06:17-0700', movement: 0.3177428 },
        { time: '2014-07-26T06:21-0700', movement: 0.3294771 },
        { time: '2014-07-26T06:24-0700', movement: 0.3359201 },
        { time: '2014-07-26T06:27-0700', movement: 0.2828101 },
        { time: '2014-07-26T06:31-0700', movement: 0.28781503 },
        { time: '2014-07-26T06:34-0700', movement: 0.30731326 },
        { time: '2014-07-26T06:37-0700', movement: 0.35098282 },
        { time: '2014-07-26T06:41-0700', movement: 0.35758412 },
        { time: '2014-07-26T06:44-0700', movement: 0.38216153 },
        { time: '2014-07-26T06:47-0700', movement: 0.28280964 },
        { time: '2014-07-26T06:51-0700', movement: 0.29145914 },
        { time: '2014-07-26T06:54-0700', movement: 0.3249409 },
        { time: '2014-07-26T06:57-0700', movement: 0.35517806 },
        { time: '2014-07-26T07:01-0700', movement: 0.363077 },
        { time: '2014-07-26T07:04-0700', movement: 0.32027382 },
        { time: '2014-07-26T07:07-0700', movement: 1.7145246 }
      ]);
    });
  });

  it('determines correct data times when the data spans multiple days', function() {
    var result = subject(overnightLine1, overnightLine2, overnightLine3);
    assert.deepEqual(result.data.map(function(d) { return d.time }), [
      '2014-03-18T11:37-0700',
      '2014-03-18T11:43-0700',
      '2014-03-18T11:49-0700',
      '2014-03-18T11:55-0700',
      '2014-03-19T12:01-0700',
      '2014-03-19T12:07-0700',
      '2014-03-19T12:12-0700',
      '2014-03-19T12:18-0700',
      '2014-03-19T12:24-0700',
      '2014-03-19T12:30-0700',
      '2014-03-19T12:36-0700',
      '2014-03-19T12:42-0700',
      '2014-03-19T12:48-0700',
      '2014-03-19T12:54-0700',
      '2014-03-19T12:59-0700',
      '2014-03-19T01:05-0700',
      '2014-03-19T01:11-0700',
      '2014-03-19T01:17-0700',
      '2014-03-19T01:23-0700',
      '2014-03-19T01:29-0700',
      '2014-03-19T01:35-0700',
      '2014-03-19T01:40-0700',
      '2014-03-19T01:46-0700',
      '2014-03-19T01:52-0700',
      '2014-03-19T01:58-0700',
      '2014-03-19T02:04-0700',
      '2014-03-19T02:10-0700',
      '2014-03-19T02:16-0700',
      '2014-03-19T02:22-0700',
      '2014-03-19T02:27-0700',
      '2014-03-19T02:33-0700',
      '2014-03-19T02:39-0700',
      '2014-03-19T02:45-0700',
      '2014-03-19T02:51-0700',
      '2014-03-19T02:57-0700',
      '2014-03-19T03:03-0700',
      '2014-03-19T03:09-0700',
      '2014-03-19T03:14-0700',
      '2014-03-19T03:20-0700',
      '2014-03-19T03:26-0700',
      '2014-03-19T03:32-0700',
      '2014-03-19T03:38-0700',
      '2014-03-19T03:44-0700',
      '2014-03-19T03:50-0700',
      '2014-03-19T03:55-0700',
      '2014-03-19T04:01-0700',
      '2014-03-19T04:07-0700',
      '2014-03-19T04:13-0700',
      '2014-03-19T04:19-0700',
      '2014-03-19T04:25-0700',
      '2014-03-19T04:31-0700',
      '2014-03-19T04:37-0700',
      '2014-03-19T04:42-0700',
      '2014-03-19T04:48-0700',
      '2014-03-19T04:54-0700',
      '2014-03-19T05:00-0700',
      '2014-03-19T05:06-0700',
      '2014-03-19T05:12-0700',
      '2014-03-19T05:18-0700',
      '2014-03-19T05:23-0700',
      '2014-03-19T05:29-0700',
      '2014-03-19T05:35-0700',
      '2014-03-19T05:41-0700',
      '2014-03-19T05:47-0700',
      '2014-03-19T05:53-0700',
      '2014-03-19T05:59-0700',
      '2014-03-19T06:05-0700',
      '2014-03-19T06:10-0700',
      '2014-03-19T06:16-0700',
      '2014-03-19T06:22-0700',
      '2014-03-19T06:28-0700',
      '2014-03-19T06:34-0700',
      '2014-03-19T06:40-0700',
      '2014-03-19T06:46-0700',
      '2014-03-19T06:51-0700',
      '2014-03-19T06:57-0700',
      '2014-03-19T07:03-0700',
      '2014-03-19T07:09-0700',
      '2014-03-19T07:15-0700',
      '2014-03-19T07:21-0700',
      '2014-03-19T07:27-0700',
      '2014-03-19T07:33-0700',
      '2014-03-19T07:38-0700',
      '2014-03-19T07:44-0700',
      '2014-03-19T07:50-0700'
    ]);
  });
});