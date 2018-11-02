// Open Close Stuff

function openCloseStuff($this, force) {
	
	if (force == true) {
		
		$this.classList.add('is-open');
		
	} else if (force == false) {
		
		$this.classList.remove('is-open');
		
	} else {
		 
		 // Toggle the class if force isn't defined
		if ($this.classList.contains('is-open')) {
			
			$this.classList.remove('is-open');
			
		} else {
			
			$this.classList.add('is-open');
			
		}
		
	}
	
}



// Attach event handlers to all the dropdowns

var dropdowns = document.getElementsByClassName('dropdown');

for (var i = 0; dropdowns.length > i; i++) {
	
	dropdowns[i].addEventListener('click', function() {
		openCloseStuff(this);
	});
	
}



// Scrolling Stuff

var winHeight = window.outerHeight;
var isScrolled = false;

window.onscroll = function() {
	
	isScrolled = true;
	
}

window.onload = function() {
	checkScroll();
}

setInterval( function() {
	
	if (isScrolled) {
		checkScroll();
		
		isScrolled = false;
		
	}
	
}, 100);

function checkScroll() {
	
	var scrolledItems = document.getElementsByClassName('scroll-animation-trigger');
	var winTop = window.scrollY;
	var winBot = winTop + winHeight;
	
	for (var i = 0; scrolledItems.length > i; i++) {
		
		var itemHeight = scrolledItems[i].offsetTop;
		console.log(scrolledItems[i] + ': ' + itemHeight + '/ ' + winTop);
		
		if ( winBot > itemHeight + 300 ) {
			
			scrolledItems[i].classList.remove('scroll-animation-trigger');
			
		}
		
	}
	
}