export function whichTransitionEvent() {
    const el = document.createElement('fakeelement');
    const transitions = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'MSTransition': 'msTransitionEnd',
        'OTransition': 'oTransitionEnd',
        'transition': 'transitionEnd'
    };

    for (let t in transitions) {
        if (el.style[t] !== undefined) {
            return transitions[t];
        }
    }
}

export class SVGEl {
    private readonly paths: SVGPathElement[];

    // we will save both paths and its lengths in arrays
    private pathsArr: any[] = [];
    private lengthsArr: number[] = [];

    constructor(private el: HTMLElement) {
        // the path elements
        this.paths = [].slice.call(this.el.querySelectorAll('path'));

        const self = this;

        this.paths.forEach(function (path, i) {
            self.pathsArr[i] = path;
            const totalLen = path.getTotalLength();

            self.lengthsArr[i] = totalLen;
            path.style.strokeDasharray = totalLen.toString();
        });

        // undraw stroke
        this.draw(0);
    }

    // val in [0,1] : 0 - no stroke is visible, 1 - stroke is visible
    public draw(val) {
        for (let i = 0, len = this.pathsArr.length; i < len; ++i) {
            this.pathsArr[i].style.strokeDashoffset = this.lengthsArr[i] * (1 - val);
        }
    }
}

export class UIProgressButton {
    public successClass: number;
    public isLoading: boolean;
    public isDisabled: boolean;
    private progressEl: SVGEl;
    private successEl: SVGEl;
    private errorEl: SVGEl;
    private readonly button: HTMLButtonElement;
    private readonly options: UIProgressButtonOptions = {
        statusTime: 1500,
        progress: function () {
        }
    };

    private transEndEventName: string;

    constructor(private el: HTMLElement, optionsUser: UIProgressButtonOptions) {
        this.options = Object.assign({}, this.options, optionsUser);

        // the button
        this.button = this.el.querySelector('button');
        // progress el

        this.progressEl = new SVGEl(this.el.querySelector('svg.progress-circle'));

        // the success/error elems
        this.successEl = new SVGEl(this.el.querySelector('svg.checkmark'));
        this.errorEl = new SVGEl(this.el.querySelector('svg.cross'));

        this.transEndEventName = whichTransitionEvent();

        this.isDisabled = false;
    }

    start() {
        this.setProgress(1);
        this.stop(0);
    }

    stop(status: number, callback?: Function) {
        const self = this;
        this.isLoading = false;

        const endLoading = function () {
            // first undraw progress stroke.
            self.progressEl.draw(1);

            self.successClass = status;

            const statusEl = status >= 0 ? self.successEl : self.errorEl;

            // draw stroke of success (checkmark) or error (cross).
            statusEl.draw(1);

            self.progressEl.draw(0);

            setTimeout(function () {
                if (typeof self.options.progress === 'function') {
                    self.options.reset(self);
                }

                statusEl.draw(0);

                if (typeof callback === 'function') {
                    callback();
                }

                self.successClass = null;
            }, self.options.statusTime);


            // finally remove class loading.
            self.isLoading = false;
        };

        // give it a time (ideally the same like the transition time) so that the last progress increment animation is still visible.
        setTimeout(endLoading, 300);
    }

    setProgress(val) {
        this.progressEl.draw(val);
    }

    submit() {
        this.isLoading = true;

        const self = this;
        const onEndBtnTransitionFn = (ev) => {
            if (ev.propertyName !== 'width') return false;
            removeEventListener(self.transEndEventName, onEndBtnTransitionFn);

            self.isDisabled = true;

            if (typeof self.options.progress === 'function') {
                self.options.progress(self);
            } else {
                // fill it (time will be the one defined in the CSS transition-duration property)
                self.setProgress(1);
                self.stop(0);
            }
            
            return false;
        };

        this.button.addEventListener(self.transEndEventName, onEndBtnTransitionFn);
    }
}

export interface UIProgressButtonOptions {
    statusTime?: number;
    progress?: (instance: UIProgressButton) => void,
    reset?: (instance: UIProgressButton) => void
}