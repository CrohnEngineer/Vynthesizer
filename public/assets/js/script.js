function changeOctave(range) {
    var keynotesfrequencies = [16.35, 17.32, 18.35, 19.45, 20.60, 21.83, 23.12, 24.50, 25.96, 27.50, 29.14, 30.87, 32.70, 34.65, 36.71, 38.89, 41.20, 43.65, 46.25, 49, 51.91, 55, 58.27, 61.74, 65.41, 69.30, 73.42, 77.78, 82.41, 87.31, 92.50, 98, 103.83, 110, 116.54, 123.47, 130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185, 196, 207.65, 220, 233.08, 246.94, 261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392, 415.30, 440, 466.16, 493.88, 523.25, 554.37, 587.33, 622.25, 659.25, 698.46, 739.99, 783.99, 830.61, 880, 932.33, 987.77, 1046.50, 1108.73, 1174.66, 1244.51, 1318.51, 1396.91, 1479.98, 1567.98, 1661.22, 1760, 1864.66, 1975.53, 2093, 2217.46, 2349.32, 2489.02, 2637.02, 2793.83, 2959.96, 3135.96, 3322.44, 3520, 3729.31, 3951.07, 4186.01, 4434.92, 4698.63, 4978.03, 5274.04, 5587.65, 5919.91, 6271.93, 6644.88, 7040, 7458.62, 7902.13];
    var octaves = $("#keyboard").attr("octaves");
    
    if (range==7) {
    var shiftfreqs = keynotesfrequencies.slice(range*12);
    }
    else {
        var shiftfreqs = keynotesfrequencies.slice(range*12,octaves*12+range*12);
    }
    
    keys = $("#keyboard").children();
    $.each(keys, function(idx,val) {
        if (val.className=="blacks") {
            blackkeys = val.childNodes;
            $.each(blackkeys, function(idx1,val1) {
                var index = val1.getAttribute("data-index");
                val1.setAttribute("data-notefrequency",shiftfreqs[index]);
            });
        }
        else {
            var index = val.getAttribute("data-index");
            val.setAttribute("data-notefrequency",shiftfreqs[index]);
        }
    });
};

function selectOscillator(num) {
    var num = parseInt(num);
    switch (num) {
        case 1:
            return oscillator1;
            break;
        case 2:
            return oscillator2;
            break;
        case 3:
            return oscillator3;
            break;
        default:
            var errorString = "No oscillator with this number";
            return errorString;
    }
};

function selectAmplitudeEnvelope(num) {
    var num=parseInt(num);
    switch (num) {
        case 1:
            return env1;
            break;
        case 2:
            return env2;
            break;
        case 3:
            return env3;
            break;
        default:
            var errorString = "No envelope with this number";
            return errorString;
    }
};

function selectGainNode(num) {
    var num = parseInt(num);
    switch(num) {
        case 1:
            return gainNode1;
            break;
        case 2:
            return gainNode2;
            break;
        case 3:
            return gainNode3;
            break;
        default:
            break;
    }
};

function changeAmpEnvParameter(parameter,value,oscillatorNum) {
    var env = selectAmplitudeEnvelope(oscillatorNum);

    switch (parameter) {
        case 'attack':
            value = value/1000;
            env.attack = value;
            break;
        case 'decay':
            value = value/1000;
            env.decay = value;
            break;
        case 'sustain':
            env.sustain = value;
            break;
        case 'release':
            value = value/1000;
            env.release = value;
            break;
        case 'attackwaveform':
            env.attackCurve = value;
            break;
        case 'releasewaveform':
            env.releaseCurve = value;
            break;
        default:
            break;
    }
};

function changeGain(value,oscillatorNum) {
    var gain = selectGainNode(parseInt(oscillatorNum));
    var value = parseInt(value);
    gain.gain.value = value;
};

function changeOscParameter(parameter,value,oscillatorNum) {
    var osc = selectOscillator(parseInt(oscillatorNum));
    console.log(parameter);
    console.log(value);
    switch (parameter) {
        case 'waveform':
            osc.stop();
            osc.type = value;
            osc.start();
            break;
        case 'phase':
            osc.stop();
            osc.phase = value;
            osc.start();
            break;
        case 'partial':
            osc.stop();
            var volume = value[0];
            var partial = value[1];
            
            if (osc.partials.length == 0) {
                osc.partials = [1, 0, 0, 0];
                osc.partials[partial] = volume/10;
            }
            else {
                osc.partials[partial] = volume/10;
            }
            
            osc.start();
            break;
        default:
            break;
    }
};

