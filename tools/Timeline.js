/**
 * Timeline for actions & animations
 * @param {Object} options
 * @param {Element} options.element - DOMElement
 * @param {Number} options.scrollStart - Start scroll position
 * @param {Number} options.scrollEnd - End scroll position
 * @param {Number} options.throttle - Delay in ms 
 * @param {Function} options.onChange - Function on value change 
 * 
 */

export default class Timeline {
	constructor(options) {
		this.element = options.element;
		this.scrollStart = options.start || this.element.offsetTop - this.element.scrollHeight;
		this.scrollEnd = options.end || this.scrollStart + this.element.scrollHeight + window.innerHeight;
		this.throttle = options.throttle || 100;
		this.onChange = options.onChange || function (percent) { console.log('%', percent); }
		window.addEventListener('resize', () => {
			this.scrollStart = options.start || this.element.offsetTop
			this.scrollEnd = options.end || this.scrollStart + this.element.scrollHeight;
		});

		const throttle = (callback, limit) => {
			let waiting = false;                      // Initially, we're not waiting
			return function () {                      // We return a throttled function
				if (!waiting) {
					callback.apply(this, arguments);  // Execute users function
					waiting = true;                   // Prevent future invocations
					setTimeout(function () {          // After a period of time
						waiting = false;              // And allow future invocations
					}, limit);
				}
			}
		}

		const getPercent = (y1, y2, y) => {
			const amount = y2 - y1;
			const percent = amount / 100;
			const position = y - y1;
			const positionPercent = position / percent;
			return Math.round(positionPercent);
		}

		// Проверка на нахождение элемента внутри границ
		let last_percent;
		const onScroll = () => {
			let new_percent;

			if (window.scrollY < this.scrollStart && last_percent > 0) {
				new_percent = 0;
			}

			if (window.scrollY > this.scrollEnd && last_percent < 100) {
				new_percent = 100;
			}

			if (window.scrollY > this.scrollStart && window.scrollY < this.scrollEnd) {
				new_percent = getPercent(this.scrollStart, this.scrollEnd, window.scrollY);
			}

			if (new_percent !== undefined && last_percent !== new_percent) {
				this.onChange(new_percent);
				last_percent = new_percent;
			}

		};

		const onScrollThrottled = throttle(onScroll, this.throttle);
		window.addEventListener('scroll', onScrollThrottled);
	}
}