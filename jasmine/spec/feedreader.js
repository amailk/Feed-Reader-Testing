$(function() {
	describe('RSS Feeds', function() {

		/* Tests to make sure that the allFeeds variable has been defined and that it is not empty.
		 */
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		/* Test loops through each feed.
		 * In the allFeeds object it ensures it has a URL defined
		 * and that the URL is not empty.
		 */
		it('each feed has a URL', function() {
			for (i = 0; i < allFeeds.length; i++) {
				var feed = allFeeds[i];
				expect(feed.url).toBeDefined();
				expect(feed.url.length).not.toBe(0);
			}
		});

		/* Test that loops through each feed
		 * In the allFeeds object it ensures it has a name defined
		 * and that the name is not empty.
		 */
		it('each feed has a name', function() {
			for (i = 0; i < allFeeds.length; i++) {
				var feed = allFeeds[i];
				expect(feed.name).toBeDefined();
				expect(feed.name.length).not.toBe(0);
			}
		});

    /* Tests that when you click on the menu icon
     * all entires in allFeeds are available in
     * the feed-list.
     */
     it('all entries are visible', function() {
       var lenFeedList = $('.feed-list').children().length;
       expect(allFeeds.length).toBe(lenFeedList);
     });
	});


	/* Test suite named "The menu" */
	describe('The menu', function() {
		var isMenuHidden = function() {
			return $('body').hasClass('menu-hidden');
		};

		/* Test ensures the menu element is
		 * hidden by default.
		 */
		it('element is hidden by default', function() {
			expect(isMenuHidden()).toBe(true);
		});

		/* Test that ensures the menu changes.
		 * Tests visibility when the menu icon is clicked.
		 * Checks whether the menu displays when
		 * clicked and does it hide when clicked again.
		 */
		it('menu changes visibility when menu icon is clicked', function() {
			expect(isMenuHidden()).toBe(true);
			$('.menu-icon-link').click();
			expect(isMenuHidden()).toBe(false);
			$('.menu-icon-link').click();
			expect(isMenuHidden()).toBe(true);
		});

    /* Test that ensures that the menu hides when
     * you click on a feed item.
     */
    it('hides after clicking on a feed item', function() {
      expect(isMenuHidden()).toBe(true);
      $('.menu-icon-link').click();
      expect(isMenuHidden()).toBe(false);
      $('ul.feed-list li:first-child a').click();
      expect(isMenuHidden()).toBe(true);
    });
	});


	/* Test suite named "Initial Entries" */
	/* Test ensures when the loadFeed
	 * function is called and completes its work, there is at least
	 * a single .entry element within the .feed container.
	 * loadFeed() is asynchronous.
	 */
	describe('Initial Entries', function() {
		beforeEach(function(done) {
			loadFeed(0, function() {
				done();
			});
		});

		it('at least single .entry element within .feed container', function(done) {
			expect($('.feed').find('.entry').length).toBeGreaterThan(0);
			done();
		});
	});

	/* Test suite named "New Feed Selection"*/
	describe('New Feed Selection', function() {
		var content = $('.feed').text();

		beforeEach(function(done) {
			loadFeed(1, function() {
				done();
			});
		});
  /* Test ensures when a new feed is loaded
 	 * by the loadFeed function that the content actually changes.
 	 * Remember, loadFeed() is asynchronous.
 	 */
		it('when a new feed is loaded by the loadFeed function the content changes', function(done) {
			var newcontent = $('.feed').text();
			expect(content).not.toEqual(newcontent);
			done();
		});
	});



}());
