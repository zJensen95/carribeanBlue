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


var dropdowns = document.getElementsByClassName('dropdown');

for (var i = 0; dropdowns.length > i; i++) {
	
	dropdowns[i].addEventListener('click', function() {
		openCloseStuff(this);
	});
	
}