function clearParVolumeListener(knob) {
        knob.setValue(0);
        return;
};

function createOscillatorsControls() {
    
        /* Create the KNOBS of the 3 oscillators controls */
    
        //Knobs object creation
    
        var GainKnob1 = pureknob.createKnob(45, 45);
        GainKnob1.setProperty('angleStart', -0.75 * Math.PI);
        GainKnob1.setProperty('angleEnd', 0.75 * Math.PI);
        GainKnob1.setProperty('colorFG', '#ffffff');
        GainKnob1.setProperty('trackWidth', 0.4);
        GainKnob1.setProperty('valMin', 0);
        GainKnob1.setProperty('valMax', 10);
        GainKnob1.setValue(0);
        var GainKnob2 = pureknob.createKnob(45, 45);
        GainKnob2.setProperty('angleStart', -0.75 * Math.PI);
        GainKnob2.setProperty('angleEnd', 0.75 * Math.PI);
        GainKnob2.setProperty('colorFG', '#000000');
        GainKnob2.setProperty('colorBG', '#cccccc');
        GainKnob2.setProperty('trackWidth', 0.4);
        GainKnob2.setProperty('valMin', 0);
        GainKnob2.setProperty('valMax', 10);
        GainKnob2.setValue(0);
        var GainKnob3 = pureknob.createKnob(45, 45);
        GainKnob3.setProperty('angleStart', -0.75 * Math.PI);
        GainKnob3.setProperty('angleEnd', 0.75 * Math.PI);
        GainKnob3.setProperty('colorFG', '#ffffff');
        GainKnob3.setProperty('trackWidth', 0.4);
        GainKnob3.setProperty('valMin', 0);
        GainKnob3.setProperty('valMax', 10);
        GainKnob3.setValue(0);

        var PhaseKnob1 = pureknob.createKnob(45, 45);
        PhaseKnob1.setProperty('angleStart', 0);
        PhaseKnob1.setProperty('angleEnd', 2 * Math.PI);
        PhaseKnob1.setProperty('colorFG', '#ffffff');
        PhaseKnob1.setProperty('trackWidth', 0.4);
        PhaseKnob1.setProperty('valMin', 0);
        PhaseKnob1.setProperty('valMax', 360);
        PhaseKnob1.setValue(0);
        var PhaseKnob2 = pureknob.createKnob(45, 45);
        PhaseKnob2.setProperty('angleStart', 0);
        PhaseKnob2.setProperty('angleEnd', 2 * Math.PI);
        PhaseKnob2.setProperty('colorFG', '#000000');
        PhaseKnob2.setProperty('colorBG', '#cccccc');
        PhaseKnob2.setProperty('trackWidth', 0.4);
        PhaseKnob2.setProperty('valMin', 0);
        PhaseKnob2.setProperty('valMax', 360);
        PhaseKnob2.setValue(0);
        var PhaseKnob3 = pureknob.createKnob(45, 45);
        PhaseKnob3.setProperty('angleStart', 0);
        PhaseKnob3.setProperty('angleEnd', 2 * Math.PI);
        PhaseKnob3.setProperty('colorFG', '#ffffff');
        PhaseKnob3.setProperty('trackWidth', 0.4);
        PhaseKnob3.setProperty('valMin', 0);
        PhaseKnob3.setProperty('valMax', 360);
        PhaseKnob3.setValue(0);
        
        //Armonic volume knobs
        //Labels are: armonic#ofarmonic volumeknob#oscillator
        var Armonic1VolumeKnob1 = pureknob.createKnob(27, 27);
        Armonic1VolumeKnob1.setProperty('angleStart', -0.75 * Math.PI);
        Armonic1VolumeKnob1.setProperty('angleEnd', 0.75 * Math.PI);
        Armonic1VolumeKnob1.setProperty('colorFG', '#ffffff');
        Armonic1VolumeKnob1.setProperty('trackWidth', 0.4);
        Armonic1VolumeKnob1.setProperty('valMin', 0);
        Armonic1VolumeKnob1.setProperty('valMax', 10);
        Armonic1VolumeKnob1.setValue(0);
        var Armonic1VolumeKnob2 = pureknob.createKnob(27, 27);
        Armonic1VolumeKnob2.setProperty('angleStart', -0.75 * Math.PI);
        Armonic1VolumeKnob2.setProperty('angleEnd', 0.75 * Math.PI);
        Armonic1VolumeKnob2.setProperty('colorFG', '#000000');
        Armonic1VolumeKnob2.setProperty('colorBG', '#cccccc');
        Armonic1VolumeKnob2.setProperty('trackWidth', 0.4);
        Armonic1VolumeKnob2.setProperty('valMin', 0);
        Armonic1VolumeKnob2.setProperty('valMax', 10);
        Armonic1VolumeKnob2.setValue(0);
        var Armonic1VolumeKnob3 = pureknob.createKnob(27, 27);
        Armonic1VolumeKnob3.setProperty('angleStart', -0.75 * Math.PI);
        Armonic1VolumeKnob3.setProperty('angleEnd', 0.75 * Math.PI);
        Armonic1VolumeKnob3.setProperty('colorFG', '#ffffff');
        Armonic1VolumeKnob3.setProperty('trackWidth', 0.4);
        Armonic1VolumeKnob3.setProperty('valMin', 0);
        Armonic1VolumeKnob3.setProperty('valMax', 10);
        Armonic1VolumeKnob3.setValue(0);

        var Armonic2VolumeKnob1 = pureknob.createKnob(27, 27);
        Armonic2VolumeKnob1.setProperty('angleStart', -0.75 * Math.PI);
        Armonic2VolumeKnob1.setProperty('angleEnd', 0.75 * Math.PI);
        Armonic2VolumeKnob1.setProperty('colorFG', '#ffffff');
        Armonic2VolumeKnob1.setProperty('trackWidth', 0.4);
        Armonic2VolumeKnob1.setProperty('valMin', 0);
        Armonic2VolumeKnob1.setProperty('valMax', 10);
        Armonic2VolumeKnob1.setValue(0);
        var Armonic2VolumeKnob2 = pureknob.createKnob(27, 27);
        Armonic2VolumeKnob2.setProperty('angleStart', -0.75 * Math.PI);
        Armonic2VolumeKnob2.setProperty('angleEnd', 0.75 * Math.PI);
        Armonic2VolumeKnob2.setProperty('colorFG', '#000000');
        Armonic2VolumeKnob2.setProperty('colorBG', '#cccccc');
        Armonic2VolumeKnob2.setProperty('trackWidth', 0.4);
        Armonic2VolumeKnob2.setProperty('valMin', 0);
        Armonic2VolumeKnob2.setProperty('valMax', 10);
        Armonic2VolumeKnob2.setValue(0);
        var Armonic2VolumeKnob3 = pureknob.createKnob(27, 27);
        Armonic2VolumeKnob3.setProperty('angleStart', -0.75 * Math.PI);
        Armonic2VolumeKnob3.setProperty('angleEnd', 0.75 * Math.PI);
        Armonic2VolumeKnob3.setProperty('colorFG', '#ffffff');
        Armonic2VolumeKnob3.setProperty('trackWidth', 0.4);
        Armonic2VolumeKnob3.setProperty('valMin', 0);
        Armonic2VolumeKnob3.setProperty('valMax', 10);
        Armonic2VolumeKnob3.setValue(0);

        var Armonic3VolumeKnob1 = pureknob.createKnob(27, 27);
        Armonic3VolumeKnob1.setProperty('angleStart', -0.75 * Math.PI);
        Armonic3VolumeKnob1.setProperty('angleEnd', 0.75 * Math.PI);
        Armonic3VolumeKnob1.setProperty('colorFG', '#ffffff');
        Armonic3VolumeKnob1.setProperty('trackWidth', 0.4);
        Armonic3VolumeKnob1.setProperty('valMin', 0);
        Armonic3VolumeKnob1.setProperty('valMax', 10);
        Armonic3VolumeKnob1.setValue(0);
        var Armonic3VolumeKnob2 = pureknob.createKnob(27, 27);
        Armonic3VolumeKnob2.setProperty('angleStart', -0.75 * Math.PI);
        Armonic3VolumeKnob2.setProperty('angleEnd', 0.75 * Math.PI);
        Armonic3VolumeKnob2.setProperty('colorFG', '#000000');
        Armonic3VolumeKnob2.setProperty('colorBG', '#cccccc');
        Armonic3VolumeKnob2.setProperty('trackWidth', 0.4);
        Armonic3VolumeKnob2.setProperty('valMin', 0);
        Armonic3VolumeKnob2.setProperty('valMax', 10);
        Armonic3VolumeKnob2.setValue(0);
        var Armonic3VolumeKnob3 = pureknob.createKnob(27, 27);
        Armonic3VolumeKnob3.setProperty('angleStart', -0.75 * Math.PI);
        Armonic3VolumeKnob3.setProperty('angleEnd', 0.75 * Math.PI);
        Armonic3VolumeKnob3.setProperty('colorFG', '#ffffff');
        Armonic3VolumeKnob3.setProperty('trackWidth', 0.4);
        Armonic3VolumeKnob3.setProperty('valMin', 0);
        Armonic3VolumeKnob3.setProperty('valMax', 10);
        Armonic3VolumeKnob3.setValue(0);

        var AttackKnob1 = pureknob.createKnob(35, 35);
        AttackKnob1.setProperty('angleStart', -0.75 * Math.PI);
        AttackKnob1.setProperty('angleEnd', 0.75 * Math.PI);
        AttackKnob1.setProperty('colorFG', '#ffffff');
        AttackKnob1.setProperty('trackWidth', 0.4);
        AttackKnob1.setProperty('valMin', 0);
        AttackKnob1.setProperty('valMin', 0);
        AttackKnob1.setProperty('valMax',1000);
        AttackKnob1.setValue(1);
        var AttackKnob2 = pureknob.createKnob(35, 35);
        AttackKnob2.setProperty('angleStart', -0.75 * Math.PI);
        AttackKnob2.setProperty('angleEnd', 0.75 * Math.PI);
        AttackKnob2.setProperty('colorFG', '#000000');
        AttackKnob2.setProperty('colorBG', '#cccccc');
        AttackKnob2.setProperty('trackWidth', 0.4);
        AttackKnob2.setProperty('valMin', 0);
        AttackKnob2.setProperty('valMin', 0);
        AttackKnob2.setProperty('valMax',1000);
        AttackKnob2.setValue(1);
        var AttackKnob3 = pureknob.createKnob(35, 35);
        AttackKnob3.setProperty('angleStart', -0.75 * Math.PI);
        AttackKnob3.setProperty('angleEnd', 0.75 * Math.PI);
        AttackKnob3.setProperty('colorFG', '#ffffff');
        AttackKnob3.setProperty('trackWidth', 0.4);
        AttackKnob3.setProperty('valMin', 0);
        AttackKnob3.setProperty('valMin', 0);
        AttackKnob3.setProperty('valMax',1000);
        AttackKnob3.setValue(1);

        var DecayKnob1 = pureknob.createKnob(35,35);
        DecayKnob1.setProperty('angleStart', -0.75 * Math.PI);
        DecayKnob1.setProperty('angleEnd', 0.75 * Math.PI);
        DecayKnob1.setProperty('colorFG', '#ffffff');
        DecayKnob1.setProperty('trackWidth', 0.4);
        DecayKnob1.setProperty('valMin', 0);
        DecayKnob1.setProperty('valMin', 0);
        DecayKnob1.setProperty('valMax',500);
        DecayKnob1.setValue(2);
        var DecayKnob2 = pureknob.createKnob(35,35);
        DecayKnob2.setProperty('angleStart', -0.75 * Math.PI);
        DecayKnob2.setProperty('angleEnd', 0.75 * Math.PI);
        DecayKnob2.setProperty('colorFG', '#000000');
        DecayKnob2.setProperty('colorBG', '#cccccc');
        DecayKnob2.setProperty('trackWidth', 0.4);
        DecayKnob2.setProperty('valMin', 0);
        DecayKnob2.setProperty('valMin', 0);
        DecayKnob2.setProperty('valMax',500);
        DecayKnob2.setValue(2);
        var DecayKnob3 = pureknob.createKnob(35,35);
        DecayKnob3.setProperty('angleStart', -0.75 * Math.PI);
        DecayKnob3.setProperty('angleEnd', 0.75 * Math.PI);
        DecayKnob3.setProperty('colorFG', '#ffffff');
        DecayKnob3.setProperty('trackWidth', 0.4);
        DecayKnob3.setProperty('valMin', 0);
        DecayKnob3.setProperty('valMin', 0);
        DecayKnob3.setProperty('valMax',500);
        DecayKnob3.setValue(2);

        var SustainKnob1 = pureknob.createKnob(35,35);
        SustainKnob1.setProperty('angleStart', -0.75 * Math.PI);
        SustainKnob1.setProperty('angleEnd', 0.75 * Math.PI);
        SustainKnob1.setProperty('colorFG', '#ffffff');
        SustainKnob1.setProperty('trackWidth', 0.4);
        SustainKnob1.setProperty('valMin', 0);
        SustainKnob1.setProperty('valMin', 0);
        SustainKnob1.setProperty('valMax',10);
        SustainKnob1.setValue(1);
        var SustainKnob2 = pureknob.createKnob(35,35);
        SustainKnob2.setProperty('angleStart', -0.75 * Math.PI);
        SustainKnob2.setProperty('angleEnd', 0.75 * Math.PI);
        SustainKnob2.setProperty('colorFG', '#000000');
        SustainKnob2.setProperty('colorBG', '#cccccc');
        SustainKnob2.setProperty('trackWidth', 0.4);
        SustainKnob2.setProperty('valMin', 0);
        SustainKnob2.setProperty('valMin', 0);
        SustainKnob2.setProperty('valMax',10);
        SustainKnob2.setValue(1);
        var SustainKnob3 = pureknob.createKnob(35,35);
        SustainKnob3.setProperty('angleStart', -0.75 * Math.PI);
        SustainKnob3.setProperty('angleEnd', 0.75 * Math.PI);
        SustainKnob3.setProperty('colorFG', '#ffffff');
        SustainKnob3.setProperty('trackWidth', 0.4);
        SustainKnob3.setProperty('valMin', 0);
        SustainKnob3.setProperty('valMin', 0);
        SustainKnob3.setProperty('valMax',10);
        SustainKnob3.setValue(1);

        var ReleaseKnob1 = pureknob.createKnob(35,35);
        ReleaseKnob1.setProperty('angleStart', -0.75 * Math.PI);
        ReleaseKnob1.setProperty('angleEnd', 0.75 * Math.PI);
        ReleaseKnob1.setProperty('colorFG', '#ffffff');
        ReleaseKnob1.setProperty('trackWidth', 0.4);
        ReleaseKnob1.setProperty('valMin', 0);
        ReleaseKnob1.setProperty('valMax',1000);
        ReleaseKnob1.setValue(8);
        var ReleaseKnob2 = pureknob.createKnob(35,35);
        ReleaseKnob2.setProperty('angleStart', -0.75 * Math.PI);
        ReleaseKnob2.setProperty('angleEnd', 0.75 * Math.PI);
        ReleaseKnob2.setProperty('colorFG', '#000000');
        ReleaseKnob2.setProperty('colorBG', '#cccccc');
        ReleaseKnob2.setProperty('trackWidth', 0.4);
        ReleaseKnob2.setProperty('valMin', 0);
        ReleaseKnob2.setProperty('valMax',1000);
        ReleaseKnob2.setValue(8);
        var ReleaseKnob3 = pureknob.createKnob(35,35);
        ReleaseKnob3.setProperty('angleStart', -0.75 * Math.PI);
        ReleaseKnob3.setProperty('angleEnd', 0.75 * Math.PI);
        ReleaseKnob3.setProperty('colorFG', '#ffffff');
        ReleaseKnob3.setProperty('trackWidth', 0.4);
        ReleaseKnob3.setProperty('valMin', 0);
        ReleaseKnob3.setProperty('valMax',1000);
        ReleaseKnob3.setValue(8);


        // Create knobs HTML element node.
        var gainnode1 = GainKnob1.node();
        gainnode1.setAttribute('oscillator',1);
        var gainnode2 = GainKnob2.node();
        gainnode2.setAttribute('oscillator',2);
        var gainnode3 = GainKnob3.node();
        gainnode3.setAttribute('oscillator',3);
    
        var phasenode1 = PhaseKnob1.node();
        phasenode1.setAttribute('oscillator',1);
        var phasenode2 = PhaseKnob2.node();
        phasenode2.setAttribute('oscillator',2);
        var phasenode3 = PhaseKnob3.node();
        phasenode3.setAttribute('oscillator',3);
    
        var par1node1 = Armonic1VolumeKnob1.node();
        par1node1.setAttribute('oscillator',1);
        par1node1.setAttribute('partial',1);
        var par1node2 = Armonic1VolumeKnob2.node();
        par1node2.setAttribute('oscillator',2);
        par1node2.setAttribute('partial',1);
        var par1node3 = Armonic1VolumeKnob3.node();
        par1node3.setAttribute('oscillator',3);
        par1node3.setAttribute('partial',1);
    
        var par2node1 = Armonic2VolumeKnob1.node();
        par2node1.setAttribute('oscillator',1);
        par2node1.setAttribute('partial',2);
        var par2node2 = Armonic2VolumeKnob2.node();
        par2node2.setAttribute('oscillator',2);
        par2node2.setAttribute('partial',2);
        var par2node3 = Armonic2VolumeKnob3.node();
        par2node3.setAttribute('oscillator',3);
        par2node3.setAttribute('partial',2);
    
        var par3node1 = Armonic3VolumeKnob1.node();
        par3node1.setAttribute('oscillator',1);
        par3node1.setAttribute('partial',3);
        var par3node2 = Armonic3VolumeKnob2.node();
        par3node2.setAttribute('oscillator',2);
        par3node2.setAttribute('partial',3);
        var par3node3 = Armonic3VolumeKnob3.node();
        par3node3.setAttribute('oscillator',3);
        par3node3.setAttribute('partial',3);
    
        var attacknode1 = AttackKnob1.node();
        attacknode1.setAttribute('oscillator',1);
        var attacknode2 = AttackKnob2.node();
        attacknode2.setAttribute('oscillator',2);
        var attacknode3 = AttackKnob3.node();
        attacknode3.setAttribute('oscillator',3);
    
        var decaynode1 = DecayKnob1.node();
        decaynode1.setAttribute('oscillator',1);
        var decaynode2 = DecayKnob2.node();
        decaynode2.setAttribute('oscillator',2);
        var decaynode3 = DecayKnob3.node();
        decaynode3.setAttribute('oscillator',3);
    
        var sustainnode1 = SustainKnob1.node();
        sustainnode1.setAttribute('oscillator',1);
        var sustainnode2 = SustainKnob2.node();
        sustainnode2.setAttribute('oscillator',2);
        var sustainnode3 = SustainKnob3.node();
        sustainnode3.setAttribute('oscillator',3);
    
        var releasenode1 = ReleaseKnob1.node();
        releasenode1.setAttribute('oscillator',1);
        var releasenode2 = ReleaseKnob2.node();
        releasenode2.setAttribute('oscillator',2);
        var releasenode3 = ReleaseKnob3.node();
        releasenode3.setAttribute('oscillator',3);

        // Add it to the DOM
        var gainctr = document.getElementById('gainknob1');
        gainctr.appendChild(gainnode1);
        document.getElementById('gainknob2').appendChild(gainnode2);
        document.getElementById('gainknob3').appendChild(gainnode3);
        document.getElementById('phaseknob1').appendChild(phasenode1);
        document.getElementById('phaseknob2').appendChild(phasenode2);
        document.getElementById('phaseknob3').appendChild(phasenode3);
        document.getElementById('par1knob1').appendChild(par1node1);
        document.getElementById('par1knob2').appendChild(par1node2);
        document.getElementById('par1knob3').appendChild(par1node3);
        document.getElementById('par2knob1').appendChild(par2node1);
        document.getElementById('par2knob2').appendChild(par2node2);
        document.getElementById('par2knob3').appendChild(par2node3);
        document.getElementById('par3knob1').appendChild(par3node1);
        document.getElementById('par3knob2').appendChild(par3node2);
        document.getElementById('par3knob3').appendChild(par3node3);
    
        var attackctr = document.getElementById('attackknob1');
        document.getElementById('attackcol1').replaceChild(attacknode1,attackctr);
        var attackctr = document.getElementById('attackknob2');
        document.getElementById('attackcol2').replaceChild(attacknode2,attackctr);
        var attackctr = document.getElementById('attackknob3');
        document.getElementById('attackcol3').replaceChild(attacknode3,attackctr);
        var decayctr = document.getElementById('decayknob1');
        document.getElementById('decaycol1').replaceChild(decaynode1,decayctr);
        var decayctr = document.getElementById('decayknob2');
        document.getElementById('decaycol2').replaceChild(decaynode2,decayctr);
        var decayctr = document.getElementById('decayknob3');
        document.getElementById('decaycol3').replaceChild(decaynode3,decayctr);
        var sustainctr = document.getElementById('sustainknob1');
        
        document.getElementById('sustaincol1').replaceChild(sustainnode1,sustainctr);
        var sustainctr = document.getElementById('sustainknob2');
        
        document.getElementById('sustaincol2').replaceChild(sustainnode2,sustainctr);
        var sustainctr = document.getElementById('sustainknob3');
        
        document.getElementById('sustaincol3').replaceChild(sustainnode3,sustainctr);
        var releasectr = document.getElementById('releaseknob1');
        
        document.getElementById('releasecol1').replaceChild(releasenode1,releasectr);
        var releasectr = document.getElementById('releaseknob2');
        
        document.getElementById('releasecol2').replaceChild(releasenode2,releasectr);
        var releasectr = document.getElementById('releaseknob3');
        
        document.getElementById('releasecol3').replaceChild(releasenode3,releasectr);
    
        //Events listener for knobs functionalities implementation
        
        var gainListener = function(knob, value) {
            a = knob.node();
            changeGain(value,a.getAttribute('oscillator'));
        };
        GainKnob1.addListener(gainListener);
        GainKnob2.addListener(gainListener);
        GainKnob3.addListener(gainListener);

        var phaseListener = function(knob, value) {
            a = knob.node();
            changeOscParameter('phase',value,a.getAttribute('oscillator'));
        };
        PhaseKnob1.addListener(phaseListener);
        PhaseKnob2.addListener(phaseListener);
        PhaseKnob3.addListener(phaseListener);

        var parVolumeListener = function(knob,value) {
            a = knob.node();
            var value = [value,parseInt(a.getAttribute('partial'))];
            changeOscParameter('partial',value,a.getAttribute('oscillator'));
        };
        Armonic1VolumeKnob1.addListener(parVolumeListener);
        Armonic2VolumeKnob1.addListener(parVolumeListener);
        Armonic3VolumeKnob1.addListener(parVolumeListener);
        Armonic1VolumeKnob2.addListener(parVolumeListener);
        Armonic2VolumeKnob2.addListener(parVolumeListener);
        Armonic3VolumeKnob2.addListener(parVolumeListener);
        Armonic1VolumeKnob3.addListener(parVolumeListener);
        Armonic2VolumeKnob3.addListener(parVolumeListener);
        Armonic3VolumeKnob3.addListener(parVolumeListener);

        var attackListener = function(knob,value) {
            a = knob.node();
            changeAmpEnvParameter('attack',value,a.getAttribute('oscillator'));
        };
        AttackKnob1.addListener(attackListener);
        AttackKnob2.addListener(attackListener);
        AttackKnob3.addListener(attackListener);

        var decayListener = function(knob,value) {
            a = knob.node();
            changeAmpEnvParameter('decay',value,a.getAttribute('oscillator'));
        };
        DecayKnob1.addListener(decayListener);
        DecayKnob2.addListener(decayListener);
        DecayKnob3.addListener(decayListener);

        var sustainListener = function(knob,value) {
            a = knob.node();
            changeAmpEnvParameter('sustain',value, a.getAttribute('oscillator'));
        };
        SustainKnob1.addListener(sustainListener);
        SustainKnob2.addListener(sustainListener);
        SustainKnob3.addListener(sustainListener);

        var releaseListener = function(knob,value) {
            a = knob.node();
            changeAmpEnvParameter('release',value, a.getAttribute('oscillator'));
        };
        ReleaseKnob1.addListener(releaseListener);
        ReleaseKnob2.addListener(releaseListener);
        ReleaseKnob3.addListener(releaseListener);

                    
    
        /*  Waveforms selectors creation    */
    
        //Oscillator waveform selector creation
        $(".waveforms").msDropdown();

        //Attack and release waveform selectors creation
        $(".attackwaveforms").msDropdown();
        $(".releasewaveforms").msDropdown();

        //Oscillator waveforms select functionality implementation
    
        $(".waveforms").change(function() {
            var oscillator = parseInt($('option:selected', this).attr('oscillator'));
            var waveform = $('option:selected', this).attr('value');
            
            switch (parseInt($('option:selected', this).attr('oscillator'))) {
                case 1:
                    clearParVolumeListener(Armonic1VolumeKnob1);
                    clearParVolumeListener(Armonic2VolumeKnob1);
                    clearParVolumeListener(Armonic3VolumeKnob1);
                    break;
                case 2:
                    clearParVolumeListener(Armonic1VolumeKnob2);
                    clearParVolumeListener(Armonic2VolumeKnob2);
                    clearParVolumeListener(Armonic3VolumeKnob2);
                    break;
                case 3:
                    clearParVolumeListener(Armonic1VolumeKnob3);
                    clearParVolumeListener(Armonic2VolumeKnob3);
                    clearParVolumeListener(Armonic3VolumeKnob3);
                    break;
                default:
                    break;
            }

            changeOscParameter('waveform', waveform,oscillator);
            
        });

        //Attack and release waveforms select functionality implementation
    
        $(".attackwaveforms").change(function() {
            var oscillator = parseInt($('option:selected', this).attr('oscillator'));
            var waveform = $('option:selected', this).attr('value');

            changeAmpEnvParameter('attackwaveform', waveform,oscillator);
        });

        $(".releasewaveforms").change(function() {
            var oscillator = parseInt($('option:selected', this).attr('oscillator'));
            var waveform = $('option:selected', this).attr('value');

            changeAmpEnvParameter('releasewaveform', waveform,oscillator);
        });


};


