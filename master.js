// Window load event used just in case window height is dependant upon images

(function($) {

    function updateExecutors() {
        $('#executors th.pane a.model-link').css('max-width',$("#side-panel").width() - 15);
    }

    $(document).ready(function() {
        updateExecutors();

        // hook into build executor update
        _refreshPart = window.refreshPart;
        window.refreshPart = function(id, url) {
            _refreshPart(id, url);
            if(id == 'executors') updateExecutors();
        }
    });

    $(document).ready(function() {
        $('#main-panel')
            .removeClass('col-md-9').addClass('col-md-8')
            .attr('style', 'border-left: none !important;')
                .find("div[style='float:right'] div[align='right']")
                .attr('align', 'left');
    });

    $(document).ready(function() {

        var movies = [ 'webm', 'mp4', 'ogg', 'flv' ];
        var images = [ 'jpg', 'png', 'gif', 'bmp' ];
        var binaries = movies.concat(images).concat([ 'xls', 'xlsx' ]);

        setInterval(function() {

            movies.forEach(function(ext) {

                $("a[href$='." + ext + "']").replaceWith(function() {

                    var $this = $(this);
                    var $widthSlider = $('<input />').attr({
                        type: 'range',
                        min: 50,
                        max: 150,
                        step: 20
                    });
                    var $video = $('<video />');

                    var minimumVideoControlWidth = 200;
                    var desiredVideoWidth = Math.min(Math.floor($jq(window).width() - $jq('#side-panel').width() - $jq("#main-panel div[style='float:right']").width()), 1100);
                    var videoWidthMargin = 250;
                    var videoWidth = Math.max(desiredVideoWidth - videoWidthMargin, minimumVideoControlWidth);

                    $widthSlider.bind('input', function() {
                        $video.width(($(this).val() / 100) * videoWidth);
                    });

                    $video.attr({
                        controls: 'controls',
                        width: videoWidth,
                        src: $this.prop('href')
                    }).click(function() {
                        if ($video.prop('paused')) {
                            $video[0].play();
                        } else {
                            $video[0].pause();
                        }
                    });

                    var $container = $('<div />');

                    $container.append($('<div />').append('<span>FrameSize </span>').append($widthSlider));
                    $container.append($video);

                    return $container;
                });
            });

            binaries.forEach(function(ext) {
                $("a[href$='." + ext + "/*view*/']").remove();
            });
        }, 250);
    });

    $(document).ready(function() {
        if(window.location.href.indexOf("/login") > -1){
          window.scrollTo(0, 0);
        }

        $(".task .task-icon-link img").each(function() {
            var attr = $(this).attr('class');
            if (typeof attr != undefined && attr != null) {
                var classList = $(this).attr('class').split(/\s+/);
                var self = this;
                $.each(classList, function(index, item) {
                    if (item.indexOf("icon") == 0) {
                        $(self).parent("a").addClass(item);
                    }
                });
            }
        });

        if(window.location.href.indexOf("job") != -1) {
            $("link[rel='shortcut icon']").attr("href", $("img.icon-blue, img.icon-aborted, img.icon-yellow, img.icon-red").first().attr("src"));
        }

    });

    window.$jq = $; // keep for later use

})(jQuery.noConflict(true));
