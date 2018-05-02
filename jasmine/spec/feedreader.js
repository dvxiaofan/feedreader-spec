/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* 测试保证 allFeeds 已经存在， 并且不为空 */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* 测试每个feed都有一个URL
         * 并且URL不能为空
         */
        it('url not empty', function () {

            for (const feed of allFeeds) {
                expect(feed.url.length).not.toBe(0);
            }
            
        });


        /* 测试每一个feed都有一个name
         * 并且name不为空
         */
        it('name not empty', function () {
            for (const feed of allFeeds) {
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* 测试左侧menu页面 */
    describe('The menu', function () {
        // 便于下面重复使用
        let $body = $('body'),
            $menuIcon = $('.menu-icon-link');

        /* 测试初试状态下， menu菜单是否隐藏  */
        it('elemetn is hidden by default', function () {
            expect($body.hasClass('menu-hidden')).toBe(true);           
        });

         /* 测试点击menu图标能否切换menu的显示状态 */
        it('changes visibility when the menu icon is clicked', function () {
            // 第一次点击切换状态， menu不隐藏
            $menuIcon.trigger('click');
            expect($body.hasClass('menu-hidden')).toBe(false);
            // 第二次点击切换状态， menu隐藏
            $menuIcon.trigger('click');
            expect($body.hasClass('menu-hidden')).toBe(true);
        });
    });
        

    /* "Initial Entries" */
    describe('Initial Entries', function () {

        /* 测试保证 loadFeed 函数被调用而且工作正常
         * 即在 .feed 容器元素里面至少有一个 .entry 的元素
         */
        beforeEach(function (done) {
            loadFeed(0, done);
        }, 20000);

        it('at least a single .entry element within the .feed container', function () {
            expect($('.feed').children().length).toBeGreaterThan(0);
        });
    });


    /* 测试能否加载新的feed内容 */
    describe('New Feed Selection', function () {
        
        // /* 测试保证当用 loadFeed 函数加载一个新源的时候内容会真的改变 */

        var oldContent, newContent;
        let $feed = $('.feed');

        beforeEach(function(done) {
            loadFeed(1, function() {
                // 匿名函数，当 loadFeed 返回数据后执行
                // 在这里获取内容1
                oldContent = $feed.html();
                // 获取完毕后开始请求新的数据
                loadFeed(2, function() {
                    // 获取内容2
                    newContent = $feed.html();
                    // 执行 done，通知下方 it 开始测试（因为到现在为止，两次请求的数据才真正全部返回）
                    done();
                });
          });
        }, 10000);

        it("the content has changed when a new feed was loaded", function() {
          expect(oldContent).not.toBe(newContent);
        });
    });
}());