/*  OSCILLATORS INSTANTIATION AND STARTING  */


var oscillator1 = new Tone.Oscillator();
var gainNode1 = new Tone.Gain();
var env1 = new Tone.AmplitudeEnvelope({
    "attack" : 0.1,
    "decay" : 0.2,
    "sustain" : 1,
    "release" : 0.8,
});
env1.connect(gainNode1);

oscillator1.type="sine";
oscillator1.volume = -6;
gainNode1.gain.value = 0;
oscillator1.connect(env1);
gainNode1.toMaster();
oscillator1.start();

var oscillator2 = new Tone.Oscillator();
var gainNode2 = new Tone.Gain();
var env2 = new Tone.AmplitudeEnvelope({
    "attack" : 0.1,
    "decay" : 0.2,
    "sustain" : 1,
    "release" : 0.8,
});
env2.connect(gainNode2);

oscillator2.type="sine";
oscillator2.volume = -6;
gainNode2.gain.value = 0;
oscillator2.connect(env2);
gainNode2.toMaster();
oscillator2.start();

var oscillator3 = new Tone.Oscillator();
var gainNode3 = new Tone.Gain();
var env3 = new Tone.AmplitudeEnvelope({
    "attack" : 0.1,
    "decay" : 0.2,
    "sustain" : 1,
    "release" : 0.8,
});
env3.connect(gainNode3);

