class OMPianoKeyboard extends HTMLElement {
    
    /*get octaves() {
        return this.getAttribute('octaves');
    }*/

	
	makeCallback(kb, fn) {

		var cb = function(e) {
			fn(kb, e);
		};

		return cb;

	}


	onDivMouseDown( keyboard, ev ) {

		var key = ev.target;
		dispatchNoteOn( keyboard, key.dataset.index );

	}


	onDivMouseUp( keyboard, ev ) {

		var key = ev.target;
		dispatchNoteOff( keyboard, key.dataset.index );

	}


	onKeyDown( keyboard, e ) {

		var index = findKeyIndex( keyboard, e );

		// TODO might want to check if it's checked already to prevent the multiple events being fired?

		if( index === -1 || e.altKey || e.altGraphKey || e.ctrlKey || e.metaKey || e.shiftKey ) {
			// no further processing
			return;
		}

		dispatchNoteOn( keyboard, index );

	}


	onKeyUp( keyboard, e ) {

		var index = findKeyIndex( keyboard, e );

		// Only fire key up if the key is in the defined layout
		// TODO: maybe move this check to onKeyDown?
		if( index !== -1 ) {
			dispatchNoteOff( keyboard, index );
		}

	}


	isKeyPressed(keyboard, index) {
		return keyboard.pressedKeys[index];
	}


	setKeyPressed(keyboard, index, pressed) {
		keyboard.pressedKeys[index] = pressed;
	}


	findKeyIndex( keyboard, e ) {

		var keyCode = e.keyCode || e.which,
			keyChar = String.fromCharCode( keyCode ),
			index = keyboard.keyboardLayout.indexOf( keyChar );

		return index;

	}
    
    findKeyFrequency( keyboard, e ) {

		var index = findKeyIndex(keyboard,e);
        var key = keyboard.keys[index];
        
        return key.dataset.notefrequency;

	}


	makeEvent(type, detailData) {
		return new CustomEvent(type, { detail: detailData });
	}


	dispatchNoteOn( keyboard, index ) {

		var key = keyboard.keys[index],
			currentClass = key.className;

		if(isKeyPressed(keyboard, index)) {
			// Already pressed, are we mouseclicking and keyboarding
			// at the same time?
			console.log('already pressed', index);
            var evt = makeEvent('notehold', {index:index,frequency:key.dataset.notefrequency});
            keyboard.dispatchEvent(evt);
			return;
		}

		setKeyPressed(keyboard, index, true);
		key.classList.add('active');

		var evt = makeEvent('noteon', { index: index, frequency: key.dataset.notefrequency });
		keyboard.dispatchEvent(evt);
	
	}


	dispatchNoteOff( keyboard, index ) {

		var key = keyboard.keys[index];

		if(!isKeyPressed(keyboard, index)) {
			// TODO ghost note offs!? maybe if we press down on one key but
			// release the mouse in another key?
			console.error('this key is not pressed', index);
			return;
		}

		key.classList.remove('active');

		setKeyPressed(keyboard, index, false);
		
		var evt = makeEvent('noteoff', { index: index, frequency: key.dataset.notefrequency });
		keyboard.dispatchEvent(evt);

	}
	//
    
