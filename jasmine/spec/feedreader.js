$(function() {

  /* Tests functionality related to RSS feeds
   */
  describe('RSS Feeds', function() {

    /* Tests to make sure that the allFeeds variable
     * has been defined and its not empty(length is
     * not equal to 0)
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* Test loops through each feed.
     * In the allFeeds object it ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('have URLs', function() {
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
    it('each has a name', function() {
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
     it('entries match the number of entries in the menu', function() {
       var lenFeedList = $('.feed-list').children().length;
       expect(allFeeds.length).toBe(lenFeedList);
     });
  });


  /* Tests functionality related the menu
   */
  describe('The Menu', function() {
    var isMenuHidden = function() {
      return $('body').hasClass('menu-hidden');
    };

    /* Test ensures the menu element is
     * hidden by default.
     */
    it('element is hidden by default', function() {
      expect(isMenuHidden()).toBe(true);
    });

    /* Test ensures the menu changes.
     * Tests visibility when the menu icon is clicked.
     * Checks whether the menu displays when
     * clicked and does it hide when clicked again.
     */
    it('changes visibility when menu icon is clicked', function() {
      expect(isMenuHidden()).toBe(true);
      $('.menu-icon-link').click();
      expect(isMenuHidden()).toBe(false);
      $('.menu-icon-link').click();
      expect(isMenuHidden()).toBe(true);
    });

    /* Test that ensures that the menu hides when
     * you click on a feed item.
     */
    it('hides after a feed item is clicked', function() {
      expect(isMenuHidden()).toBe(true);
      $('.menu-icon-link').click();
      expect(isMenuHidden()).toBe(false);
      $('ul.feed-list li:first-child a').click();
      expect(isMenuHidden()).toBe(true);
    });
  });


  /* Tests the initial state.
   */
  describe('Initial Entries', function() {

    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

    /* Test ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * loadFeed() is asynchronous.
     */
    it('at least has a single .entry element within .feed container', function(done) {
      expect($('.feed').find('.entry').length).toBeGreaterThan(0);
      done();
    });
  });


  /* Tests the funcionality related to the new feed selection
   */
  describe('New Feed Selection', function() {

    var content = $('.feed').text();
    beforeEach(function(done) {
      loadFeed(1, function() {
        done();
      });
    });

    /* Test ensures when a new feed is loaded
    * by the loadFeed function that the content actually changes.
    */
    it('when a new feed is loaded by the loadFeed function the content changes', function(done) {
      var newcontent = $('.feed').text();
      expect(content).not.toEqual(newcontent);
      done();
    });
  });
}());