oscillator3.type="sine";
oscillator3.volume = -6;
gainNode3.gain.value = 0;
oscillator3.connect(env3);
gainNode3.toMaster();
oscillator3.start();

    
/*  Events listeners for notes  */

keyboard.addEventListener('noteon', function(e) {
    //console.log('note start');
    if (e.detail.index < 12) {
        var id = "[data-index"+e.detail.index+"]";
        $(id).css("box-shadow", "inset 0px 0px 10px rgba(255, 0, 0, 0.8);");
        oscillator1.frequency.value = e.detail.frequency;
        env1.triggerAttack();
    } else if (e.detail.index >= 12 && e.detail.index < 24) {
        oscillator2.frequency.value = e.detail.frequency;
        env2.triggerAttack();
    }
    else {
        oscillator3.frequency.value = e.detail.frequency;
        env3.triggerAttack();
    }
    
});


keyboard.addEventListener('noteoff', function(e) {
    //console.log('note stop');
    if (e.detail.index < 12) {
        env1.triggerRelease();
    } else if (e.detail.index >= 12 && e.detail.index < 24) {
        env2.triggerRelease();
    } else {
        env3.triggerRelease();
    }
});

octaveup.addEventListener('click', function() {
    range = parseInt($("#octaveup").attr('oct')) +1 ;
    if (range > 6) {}
    else {
    octaveup.setAttribute("oct",range);
    octavedown.setAttribute("oct",range);
    changeOctave(range);
    switch (range) {
        case 0:
            octavedisplay.innerHTML = "Octaves: C0 - B2";
            break;
        case 1:
            octavedisplay.innerHTML = "Octaves: C1 - B3";
            break;
        case 2:
            octavedisplay.innerHTML = "Octaves: C2 - B4";
            break;
        case 3:
            octavedisplay.innerHTML = "Octaves: C3 - B5";
            break;
        case 4:
            octavedisplay.innerHTML = "Octaves: C4 - B6";
            break;
        case 5:
            octavedisplay.innerHTML = "Octaves: C5 - B7";
            break;
        case 6:
            octavedisplay.innerHTML = "Octaves: C6 - B8";

        }
    }

});

octavedown.addEventListener('click', function(e) {
    range = parseInt($("#octavedown").attr('oct')) - 1 ;
    if (range < 0) {}
    else {
    octaveup.setAttribute("oct",range);
    octavedown.setAttribute("oct",range);
    changeOctave(range);
    switch (range) {
        case 0:
            octavedisplay.innerHTML = "Octaves: C0 - B2";
            break;
        case 1:
            octavedisplay.innerHTML = "Octaves: C1 - B3";
            break;
        case 2:
            octavedisplay.innerHTML = "Octaves: C2 - B4";
            break;
        case 3:
            octavedisplay.innerHTML = "Octaves: C3 - B5";
            break;
        case 4:
            octavedisplay.innerHTML = "Octaves: C4 - B6";
            break;
        case 5:
            octavedisplay.innerHTML = "Octaves: C5 - B7";
            break;
        case 6:
            octavedisplay.innerHTML = "Octaves: C6 - B8";

        }
    }

});