    constructor(range,octaves) {
        
	   super();
        
        this.pressedKeys = {};
        this.keyClass = 'key';
        this.keyBlackClass = 'key black';
        this.keyboardLayout = 'ZSXDCVGBHNJMAWERFTYUIKOLPQ1234567890'.split('');
        this.blackKeys = [ false, true, false, true, false, false, true, false, true, false, true, false ];
        this.keynotesfrequencies = [16.35, 17.32, 18.35, 19.45, 20.60, 21.83, 23.12, 24.50, 25.96, 27.50, 29.14, 30.87, 32.70, 34.65, 36.71, 38.89, 41.20, 43.65, 46.25, 49, 51.91, 55, 58.27, 61.74, 65.41, 69.30, 73.42, 77.78, 82.41, 87.31, 92.50, 98, 103.83, 110, 116.54, 123.47, 130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185, 196, 207.65, 220, 233.08, 246.94, 261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392, 415.30, 440, 466.16, 493.88, 523.25, 554.37, 587.33, 622.25, 659.25, 698.46, 739.99, 783.99, 830.61, 880, 932.33, 987.77, 1046.50, 1108.73, 1174.66, 1244.51, 1318.51, 1396.91, 1479.98, 1567.98, 1661.22, 1760, 1864.66, 1975.53, 2093, 2217.46, 2349.32, 2489.02, 2637.02, 2793.83, 2959.96, 3135.96, 3322.44, 3520, 3729.31, 3951.07, 4186.01, 4434.92, 4698.63, 4978.03, 5274.04, 5587.65, 5919.91, 6271.93, 6644.88, 7040, 7458.62, 7902.13];
        if (range==null) {
            this.range=0;
        }
        else {
            this.range=range;
        }
        this.octaves = octaves;

        this.makeCallback = this.makeCallback.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        
        // Even if we set tabIndex=1 here, the browser is smart enough to
		// let us cycle between keyboards when there's more than one on screen
		// at the same time, by pressing TAB
        this.tabIndex = 1;
        this.addEventListener('keydown', this.makeCallback(this, this.onKeyDown), false);
		this.addEventListener('keyup', this.makeCallback(this, this.onKeyUp), false);
        this.rebuildKeyboard = this.rebuildKeyboard.bind(this);
        
    }
    
    connectedCallback() {
        this.rebuildKeyboard();
    }
    
    rebuildKeyboard() {
        this.keys = [];
        initLayout(this);
    }
    
    initLayout(kb) {
        
        var blacksDiv;
		var numBlacks = kb.blackKeys.length;
        var frequencies = kb.keynotesfrequencies.slice(kb.range*12,kb.numOctaves*12+kb.range*12);

		kb.innerHTML = '';
		kb.classList.add('keyboard');
		
		blacksDiv = document.createElement('div');
		kb.appendChild(blacksDiv);
		blacksDiv.className = 'blacks';

		for(var i = 0; i < kb.numOctaves; i++) {

			for(var j = 0; j < numBlacks; j++) {

				var isBlack = kb.blackKeys[j],
					keyDiv = document.createElement( 'div' ),
					index = j + numBlacks * i,
					label = kb.keyboardLayout[ index ];

				keyDiv.className = isBlack ? kb.keyBlackClass : kb.keyClass;
				keyDiv.innerHTML = label;
				keyDiv.dataset.index = index;
                keyDiv.dataset.notefrequency = frequencies[index];
                keyDiv.dataset.octave = i;

				keyDiv.addEventListener('mousedown', kb.makeCallback(kb, onDivMouseDown), false);
				keyDiv.addEventListener('mouseup', kb.makeCallback(kb, onDivMouseUp), false);

				kb.keys.push( keyDiv );

				if(isBlack) {
					blacksDiv.appendChild( keyDiv );

					if(j >= 2 && !kb.blackKeys[j - 1] && !kb.blackKeys[j - 2] || (j === 1 && i > 0) ) {
						keyDiv.classList.add('prevwhite');
					}
				} else {
					kb.appendChild( keyDiv );
				}

				var numKeys = kb.keys.length;
				kb.pressedKeys[numKeys] = false;

			}
		}
    }

	/*var component = {};
	component.prototype = proto;
	component.register = function(name) {
		document.registerElement(name, {
			prototype: proto
		});
	};
    customElements.define('component', createKeyboard);

	if(typeof define === 'function' && define.amd) {
		define(function() { return component; });
	} else if(typeof module !== 'undefined' && module.exports) {
		module.exports = component;
	} else {
		component.register('openmusic-piano-keyboard'); // automatic registration
	}*/

    if ((customElements.get('openmusic-piano-keyboard'))!=undefined) {}
    else {
        customElements.define('openmusic-piano-keyboard', OMPianoKeyboard);
    }
}


